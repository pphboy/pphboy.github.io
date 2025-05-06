---
title: 重学SpringBoot. step6 SpringBoot高级技巧
date: 2022-05-11 15:31:00
---

# SpringBoot高级技术

[博客地址: step6 SpringBoot高级技巧](https://kbug.cn/post/733.html)

## 异步线程池

书上讲的是什么像异步操作那样，然后不需要等待。
问题是，不需要等待，但数据在生成的时候的时间并不能省。
我们计时不是从开始到得到数据时候吗？

我觉得是多任务的时候可以用异步线程池，如：统计和拿到各大模块的数据的时候，就可以用异步多线程，或者是不需要结果的操作时。

像清理文件，这就可以用异步来做，然后直接返回信息，不需要用户等待。

更为具体的，我认为可以称之为，异步任务队列。

第一，给自己的Service 实现方法上打上@Async，然后就是异步执行了。

这个功能用来远程调用还是非常不错的。

```java
@Configuration
@EnableAsync
public class AsyncConfig implements AsyncConfigurer {

    @Override
    public Executor getAsyncExecutor() {
        ThreadPoolTaskExecutor taskExecutor = new ThreadPoolTaskExecutor();
        // 核心线程数量
        taskExecutor.setCorePoolSize(10);
        // 线程池最大线程数
        taskExecutor.setMaxPoolSize(30);
        // 线程队列最大线程数
        taskExecutor.setQueueCapacity(2000);
        taskExecutor.initialize();
        return taskExecutor;
    }

}
```

## 定时器 && 异步消息

用定时器可以做一些定时广播的任务，定时给用户发广告，当然这得用异步。

其中Sechuled可以配置每天什么时候，或者是隔多久执行一次

@EnableScheduling 开启全局定时器

异步消息就是在要执行方法上加上@Async,然后配置类在异步线程池那一段，但如果你的需求要用到异步的时候，请一定要想好数据安全是否得到保证。

你更不能指望这一篇博文能帮助你学会这个技术，即使一本SpringBoot的专业书也不行。

```java

@Service
public class SystemServiceImpl implements SystemService {
    @Override
    @Async
    @Scheduled(fixedRate = 4000)
    public void backups() throws InterruptedException {
        System.out.println("备份数据ing");
        WebSocketServiceImpl.webSocketSet.forEach(d->{
            try {
                d.session.getBasicRemote().sendText("定时任务发送"+ DateUtil.formatAsDatetime(new Date()));
            } catch (IOException e) {
                e.printStackTrace();
            }
        });
        Thread.sleep(3000);
        System.out.println("备份数据完成");
    }
    
}
```



## WebSocket应用

兼容除chrome,firefox之外的浏览器可能需要使用WebSocket下的子协议STOMP

对于服务端而言，需要实现特定的钩子，OnOpen，OnClose，OnMessage

然后这些钩子会帮助你进行对客户端WebSocket进行通信，相关的API可以上官网进行查看，这里只在书上看常用的，并且我还用其实现了 定时广播的功能

可以看看：[SpringBoot学习地址 ](https://github.com/527515025/springBoot)

```xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-websocket</artifactId>
</dependency>
```
```java

@ServerEndpoint("/ws/{username}")
@Service
public class WebSocketServiceImpl {

    private static int onlineCount = 0;

    // 每次访问对象对应的请求对象
    public static CopyOnWriteArraySet<WebSocketServiceImpl> webSocketSet = new CopyOnWriteArraySet<>();

    private String username;
    public volatile Session session;

    @OnOpen
    public synchronized void onOpen(Session session,@PathParam("username") String username){
        this.session = session;
        this.username = username;
        System.out.println(this.session);
        webSocketSet.add(this);
        addOnlineCount();
        // 为什么要用getOnelineCount，因为这个加了线程保护锁
        System.out.println("新加入成功！目前总在线人数："+getOnlineCount());

        try {
            sendMessage("有新的连接加入！"+session.getId());
        } catch (IOException e) {
            e.printStackTrace();
        }

    }
    @OnClose
    public void onClose(Session session) throws IOException {

        webSocketSet.remove(this);
        subOnelineCount();
        System.out.println("有一个人退出聊天室！"+getOnlineCount());
    }

    @OnMessage
    public void onMessage(String message,Session session) throws IOException {
        System.out.println("one guy send one message: "+message);

        // 给每个在线的用户都发送这条信息，广播？


        for (WebSocketServiceImpl item :
                webSocketSet) {
            try{

//                    String username = item.session.getUserPrincipal().getName();
                    System.out.println(item.username+":"+message);
                    item.sendMessage(item.username+":"+message);

            }catch (Exception e){
                e.printStackTrace();
            }
        }


    }

    private void sendMessage(String msg) throws IOException {
        this.session.getBasicRemote().sendText(msg);
    }

    private static synchronized  int getOnlineCount(){
        return onlineCount;
    }
    public static synchronized void subOnelineCount(){
        onlineCount--;
    }

    public static synchronized void addOnlineCount(){
        onlineCount++;
    }

}

```

```html

<template>
    <div>
        <input type="text" v-model="message" placeholder="请输入信息">
        <button @click="sendMessage">发送信息</button>
        <button @click="closeConnection">关闭WebSocket连接</button>

        <p v-for="(l,i) in msgList" :key="i">{{l}}</p>
    </div>
</template>

<script>
    export default {
        name: "WebSocket",
        data(){
            return{
                message:null,
                ws:null,
                msgList:[],
                username:null,
            }
        },
        created() {
            this.username = prompt("请输入用户名")
            this.initWebSocket()
        },
        methods:{
            initWebSocket: function () {
                var vm = this
                if ('WebSocket' in window) {
                    vm.ws = new WebSocket("ws://localhost:8083/ws/"+vm.username);

                    this.ws.onerror = function(){
                        vm.msgList.push("error")
                    }

                    this.ws.onopen = () => {

                        vm.msgList.push("open successful")
                    }
                    // 添加信息
                    this.ws.onmessage = (event)=>{
                        console.log(event,"onmessage")
                        vm.msgList.push(event.data)
                    }
                } else {
                    alert("browser cant got websocket,nigger");
                }


                // 窗口关闭时关闭连接
                window.onbeforeunload = ()=>{
                    vm.ws.close()
                }



            },
            closeConnection(){
                this.ws?.close()
            },
            sendMessage(){
                console.log(this.ws)
                this.ws?.send(this.message)
                this.message = null
                alert("send ok")
            }
        }
    }
</script>

<style scoped>

</style>
```