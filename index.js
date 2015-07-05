#!/usr/bin/env node

'use strict';

var fs = require('fs');

process.stdin.setEncoding('utf8');

var dashboardJson = '';

process.stdin.on('readable', function() {
  var chunk = process.stdin.read();
  if (chunk !== null)
    dashboardJson += chunk;
});

process.stdin.on('end', function() {

  fs.readFile('./code.js', { encoding: 'utf-8' }, function (err, data) {
    if (err) throw err;

    //deserialize dashboard json
    var dashboard = JSON.parse(dashboardJson);

    //load package.json
    var packageJson = fs.readFileSync('./package.json', { encoding: 'utf8' });
    var widgetId = JSON.parse(packageJson).name;

    //find widget based on id
    var widget = findWidget(dashboard, widgetId);
    if (widget) {

      //read code.js
      var code = fs.readFileSync('./code.js', { encoding: 'utf8' });

      //read data.js
      var data = fs.readFileSync('./data.js', { encoding: 'utf8' });

      //update dashboard
      widget.settings.code = code;
      widget.settings.data = data;

      //serialize and write to stdout
      var newDashboardJson = JSON.stringify(dashboard, null, 2);
      console.log(newDashboardJson);
    }
    else
      throw 'Could not find widget in dashboard: ' + widgetId;
  });

});

function findWidget(dashboard, widgetId) {
  for (var i in dashboard.panes) {
    var pane = dashboard.panes[i];
    for (var j in pane.widgets) {
      var widget = pane.widgets[j];
      if (widget.title && widget.title === widgetId)
        return widget;
    }
  }
}