import { Workspaces } from "./workspaces";

export function Left() {
  return Widget.Box({
    spacing: 8,
    children: [
      Workspaces(),
    ],
  })
}

