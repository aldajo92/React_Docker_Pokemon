# Use Node.js LTS version as base image
FROM node:20-alpine

# Set working directory inside container
WORKDIR /react_app

# Install global packages that might be useful for React development
RUN npm install -g create-react-app @vitejs/create-app npm-check-updates

# Install common development tools
RUN apk add --no-cache \
    git \
    bash \
    curl \
    vim

# Create a non-root user for development
RUN addgroup -g 1001 -S nodejs && \
    adduser -S reactdev -u 1001 -G nodejs

# Set proper permissions for the working directory
RUN chown -R reactdev:nodejs /react_app

# Switch to non-root user
USER reactdev

# Set environment variables for React development
ENV NODE_ENV=development
ENV CHOKIDAR_USEPOLLING=true
ENV WATCHPACK_POLLING=true

# Auto-start React dev server if package.json exists, otherwise keep container running
CMD ["bash", "-c", "if [ -f package.json ]; then echo 'Starting React development server...'; npm start; else echo 'No React app found. Create one with: npx create-react-app .'; trap 'exit 0' SIGTERM SIGINT; while true; do sleep 1; done; fi"]
