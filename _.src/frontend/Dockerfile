# Development stage
FROM node:16 AS dev-stage

WORKDIR /app

# Accept a build argument to specify the project
ARG PROJECT=nuxt

# Copy package files and install dependencies
COPY _.src/frontend/$PROJECT/package*.json ./
RUN npm install

# Copy the rest of the app
COPY _.src/frontend/$PROJECT ./

# Expose the default Nuxt dev server port (3000)
EXPOSE 3000

# Set the project as an environment variable (optional for runtime use)
ENV PROJECT=$PROJECT

# Start the Nuxt development server
CMD ["npm", "run", "dev"]