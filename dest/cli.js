#!/usr/bin/env node
var AppsManager, cli, ensureKillApps, ensureRunningApps, essentialApps, meow, pkg, ref, spaceActions, spaceKeys;

meow = require('meow');

require('coffee-script/register');

ref = require(process.env.HOME + "/.osx-app-spaces-config"), essentialApps = ref.essentialApps, ensureKillApps = ref.ensureKillApps, ensureRunningApps = ref.ensureRunningApps, spaceActions = ref.spaceActions, spaceKeys = ref.spaceKeys;

AppsManager = require('./apps-manager');

pkg = require('../package.json');

cli = meow({
  help: false,
  pkg: pkg
});

if (cli.flags.k) {
  AppsManager.killNonEssential(essentialApps, ensureKillApps);
  AppsManager.closeAllFinderWindows();
}

if (cli.flags.r) {
  AppsManager.ensureRunning(ensureRunningApps);
}

if (cli.flags.s) {
  AppsManager.setupSpace(cli.flags.s, spaceActions, spaceKeys);
}
