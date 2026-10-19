# 第一个 Work

先按 [Quick Start](/zh/guide/quick-start.html) 启动并完成网页引导。点击 **Open workbench**，选择 **New Work**，创建后在 Chat 发送消息。Files 管理工作区，Settings 保存并显式 Apply 配置，Service 可预览或独立打开。关闭网页不停止 Work。

Service 响应 Cookie 保存在服务端分区；依赖脚本读取/写入 Cookie 的应用不保证透明兼容。脚本写入的浏览器 Cookie 可能在同 IP 的 Service 间串用，不会被代理采用。详情见安装说明。

## 创建并使用

1. 在 Quick setup 选择或添加模型，点击 **Save and continue**。模型保存、Runtime 绑定和依赖准备分别反馈；Test 可选，不会自动发起模型请求。
2. 准备页显示正在等待的实际组件。只有全部依赖 Ready 时，完成区 **Open workbench** 才可用；等待期间也可通过 Admin 顶栏返回工作台。
3. 在工作台选择 **New Work**，填写名称并创建；等待 Work ready 后打开，在 Chat 中发送目标任务。
4. 使用 Files 查看或编辑工作区文件，通过 Service 入口查看应用。修改默认模型只影响后续新 Work，已有 Work 的配置需要所有者显式保存并 Apply。

## 分享与继续

先停止 Work，再从其操作菜单导出 `.work` 包。在另一套安装导入后，Work 保持 stopped；检查目标模型与环境后显式 **Start**。导入不重放历史，关闭浏览器也不会停止运行中的 Work。
