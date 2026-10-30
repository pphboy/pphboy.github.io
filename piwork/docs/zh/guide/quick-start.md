---
title: 快速开始
description: 下载、启动、完成首次设置，打开你的第一个 Work。
---

# 快速开始

**下载 → 一键启动 → 首次设置 → 打开 Work。** 按照这条路径，开始使用本地的 Piwork。

<LauncherVersion />

## 1. 下载并打开

前往[下载页](/zh/guide/downloads.html)，选择 Windows 或 Linux 版本，然后打开下载的桌面启动器。

- **Windows**：双击下载的 `.exe` 文件。
- **Linux**：在文件属性中允许作为程序执行，然后打开文件。

保留默认数据目录即可。以后再次打开启动器，会继续使用这套安装及其数据。

<WorkShot src="/screenshots/product/launcher-start.png" :width="800" :height="600" alt="真实桌面启动器中的 Start Piwork 按钮和默认数据目录" caption="打开启动器后，点击 Start Piwork。界面语言可在 More 中切换。" />

## 2. 启动 Piwork

点击 **Start Piwork（启动 Piwork）**。启动器会显示检查环境、启动运行环境和等待网页就绪的进度。

等待 **Open Piwork（打开 Piwork）** 可用，再点击它打开工作台网页。首次启动的等待时间取决于本机环境；启动过程中保留窗口。

## 3. 完成首次设置

首次进入网页时，按页面提示：

1. **创建管理员**：填写账号、密码及确认密码，然后正常登录。
2. **配置 AI 模型**：在 **Quick setup** 中填写自己的 API Key；展开 **Advanced settings** 可设置模型 ID、API 类型和 Base URL。已有模型也可直接选用。
3. 点击 **Save and continue**，等待页面显示所需组件均为 **Ready**，再点击 **Open workbench**。

一键启动负责打开运行环境。首次使用仍需完成账号和模型设置；模型凭据由你自行提供。

<WorkShot src="/screenshots/product/first-setup.png" :width="952" :height="820" alt="真实 Piwork 首次管理员创建页面，账号与密码输入框为空" caption="在 Piwork 网页中完成首次设置。账号和模型配置会在同一安装中保留。" />

## 4. 打开第一个 Work

进入工作台后，点击 **New Work**，为工作空间命名，等待就绪后打开 **Chat**。试着描述你想做的工具：

> 帮我做一个内容工作室，整理播客、视频和写作灵感。需要分类、搜索和详情页。

在对话中查看执行进度。应用准备好后，打开对应的 **Service** 使用成果；以后还可以在同一个 Work 中继续提出修改。

<WorkShot src="/screenshots/product/work-open.png" alt="已打开的内容工作室 Work，包含可使用的灵感库" caption="产品演示中的内容工作室：一个 Work，保存应用、内容和持续改进的过程。" />

接下来，按[第一个 Work](/zh/guide/first-work.html)了解文件、应用、继续修改和整体迁移。

## 系统要求与启动帮助

<details>
<summary>下载前需要准备什么？</summary>

- Windows 11 x86-64：开启固件虚拟化和 **Windows Hypervisor Platform**，安装 WebView2 Runtime；按系统要求重启。
- Linux x86-64：当前用户可以读写 `/dev/kvm`，已安装 GTK 3、WebKitGTK 4.1 和系统浏览器启动工具。
- 默认运行环境使用 2 vCPU、4 GiB 内存。安装目录至少有 4 GiB 空间，另留 1 GiB 解包空间。
- 准备自己 AI 提供商的模型信息和凭据，网络需能访问对应模型服务。

</details>

<details>
<summary>启动失败或一直没有就绪怎么办？</summary>

保留启动器窗口，查看当前阶段和运行日志。先核对上面的系统要求；如果日志提示端口占用，正常关闭冲突的 Piwork 实例后重试。问题持续时，通过启动器的日志导出功能保存日志，向[社区反馈](https://github.com/pphboy/piwork-microvm/issues)，不要附带密码或 API Key。

</details>

<details>
<summary>下次怎么继续？如何退出？</summary>

再次打开同一个启动器及数据目录，点击启动即可继续。关闭浏览器不会停止 Work。结束本次使用时，从启动器选择停止，或关闭窗口并确认正常关闭，等待收尾完成；保留安装数据供下次使用。

</details>
