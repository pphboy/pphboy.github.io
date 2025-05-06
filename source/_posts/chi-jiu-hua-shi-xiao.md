---
title: Pinia持久化失效pinia-plugin-persistedstate
date: 2023-04-22 13:02:00
---

肯定能解决，哈哈哈，找了这么多，你这次你找对了文章。

网络上的这个资料都是有问题的，没有讲明白原由。

需求，我想在我前端的业务层里使用 store，但是是持久层store，不过没有生效。

下面是错误的写法，这个写是不生效的。

```
import { useGlobalStore } from '@/store/modules/global';
import { useMemberStore } from '@/store/modules/member';
import {PiMember} from '@/types/Member'

import pinia from '@/store'
    const memberStore = useMemberStore(pinia);
    const gb = useGlobalStore(pinia);
    gb.token = 'ab123123c'
    memberStore.token = "abc123"
    memberStore.member = {} as PiMember;
    console.log(memberStore);
```

正确的写法是把这个方法的初始化放到一个函数里，然后自定义一些函数就可以了。

![image](https://img2023.cnblogs.com/blog/2146100/202304/2146100-20230422125903802-1698584415.png)


![image](https://img2023.cnblogs.com/blog/2146100/202304/2146100-20230422125856202-1255631251.png)

推荐写法
```
useGlobalStore().setLoginInfo(data.data)
```
就是直接拿来用

![image](https://img2023.cnblogs.com/blog/2146100/202304/2146100-20230422130323173-1239680099.png)


![image](https://img2023.cnblogs.com/blog/2146100/202304/2146100-20230422130146743-1174290659.png)
