const main = '/tmp/ags/main.js';
App.addIcons(`${App.configDir}/icons`)
try {
  await Utils.execAsync([
    'bun', 'build', `${App.configDir}/main.ts`,
    '--outfile', main,
    '--external', 'resource://*',
    '--external', 'gi://*',
    '--external', 'file://*',
  ]);
  await import(`file://${main}`);
} catch (error) {
  console.error(error);
  App.quit();
}
