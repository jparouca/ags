const audio = await Service.import('audio')

export const VolumeIndicator = Widget.Button({
  className: 'volume-indicator',
  onPrimaryClick: () => audio.speaker.is_muted = !audio.speaker.is_muted,
  onScrollUp: () => audio.speaker.volume += 0.05,
  onScrollDown: () => audio.speaker.volume -= 0.05,
  child: Widget.Icon().hook(audio.speaker, self => {
    const vol = audio.speaker.volume * 100;
    const icon = [
      [101, 'overamplified'],
      [100, 'high'],
      [67, 'medium'],
      [34, 'low'],
      [0, 'muted'],
    ].find(([threshold]) => threshold <= vol)?.[1];

    self.icon = audio.speaker.is_muted ? 'speaker-simple-x-fill' : `audio-volume-${icon}-symbolic`;
    self.tooltip_text = `Volume ${Math.floor(vol)}%`;
  }),
})
