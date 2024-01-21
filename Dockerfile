# Use the official Node.js image as the base image
FROM node:18-alpine

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install all dependencies (including devDependencies)
RUN npm install

# Copy the entire application to the working directory
COPY . .

# Expose the port that your NestJS application will run on
EXPOSE 3000

# Command to run your application in development mode
CMD ["npm", "run", "start:dev"]