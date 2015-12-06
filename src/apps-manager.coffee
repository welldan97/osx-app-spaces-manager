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

  @closeAllFinderWindows = ->
    AJSBridge.closeAllFinderWindows()

  @ensureRunning = (apps) ->
    appsToStart = _.difference apps, AJSBridge.processes()
    AJSBridge.processes()
    _.each appsToStart, (a) ->
      execSync "open -a \"#{a}\""

  @setupSpace = (space, spaceActions, spaceKeys) ->
    AJSBridge.switchToSpace spaceKeys[space]
    spaceActions[space](force: true, ->)

module.exports = AppsManager
