_ = require 'lodash'
execSync = require('child_process').execSync
AJSBridge = require './ajs-bridge'

class AppsManager
  @killNonEssential = (essentialApps, ensureKillApps) ->
    runningApps = AJSBridge.visibleProcesses()
    appsToKill = _(runningApps)
      .difference(essentialApps)
      .concat(ensureKillApps)
      .value()

    _.each appsToKill, (a) ->
      execSync "pkill -9 \"#{a}\" | true"

  @ensureRunning = (apps) ->
    appsToStart = _.difference apps, AJSBridge.processes()
    AJSBridge.processes()
    _.each appsToStart, (a) ->
      execSync "open -a \"#{a}\""

module.exports = AppsManager
