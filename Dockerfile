FROM node:20-alpine as deps

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install only production dependencies
RUN npm ci --omit=dev

FROM node:20-alpine as runtime

# Set the working directory
WORKDIR /app

# Set environment variables
ENV NODE_ENV=development

# Copy only the necessary files from the deps stage
COPY --from=deps /app/node_modules ./node_modules

# Copy the rest of the application files
COPY . .

# Expose the port the app runs on
EXPOSE 3000

# Command to run the application
CMD ["node", "app.js"]
