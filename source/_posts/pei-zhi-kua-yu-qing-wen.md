---
title: phpstudy配置nginx跨域请问
date: 2023-04-27 23:17:00
---

```
      add_header Access-Control-Allow-Origin *;
		add_header Access-Control-Allow-Methods 'GET, POST, OPTIONS';
		add_header Access-Control-Allow-Headers 'DNT,X-Mx-ReqToken,Keep-Alive,User-Agent,X-Requested-With,If-Modified-Since,Cache-Control,Content-Type,Authorization';

		if ($request_method = 'OPTIONS') {
			return 204;
		}

```

![image](https://img2023.cnblogs.com/blog/2146100/202304/2146100-20230427231623552-702339756.png)

![image](https://img2023.cnblogs.com/blog/2146100/202304/2146100-20230427231632426-1847010624.png)
