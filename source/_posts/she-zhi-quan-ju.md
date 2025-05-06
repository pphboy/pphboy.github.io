---
title: axios设置全局headers
date: 2021-01-28 12:00:00
---

* 需求：每次请求的时候都设置token为headers非常不方便
* axios提供配置全局headers
* 这里我主要使用的是加 一个token验证

Global axios defaults
axios.defaults.baseURL = 'https://api.example.com';

// Important:如果axios与多个域一起使用，那么AUTH_TOKEN将被发送给所有域。
//下面是一个使用自定义实例默认值的例子。
axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;

// 下面应该是对应协议而配置的全局header
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

**下面是我的main.js**
```
import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import axios from 'axios';
import main from '/@/components/main';

import Antd from "ant-design-vue";
import "ant-design-vue/dist/antd.css";
import { Form } from 'ant-design-vue';

import Header from "./components/common/Header.vue";
import Footer from "./components/common/Footer.vue";

import {setupGlobalMethods} from "./utils/globalMethod";

const Vue = createApp(App);

axios.defaults.headers.common['token'] = main.local.get("piyu").token;

document.title = "皮鱼_开发版";

Vue.use(router)
  .use(store)
  .use(Antd)
  .use(Form)
	//下面是组件
	.component("Footers", Footer)
	.component("Headers", Header)
	// 挂载的element
  .mount("#app");

// 设置 全局 属性
setupGlobalMethods(Vue);
```