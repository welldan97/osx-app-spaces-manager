exec = require('child_process').exec

_ = require 'lodash'
ajs = require 'apple-java-script'
async = require 'async'

class AJSBridge
  LETTER_MAP = 'gcrhtnmwvz'.split('')

  @switchToSpace =  (n) ->
    ajs LETTER_MAP[n - 1], (letter) ->
      systemEvents = Application 'System Events'
      systemEvents.keystroke letter, using: ['command down', 'control down']

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
