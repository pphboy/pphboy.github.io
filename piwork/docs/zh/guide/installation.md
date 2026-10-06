# 安装

本指南通过 Docker 运行 Piwork。安装文件使用已公开的 `0.1.0` 候选镜像，并用摘要固定版本。Core 会自动准备 Agent 和辅助镜像。这条安装路径不需要 Go、Node.js 或 npm。

## 前置条件

- Linux x86-64 主机，**Docker Engine 28+**、本地 rootful Engine，以及 **Docker Compose 2.24+**。
- 可以访问 `/var/run/docker.sock`，并有权限创建 Core 数据目录。
- Core 主机上的 `7171`、`7172` 端口可用；Desktop 使用本机 `17891` 端口。
- 可以访问 Docker Hub 和模型服务，有可用的模型 ID 和 API Key。
- 与 CLI / Desktop 容器在同一台电脑上的现代浏览器。

```bash
docker version
docker compose version
```

提供的 Core 配置使用 Linux host 网络和 Docker socket，适合可信主机。`7171` 是需要身份验证的 HTTP 入口；远程连接使用可信局域网或已有的 HTTPS 入口。`7172` 用于经过身份验证的 Work 到 Core 通信，需要能从 Work 的 Docker bridge 网络访问。

## 下载安装文件

在 Linux Core 主机的新目录中运行以下命令。如果 Core 与 Desktop 分别运行在不同电脑上，也在客户端下载同一组文件。

```bash
mkdir piwork-docker
cd piwork-docker
(
  set -eu
  for file in release.env compose.core.yaml compose.cli.yaml \
    compose.cli.linux.yaml core.env.example client.env.example README.txt SHA256SUMS; do
    curl --fail --location --remote-name \
      "https://pphboy.github.io/piwork/install/0.1.0/$file"
  done
  sha256sum --check SHA256SUMS
)
```

单独下载：<a href="/piwork/install/0.1.0/release.env" download>镜像引用</a>、<a href="/piwork/install/0.1.0/compose.core.yaml" download>Core Compose</a>、<a href="/piwork/install/0.1.0/compose.cli.yaml" download>CLI Compose</a>、<a href="/piwork/install/0.1.0/compose.cli.linux.yaml" download>Linux 客户端配置</a>、<a href="/piwork/install/0.1.0/core.env.example" download>Core 环境变量</a>、<a href="/piwork/install/0.1.0/client.env.example" download>客户端环境变量</a>、<a href="/piwork/install/0.1.0/README.txt" download>来源记录</a>和<a href="/piwork/install/0.1.0/SHA256SUMS" download>校验值</a>。

这些是安装配置文件，不包含离线镜像。核对时 GitHub Releases 尚无可下载的产品发布包，这条路径使用已发布的 Docker 镜像。需要源码版本时，参见[从源码构建](/zh/guide/source-installation)。

## 配置 Core

```bash
cp core.env.example core.env
chmod 600 core.env
```

用编辑器打开 `core.env`，填写以下五项：

| 变量 | 需要填写的值 |
| --- | --- |
| `PIWORK_ADMIN_ACCOUNT` | 第一个管理员账号。 |
| `PIWORK_ADMIN_PASSWORD` | 该账号的密码。 |
| `PIWORK_MODEL_PROVIDER` | Pi SDK 配置支持的模型服务商，例如 `anthropic`。 |
| `PIWORK_MODEL` | 服务商实际提供的可用模型 ID。 |
| `PIWORK_API_KEY` | 模型服务的 API Key。 |

在 Compose 环境变量文件中，用单引号包裹密钥，使 `$` 保持字面含义。不要执行或 `source` 该文件。使用 SDK 默认地址时不填写可选模型地址；自定义远程地址必须使用 HTTPS，且 Work 网络能够访问。

第一次安装保留 `PIWORK_DATA_DIR=/var/lib/piwork/core`。Core 数据目录在容器内外必须挂载到**相同的绝对路径**。

```bash
sudo install -d -m 0700 -o 0 -g 0 /var/lib/piwork/core
sudo install -d -m 0700 -o 0 -g 0 /var/lib/piwork/core-exchange
test -S /var/run/docker.sock
```

如果主机启用了 SELinux，还需先完成源码项目的 [SELinux 配置](https://github.com/pphboy/piwork/blob/main/docs/selinux.md)。

## 启动 Core

```bash
docker compose --env-file release.env --env-file core.env \
  -f compose.core.yaml pull core
docker compose --env-file release.env --env-file core.env \
  -f compose.core.yaml up -d --wait --wait-timeout 600 core
docker compose --env-file release.env --env-file core.env \
  -f compose.core.yaml exec -T core piwork-serve --json status
```

首次启动会拉取并验证依赖。Core 进程健康不等于 Work 已可运行；Compose 健康检查会等待 Docker 交付就绪，包括文件和快照辅助镜像。

如果启动超时，查看准备状态和日志，修复报告的配置或网络问题，再次运行同一条 `up` 命令：

```bash
docker compose --env-file release.env --env-file core.env \
  -f compose.core.yaml logs --tail 100 core
```

初始化值只补充缺失配置。修改 `core.env` 不会替换 Core 已保存的管理员或模型配置；后续变更使用已有的运维命令，参见[上游 Docker 运维指南](https://github.com/pphboy/piwork/blob/main/deploy/docker/README.zh-CN.md)。

继续阅读[快速开始](/zh/guide/quick-start)，打开 Desktop。
