docker build -t wv .

docker run \
 -d \
 -it \
 --rm \
 -v ${PWD}:/app \
 -v /app/node_modules \
 -p 3001:3006 \
 -e CHOKIDAR_USEPOLLING=true \

wv

demo link http://95.111.254.171:3001/
