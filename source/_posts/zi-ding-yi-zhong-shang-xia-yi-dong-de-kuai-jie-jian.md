---
title: VSCode 自定义 “Go to File”workbench.action.quickOpenNavigateNextInFilePicker 中上下移动的快捷键
date: 2023-12-06 10:01:00
---

![image](https://img2023.cnblogs.com/blog/2146100/202312/2146100-20231206095729596-1556676496.png)

默认情况下，是使用 Ctrl+p 也只能向下进行选择，如果用  down 或者 up

手则需要离开主键盘区域，非常的不方便。

放到vscode配置快捷键的json文件中

```
    {
        "key": "ctrl+n",
        "command": "closeFindWidget",
        "when": "editorFocus && findWidgetVisible"
    },
    {
        "key": "ctrl+n",
        "command": "workbench.action.quickOpenNavigateNext",
        "when": "inQuickOpen"
    },
    {
        "key": "ctrl+n",
        "command": "closeFindWidget",
        "when": "editorFocus && findWidgetVisible"
    },
    {
        "key": "ctrl+n",
        "command": "selectNextQuickFix",
        "when": "editorFocus && quickFixWidgetVisible"
    },
    {
        "key": "ctrl+n",
        "command": "selectNextSuggestion",
        "when": "editorTextFocus && suggestWidgetVisible"
    },
    {
        "key": "ctrl+n",
        "command": "showNextParameterHint",
        "when": "editorTextFocus && parameterHintsVisible"
    },
    {
        "key": "ctrl+p",
        "command": "-workbench.action.quickOpen"
    },
    {
        "key": "ctrl+p",
        "command": "workbench.action.quickOpenNavigatePrevious",
        "when": "inQuickOpen"
    },
    {
        "key": "ctrl+p",
        "command": "selectPrevQuickFix",
        "when": "editorFocus && quickFixWidgetVisible"
    },
    {
        "key": "ctrl+p",
        "command": "selectPrevSuggestion",
        "when": "editorTextFocus && suggestWidgetVisible"
    },
    {
       "key": "ctrl+p",
        "command": "showPrevParameterHint",
        "when": "editorTextFocus && parameterHintsVisible"
    },
```