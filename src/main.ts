import { createApp } from "vue";
import App from "./App.vue";
import "amfe-flexible";
import {
  NavBar,
  ConfigProvider,
  Form,
  Field,
  CellGroup,
  Button,
  Tabbar,
  TabbarItem,
  Icon,
  Tab,
  Tabs,
  Cell,
  List,
  PullRefresh,
  ActionSheet,
  Popup,
  Badge,
} from "vant";

import router from "@/routes";

const app = createApp(App);
app.use(Tabbar);
app.use(TabbarItem);
app.use(NavBar);
app.use(ConfigProvider);
app.use(Form);
app.use(Field);
app.use(CellGroup);
app.use(Button);
app.use(Icon);
app.use(Tab);
app.use(Tabs);
app.use(Cell);
app.use(List);
app.use(ActionSheet);
app.use(PullRefresh);
app.use(Popup);
app.use(Badge);
app.use(router).mount("#app");
