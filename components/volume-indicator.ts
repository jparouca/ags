const audio = await Service.import('audio')

export const volumeIndicator = Widget.Box({
  child: Widget.Button({
    on_clicked: () => audio.speaker.is_muted = !audio.speaker.is_muted,
    child: Widget.Icon().hook(audio.speaker, self => {
      const vol = audio.speaker.volume * 100;
      const icon = [
        [126, 'overamplified'],
        [101, 'high'],
        [67, 'medium'],
        [34, 'low'],
        [0, 'muted'],
      ].find(([threshold]) => threshold <= vol)?.[1];

      self.icon = `audio-volume-${icon}-symbolic`;
      self.tooltip_text = `Volume ${Math.floor(vol)}%`;
    }),
  })
})
