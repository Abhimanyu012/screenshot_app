# Use the official Playwright image for Node.js and all browser/system dependencies
FROM mcr.microsoft.com/playwright:v1.52.0-jammy

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json/yarn.lock if present
COPY package.json ./

# Install dependencies (will also run postinstall for Playwright)
RUN npm install

# Copy the rest of the app
COPY . .

# Expose the port your app runs on (default 3000, or 10000 for Render)
EXPOSE 3000

# Start the server
CMD ["npm", "start"]
