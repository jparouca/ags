// import { DashWindow } from "components/dashboard"
const hyprland = await Service.import('hyprland')
import { ClockWindow } from "components/clock"
import { Left } from "components/left-side"
import { Right } from "components/right-side"

const mpris = await Service.import("mpris")
// function Notification() {
//   const popups = notifications.bind("popups")
//   return Widget.Box({
//     class_name: "notification",
//     visible: popups.as(p => p.length > 0),
//     children: [
//       Widget.Icon({
//         icon: "preferences-system-notifications-symbolic",
//       }),
//       Widget.Label({
//         label: popups.as(p => p[0]?.summary || ""),
//       }),
//     ],
//   })
// }

function Media() {
  const label = Utils.watch("", mpris, "player-changed", () => {
    if (mpris.players[0]) {
      const { track_artists, track_title, name } = mpris.players[0]
      if (name === "spotify") {
        return `${track_artists.join(", ")} - ${track_title.slice(0, 16)}`
      }
    }
    return ""
  })

  return Widget.Button({
    class_name: "media",
    on_primary_click: () => mpris.getPlayer("")?.playPause(),
    on_scroll_up: () => mpris.getPlayer("")?.next(),
    on_scroll_down: () => mpris.getPlayer("")?.previous(),
    child: Widget.Revealer({
      revealChild: true,
      transitionDuration: 1000,
      transition: 'slide_right',
      child: Widget.Label({ label }),
    })
  })
}

function Center() {
  return Widget.Box({
    className: "center",
    spacing: 8,
    children: [
      Media(),
      // Notification(),
    ],
  })
}

function Bar(monitor = 0) {
  return Widget.Window({
    name: `bar-${monitor}`,
    class_name: "bar",
    monitor,
    anchor: ["top", "left", "right"],
    exclusivity: "exclusive",
    child: Widget.CenterBox({
      start_widget: Left(),
      center_widget: Center(),
      end_widget: Right(),
    }),
  })
}

App.config({
  style: "./main.css",
  windows: [
    Bar(),
    ClockWindow()
    // DashWindow(),
  ],
})

export { }
