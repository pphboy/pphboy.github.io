---
title: 终端配置 代理
date: 2022-01-22 21:52:00
---

```bash
git config --global https.proxy http://127.0.0.1:10809	
git config --global https.proxy https://127.0.0.1:10809
git config --global http.proxy 'socks5://127.0.0.1:10808'
git config --global https.proxy 'socks5://127.0.0.1:10808'
git config --global --list	#查询代理设置
```

![image](https://img2022.cnblogs.com/blog/2146100/202202/2146100-20220206223100508-1670542466.png)


### PowerShell 代理设置
设置仅本次有效

$env:HTTP_PROXY="127.0.0.1:10809	"
$env:HTTPS_PROXY="127.0.0.1:10809 "
### CMD 代理设置
设置内容仅本次有效

set HTTP_PROXY=127.0.0.1:10809
set HTTPS_PROXY=127.0.0.1:10809