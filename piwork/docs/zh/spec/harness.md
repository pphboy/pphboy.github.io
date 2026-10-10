# Harness 规范

## 当前执行层

Harness 位于 `apps/agentd`，运行在各 Work 的 Agent 容器中。它使用 Pi Agent SDK 进行模型调用、工具执行、资源加载、Sessions、Runs 和 SDK 历史管理。Core 仍负责生命周期与授权。

`AGENTS.md`、选中的 Skills 和 Pi Packages 构成 Work 自有上下文。运行中的 Harness 加载已捕获的当前配置。编辑产生期望状态，显式 Apply 才会改变加载内容。源码编辑不会热更新当前 Run。

每个 Work 同时只有一个活跃 Run。模型执行发生在 Agent 中；浏览器和 CLI 不代理模型调用。Core 提供的模型凭据保持私有，不进入 `.work` 包。

## 当前上下文和历史

| 资源 | 职责 |
| --- | --- |
| `AGENTS.md` | Work 专属指令。 |
| Skills | 选中的指令资源。 |
| Pi Packages | 准备好的扩展、工具、提示词、主题及其他 SDK 资源。 |
| Sessions 和 Runs | 对话、执行记录和原始 SDK 历史。 |
| 当前 / 期望上下文 | 已加载配置与待生效修改。 |

Core 在激活前验证包兼容性。当前可携带包保留已准备的产物和依赖；导入不会重新运行 npm、Git 或包代码来重建它们。

## 实验性：`piwork-brain`

默认 brain 是普通 Pi 扩展包。Core 只初始化一次；后续启动不会重置管理员的修改。新 Work 默认选择它，除非配置明确不选包。

已实现流程有四个边界：

1. **观察并操作：** Harness 读取 Service 能力契约、观察状态、记录稳定的 Action 身份，并发送已声明输入和期望状态版本。
2. **验证：** 成功描述或 Run 结束不足以证明完成。同步修改需要实际观察；异步任务保留原始 Action / Job 引用，供后续验证。
3. **保留经验：** 候选规则只有在关联任务验证成功后，才成为有效经验版本。活跃 Run 保持已采用的版本；下一次执行可以采用新版本。
4. **准备并 Apply：** 可编辑的 brain 源码可以被捕获和准备为候选包。用户显式 Apply 后，还需要相应行为检查。准备完成或加载成功本身，不证明修改有效。

Work 就绪且没有活跃 Run 时，Service 事件可以请求有边界的自动执行。请求、取消、重试和恢复都有稳定身份及期限。重启不会重放结果不明的修改。

导出保留这些持久历史。导入的事件和请求仅作为历史，不能调度或重放来源实例上的副作用。

## 默认开发与实际采用

当前 Brain 为新 Web 应用默认选择固定 Web base，以及匹配的 FastAPI + React + TypeScript + Vite 模板。共享初始化入口在写入 Spec、源码、锁文件或注册信息前拒绝已有目标，后续维护读取并修改现有应用。

应用交付包括必要 checks/build、Service 更新或重启、原 Operation 观察，以及实际加载代码和业务行为验证。模板版本组合源码/锁文件与不可变镜像环境身份。页面仅采用就绪的新前端一次，恢复支持的草稿/路径并重读后端数据，不增加被动 Run。脑包、包和 Agent 镜像采用仍遵守现有显式 Apply 路径，应用刷新不改变捕获的 context。

Agent 生产与验收镜像均预装 sqlite3 CLI，供策略允许的 bash 使用。仅 Service 有命令或只修改包，不能给捕获旧镜像的 Agent 增加命令。维护位置与支持范围见 [Web 开发](/zh/guide/web-development.html)。

## 模型选择与 Normal

配套 Agent 协商 Chat contract 3，区分已知 SDK Thinking 档位和未知能力。未知模型的 Normal 表示未额外请求 Thinking（null），不能冒充旧 Off；Session、Run 和 Work 包保留原事实。在途 Run 固定模型与凭据，修改目录、轮换 Key 或调整新 Work 默认不改写已经接受的执行。旧 Work 采用新 Agent 需所有者显式 Apply，见 [AI 模型](/zh/guide/ai-models.html)。

## 未来方向

Harness 越来越适合特定 Work 和用户，是产品方向。当前系统不保证无限制自主学习、不可见的自动升级，也不保证所有应用都有结构化能力接口。

权威来源：[brain 工作流程](https://github.com/pphboy/piwork/blob/main/docs/piwork-brain.md)、[brain 规范](https://github.com/pphboy/piwork/blob/main/openspec/specs/piwork-brain/spec.md)、[agent-conversation 规范](https://github.com/pphboy/piwork/blob/main/openspec/specs/agent-conversation/spec.md)和[包激活规范](https://github.com/pphboy/piwork/blob/main/openspec/specs/pi-package-activation/spec.md)。
