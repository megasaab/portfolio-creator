FROM node:14

#create app directory
WORKDIR /amazon-clone-server/src/app

#install app dependencies (* copy package-SOME.json)
COPY package*.json ./

RUN npm install

COPY . .

RUN npm install && npm run build

expose 3200
CMD ["node", "main"]
