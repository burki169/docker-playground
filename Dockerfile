FROM node:18
WORKDIR /api
COPY /app /api
RUN npm install
EXPOSE 8080
CMD ["node", "index.js"]