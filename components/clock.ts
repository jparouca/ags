const { GLib } = imports.gi;
import popupWindow from './popup-window';

export const Clock = () => {
  const dateFormat = '%a %d %b';
  const timeFormat = '%H:%M'

  const updateDate = () => GLib.DateTime.new_now_local().format(dateFormat);
  const updateTime = () => GLib.DateTime.new_now_local().format(timeFormat)

  const dateLabel = Widget.Label({
    className: 'bar-date',
    label: updateDate(),
    setup: (self) =>
      self.poll(60000, (label) => {
        label.label = updateDate();
      }),
  });

  const timeButton = Widget.Button({
    className: 'bar-time',
    onClicked: () => App.toggleWindow('clock-window'),
    child: Widget.Label({
      label: updateTime(),
      setup: (self) =>
        self.poll(5000, (label) => {
          label.label = updateTime();
        }),
    })
  })

  return (
    Widget.Box({
      className: 'clock',
      children: [dateLabel, timeButton],
      tooltipText: GLib.DateTime.new_now_local().format('%c'),
    })
  );
}

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
