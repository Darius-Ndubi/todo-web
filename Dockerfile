# base image
FROM node:12-alpine AS build

# the working directory where the application would be started
WORKDIR /todo

# The Yarn.lock and package.json file is copied so that the versions
# in the package.json are not upgraded from what is present in the
# local package.json to a higher version in the container image.
COPY yarn.lock .
COPY package.json .

# update the Alpine image and install nano
RUN apk update && apk add nano

# install application dependancies
RUN yarn install

# Copy application files
COPY . .

# Build application deployment version
RUN yarn build

# Build the application final image with the base alpine image
FROM node:12-alpine

WORKDIR /todo

# update the Alpine image and install nano, bash and yarn serve package globally
RUN apk update && apk add nano bash && \
    yarn global add serve

# copy dependencies and the dist/ directory from the previous build stage.
# copy package.json file
COPY --from=build /todo/node_modules ./node_modules/
COPY --from=build /todo/build ./build
COPY package.json  .

# Expose port for app accessibilty
ENV PORT 5000
EXPOSE $PORT

# Run app when the container launches
CMD ["serve", "-s", "build" ]