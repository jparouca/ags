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
        Widget.Box({
          className: 'dashboard', vertical: true,
          setup: self => self.hook(tasks, () => {
            self.children = [
              Widget.Box({
                children: [
                  Widget.Label({ label: tasks.getValue().length.toString(), className: 'todoist-count', justification: 'left' }),
                  Widget.Label({ label: 'Tasks', className: 'todoist-label', justification: 'right' }),
                ],
              }),
              Widget.Separator({
                vertical: false,
              }),
              ...tasks.getValue().map(task => Widget.Label({ label: task, className: 'todoist-tasks' }))
            ]
          })
        }),
      ],
    }),
  })
}

