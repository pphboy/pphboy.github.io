# Piwork 官网截图添加方案

## 执行总结

工作流已完成全面分析，识别出 **19 个关键截图位置**，优先级分为三个层次。

### 时间估算
- **P0 核心截图**（Quick Start + First Work）：8-9 小时
- **完整实施**（包含所有优化）：17-19 小时

---

## 📊 优先级分类

### P0 - 高优先级（立即实施）

#### Quick Start 页面（6 个截图）
1. ✅ **browser-initial.png** - 初始浏览器页面（创建管理员或登录）
2. ✅ **admin-creation.png** - 管理员创建表单
3. ✅ **model-config.png** - Admin Quick setup 模型配置页面
4. ✅ **preparation-ready.png** - 准备状态页面（显示 Ready 指示器）
5. ✅ **workbench-entry.png** - 工作台主界面（空状态或 New Work 提示）
6. ⚪ **admin-overview.png** - Admin Overview 页面（中等优先级）

#### Your First Work 页面（6 个截图）
7. ✅ **new-work-button.png** - 工作台界面显示 New Work 按钮/对话框
8. ✅ **work-interface-tabs.png** - Work 界面显示所有选项卡
9. ✅ **chat-interaction.png** - Chat 对话示例
10. ⚪ **files-workspace.png** - Files 选项卡文件浏览器
11. ⚪ **settings-panel.png** - Settings 配置面板
12. ⚪ **service-preview.png** - Service 预览/打开选项

### P1 - 中等优先级

#### 主页（3 个截图）
13. ⚪ **workbench-overview.png** - 带注释的工作台界面（解释 Work、Service、Harness）
14. ⚪ **workflow-visual.png** - 工作流可视化（Create → Run → Evolve...）
15. ⚪ **kanban-example.png** - Kanban 应用在 Piwork Service 中运行

### P2 - 低优先级

#### Installation 页面（4 个截图）
16. ⚪ **admin-panel.png** - Admin 面板完整视图
17. ⚪ **health-check.png** - 终端健康检查输出
18. ⚪ **export-logs.png** - 导出日志界面
19. ⚪ **cli-operations.png** - CLI 操作终端截图

---

## 📁 目录结构（已创建）

```
docs/public/screenshots/
├── quick-start/      # Quick Start 页面截图
├── first-work/       # First Work 教程截图
├── homepage/         # 主页截图
├── installation/     # Installation 页面截图
├── admin/           # 管理界面截图（备用）
├── workbench/       # 工作台截图（备用）
├── setup/           # 设置截图（备用）
└── demo/            # 演示截图（备用）
```

---

## 🎯 立即行动项

### 第 1 步：准备捕获环境

```bash
# 1. 启动干净的 Piwork 安装
docker run --detach --init \
    --name piwork-screenshots \
    --network host \
    --mount type=bind,src=/var/run/docker.sock,dst=/var/run/docker.sock \
    --volume /tmp/piwork-screenshots:/var/lib/piwork/core \
    docker.io/pphboy/piwork-core:0.0.10-024c864cb667-99aec1718558

# 2. 设置浏览器窗口
# - 分辨率：1920×1080 或 1600×900
# - 缩放级别：100%
# - 清除缓存和 cookies
```

### 第 2 步：捕获 P0 截图（按顺序）

#### Quick Start 序列
1. **browser-initial.png**
   - 打开 `http://localhost:17891`
   - 捕获"Create administrator"页面
   - 位置：`docs/public/screenshots/quick-start/browser-initial.png`

2. **admin-creation.png**
   - 填写密码字段（使用占位符文本）
   - 捕获管理员创建表单
   - 位置：`docs/public/screenshots/quick-start/admin-creation.png`

3. **model-config.png**
   - 创建管理员后登录
   - 进入 Admin → Quick setup
   - 显示模型配置表单（Model ID、API Type、Base URL、API Key）
   - 位置：`docs/public/screenshots/quick-start/model-config.png`

4. **preparation-ready.png**
   - 配置模型后点击 Save and continue
   - 等待准备完成，所有组件显示"Ready"
   - 位置：`docs/public/screenshots/quick-start/preparation-ready.png`

5. **workbench-entry.png**
   - 点击"Open workbench"
   - 捕获空工作台或 New Work 提示
   - 位置：`docs/public/screenshots/quick-start/workbench-entry.png`

#### First Work 序列
6. **new-work-button.png**
   - 在工作台中，突出显示"New Work"按钮或对话框
   - 位置：`docs/public/screenshots/first-work/new-work-button.png`

7. **work-interface-tabs.png**
   - 创建并打开一个 Work
   - 捕获显示所有选项卡的界面（Chat、Files、Settings、Service）
   - 位置：`docs/public/screenshots/first-work/work-interface-tabs.png`

8. **chat-interaction.png**
   - 在 Chat 选项卡中发送消息并获得响应
   - 捕获对话示例
   - 位置：`docs/public/screenshots/first-work/chat-interaction.png`

