import popupWindow from "./popup-window";
const notifications = await Service.import("notifications")

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
        Widget.Box({ className: 'dashboard', vertical: true, children: [Notifications()] }),
      ],
    }),
  })
}

export const Notifications = () => {
  const notificationList = notifications.notifications.map(notification => ({
    id: notification.id,
    title: notification.summary,
    message: notification.body,
    icon: notification.app_icon,
  }));

  return Widget.Box({
    className: 'notification-list',
    vertical: true,
    children: notificationList.map(notification => (
      Widget.Box({
        className: 'notification-item',
        vertical: true,
        children: [
          Widget.Icon({ icon: notification.icon }),
          Widget.Label({ label: notification.title }),
          Widget.Label({ label: notification.message }),
        ],
      })
    )),
  });
};
