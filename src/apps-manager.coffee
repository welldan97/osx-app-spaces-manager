execSync = require('child_process').execSync

_ = require 'lodash'
sleep = require('sleep').sleep
async = require 'async'

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
    spaceActions[space]?(force: true, ->)

  @eachSpace = (action, spaceKeys) ->
    _.forEach spaceKeys, (k) ->
      AJSBridge.switchToSpace k
      console.log execSync(action).toString()
      sleep 1

  @initSpaces = (spaceActions, spaceKeys) ->
    iterator = (i, done) ->
      if _.isFunction spaceActions[i]
        AJSBridge.switchToSpace spaceKeys[i]
        spaceActions[i]
          force: true
          ->
            sleep 3
            done()
      else
        done()
    async.eachSeries [0...spaceKeys.length], iterator, ->

module.exports = AppsManager
