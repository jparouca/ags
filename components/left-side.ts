import { Workspaces } from "./workspaces";

export function Left() {
  return Widget.Box({
    className: "left",
    spacing: 8,
    children: [
      HyprlandWorkspaceWidget(),
    ],
  })
}


const hyprland = await Service.import('hyprland');

const HyprlandWorkspaceWidgetButton = (id: number) =>
  Widget.Button({
    onClicked: () => hyprland.messageAsync(`dispatch workspace ${id}`),
    className: 'workspace',
    vpack: 'center',
  }).hook(hyprland, (self) => {
    self.toggleClassName('workspace-active', hyprland.active.workspace.id === id)
    self.toggleClassName('active', hyprland.active.workspace.id === id)
  });

export const HyprlandWorkspaceWidget = (vertical = false) => Widget.EventBox({
  onScrollUp: () => hyprland.messageAsync(`dispatch workspace +1`),
  onScrollDown: () => hyprland.messageAsync(`dispatch workspace -1`),
  child: Widget.Box({
    vertical,
    className: 'card outline lg',
    spacing: 8,
    children: Array
      .from({ length: 5 }, (_, i) => i + 1)
      .map(HyprlandWorkspaceWidgetButton),
  })
});
