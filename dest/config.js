var AJSBridge, LETTER_MAP, URLS, config, execSync, openChrome,
  slice = [].slice;

execSync = require('child_process').exec;

AJSBridge = require('./ajs-bridge');

config = {
  essentialApps: ['Finder', 'iTerm', 'Calendar', 'Emacs-x86_64-10_9', 'Google Chrome', 'Skype', 'VOX', 'sqlitebrowser'],
  ensureKillApps: ['FullContact'],
  ensureRunningApps: ['Amethyst', 'Boom 2', 'Karabiner', 'iTerm'],
  spaceActions: {
    3: function(arg, done) {
      var force;
      force = (arg != null ? arg : {}).force;
      return openChrome({
        profile: 'dev'
      }, done);
    },
    4: function(arg, done) {
      var force;
      force = (arg != null ? arg : {}).force;
      execSync('open -n -a Emacs');
      return done();
    },
    5: function(arg, done) {
      var force;
      force = (arg != null ? arg : {}).force;
      return openChrome(done);
    },
    7: function(arg, done) {
      var force;
      force = (arg != null ? arg : {}).force;
      execSync('open -a Calendar');
      openChrome({
        urls: URLS.org
      }, function() {});
      return done();
    }
  },
  spaceKeys: []
};

URLS = {
  org: ['https://mail.google.com', 'https://inbox.google.com', 'https://trello.com/b/WnOZL8Oy/personal-kanban-31', 'https://bead.life', 'https://localhost:3000/admin/days?direction=desc&order=date'],
  joy: ['https://music.yandex.ru/', 'http://www.inoreader.com/']
};

LETTER_MAP = 'gcrhtnmwvz';

LETTER_MAP.split('').forEach(function(letter) {
  return config.spaceKeys.push([
    letter, {
      using: ['command down', 'control down']
    }
  ]);
});

openChrome = function() {
  var CHROME_PROFILES, args, cb, i, options, passedOptions, profile, url;
  passedOptions = 2 <= arguments.length ? slice.call(arguments, 0, i = arguments.length - 1) : (i = 0, []), cb = arguments[i++];
  options = {
    newWindow: true,
    profile: 'default',
    urls: []
  };
  if (passedOptions[0]) {
    options = Object.assign(options, passedOptions[0]);
  }
  profile = options.profile, url = options.url;
  CHROME_PROFILES = {
    "default": 'Default',
    dev: 'Profile 5',
    joy: 'Profile 3'
  };
  args = "--profile-directory='" + CHROME_PROFILES[profile] + "'";
  if (options.newWindow) {
    args += ' --new-window';
  }
  args += " '" + options.urls.join("' '") + "'";
  console.log(args);
  return execSync("open -n -a 'Google Chrome' --args " + args, cb);
};

module.exports = config;
