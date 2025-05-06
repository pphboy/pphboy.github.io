---
title: Emacs Client启动方式，在WSL像VIM一样操作
date: 2022-07-10 09:10:00
---

这个会判断是否启动 Emacs daemon，如果没有启动他会自己启动

```bash
alias ec='emacsclient -t -a ""'
alias sec='sudo emacsclient -t -a ""'
```