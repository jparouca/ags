const audio = await Service.import('audio')

export const volumeIndicator = Widget.Box({
  child: Widget.Button({
    className: 'volume-indicator',
    child: Widget.Icon().hook(audio.speaker, self => {
      const vol = audio.speaker.volume * 100;
      const icon = [
        [126, 'overamplified'],
        [101, 'high'],
        [67, 'medium'],
        [34, 'low'],
        [0, 'muted'],
      ].find(([threshold]) => threshold <= vol)?.[1];

      self.icon = audio.speaker.is_muted ? 'speaker-simple-x-fill' : `audio-volume-${icon}-symbolic`;
    }),
  })
})
