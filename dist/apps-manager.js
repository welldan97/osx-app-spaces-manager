var AJSBridge, AppsManager, _, async, execSync, sleep;

execSync = require('child_process').execSync;

_ = require('lodash');

sleep = require('sleep').sleep;

async = require('async');

AJSBridge = require('./ajs-bridge');

AppsManager = (function() {
  function AppsManager() {}

  AppsManager.killNonEssential = function(essentialApps, ensureKillApps) {
    var appsToKill, runningApps;
    runningApps = AJSBridge.visibleProcesses();
    appsToKill = _(runningApps).difference(essentialApps).concat(ensureKillApps).value();
    return _.each(appsToKill, function(a) {
      return execSync("pkill -9 \"" + a + "\" | true");
    });
  };

  AppsManager.closeAllFinderWindows = function() {
    return AJSBridge.closeAllFinderWindows();
  };

  AppsManager.ensureRunning = function(apps) {
    var appsToStart;
    appsToStart = _.difference(apps, AJSBridge.processes());
    AJSBridge.processes();
    return _.each(appsToStart, function(a) {
      return execSync("open -a \"" + a + "\"");
    });
  };

  AppsManager.setupSpace = function(space, spaceActions, spaceKeys) {
    AJSBridge.switchToSpace(spaceKeys[space]);
    return typeof spaceActions[space] === "function" ? spaceActions[space]({
      force: true
    }, function() {}) : void 0;
  };

  AppsManager.eachSpace = function(action, spaceKeys) {
    return _.forEach(spaceKeys, function(k) {
      AJSBridge.switchToSpace(k);
      console.log(execSync(action).toString());
      return sleep(1);
    });
  };

  AppsManager.initSpaces = function(spaceActions, spaceKeys) {
    var iterator, j, ref, results;
    iterator = function(i, done) {
      if (_.isFunction(spaceActions[i])) {
        AJSBridge.switchToSpace(spaceKeys[i]);
        return spaceActions[i]({
          force: true
        }, function() {
          sleep(3);
          return done();
        });
      } else {
        return done();
      }
    };
    return async.eachSeries((function() {
      results = [];
      for (var j = 0, ref = spaceKeys.length; 0 <= ref ? j < ref : j > ref; 0 <= ref ? j++ : j--){ results.push(j); }
      return results;
    }).apply(this), iterator, function() {});
  };

  return AppsManager;

})();

module.exports = AppsManager;
