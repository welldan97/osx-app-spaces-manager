exec = require('child_process').exec

_ = require 'lodash'
ajs = require 'apple-java-script'
async = require 'async'

class AJSBridge
  @switchToSpace =  (key) ->
    ajs key, (key) ->
      systemEvents = Application 'System Events'
      systemEvents.keystroke key...

  @processes = ->
    ajs ->
      systemEvents = Application('System Events')
      systemEvents.applicationProcesses.name()

  @visibleProcesses = ->
    [names, visibility] = ajs ->
      systemEvents = Application('System Events')
      names = systemEvents.applicationProcesses.name()
      visibility = systemEvents.applicationProcesses.visible()
      [names, visibility]

    _.select names, (n, i) ->
        visibility[i]

  @closeAllFinderWindows = ->
    ajs ->
      Application('Finder')
        .windows()
        .forEach (w) -> w.close()

  @ask = (message) ->
    try
      ajs message, (message) ->
        app = Application.currentApplication()
        app.includeStandardAdditions = true
        app.displayDialog message
      true
    catch e
      false

module.exports = AJSBridge
