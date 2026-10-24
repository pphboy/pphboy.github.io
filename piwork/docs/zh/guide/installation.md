# 安装与部署

在生产或开发环境中部署和管理 Piwork 的完整指南。

## 快速链接

- **初次使用 Piwork？** 从[快速开始](/zh/guide/quick-start.html)开始
- **需要最新版本？** 访问[下载](/zh/guide/downloads.html)
- **从源码构建？** 参见[从源码构建](/zh/guide/source-installation.html)

## 部署选项

### 1. Docker Run（推荐用于测试）

最简单的启动方式：

```sh
docker run --detach --init \
    --name piwork-core-quickstart \
    --network host \
    --restart unless-stopped \
    --mount type=bind,src=/var/run/docker.sock,dst=/var/run/docker.sock \
    --volume /var/lib/piwork/core:/var/lib/piwork/core \
    docker.io/pphboy/piwork-core:0.0.10-024c864cb667-99aec1718558
```

[完整快速开始指南](/zh/guide/quick-start.html)

### 2. Docker Compose（推荐用于生产）

用于声明式配置和便捷管理：

**仅 Core 设置：**

```sh
PIWORK_CORE_IMAGE=docker.io/pphboy/piwork-core:0.0.10-024c864cb667-99aec1718558 \
    docker compose -f compose.core.yaml up --detach --wait --wait-timeout 600 core
```

下载：[docker-compose.yml](/piwork/install/0.0.10-024c864cb667-99aec1718558/docker-compose.yml)

**包含可选 CLI：**

下载：[single-host-compose.yml](/piwork/install/0.0.10-024c864cb667-99aec1718558/single-host-compose.yml)

