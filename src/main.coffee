AppsManager = require './apps-manager'
meow = require 'meow'

pkg = require '../package.json'

cli = meow
  help: false
  pkg: pkg

essentialApps = [
  'iTerm'
  'Calendar'
  'Emacs-x86_64-10_9'
  'Google Chrome'
  'Skype'
  'VOX'
  'sqlitebrowser'
]

ensureKillApps = [
  'FullContact'
]

if cli.flags.k
  AppsManager.killNonEssential(essentialApps, ensureKillApps)
