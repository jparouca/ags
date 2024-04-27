import popupWindow from "./popup-window";

export const Dashboard = () => Widget.Button({
  class_name: 'dashboard-btn',
  onClicked: () => App.toggleWindow("test"),
  child: Widget.Icon({ icon: 'list' }),
});


export const DashWindow = () => {
  return popupWindow({
    name: `test`,
    anchor: ["top", "right"],
    exclusivity: "exclusive",
    child: Widget.Box({

      vertical: true,
      children: [
        Widget.Label({ label: "Test" }),
      ],
    }),
  })
}
