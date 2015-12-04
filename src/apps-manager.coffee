_ = require 'lodash'
execSync = require('child_process').execSync
Util = require './util'
console.log Util.visibleProcesses()

class AppsManager

  @killNonEssential = (essentialApps, ensureKillApps) ->
    runningApps = Util.visibleProcesses()
    appsToKill = _(runningApps)
      .difference(essentialApps)
      .concat(ensureKillApps)
      .value()

    _.each appsToKill, (a) ->
      execSync "pkill -9 \"#{a}\" | true"
module.exports = AppsManager
