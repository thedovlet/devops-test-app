#step 1: build
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install --omit=dev
COPY . .

#step 2: runtime
FROM node:18-alpine
WORKDIR /app

#fix bug with curl healthcheck
RUN apk add --no-cache curl

COPY --from=builder /app ./
EXPOSE 3000

HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
  CMD curl -f http://localhost:3000/ || exit 1

CMD ["npm", "start"]
