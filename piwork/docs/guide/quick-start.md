---
title: Quick Start
description: Download, start, complete first-time setup, and open your first Work.
---

# Quick Start

**Download → Start → Set up → Open a Work.** Follow this one path to run Piwork on your computer.

<LauncherVersion />

## 1. Download and open

Visit [Downloads](/guide/downloads.html), choose Windows or Linux, and open the downloaded desktop launcher.

- **Windows:** double-click the downloaded `.exe` file.
- **Linux:** allow the file to run as a program in its file properties, then open it.

Keep the default data directory. The launcher will reuse this installation and its data the next time you open it.

<WorkShot src="/screenshots/product/launcher-start.png" :width="800" :height="600" alt="The real desktop launcher with its Start Piwork button and data directory" caption="Open the launcher and click Start Piwork. You can change the language under More." />

## 2. Start Piwork

Click **Start Piwork**. The launcher shows progress as it checks your computer, starts the runtime, and waits for the web interface.

When **Open Piwork** becomes available, click it to open Piwork in your browser. Initial startup time depends on your computer; keep the launcher window open while it starts.

## 3. Complete first-time setup

On your first visit, follow the steps in Piwork:

1. **Create an administrator:** enter the account, password, and password confirmation, then sign in.
2. **Configure an AI model:** in **Quick setup**, enter your own API Key. Open **Advanced settings** to set the model ID, API type, and Base URL, or select a saved model.
3. Select **Save and continue**, wait for the required components to show **Ready**, then select **Open workbench**.

One-click launch starts the environment. Your first visit still includes account and model setup; you supply your own model credentials.

<WorkShot src="/screenshots/product/first-setup.png" :width="952" :height="820" alt="The real administrator setup page, with empty account and password fields" caption="Complete initial setup in Piwork. Your account and model configuration are retained in this installation." />

## 4. Open your first Work

In the workbench, select **New Work**, give it a name, and wait for it to be ready. Open **Chat** and describe a tool you want to make:

> Build me a content studio for my podcast, video, and writing ideas, with categories, search, and a detail view.

Follow progress in the conversation. When the app is ready, open its **Service** and use it. Keep making changes through the same Work.

<WorkShot src="/screenshots/product/work-open.png" alt="An open Creative Studio Work with a usable idea library" caption="The content studio from the product demo: one Work keeps the app, its content, and the conversation behind it." />

Next, read [Your first Work](/guide/first-work.html) for files, apps, ongoing changes, and moving your workspace.

## System requirements and help

<details>
<summary>What does my computer need?</summary>

- Windows 11 x86-64: enable firmware virtualization and **Windows Hypervisor Platform**, and install WebView2 Runtime. Restart when required by Windows.
- Linux x86-64: read/write access to `/dev/kvm`, GTK 3, WebKitGTK 4.1, and a system browser launcher.
- Defaults are 2 vCPU and 4 GiB RAM. Allow at least 4 GiB free in the installation directory plus 1 GiB for resource extraction.
- Have your AI provider’s model details and credentials ready. The runtime must be able to reach the model endpoint.

</details>

<details>
<summary>What if startup fails or never becomes ready?</summary>

Keep the launcher open and check the current stage and run logs. Check the requirements above first. If the logs report a port conflict, stop the conflicting Piwork instance normally before retrying. For a persistent problem, use the launcher’s log export and [report the issue](https://github.com/pphboy/piwork-microvm/issues). Do not include passwords or API keys.

</details>

<details>
<summary>How do I continue next time, or quit?</summary>

Open the same launcher with the same data directory and click Start to continue. Closing the browser does not stop your Work. When you finish, stop Piwork in the launcher, or close its window and confirm a normal shutdown. Wait for shutdown to finish, and keep the installation data for next time.

</details>
