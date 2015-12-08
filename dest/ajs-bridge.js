var AJSBridge, _, ajs, async, exec;

exec = require('child_process').exec;

_ = require('lodash');

ajs = require('apple-java-script');

async = require('async');

AJSBridge = (function() {
  function AJSBridge() {}

  AJSBridge.switchToSpace = function(key) {
    return ajs(key, function(key) {
      var systemEvents;
      systemEvents = Application('System Events');
      return systemEvents.keystroke.apply(systemEvents, key);
    });
  };

  AJSBridge.processes = function() {
    return ajs(function() {
      var systemEvents;
      systemEvents = Application('System Events');
      return systemEvents.applicationProcesses.name();
    });
  };

  AJSBridge.visibleProcesses = function() {
    var names, ref, visibility;
    ref = ajs(function() {
      var names, systemEvents, visibility;
      systemEvents = Application('System Events');
      names = systemEvents.applicationProcesses.name();
      visibility = systemEvents.applicationProcesses.visible();
      return [names, visibility];
    }), names = ref[0], visibility = ref[1];
    return _.select(names, function(n, i) {
      return visibility[i];
    });
  };

  AJSBridge.closeAllFinderWindows = function() {
    return ajs(function() {
      return Application('Finder').windows().forEach(function(w) {
        return w.close();
      });
    });
  };

  AJSBridge.ask = function(message) {
    var e, error;
    try {
      ajs(message, function(message) {
        var app;
        app = Application.currentApplication();
        app.includeStandardAdditions = true;
        return app.displayDialog(message);
      });
      return true;
    } catch (error) {
      e = error;
      return false;
    }
  };

  return AJSBridge;

})();

module.exports = AJSBridge;
