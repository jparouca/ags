const { GLib } = imports.gi;

export const Clock = () => Widget.Box({
  vpack: 'center',
  className: 'spacing-h-4 clock',
  children: [
    Widget.Label({
      className: 'bar-time',
      label: GLib.DateTime.new_now_local().format('%H:%M'),
      setup: (self) => self.poll(5000, label => {
        label.label = GLib.DateTime.new_now_local().format('%H:%M');
      }),
    }),
  ],
  tooltipText: GLib.DateTime.new_now_local().format('%A, %d/%m'),
});

