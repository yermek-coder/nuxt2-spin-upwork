const camelcase = require('lodash.camelcase');
const requireComponent = require.context('~/components/', true, /\.vue$/)
const requireServices = require.context('~/services/', false, /\.js$/)

export default async function (context, inject) {
    // Helper
    const IGNORED_PATH_SEGMENTS = ["common"];

    async function filenameToComponentName(filename) {
        return camelcase(
            filename
                .slice(1)
                .split("/")
                .filter((_, i) => i > 0)
                .filter(s => s && !IGNORED_PATH_SEGMENTS.includes(s))
                .map(s => s.replace(".vue", ""))
                .join("-"),
            { pascalCase: true }
        );
    }

    // Helper
    async function resolveComponents(spec) {
        const reduced = {}
        for (const path of spec) {
            const module = requireComponent(path).default;
            const name = module?.name || (await filenameToComponentName(path));
            reduced[name] = module
        }
        return reduced
    }

    const components = await resolveComponents(requireComponent.keys());
    inject("components", components)

    // Injecting routes array with info about parent of each page
    const routes = await Promise.all(context.app.router.options.routes.map(async route => ({ ...route, component: await route.component() })))
    inject("routes", routes.map(page => {
        if (page.path === '/') {
            return page;
        }

        const pathParts = page.path.split('/').filter(Boolean);

        if (pathParts.length === 1) {
            return {
                ...page,
                parent: '/'
            };
        }

        const parentPathParts = pathParts.slice(0, -1);
        const parentPath = '/' + parentPathParts.join('/');

        return {
            ...page,
            parent: parentPath
        };
    }))

    // Dependecy injection of global properties into services
    for (const path of requireServices.keys()) {
        const service = (await import(`../services${path.slice(1)}`)).default;

        Object.keys(service)
            .filter(attr => attr.startsWith("$"))
            .forEach(attr => {
                if (attr === '$router') {
                    service[attr] = context.app.router
                } else if (context[attr]) {
                    service[attr] = context[attr]
                }
            });
    }
}