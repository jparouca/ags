import Variable from 'resource:///com/github/Aylur/ags/variable.js';

export const zenMode = Variable(true, {});
globalThis.isZen = zenMode;

globalThis.toggleZenMode = () => {
  zenMode.value = !zenMode.value;
}
