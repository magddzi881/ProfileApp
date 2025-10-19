# Backend Dockerfile
FROM node:20-alpine

WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install all dependencies (devDependencies needed for Prisma)
RUN npm install

# Copy backend source code
COPY . .

# Generate Prisma client
RUN npx prisma generate

# Expose backend port
EXPOSE 3000

# Run migrations, seed and start backend
CMD sh -c "npx prisma migrate deploy && npm run seed && npm start"
