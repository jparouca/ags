import Audio from 'resource:///com/github/Aylur/ags/service/audio.js';
import Indicator from '../services/indicator.js';
import { Clock } from "components/clock"
import { Divider } from "components/divider"
import { volumeIndicator } from "components/volume-indicator"
import { SysTray } from './systray.js';

export const Right = () => {
  return Widget.EventBox({
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
        Divider(),
        SysTray(),
        Divider(),
        Clock(),
      ],
    })
  })
}