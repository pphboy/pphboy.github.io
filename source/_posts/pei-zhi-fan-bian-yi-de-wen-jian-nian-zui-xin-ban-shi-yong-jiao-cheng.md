---
title: eclipse配置JD-Eclipse反编译java的class文件 【2021年最新版使用教程】
date: 2021-04-30 19:53:00
---

![](https://oscimg.oschina.net/oscnet/up-a486ccf57e9be740ba1958d654e604b7aac.png)

## 简介
就是像eclipse那样ctrl+左键点击查看源码，不过eclipse本身不带这种插件而已

### 0x00  下载JD-eclipse 

官网：http://java-decompiler.github.io/
![](https://oscimg.oschina.net/oscnet/up-eb697db20850997737f6031721fb4fdeeb5.png)
亲测下载有时可能不太稳定，所以我将其包上传至我的gitee上，链接如下：
https://gitee.com/pimg/image/blob/master/img/jd-eclipse-2.0.0.zip

如果可以请关注我的gitee:https://gitee.com/pphboy

### 0x01  解压
![](https://oscimg.oschina.net/oscnet/up-912b8539c525be72bf2c1087fa23ac9ce25.png)

如下图

![](https://oscimg.oschina.net/oscnet/up-58553756b21564fb6bab60e728867169f84.png)

### 0x02 安装
Help -> Install Software 
![](https://oscimg.oschina.net/oscnet/up-f4a2ec6fa7124a5b28735f8c8e4923209b7.png)

![](https://oscimg.oschina.net/oscnet/up-e575fc8142b3be6a1a1c59e00af3c49b3c5.png)

![](https://oscimg.oschina.net/oscnet/up-fc6478896649e273b1f9945cf174c402642.png)
![](https://oscimg.oschina.net/oscnet/up-42c3e8eb77d9494f84d06f28916710f1975.png)
![](https://oscimg.oschina.net/oscnet/up-cbaf1158919717c0526bdd9456a6f88846f.png)

![](https://oscimg.oschina.net/oscnet/up-abc1f62621e795291db34ed9ef16c7902d2.png)


![](https://oscimg.oschina.net/oscnet/up-7701b7d9991fd92ce1fec03248f2b9673f2.png)

![](https://oscimg.oschina.net/oscnet/up-968c7bc63b82b7f4be9e09ff193967980c5.png)

### 0x03 配置JD-eclipse插件
![](https://oscimg.oschina.net/oscnet/up-34306707414cc4b8182e7fd3a4decf17ca5.png)

打到 Editor就需要将.class文件的打开方式改成我们的这个插件的方式

![](https://oscimg.oschina.net/oscnet/up-de5e3234b827d05e5f9b11bf167a622a70e.png)

![](https://oscimg.oschina.net/oscnet/up-f480c4c826c613880014540a9f8b25c5402.png)

![](https://oscimg.oschina.net/oscnet/up-305610364b20f1a9a7509b450776dafc699.png)

将Jd class file viewer 改成default

![](https://oscimg.oschina.net/oscnet/up-5e0a8511c58478423febf4594b0f9a883c3.png)

#### 配置 .class 
![](https://oscimg.oschina.net/oscnet/up-c2b2226c4c40c514579309d1f25961ca21c.png)

也设置为Default

![](https://oscimg.oschina.net/oscnet/up-c51b06a8d1282e5e35a3a0a73dee497234d.png)

一点要点击成这个效果才行

![](https://oscimg.oschina.net/oscnet/up-9b55648f47ab41bb96f80fccf16cf526a5c.png)

![](https://oscimg.oschina.net/oscnet/up-3ee14b5142fd4415bba6de2b15f90f6449b.png)

点击Apply and Close

### 0x04 配置样式

![](https://oscimg.oschina.net/oscnet/up-4737b612efe54f133378f15e6e0947621ea.png)

已经ctrl+左键点击进入了

![](https://oscimg.oschina.net/oscnet/up-888f69664dc8e60604e6f12f7251055ab54.png)

但会看到有一些不想要的注释，让我们关掉它

**Windows -> Preferences **
![](https://oscimg.oschina.net/oscnet/up-8662d6f9e595d380865c0158c3f8ce17131.png)

![](https://oscimg.oschina.net/oscnet/up-fb1b6e08b1fa9ea20dbe0c01f05fae93bac.png)

把这三把勾全部去掉，然后 Apply and Close

![](https://oscimg.oschina.net/oscnet/up-66049b1a52f747b7753690b6f8d9bf6a375.png)

**提示：如果已打开过的文件可能不会改变其注释，但重启eclipse可解决其问题，打开未打开过的class文件，是没有问题的**
