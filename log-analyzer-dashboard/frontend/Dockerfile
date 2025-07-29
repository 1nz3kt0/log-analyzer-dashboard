FROM node:20-alpine
WORKDIR /app
COPY package.json tailwind.config.js ./
COPY src ./src
RUN npm install
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]