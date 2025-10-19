# Use Node.js for building the frontend
FROM node:20-alpine AS build

WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the frontend code
COPY . .

# Build the frontend
RUN npm run build

# Use Nginx to serve the built frontend
FROM nginx:alpine

# Copy the build output to Nginx html folder
COPY --from=build /app/dist /usr/share/nginx/html

# Expose port 80
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
