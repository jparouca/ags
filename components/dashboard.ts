import popupWindow from "./popup-window";

const TOKEN_API = '4da56d6910a443ba5cf82acb32b20c374ccd1460';
const URL = 'https://api.todoist.com/rest/v2/tasks';

const tasks = Variable([])


Utils.fetch(URL, {
  headers: {
    Authorization: `Bearer ${TOKEN_API}`,
  },
}).then((response) => response.json()).then((data) => {
  tasks.setValue(data.map((task) => task.content))
  console.log(tasks.getValue().length)
}).catch((error) => console.log(error));

// const Todoist = () => {
//   const count = Widget.Label({
//     className: 'todoist-count',
//     setup: (self) => {
//       self.label = tasks.getValue().length.toString();
//     }
//   })
//
//   return Widget.Box({
//     className: 'todoist',
//     vertical: true,
//     child: count,
//   })
// }
//


export const Dashboard = () => Widget.Button({
  class_name: 'dashboard-btn',
  onClicked: () => App.toggleWindow("dash-window"),
  child: Widget.Icon({ icon: 'house-line-fill' }),
});


export const DashWindow = () => {
  return popupWindow({
    name: `dash-window`,
    anchor: ["top", "right"],
    exclusivity: "exclusive",
    child: Widget.Box({
      vertical: true,
      children: [
        Header(),
        // Widget.Box({
        //   className: 'dashboard', vertical: true,
        //   setup: self => self.hook(tasks, () => {
        //     self.children = [
        //       Widget.Box({
        //         children: [
        //           Widget.Label({ label: tasks.getValue().length.toString(), className: 'todoist-count', justification: 'left' }),
        //           Widget.Label({ label: 'Tasks', className: 'todoist-label', justification: 'right' }),
        //         ],
        //       }),
        //       Widget.Separator({
        //         vertical: false,
        //       }),
        //       ...tasks.getValue().map(task => Widget.Label({ label: task, className: 'todoist-tasks' }))
        //     ]
        //   })
        // }),
      ],
    }),
  })
}


const Header = () => {
  return (
    Widget.Box({
      className: 'dashboard-header',
      children: [
        Widget.Box({
          className: 'user-info',
          children: [
            Widget.Box({
              className: 'avatar',
              css: `background-image: url('/home/jparouca/.config/ags/assets/sunny.jpg');`,
            }),
            Widget.Box({
              hexpand: true,
              className: 'user-details',
              vertical: true,
              children: [
                Widget.Label({
                  label: 'takaxo',
                  className: 'user-name',
                  xalign: 0,
                }),
                Widget.Label({
                  label: 'Arch',
                  className: 'user-os',
                  xalign: 0,
                }),
                Widget.Label({
                  label: 'up 13 hours, 24 minutes',
                  className: 'user-uptime',
                  xalign: 0,
                }),
              ],
            }),
            Widget.Box({
              className: 'user-system-controls',
              spacing: 12,
              vertical: true,
              children: [
                Widget.Button({
                  child: Widget.Icon({ icon: 'power', className: 'systemctl' }),
                }),
                Widget.Button({
                  child: Widget.Icon({ icon: 'restart', className: 'systemctl' })
                })
              ]
            })
          ]
        })
      ]
    })
  )
}
