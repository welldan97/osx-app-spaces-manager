meow = require 'meow'

{
  essentialApps
  ensureKillApps
  ensureRunningApps
  spaceActions
  spaceKeys
} = require './config'

AppsManager = require './apps-manager'
pkg = require '../package.json'

cli = meow
  help: false
  pkg: pkg

if cli.flags.k
  AppsManager.killNonEssential(essentialApps, ensureKillApps)
  AppsManager.closeAllFinderWindows()

if cli.flags.r
  AppsManager.ensureRunning ensureRunningApps

if cli.flags.s
  AppsManager.setupSpace cli.flags.s, spaceActions, spaceKeys
