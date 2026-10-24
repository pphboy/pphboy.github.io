# 下载

获取最新版本的 Piwork 或浏览以前的版本。

## 最新版本：0.0.10

发布时间：2024 年 10 月

### Docker 镜像（推荐）

**Piwork Core** - 一体化工作台、管理和设置

```sh
docker pull docker.io/pphboy/piwork-core:0.0.10-024c864cb667-99aec1718558
```

**快速启动：**

```sh
docker run --detach --init \
    --name piwork-core-quickstart \
    --network host \
    --restart unless-stopped \
    --mount type=bind,src=/var/run/docker.sock,dst=/var/run/docker.sock \
    --volume /var/lib/piwork/core:/var/lib/piwork/core \
    docker.io/pphboy/piwork-core:0.0.10-024c864cb667-99aec1718558
```

然后在浏览器中打开 `http://YOUR_SERVER_IP:17891`。

[查看完整快速开始指南](/zh/guide/quick-start.html)

### 配置文件

用于声明式部署：

- [docker-compose.yml](/piwork/install/0.0.10-024c864cb667-99aec1718558/docker-compose.yml) - 仅 Core 设置
- [single-host-compose.yml](/piwork/install/0.0.10-024c864cb667-99aec1718558/single-host-compose.yml) - 包含可选 CLI

### 原生构建

用于开发或自定义部署：

- [从源码构建](/zh/guide/source-installation.html) - 完整构建说明
- Linux CLI (amd64) - 包含在 Core 镜像中，或单独构建

### 发行信息

- [发行说明](https://github.com/pphboy/piwork/releases/tag/v0.0.10)
- [所有发行版本](https://github.com/pphboy/piwork/releases)
- [变更日志](https://github.com/pphboy/piwork/blob/main/CHANGELOG.md)

## 系统要求

下载前，请确保您的系统满足以下要求：

| 要求 | 规格 |
|------|------|
| **操作系统** | Linux x86-64 |
| **容器运行时** | Docker Engine 28+（rootful 模式）|
| **端口** | 17891（UI）、17871（Core API）|
| **内存** | 最少 2GB，推荐 4GB+ |
| **存储** | 10GB+ 用于镜像和工作空间 |

## 历史版本

| 版本 | 发布日期 | Docker 镜像 | 说明 |
|------|----------|-------------|------|
| 0.0.10 | 2024 年 10 月 | `pphboy/piwork-core:0.0.10-024c864cb667-99aec1718558` | 最新稳定版 |
| 0.0.9 | 2024 年 10 月 | `pphboy/piwork-core:0.0.9-...` | [说明](https://github.com/pphboy/piwork/releases/tag/v0.0.9) |

[在 GitHub 上查看所有版本](https://github.com/pphboy/piwork/releases)

## 验证

所有发布的镜像都经过验证和匿名测试。镜像摘要记录在发行说明中，用于供应链验证。

验证您的下载：

```sh
docker inspect docker.io/pphboy/piwork-core:0.0.10-024c864cb667-99aec1718558 | grep Digest
```

## 升级

版本之间的升级需要：

1. 停止所有正在运行的 Work
2. 拉取新镜像
3. 重启 Core 容器
4. 验证运行时准备完成

详细升级过程请参阅[安装指南](/zh/guide/installation.html)。

## 需要帮助？

- [快速开始指南](/zh/guide/quick-start.html) - 5 分钟内开始使用
- [安装指南](/zh/guide/installation.html) - 详细部署说明
- [GitHub Discussions](https://github.com/pphboy/piwork/discussions) - 社区支持
- [报告问题](https://github.com/pphboy/piwork/issues) - Bug 报告和功能请求
