# Work 规范

## 当前行为

Work 拥有配置、私有对话历史、共享工作空间、Service 定义和捕获的执行上下文。Core 控制生命周期和隔离。

导出要求 Work **已停止**。导入会验证归档及目标要求，发布新的**已停止 Work**，并分配新的 Work、Service、卷、网络、证书和控制身份。接收方需要显式启动。

修改期望配置不会立即替换当前运行上下文。待生效设置需要显式 Apply。导入保留当前和期望配置，不会自动应用待生效变更。

## 当前格式：`.work` v1

MIME 类型为 `application/vnd.piwork.work-package`，快照类型为 `cold-full`。

| 字节内容 | 含义 |
| --- | --- |
| 八字节 `PIWORK1\n` | 格式标识。 |
| 无符号 64 位大端整数 | UTF-8 JSON manifest 的长度。 |
| Manifest JSON | 严格的格式、版本、兼容性、引用和 blob 元数据。 |
| 顺序排列的原始 blobs | 各 blob 声明的字节长度和 SHA-256 摘要。 |

没有 blob 头、压缩或尾随字节。Manifest 由 Core 生成，不需要用户手写。归档按不可变摘要包含固定镜像内容。

持久内容包括 `agent-private` 和 `workspace` 卷目录树、Work 上下文、`AGENTS.md`、Skills、准备好的 Pi Package 产物、Service / 配置修订和保留历史。导入会重新映射逻辑引用，同时保留原始用户文件和 SDK 历史字节。

## 可携带边界

- 不包含活进程、容器临时层、匿名卷、tmpfs 和外部服务。
- 不包含平台模型 API Key、用户 token、实例证书和全局目录。
- 包含文件及历史中的用户密钥，因为用户内容不会被过滤。
- 目标 Core 需要启用匹配模型、可读取的凭据、兼容平台和镜像，以及足够配额。
- 离线检查验证完整性和结构，不代表接收方兼容，也不代表内嵌代码可信。

V1 依赖 Linux 和具体协议 / 布局。当前限制为 100 GiB 包字节、100 GiB 逻辑恢复大小和一百万个目录树条目。不支持的特殊文件、用户 xattrs、ACL 或 capabilities 会导致导出失败。主机分配的 `security.selinux` 标签不导出，恢复时使用目标主机标签。

## 实验性和未来方向

当前可携带格式为版本 1，不是通用主机备份或跨平台进程检查点。更广泛的可携带性是未来方向，不属于当前格式保证。

完整 manifest、目录树编码、历史验证和限制，见权威来源：[Work 包格式](https://github.com/pphboy/piwork/blob/main/docs/work-package-format.md)、[portable-work 规范](https://github.com/pphboy/piwork/blob/main/openspec/specs/portable-work/spec.md)和[快照指南](https://github.com/pphboy/piwork/blob/main/docs/work-snapshot.md)。