### 第 3 步：优化图片

```bash
# 安装 pngquant（如果尚未安装）
# Ubuntu/Debian: sudo apt install pngquant
# macOS: brew install pngquant

# 批量优化
cd ~/Projects/pphboy.github.io/piwork/docs/public/screenshots
find . -name "*.png" -exec pngquant --quality=65-80 --ext .png --force {} \;

# 验证文件大小（目标 < 200KB）
find . -name "*.png" -exec ls -lh {} \;
```

---

## 💻 Markdown 代码片段

### Quick Start 页面

在 `docs/guide/quick-start.md` 和 `docs/zh/guide/quick-start.md` 中添加：

```markdown
<!-- 在"Start Piwork"部分之后 -->

### Step 1: Access Piwork

Open `http://YOUR_SERVER_IP:17891` in your browser. You'll see the initial setup page:

![Piwork initial browser screen showing Create administrator page](/piwork/screenshots/quick-start/browser-initial.png)

### Step 2: Create Administrator Account

Enter your password and confirmation:

![Administrator creation form with password fields](/piwork/screenshots/quick-start/admin-creation.png)

### Step 3: Configure AI Model

After signing in, configure your model in Quick setup:

![Admin Quick setup page with model configuration form](/piwork/screenshots/quick-start/model-config.png)

The system will save your configuration and prepare the runtime.

### Step 4: Wait for Preparation

All components must show **Ready** status:

![Preparation page showing Ready status for all components](/piwork/screenshots/quick-start/preparation-ready.png)

### Step 5: Open Workbench

Click **Open workbench** to start using Piwork:

![Main workbench interface ready to create your first Work](/piwork/screenshots/quick-start/workbench-entry.png)
```

### First Work 页面

在 `docs/guide/first-work.md` 和 `docs/zh/guide/first-work.md` 中添加：

```markdown
<!-- 在"Step 2: Create a Work"部分 -->

Click **New Work** in the workbench:

![Workbench showing New Work button](/piwork/screenshots/first-work/new-work-button.png)

<!-- 在"Step 3: Start Chatting"之前 -->

Once your Work is ready, you'll see the main interface with all tabs:

![Work interface showing Chat, Files, Settings, and Service tabs](/piwork/screenshots/first-work/work-interface-tabs.png)

<!-- 在"Try These Examples"之后 -->

Here's an example of a chat interaction:

![Chat interface showing a conversation with the AI](/piwork/screenshots/first-work/chat-interaction.png)
```

---

## ✅ 质量检查清单

捕获前：
- [ ] 干净的默认状态（无个人数据）
- [ ] 一致的浏览器窗口大小（1920×1080）
- [ ] 无滚动条（如果可能）
- [ ] 正确的缩放级别（100%）
- [ ] 选择一致的主题（浅色或深色）

捕获后：
- [ ] 优化文件大小（< 200KB）
- [ ] 添加到正确目录
- [ ] 使用正确的命名规范
- [ ] 编写描述性 alt 文本
- [ ] 在桌面和移动视图中测试

文档集成：
- [ ] 在逻辑位置插入截图
- [ ] Alt 文本遵循模式：[显示内容] + [相关上下文]
- [ ] Alt 文本简洁（< 125 字符）
- [ ] 避免冗余短语（"Screenshot of..."）
- [ ] 验证图片路径正确
- [ ] 中英文文档都已更新

---

## 📝 Alt 文本指南

### 良好示例
- ✅ "Piwork initial browser screen showing Create administrator page"
- ✅ "Admin Quick setup page with model configuration form"
- ✅ "Work interface showing Chat, Files, Settings, and Service tabs"
- ✅ "Preparation page showing Ready status for all components"

### 避免
- ❌ "Screenshot of the interface"
- ❌ "Image showing the screen"
- ❌ "Piwork UI"

---

## 🚀 实施步骤总结

1. **立即开始**：捕获 P0 Quick Start 截图（5 个，约 2-3 小时）
2. **第一轮集成**：将 Quick Start 截图添加到文档（1 小时）
3. **验证构建**：`npm run build` 确保无错误
4. **继续 P0**：捕获 First Work 截图（3 个核心，约 2 小时）
5. **第二轮集成**：将 First Work 截图添加到文档（1 小时）
6. **提交 P0**：提交核心截图和文档更新
7. **可选 P1/P2**：根据需要添加主页和 Installation 截图

---

## 📂 相关文件

- 完整指南：`docs/public/screenshots/README.md`
- 占位符说明：`docs/public/screenshots/PLACEHOLDER.md`
- 示例文件：`docs/guide/first-work-with-screenshots.md.example`

---

## 时间线

- **最小可行改进**（P0 only）：8-9 小时
- **完整核心功能**（P0 + P1）：12-13 小时
- **全面实施**（所有截图 + 优化）：17-19 小时

建议分阶段实施，每个阶段都可以独立提交和发布。
