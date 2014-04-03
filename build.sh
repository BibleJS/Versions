echo "Installing dependencies ..."
npm install

echo "Converting from CSV to JSON ..."
node index.js

echo "Applying finaly fixes ..."
node compute.js
