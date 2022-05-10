find . -name 'node_modules' -type d -prune -exec rm -rf '{}' +

npm i
cd services/action-service && npm i
cd ../..
cd services/event-service && npm i
cd ../..