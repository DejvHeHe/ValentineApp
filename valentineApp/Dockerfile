# 1. Fáze: Sestavení (Build)
FROM node:22-alpine as build
# Nastavujeme pracovní adresář na tvůj název
WORKDIR /valentineApp

# Kopírujeme soubory závislostí
COPY package*.json ./

# Instalace závislostí
RUN npm install

# Kopírujeme celý zbytek tvé složky
COPY . .

# Vite proměnné pro Discord
ARG VITE_DISCORD_WEBHOOK
ENV VITE_DISCORD_WEBHOOK=$VITE_DISCORD_WEBHOOK

# Build aplikace (vytvoří složku /valentineApp/dist)
RUN npm run build

# 2. Fáze: Servírování přes Nginx
FROM nginx:stable-alpine


COPY --from=build /valentineApp/dist /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]