import { Button, Swipe, SwipeItem, Popup, Form, Field, CellGroup } from "vant";
let plugins = { Button, Swipe, SwipeItem, Popup, Form, Field, CellGroup };

export default function useplugins(app) {
  for (let plugin in plugins) {
    app.use(plugin);
  }
}
