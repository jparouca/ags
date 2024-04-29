import popupWindow from "./popup-window";
const notifications = await Service.import("notifications")

let tasks = Variable([]);

const TOKEN_API = '4da56d6910a443ba5cf82acb32b20c374ccd1460';
const URL = 'https://api.todoist.com/rest/v2/tasks';

Utils.fetch(URL, {
  headers: {
    Authorization: `Bearer ${TOKEN_API}`,
  },
}).then((response) => response.json()).then((data) => {
  tasks = data.map((task) => task.content)
  console.log(tasks)
}).catch((error) => console.log(error));

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
        Widget.Box({ className: 'dashboard', vertical: true, children: [Todoist()] }),
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

const tasksBinding = tasks.bind();

export const Todoist = () => {
  return Widget.Box({
    className: 'todo-list',
    vertical: true,
    setup: (self) => {
      tasks.connect('changed', (tasks) => {
        self.children = tasks.map((task) => (
          Widget.Box({
            className: 'todo-item',
            vertical: true,
            children: [
              Widget.Label({ label: task }),
            ],
          })
        ));
      });
    },
  });
};
