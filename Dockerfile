# Stage 1: Build the Vite app
FROM node:20-alpine AS builder
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci
COPY . .
RUN npm run build

# Stage 2: Apache server
FROM httpd:2.4-alpine

# Copy React build to htdocs/villa (not root!)
COPY --from=builder /app/dist /usr/local/apache2/htdocs/villanew

# Copy PHP files to htdocs/villa/property (subfolder of React app)
COPY property/ /usr/local/apache2/htdocs/villanew/property/

# Copy updated .htaccess files
COPY .htaccess /usr/local/apache2/htdocs/.htaccess
COPY property/.htaccess /usr/local/apache2/htdocs/villanew/property/.htaccess

# Append custom config to httpd.conf
COPY apache.conf /tmp/apache.conf
RUN cat /tmp/apache.conf >> /usr/local/apache2/conf/httpd.conf && rm /tmp/apache.conf

EXPOSE 80
CMD ["httpd-foreground"]