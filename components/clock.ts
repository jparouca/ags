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

  const timeLabel = Widget.Box({
    className: 'bar-time',
    child: Widget.Label({
      label: updateTime(),
      setup: (self) =>
        self.poll(5000, (label) => {
          label.label = updateTime();
        }),
    })
  })

  return (
    Widget.EventBox({
      className: 'clock',
      onPrimaryClick: () => App.toggleWindow('clock-window'),
      child: Widget.Box({
        children: [dateLabel, timeLabel],
      }),
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
    className: 'calendar',
    showDayNames: true,
    showDetails: false,
    showHeading: true,
  });
};
