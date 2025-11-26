# base image -> (neccessary to run application) 
FROM node:22

# dirctory to store the application source files and folder
WORKDIR /app

# copying the package.json && package-lock.json to /app
COPY package*.json .

# install the packages -> creates node_modules folder
RUN npm install

# copying all the files and folders to /app
COPY . .

# defining env variables
ENV PORT=4000

# port expose -> telling system that an appliction is running on port 4000 in docker
EXPOSE 4000

# start command so that when ever docker container starts it has to run this command to run project
CMD [ "npm","start" ]