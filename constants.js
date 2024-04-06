export const zenMode = Variable(false, {});
globalThis.isZen = zenMode;

globalThis.toggleZenMode = () => {
  zenMode.value = !zenMode.value;
}
