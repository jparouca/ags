const audio = await Service.import('audio')

export const MicIndicator = Widget.Button({
  className: 'microphone',
  child: Widget.Icon().hook(audio.microphone, self => {
    self.icon = audio.microphone.is_muted ? '../icons/microphone-slash-fill.svg' : '../icons/microphone-fill.svg'
    self.toggleClassName('microphone-muted', audio?.microphone.is_muted)
  })
})
