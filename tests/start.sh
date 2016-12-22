#!/bin/sh

if [ ! -e node_modules/.bin/mocha ]
then
  echo "no mocha detected !"
  echo "run npm install before starting the tests"
  exit 1
fi

# find only index.js in all __tests__ directories
FILES=$(find . -name '*.test.js' | grep -v node_modules | grep __tests__)

for file in $FILES
do
  node_modules/.bin/mocha --reporter spec $file
done

exit 0
