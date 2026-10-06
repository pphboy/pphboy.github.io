# 快速开始

你需要已配置并就绪的 Core。如果尚未安装，先阅读[安装](/zh/guide/installation)。在客户端电脑上，进入保存安装文件的目录运行以下命令。

## 在 Linux 启动 Desktop

```bash
cp client.env.example client.env
chmod 600 client.env
```

Core 在本机时，保留 `PIWORK_CORE_URL=http://host.docker.internal:7171`。连接远程 Core 时，将其替换成可访问的 HTTP 或 HTTPS origin。

```bash
docker compose --env-file release.env --env-file client.env \
  -f compose.cli.yaml -f compose.cli.linux.yaml pull cli
docker compose --env-file release.env --env-file client.env \
  -f compose.cli.yaml -f compose.cli.linux.yaml \
  up -d --wait --wait-timeout 60 cli
docker compose --env-file release.env --env-file client.env \
  -f compose.cli.yaml exec -T cli piwork-cli desktop open --no-open
```

Linux 专用配置添加了访问本机 Core 所需的 host gateway。后续 `exec` 命令直接操作已运行的容器，无需再次添加该配置。

## 在 Windows 启动 Desktop

使用 Docker Desktop 的 Linux 容器模式。将[安装文件](/zh/guide/installation#下载安装文件)下载到新目录；可以在 WSL 中运行下载命令，也可以通过浏览器逐个保存。在 PowerShell 中执行：

```powershell
Copy-Item .\client.env.example .\client.env
notepad .\client.env
```

将 `PIWORK_CORE_URL` 设置为 **Linux Core 主机**可访问的 origin。当前支持的部署方式不在 Windows Docker Desktop 中运行 Core。

```powershell
docker compose --env-file release.env --env-file client.env -f compose.cli.yaml pull cli
docker compose --env-file release.env --env-file client.env -f compose.cli.yaml up -d --wait --wait-timeout 60 cli
docker compose --env-file release.env --env-file client.env -f compose.cli.yaml exec -T cli piwork-cli desktop open --no-open
```

Windows 不要添加 `compose.cli.linux.yaml`。

## 打开界面

将 **`desktop open` 输出的完整 URL** 粘贴到同一台电脑的浏览器中。链接包含一次性本地授权票据，五分钟后过期。第一次授权不能用裸 `http://localhost:17891` 地址替代。

填写可访问的 Core URL、账号和密码。新安装使用 `core.env` 中设置的管理员账号。CLI 保存 Core 凭据，浏览器使用本地 Desktop 会话。

需要新链接时，再次运行：

```bash
docker compose --env-file release.env --env-file client.env \
  -f compose.cli.yaml exec -T cli piwork-cli desktop open --no-open
```

重启或重建 CLI 容器后，需要获取新链接；旧的本地浏览器会话不再有效。

## 创建或导入 Work

在 Desktop 中选择 **New Work**，输入名称，点击 **Create Work** 并等待完成。打开该 Work，选择 **Start Work**。**Chat** 用于操作 Harness，**Service** 用于应用，**Files** 用于工作空间文件。这些是当前产品界面的实际英文按钮名称。

如果已有别人分享的 `.work` 文件，使用导入流程。等待完成后打开新的 Work，再手动启动。目标 Core 需要事先配置兼容的模型和凭据。

继续阅读[第一个 Work](/zh/guide/first-work)。
