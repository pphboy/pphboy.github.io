---
title: SpringBoot使用线程池发送邮件
date: 2023-05-30 07:28:00
---

```
@Component
public class EmailUtil {

    @Value("${email.user}")
    private String emailUser;
    @Value("${email.password}")
    private String password;

    private static final int THREAD_POOL_SIZE = 10;
    private static final int QUEUE_CAPACITY = 100;
    private final ThreadPoolExecutor executor;

    public EmailUtil() {
        // 创建线程池
        this.executor = new ThreadPoolExecutor(
                THREAD_POOL_SIZE, THREAD_POOL_SIZE,
                0L, TimeUnit.MILLISECONDS,
                new ArrayBlockingQueue<>(QUEUE_CAPACITY));
    }


    /**
     * 发送内容为简单文本的邮件
     */
    public void sendHtmlEmail(String toEmail,String title,String html) throws EmailException {
        this.executor.execute(()->{
            HtmlEmail email = new HtmlEmail();
            email.setHostName("smtp.qq.com");
            email.setSmtpPort(25);
            email.setAuthenticator(new DefaultAuthenticator(emailUser,password));
            email.setSSLOnConnect(true);
            // email.setDebug(false);
            email.setCharset("UTF-8");
            try {
                email.setFrom("pbot@qq.com","PBOT机器人");
                email.addTo(toEmail);
                email.setSubject(title);
                email.setHtmlMsg(html);
                email.send();
            } catch (Exception e) {
                throw new RuntimeException(e);
            }
        });
    }
}



```