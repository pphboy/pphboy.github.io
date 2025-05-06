---
title: Vue3+typescript如何给元素添加一个Ctrl+s的事件，用于保存文件？
date: 2023-04-28 11:30:00
---

如下代码，建议用这个，e.keyCode 已经过时，后面都是用 e.key:string.

```
onMounted(() => {
  window.addEventListener('keydown', (e) => {
    if (e.ctrlKey && e.key === 's') {  // 检查是否按下了 Ctrl + S
      e.preventDefault();  // 阻止默认行为（保存网页）
      console.log(editDocumentVisible.value);
      if (editDocumentVisible.value) {
        saveDocument();
      }
    }
  });
});

```