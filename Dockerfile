# Stage 1: Build the Vite app
FROM node:20-alpine AS builder
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci
COPY . .
RUN npm run build

# Stage 2: Apache server (simulates shared host)
FROM httpd:2.4-alpine
# Copy React build to htdocs (simulates uploading dist/)
COPY --from=builder /app/dist /usr/local/apache2/htdocs

# Copy property/ to htdocs/property/ (simulates including in upload)
COPY property/ /usr/local/apache2/htdocs/property/

# Copy root .htaccess to htdocs/.htaccess (for React routing)
COPY .htaccess /usr/local/apache2/htdocs/.htaccess

# Append custom config to httpd.conf (enables modules, overrides, PHP handler)
COPY apache.conf /tmp/apache.conf
RUN cat /tmp/apache.conf >> /usr/local/apache2/conf/httpd.conf && rm /tmp/apache.conf

# Install utils if needed
RUN apk add --no-cache apache2-utils

EXPOSE 80
CMD ["httpd-foreground"]