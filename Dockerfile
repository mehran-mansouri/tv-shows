FROM node:latest as builder


WORKDIR /usr/src/app

ENV PATH /usr/src/node_modules/.bin:$PATH


ARG VITE_API_URL

ENV VITE_API_URL=$VITE_API_URL

COPY package.json ./

RUN yarn

COPY . ./

FROM builder as dev
CMD ["yarn", "dev"]

FROM builder as prod-builder
RUN yarn build

FROM nginx:latest as prod

COPY --from=prod-builder /usr/src/app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]