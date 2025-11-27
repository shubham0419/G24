# baseimage -> required language for application
FROM node:22-alpine3.18

# working directory
WORKDIR /app 

# copy package.json and package-lock.json
COPY package*.json .

# command to install packages
RUN npm install

# copying all the files and folder to /app
COPY . .

# env set
ENV PORT=4000

# port expose
EXPOSE 4000

# command to run application
CMD [ "node","index.js" ]