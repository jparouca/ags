import Audio from 'resource:///com/github/Aylur/ags/service/audio.js';
import Indicator from '../services/indicator.js';
import { Clock } from "components/clock"
import { Divider } from "components/divider"
import { volumeIndicator } from "components/volume-indicator"
import { SysTray } from './systray.js';
import { MicIndicator } from './mic-indicator.js';
import { Dashboard } from './dashboard.js';
const audio = await Service.import('audio')

export const Right = () => {
  return Widget.EventBox({
    onSecondaryClick: () => audio.microphone.is_muted = !audio.microphone.is_muted,
    onPrimaryClick: () => audio.speaker.is_muted = !audio.speaker.is_muted,
    onScrollUp: () => {
      if (!Audio.speaker) return;
      if (Audio.speaker.volume <= 0.09) Audio.speaker.volume += 0.01;
      else Audio.speaker.volume += 0.03;
      Indicator.popup(1);
    },
    onScrollDown: () => {
      if (!Audio.speaker) return;
      if (Audio.speaker.volume <= 0.09) Audio.speaker.volume -= 0.01;
      else Audio.speaker.volume -= 0.03;
      Indicator.popup(1);
    },
    child: Widget.Box({
      className: "right",
      hpack: "end",
      spacing: 8,
      children: [
        volumeIndicator,
        MicIndicator,
        Divider(),
        SysTray(),
        Divider(),
        Clock(),
        Dashboard()
      ],
    })
  }).hook(audio.speaker, (self) => {
    const vol = audio.speaker.volume * 100;
    self.tooltip_text = `Volume ${Math.floor(vol)}%`;
  })
}
