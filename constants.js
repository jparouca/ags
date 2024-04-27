import Variable from 'resource:///com/github/Aylur/ags/variable.js';

export const zenMode = Variable(true, {});
globalThis.isZen = zenMode;

globalThis.toggleZenMode = () => {
  zenMode.value = !zenMode.value;
}

globalThis['closeEverything'] = () => {
  const numMonitors = Gdk.Display.get_default()?.get_n_monitors() || 1;
  for (let i = 0; i < numMonitors; i++) {
    App.closeWindow(`test`);
  }
};
