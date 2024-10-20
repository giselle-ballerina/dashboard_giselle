# Stage 1: Build the application
FROM node:lts-alpine as build

# Create app directory
RUN mkdir /app
WORKDIR /app

# Copy necessary files
COPY package.json .
COPY package-lock.json . 
COPY next.config.js .
COPY api-server.js .
COPY .env.local .

# Install dependencies and build the app
RUN npm install
RUN npm run build # Use "npm run build" to build the Next.js application

# Copy build artifacts
COPY .next ./.next
COPY public ./public
COPY . .

# Stage 2: Final container
FROM node:lts-alpine

# Set environment variables
ENV NODE_ENV production
ENV API_PORT 3001

# Set working directory
WORKDIR /app

# Copy files from build stage
COPY --from=build /app/package.json .
COPY --from=build /app/package-lock.json . 
COPY --from=build /app/next.config.js .
COPY --from=build /app/api-server.js .
COPY --from=build /app/.env.local .
COPY --from=build /app/.next ./.next
COPY --from=build /app/public ./public

# Copy the Google Cloud Service Account JSON file
COPY triplan.json /app/triplan.json

# Set the environment variable to the path of the service account file
ENV GOOGLE_APPLICATION_CREDENTIALS="./triplan.json"

# Install production dependencies
RUN npm install --only=production

# Expose ports
EXPOSE 3000
EXPOSE 3001

# Start the app
CMD ["npm", "run", "dev"] # Use "npm start" for production
