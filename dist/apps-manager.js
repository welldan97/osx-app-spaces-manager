var AJSBridge, AppsManager, _, execSync, sleep;

execSync = require('child_process').execSync;

_ = require('lodash');

sleep = require('sleep').sleep;

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

  return AppsManager;

})();

module.exports = AppsManager;
