import Widget from 'resource:///com/github/Aylur/ags/widget.js';
import Audio from 'resource:///com/github/Aylur/ags/service/audio.js';
import Indicator from '../services/indicator.js';
import { volumeIndicator } from './volume-indicator.js';
import { Clock } from './clock.js';

export const RightSide = () => {
  return Widget.Box({
    children: [Speaker(), Clock()]

  })
}


const Speaker = () => {
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
    child: volumeIndicator,
  })
}
