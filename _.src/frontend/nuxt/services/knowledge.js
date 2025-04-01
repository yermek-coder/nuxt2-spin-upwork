import api from "./api"

class KnowledgeService {
    $modal;

    statusMap = {
        publish: {
            title: "Published",
            class: "teal white--text",
        },
        draft: {
            title: "Draft",
            class: "green lighten-1",
        },
        pending: {
            title: "Pending Review",
            class: "orange lighten-1",
        },
        archived: {
            title: "Archived",
            class: "black",
        },
        delete: {
            title: "Deleted",
            class: "red white--text",
        },
        rejected: {
            title: "Rejected",
            class: "red white--text",
        },
    }

    getFeatured() {
        return api.post("user/knowledgebase/get.php", { type: "featured" }).then(result => result.data)
    }

    getExplore() {
        return api.post("user/knowledgebase/get.php", { type: "explore" }).then(result => result.data)
    }

    async report(entity) {
        const form = await this.$modal({ component: 'KnowledgeReportDialog', props: { entity } })
        if (form) {
            return api.post('/user/knowledgebase/report.php', {
                user_id: 1,
                reason: form.reason,
                type: 'article',
                report_id: entity?.article_id || entity?.video_id || entity?.id
            }
            ).then(() => true)
        }
    }
}

class ArticleService {
    $modal;

    readingTime(html) {
        const slugEl = document.createElement("div");
        slugEl.innerHTML = html;
        const text = slugEl.innerText;
        const wpm = 225;
        const words = text.trim().split(/\s+/).length;
        return Math.ceil(words / wpm);
    }

    getArticles() {
        return api.post("user/knowledgebase/get.php", { type: "articles" }).then(result => result.data)
    }

    getArticle(slug) {
        return api.post("user/knowledgebase/get.php", { type: "single_article", slug }).then(result => result.data)
    }

    getMyArticles(user_id) {
        return api.post("agent/article/get.php", { user_id }).then(result => result.data.map(article => ({
            ...article,
            cover: article.cover_image.includes("localhost") ? '/article-cover-full.webp' : article.cover_image,
        })))
    }

    getMyArticle(user_id, article_id) {
        return api.post("agent/article/get.php", { user_id, article_id }).then(result => ({
            ...result.data,
            cover: result.data.cover_image.includes("localhost") ? '/article-cover-full.webp' : result.data.cover_image,
        }))
    }

    async removeArticle(article) {
        const result = await this.$modal({
            component: 'DeleteConfirmDialog', contentClass: 'align-self-end mx-4', width: '100%',
            transition: "dialog-bottom-transition", props: { description: "Are you sure want to delete this article?" }
        })
        if (result) {
            return api.post("agent/article/status.php", { article_id: article.article_id, status: 'delete' }).then(() => true)
        }
    }

    archiveArticle(article) {
        return api.post("agent/article/status.php", { article_id: article.article_id, status: 'archive' })
    }

    editArticle(article) {
        return api.post("agent/article/update.php", article)
    }

    createArticle(article) {
        return api.post("agent/article/add.php", article)
    }

    getArticleCategories() {
        return api.post("selection/get.php", { "value": ["articlescategory"] }).then(result => result.articlescategory)
    }
}

class VideoService {
    $modal;

    getVideos() {
        return api.post("user/knowledgebase/get.php", { type: "videos" }).then(result => result.data)
    }

    getMyVideos(user_id) {
        return api.post("agent/video/get.php", { user_id }).then(result => result.data)
    }

    getMyVideo(user_id, video_id) {
        return api.post("agent/video/get.php", { user_id, video_id }).then(result => result.data)
    }

    createVideo(video) {
        return api.post("agent/video/add.php", video)
    }

    editVideo(video) {
        return api.post("agent/video/update.php", video)
    }

    archiveVideo(video) {
        return api.post("agent/video/status.php", { video_id: video.video_id, status: 'archive' })
    }

    async removeVideo(video) {
        const result = await this.$modal({
            component: 'DeleteConfirmDialog', contentClass: 'align-self-end mx-4', width: '100%',
            transition: "dialog-bottom-transition", props: { description: "Are you sure want to delete this video?" }
        })
        if (result) {
            return api.post("agent/video/status.php", { video_id: video.video_id, status: 'delete' }).then(() => true)
        }
    }

    formatDuration(seconds) {
        // Handle edge cases
        if (seconds === 0) return "00:00";
        if (seconds < 0) return "Invalid duration";

        // Calculate hours, minutes, and remaining seconds
        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        const remainingSeconds = Math.floor(seconds % 60);

        // Format with leading zeros
        const formattedMinutes = minutes.toString().padStart(2, '0');
        const formattedSeconds = remainingSeconds.toString().padStart(2, '0');

        // Return HH:MM:SS if there are hours, otherwise MM:SS
        if (hours > 0) {
            return `${hours}:${formattedMinutes}:${formattedSeconds}`;
        } else {
            return `${formattedMinutes}:${formattedSeconds}`;
        }
    }
}

export const knowledgeService = new KnowledgeService()
export const articleService = new ArticleService()
export const videoService = new VideoService()