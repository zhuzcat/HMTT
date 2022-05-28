import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import "amfe-flexible";
import "highlight.js/styles/default.css";
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
  Search,
  Image,
  ActionBar,
  ActionBarIcon,
  Empty,
  Picker,
  ShareSheet,
  DatetimePicker,
  Lazyload,
} from "vant";

import router from "@/routes";
// 自动聚焦的插件
import autoFocus from "@/plugin/autoFocus";
// 高亮代码的插件
import highlight from "@/plugin/highlight";

const app = createApp(App);
app.use(createPinia());
app.use(autoFocus);
app.use(highlight);
app.use(Lazyload);
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
app.use(Search);
app.use(Image);
app.use(ActionBar);
app.use(ActionBarIcon);
app.use(Empty);
app.use(ShareSheet);
app.use(Picker);
app.use(DatetimePicker);
app.use(router).mount("#app");
