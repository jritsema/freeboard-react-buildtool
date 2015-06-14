freeboard-react-buildtool
==========================

A CLI build tool that can update a widget's settings in a freeboard dashboard.json file.  Takes freeboard dashboard json as stdin, tries to read code.js and data.js, and then serializes them into the dashboard json.

**Usage**

Install tool as a dev dependency in your react widget project folder (see [freeboard-widget-react-template](http://foo))...

`npm install --save-dev freeboard-react-buildtool`

Then you can create an npm script to auto-update your dashboard.json with something like...

`cat dashboard.json | freeboard-react-buildtool > temp && cp temp dashboard.json && rm temp`