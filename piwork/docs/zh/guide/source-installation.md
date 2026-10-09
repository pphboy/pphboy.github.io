# 从源码构建

<!-- docker-source-route -->
默认试用请使用 [Quick Start](/zh/guide/quick-start.html) 的独立 Core/CLI 镜像；Core 可单独使用 Compose。下面仅为开发者的原生源码构建；Docker 发行构建见 [发行维护](https://github.com/pphboy/piwork/blob/main/docs/docker-release.md)，宿主不必安装 Go/Node。
<!-- docker-source-route -->

这条路径使用当前 Piwork 源码，而不是已发布的 Docker 镜像集。命令来自源码项目的 [Core 运维指南](https://github.com/pphboy/piwork/blob/main/docs/operations.md)。

## 前置条件

需要 Linux、当前用户可以访问的本地 Docker Engine、**Go 1.25.5**、**Node.js 24**、npm、Git、Make 和 Bash。产品仓库使用 npm，本文档网站使用 pnpm。

## 构建并启动 Core

在第一个终端中执行：

```bash
git clone https://github.com/pphboy/piwork.git
cd piwork
npm ci
make build
make native-agent-images native-helper-images
export PIWORK_DATA_DIR="$PWD/.piwork-go-core"
export PIWORK_PACKAGE_HELPER_IMAGE=piwork-agentd:go-migration-production
export PIWORK_FILE_HELPER_IMAGE=piwork-file-helper:go-migration-acceptance
export PIWORK_SNAPSHOT_HELPER_IMAGE=piwork-snapshot-helper:go-migration-acceptance
./dist/go/piwork-serve serve --data-dir "$PIWORK_DATA_DIR" --listen 127.0.0.1:7171
```

使用新的数据目录。上述镜像标签就是构建目标实际生成的名称。保持该终端运行。

## 初始化

在第二个终端中进入同一个仓库目录：

```bash
export PIWORK_DATA_DIR="$PWD/.piwork-go-core"
export PIWORK_CORE_URL=http://127.0.0.1:7171
./dist/go/piwork-serve --core "$PIWORK_CORE_URL" --data-dir "$PIWORK_DATA_DIR" \
  admin bootstrap --account admin
read -r -p 'Model provider: ' PIWORK_MODEL_PROVIDER
read -r -p 'Model ID: ' PIWORK_MODEL_ID
./dist/go/piwork-serve --core "$PIWORK_CORE_URL" --data-dir "$PIWORK_DATA_DIR" \
  config set --agent-image piwork-agentd:go-migration-production \
  --model-provider "$PIWORK_MODEL_PROVIDER" --model "$PIWORK_MODEL_ID"
./dist/go/piwork-serve --core "$PIWORK_CORE_URL" --data-dir "$PIWORK_DATA_DIR" status
```

Bootstrap 会提示输入管理员密码，`config set` 会提示输入模型 API Key。自定义模型服务地址还需通过 `--model-base-url` 提供实际 HTTPS URL。

等待 Core 就绪，再在第二个终端使用原生 CLI 登录、创建 Work 并收到回复。CLI 不需要启动浏览器：

```sh
./dist/go/piwork-cli --core "$PIWORK_CORE_URL" login --account admin
./dist/go/piwork-cli work create --name 'My Work' --wait
```

使用创建结果中的实际 `workId`：

```sh
./dist/go/piwork-cli chat WORK_ID --message 'Hello, Piwork!'
```

创建 Work 自动启动；更多终端命令见[第一个 Work](/zh/guide/first-work)。Desktop 仍是另一个可选用户入口。
