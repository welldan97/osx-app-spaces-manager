execSync = require('child_process').exec

AJSBridge = require './ajs-bridge'

config =
  essentialApps: [
    'Finder'
    'iTerm'
    'Calendar'
    'Emacs-x86_64-10_9'
    'Google Chrome'
    'Skype'
    'VOX'
    'sqlitebrowser'
  ]

  ensureKillApps: [
    'FullContact'
  ]

  ensureRunningApps: [
    'Amethyst'
    'Boom 2'
    'Karabiner'
    'iTerm'
  ]

  spaceActions:
    3: ({ force } = {}, done) ->
      openChrome profile: 'dev', done
    4:
      execSync 'open -n -a Emacs'

  spaceKeys: []

LETTER_MAP = 'gcrhtnmwvz'
LETTER_MAP.split('').forEach (letter) ->
  config.spaceKeys.push [letter, using: ['command down', 'control down']]

openChrome = (passedOptions..., cb) ->
  options = { profile: 'default', url: '' }
  options = Object.assign options, passedOptions[0] if passedOptions[0]
  { profile, url } = options

  CHROME_PROFILES =
    default: 'Default'
    dev: 'Profile 5'
    joy: 'Profile 3'

  args = "--profile-directory='#{CHROME_PROFILES[profile]}'"
  console.log "open -n -a 'Google Chrome' --args #{args} #{url}"
  execSync "open -n -a 'Google Chrome' --args #{args} #{url}", cb

module.exports = config
