# ---- Base Node ----
FROM node:20.15.0-alpine as base
WORKDIR /app
COPY package*.json ./

# ---- Dependencies ----
FROM base AS dependencies
RUN npm ci

# ---- Build ----
FROM dependencies AS build
COPY . .
RUN npm run build

# --- Production ----
FROM node:20.15.0-alpine AS production
WORKDIR /app
COPY --from=dependencies /app/node_modules ./node_modules
COPY --from=build /app/.next ./.next
#COPY --from=build /app/public ./.public

EXPOSE 3000

CMD ["next", "start"]
