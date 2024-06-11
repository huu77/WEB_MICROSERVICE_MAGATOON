# Use the latest Node.js image from Docker Hub
FROM node:latest

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json if available to install dependencies
COPY package*.json ./



# Copy the rest of the application code
COPY . .

# Install dependencies using yarn
RUN npm install

EXPOSE 3333

# RUN npx prisma migrate dev --name init
RUN npx prisma generate

# Set the default command to start the Node.js application
CMD [ "npm", "start" ]
