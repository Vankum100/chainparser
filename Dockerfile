# Use the official Node.js image
FROM node:16

# Set the working directory
WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

EXPOSE 3009

CMD ["npm", "run", "start:prod"]
