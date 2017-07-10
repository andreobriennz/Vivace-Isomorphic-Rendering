# Vivace Isomorphic PHP/JS Rendering Engine - 0.0.2 (alpha)
Updated 10 July 2017

This project was created to disprove the idea that PHP and JavaScript can't be used together to build a single page web app that will still work without JavaScript. It is also designed to increase performance by removing the need for content to render before being loaded. It works by taking advantage two things both JavaScript and PHP understand - HTML and JSON.

First, in index.php, a render function takes an array of sections to load with their path given from the assets folder (eg render(['partials/header.htm','pages/home.htm']) would load the header and home files). You can either have a corresponding json file for that page, or a default (index) one. The JSON can either be a simple JSON object in a .js file, or a .php file that creates a JSON object from an array. The file name is very specific, and you can see an example of each in the assets/models directory.

Note that there is a specific order to what file it will look for. Firstly it will check for a .php file matching the path, then .js. Failing that, it will look for general index.php and index.js files in the models directory. In the current example setup, models/pages/home.htm.php is the only model file that will be read for the homepage. Deleting it or renaming it will let you edit the home.htm.js file if you prefer to work directly with JSON.

## Very basic instructions:
List files to load in array passed in render() param (assumes assets directory). Each page should either have a match .js file for JSON variables eg: assets/models/pages/home.htm.js or default to assets/models/index.js

The project is still in an early stage. More features will be added and the project will be further refined in time.
