const hyprland = await Service.import('hyprland')
const dispatch = ws => hyprland.messageAsync(`dispatch workspace ${ws}`);

export const Workspaces = () => Widget.EventBox({
  onScrollUp: () => dispatch('+1'),
  onScrollDown: () => dispatch('-1'),
  child: Widget.Box({
    children: Array.from({ length: 5 }, (_, i) => i + 1).map(i => Widget.Button({
      className: 'workspace',
      hpack: 'center',
      attribute: i,
      label: `${i}`,
      onPrimaryClick: () => dispatch(i),
    }).hook(hyprland.active.workspace, (self) =>
      self.toggleClassName('workspace-active', hyprland.active.workspace.id === i)
    )
    ),
  }),
})
