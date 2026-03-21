# Docker Guide - E-Commerce Frontend

## Overview

This project includes Docker configuration for containerized deployment. The setup uses a multi-stage build approach to minimize image size.

## Files

- **Dockerfile** - Multi-stage build configuration
- **nginx.conf** - Nginx web server configuration
- **docker-compose.yml** - Docker Compose for local development
- **.dockerignore** - Files excluded from Docker build context

## Building

### Build the Docker image:

```bash
docker build -t e-commerce-frontend:latest .
```

### Build with specific tag:

```bash
docker build -t e-commerce-frontend:1.0.0 .
```

## Running

### Using Docker directly:

```bash
docker run -p 80:80 e-commerce-frontend:latest
```

Access the application at: **http://localhost**

### Using Docker Compose (Recommended):

```bash
docker-compose up -d
```

Stop the container:

```bash
docker-compose down
```

View logs:

```bash
docker-compose logs -f frontend
```

## Features

- **Multi-stage build**: Optimized for small image size
- **Node Alpine**: Lightweight base image for faster builds
- **Nginx Alpine**: Minimal web server for production
- **Gzip Compression**: Enabled for assets
- **Client-side Routing**: Configured for React SPA routing
- **Health Checks**: Built-in health check endpoint
- **Caching**: Optimized cache headers for static assets
- **Security**: Denies access to hidden files and directories

## Performance Optimizations

1. **npm ci** instead of npm install (faster, more reliable)
2. **Alpine images**: Significantly smaller than standard images
3. **Gzip compression**: Reduces asset sizes
4. **Cache busting**: Static assets cached for 1 year, HTML not cached
5. **Layer caching**: Dockerfile organized for optimal caching

## Environment Variables

By default, the production build is used. For development:

```bash
docker-compose up -d
```

To build for development:

```dockerfile
# Modify Dockerfile build command to:
RUN npm run build:dev
```

## Ports

- **80** - HTTP port (Nginx)

## Troubleshooting

### Check if container is running:

```bash
docker ps | grep e-commerce
```

### View container logs:

```bash
docker logs e-commerce-frontend
```

### Rebuild without cache:

```bash
docker build --no-cache -t e-commerce-frontend:latest .
```

### Health check status:

```bash
docker ps --filter "name=e-commerce-frontend"
```

Look for `(healthy)` status.
