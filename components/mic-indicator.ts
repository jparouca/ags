const audio = await Service.import('audio')

export const MicIndicator = Widget.Button({
  className: 'microphone',
  onPrimaryClick: () => audio.microphone.is_muted = !audio.microphone.is_muted,
  onScrollUp: () => audio.microphone.volume += 0.05,
  onScrollDown: () => audio.microphone.volume -= 0.05,
  child: Widget.Icon().hook(audio.microphone, self => {
    const micVol = audio.microphone.volume * 100;

    self.icon = audio.microphone.is_muted ? 'microphone-slash-fill' : 'microphone-fill'
    self.toggleClassName('microphone-muted', audio?.microphone.is_muted)
    self.tooltip_text = `Volume ${Math.floor(micVol)}%`;
  }),
})
