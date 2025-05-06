---
title: SpringBoot Test Junit 联用
date: 2021-01-16 15:05:00
---

* 需要导入SpringBoot test和junit的包
```
@RunWith(SpringRunner.class)
@SpringBootTest(classes = PiYuApplication.class)
public class UserServiceTest {

    @Autowired
    UserService userService;

    /**
     * 测试注册
     */
    @Test
    public void testRegister(){
        User user = new User();
        user.setUsername("小皮");
        user.setPassword("123456");
        user.setEmail("22920@qq.com");
        System.out.println(userService.registerUser(user));
    }

```