FROM node:alpine

COPY . /academy
WORKDIR /academy

ENV NEXT_PUBLIC_API_URL back.iswoacademy.com
RUN npm install
# RUN npm run build

ENV NODE_ENV production
EXPOSE 3001

CMD ["npm", "run", "start"]