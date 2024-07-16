const { GLib } = imports.gi;
import popupWindow from './popup-window';

export const Clock = () =>
  Widget.Button({
    vpack: 'center',
    className: 'clock',
    onClicked: () => App.toggleWindow('clock-window'),
    tooltipText: GLib.DateTime.new_now_local().format('%c'),
    child: Widget.Label({
      className: 'bar-time',
      label: GLib.DateTime.new_now_local().format('%a, %H:%M %p'),
      setup: (self) =>
        self.poll(5000, (label) => {
          label.label =
            GLib.DateTime.new_now_local().format('%a, %H:%M %p') ?? '--:--';
        }),
    }),
  });

export const ClockWindow = () => {
  return popupWindow({
    name: `clock-window`,
    anchor: ['top', 'right'],
    exclusivity: 'exclusive',
    child: Widget.Box({
      vertical: true,
      children: [Calendar()],
    }),
  });
};

const Calendar = () => {
  return Widget.Calendar({
    showDayNames: true,
    showDetails: false,
    showHeading: true,
  });
};