参见[单机部署示例](https://github.com/pphboy/piwork/blob/main/examples/single-host/README.zh-CN.md)

### 3. 原生构建

用于开发或自定义部署：

- [从源码构建](/zh/guide/source-installation.html) - 完整构建说明

## 网络配置

### HTTP 监听器

Piwork Core 运行两个 HTTP 服务：

| 服务 | 默认端口 | 用途 |
|------|---------|------|
| **UI** | `0.0.0.0:17891` | 浏览器访问（工作台、管理、文件、事件、Service 代理）|
| **Core API** | `0.0.0.0:17871` | 内部后端和外部 CLI 访问 |

- **浏览器** 仅连接 UI 端口
- **后端** 使用回环 HTTP 访问 Core API
- **外部 Linux CLI** 直接连接 Core API 端口
- **内部 Agent** 使用 7172 端口的 mTLS（仅容器可达）

### 更改端口

使用命令行标志自定义端口：

```sh
docker run ... docker.io/pphboy/piwork-core:VERSION \
    --ui-port 8080 \
    --core-port 8081
```

### 访问控制

- UI 接受：本机实际 IPv4 地址、localhost、回环和主机名
- 验证：Host、Origin 和 CSRF 令牌
- **每个地址需要单独登录**
- 仅 HTTP（不支持 HTTPS、自定义域名或反向代理）
- 模型端点必须从 Work 网络可达

## Service 代理配置

Piwork 在工作台源下托管用户 Service，路径为 `/services/<workId>/<serviceId>/<port>/`。

### Service 要求

- **必须支持动态 URL 前缀**（不会重写旧的根路径应用）
- **必须可信**（脚本可以访问当前用户的 UI 权限）

### 支持的功能

✅ 服务端登录（响应 Cookie、Basic/Bearer）  
✅ HTTP、SSE、WebSocket  
✅ 响应 Cookie（服务端、按会话和 Service 分区）  
✅ 应用 CSP/X-Frame-Options（保留）

### 限制

❌ 脚本读写 Cookie（document.cookie、Cookie Store）- 不透明  
❌ 通过 HTTP 入口的 Secure Cookie - 不转发  
❌ 同 IP 上跨 Service 的 Cookie 隔离 - 不保证  
❌ 硬编码 `.work` URL、跨站 SSO、上游 HTTPS - 不支持

**解决方案：** 当嵌入被拒绝时，打开应用选项卡。

## 健康检查和就绪检查

进程健康和运行时就绪是分开的：

```sh
# 健康检查（立即可用）
curl --fail http://127.0.0.1:17891/healthz

# 就绪检查（设置完成后就绪）
curl --fail http://127.0.0.1:17891/readyz

# 查看日志
docker logs --tail 100 piwork-core-quickstart
```

## 初始设置

首次启动 Piwork 后：

1. 在浏览器中打开 `http://YOUR_SERVER_IP:17891`
2. 创建管理员账户（浏览器中确认密码）
3. 在 **Admin → Quick setup** 中配置 AI 模型
4. 等待运行时准备完成

**默认设置不需要业务环境变量**。

### 可选测试引导

用于自动化测试，使用配对的环境变量：

```sh
docker run ... \
    -e PIWORK_ADMIN_ACCOUNT=admin \
    -e PIWORK_ADMIN_PASSWORD=your_password \
    docker.io/pphboy/piwork-core:VERSION
```

**注意：** 仅在空安装上初始化第一个管理员。保留现有账户。

## CLI 使用

Linux 客户端连接到远程 Core：

```sh
# 配置 Core 地址
export PIWORK_CORE_URL=http://SERVER_IP:17871

# 登录（交互式输入密码）
piwork-cli login --account ACCOUNT

# 创建 Work
piwork-cli work create --name 'My Work' --wait

# 发送聊天消息
piwork-cli chat WORK_ID --message 'Hello, Piwork!'

# 查看操作详情
piwork-cli operation show OPERATION_ID

# 监视运行进度
piwork-cli run watch WORK_ID RUN_ID --after SEQUENCE
```

文件和包使用本地客户端路径（无交换卷）。

## 生命周期管理

### 停止 Piwork

正常关闭会停止所有受管 Work 并保留状态：

```sh
# Docker run
docker stop --time 60 piwork-core-quickstart

# Docker Compose
docker compose -f docker-compose.yml stop core
```

**关闭时保留：**
- 身份和凭证
- 对话历史
- Work 卷和状态
- 配置

**注意：** 关闭浏览器或 CLI 不会停止 Core 或 Work。

### 启动 Piwork

```sh
# Docker run
docker start piwork-core-quickstart

# Docker Compose
docker compose -f docker-compose.yml up --detach --wait --wait-timeout 600 core
```

### 验证退出状态

```sh
test "$(docker inspect --format '{{.State.ExitCode}}' piwork-core-quickstart)" = 0
```

## 备份和升级

### 备份

1. 正常停止 Core
2. 备份 Core 数据目录：`/var/lib/piwork/core`
3. 备份 Work 卷（如果单独存储）
4. 保留镜像引用和清单以便回滚

**重要：** Work 导出不是安装备份。导出需要停止的 Work；导入创建必须显式启动的停止 Work。

### 升级

1. 停止所有正在运行的 Work
2. 正常停止 Core
3. 进行一致性备份
4. 拉取新镜像：`docker pull docker.io/pphboy/piwork-core:NEW_VERSION`
5. 用新镜像更新容器/compose
6. 启动 Core
7. 验证运行时准备完成

### 回滚

- 保留先前的镜像引用
- 仅使用兼容格式回滚
- 如需要，从备份恢复

**警告：** 不要使用 `docker compose down -v` 或全局清理命令。

## 故障排除

### 端口冲突

如果端口 17891 或 17871 被占用：

```sh
# 检查谁在使用端口
lsof -i :17891
lsof -i :17871

# 停止冲突的安装
docker stop piwork-core-quickstart
```

### 权限错误

Piwork 需要访问 Docker socket：

```sh
# 验证 Docker socket 挂载
docker inspect piwork-core-quickstart | grep docker.sock

# 检查 Docker 守护进程是否运行
systemctl status docker
```

### Work 无法启动

1. 检查 Core 日志：`docker logs piwork-core-quickstart`
2. 验证运行时准备已完成
3. 检查 Admin 中的模型配置
4. 确保模型端点可达

### 数据目录问题

确保 `/var/lib/piwork/core` 可写：

```sh
sudo mkdir -p /var/lib/piwork/core
sudo chown $(id -u):$(id -g) /var/lib/piwork/core
```

## 高级主题

### 凭证和安全

- **Operator 凭证**（管理员）与用户 CLI 凭证分离
- 管理员有控制权限，但不会自动读取用户 Work 内容
- 使用 CLI 进行用户级操作

### 多主机考虑

对于分布式部署：

- Core 必须运行在 Linux x86-64 上
- 浏览器可以从 Linux 或 Windows 连接
- CLI 连接到 Core API 端口（17871）
- 远程浏览器不需要域名、DNS 或 WSL

### 旧版安装

对于旧版本（0.0.1、release.env、模板）：

参见[上游版本化指南](https://github.com/pphboy/piwork/releases)

## 下一步

- [创建第一个 Work](/zh/guide/first-work.html)
- [配置 AI 模型](/zh/guide/ai-models.html)
- [Web 开发指南](/zh/guide/web-development.html)
- [查看产品演示](/zh/demo/product-demo.html)
