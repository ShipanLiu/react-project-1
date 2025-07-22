#!/bin/bash

# React TypeScript App Deployment Script
set -e

echo "🚀 Starting React App Deployment..."

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Configuration
IMAGE_NAME="react-project-1"
CONTAINER_NAME="react-project-1"
PORT="80"

# Function to print colored output
print_status() {
    echo -e "${GREEN}[INFO]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check if Docker is running
if ! docker info > /dev/null 2>&1; then
    print_error "Docker is not running. Please start Docker and try again."
    exit 1
fi

print_status "Docker is running ✅"

# Build the Docker image
print_status "Building Docker image..."
docker build -t $IMAGE_NAME .

# Stop and remove existing container if it exists
if docker ps -a --format 'table {{.Names}}' | grep -q "^${CONTAINER_NAME}$"; then
    print_warning "Stopping existing container..."
    docker stop $CONTAINER_NAME
    docker rm $CONTAINER_NAME
fi

# Run the new container
print_status "Starting new container..."
docker run -d \
    --name $CONTAINER_NAME \
    -p $PORT:80 \
    --restart unless-stopped \
    $IMAGE_NAME

# Wait for container to be ready
print_status "Waiting for container to be ready..."
sleep 5

# Check if container is running
if docker ps --format 'table {{.Names}}' | grep -q "^${CONTAINER_NAME}$"; then
    print_status "Container is running ✅"
    
    # Test health endpoint
    if curl -f http://localhost:$PORT/health > /dev/null 2>&1; then
        print_status "Health check passed ✅"
        print_status "🎉 Deployment successful!"
        print_status "Your app is available at: http://localhost:$PORT"
    else
        print_error "Health check failed ❌"
        print_error "Container logs:"
        docker logs $CONTAINER_NAME
        exit 1
    fi
else
    print_error "Container failed to start ❌"
    print_error "Container logs:"
    docker logs $CONTAINER_NAME
    exit 1
fi

# Show container info
print_status "Container information:"
docker ps --filter "name=${CONTAINER_NAME}" --format "table {{.Names}}\t{{.Status}}\t{{.Ports}}"

print_status "✨ Deployment completed successfully!"
echo ""
echo "Commands to manage your container:"
echo "  View logs:    docker logs $CONTAINER_NAME"
echo "  Stop:         docker stop $CONTAINER_NAME"
echo "  Start:        docker start $CONTAINER_NAME"
echo "  Remove:       docker rm $CONTAINER_NAME" 