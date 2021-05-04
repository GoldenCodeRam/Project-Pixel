cd ./client
npm run build
cd ..

cd ./loggingServer
npm run build
cd ..

docker build -t project-pixel/logging-server:latest .

docker run --rm --name loggingServer -p 3000:8080 -d project-pixel/logging-server