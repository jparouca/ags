import { Workspaces } from "./workspaces";

export function Left() {
  return Widget.Box({
    className: "left",
    spacing: 8,
    children: [
      Workspaces(),
    ],
  })
}

