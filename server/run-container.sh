# Build server files
cd server/
npm run build
cd ..

cd client/
npm run build
cd ..

# Make the .env temporal file containing the environment variables for the docker-compose
# Change the GATEWAY and the LOGGING_SERVER variables if you want to run them on your machine
echo PORT=$1 > $1.env
echo GATEWAY=192.168.32.1 >> $1.env
echo LOGGING_SERVER=172.17.0.1 >> $1.env
echo LOGGING_SERVER_PORT=3000 >> $1.env

docker-compose --project-name $1 --env-file ./$1.env up --build --detach --force-recreate

# Remove the .env temporal file
rm $1.env
