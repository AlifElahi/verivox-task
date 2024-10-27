# Use an official Node.js image as the base
FROM node:18

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json files to install dependencies
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the entire project into the container
COPY . .

# Expose the port that Angular uses for development
EXPOSE 4200

# Start the Angular development server
CMD ["npm", "run", "start"]
