---
title: 重学SpringBoot. step5 再学SpringMVC
date: 2022-05-10 15:59:00
---

# SpringMVC


参考：[《深入浅出 SpringBoot 2.X》](https://weread.qq.com/web/reader/48732c40718b74cd487c7c3)

虽然说的是SpringBoot，但把SpringMVC将的很好，正是SpringMVC应用到SpringBoot中非常典型的应用方式。

多数SpringBootWeb的项目，都是用MVC，在SpringBoot的应用中，MVC变得极为简单，其不再需要单独的配置文件，要添加资源的映射和拦截器，跨域的配置，都可以通过实现WebMvcConfigurer，然后再其实实现相应的 方向即可添加这些自定义的功能。

## 处理器映射

最常用的五个请求类型：GET，POST，DELETE，PUT，OPTIONS 

http有很多个请求类型，目前我只用过这五个。

一个协议对象的注解为

@RequstMapping("path")
@GetMapping,@PostMapping，@DeleteMapping @PutMapping

上面这五个注解的用法是一样的，但RequestMapping默认可以接收到五个请求类型，特定的请求类型需要使用特定的请求类型注解，Request也可以指定请求类型

```java
@RequestMapping(value = "user",method = RequestMethod.DELETE)
```

其实这些都不是重点，你不能指望这篇文章提高你的MVC基础水平。

书中大量引用了URL参数，但这是不推荐的，固定的资源可以用URL路径传递值，动态的数据则使用POST进行请求。

## 自定义参数转换规则

第一，知道有这个东西，第二，知道怎么用。

需求：将Request请求的参数转成对象，1-username

Path参数，Request参数，都可以在自己的规则进行转换

```
http://localhost:8083/user/convert/1-man
http://localhost:8083/user/convert/user=1-man
```

```java
@GetMapping("/convert/{user}")
public User stringToUser(@PathVariable("user") User user){
    return user;
}

```
下面是转换时候用的类，他会自动注入到容器中，供使用
```java
@Component
public class StringToUserConvertor implements Converter<String, User> {
    @Override
    public User convert(String source) {
        String[] split = source.split("-");
        System.out.println(source+" : source");
        return new User().setUserName(split[1]).setId(Long.parseLong(split[0]));
    }
}

```
返回的值就是，转换的类的类名

## 数据验证

首先你需要知道一些基础的注解
```java
@NotNull   @Future  @DateTimeFormat
@DecimalMin
@Min @Max
@NotEmpty  @Range(min=1,max10)
@Email   @Size  @Length
```
这些注解都有一个属性为message，就是报错之后需要传递的属性

然后就是自定义校验器

```java
public class UserValidator implements Validator {
    @Override
    public boolean supports(Class<?> clazz) {
        return clazz.equals(User.class);
    }

    @Override
    public void validate(Object target, Errors errors) {
        if(target == null){
            errors.rejectValue("matherfather",null,"不能为空");
            return;
        }

        User user = (User) target;

        if(StringUtils.hasText(user.getUserName())){
            errors.rejectValue("username 会不会吗？",null,"UserName只能为空啊，你会不会写？");
        }
    }
}
```
自定义的验证需要添加到WebDataBinder内，才则绑定成功

```java
@InitBinder
public void initBinder(WebDataBinder webDataBinder){
    webDataBinder.setValidator(new UserValidator());
}
```

## 拦截器

拦截器会根据添加的顺序进行执行，拦截器执行完后，需要返回一个boolean类型的值 ，如果为true则继续执行，为false则停止。

整体而言，是一个拦截器链，但会根据拦截器的执行 顺序。

拦截器有三个方法，分别是拦截前(preHandler)，拦截后(postHandler)，请求完成(afterHandler)

拦截器的实现就是实现 HandlerInteceptor，并且可以给对应的拦截器添加匹配的拦截规则 

```java
class TestInteceptor implements HandlerInteceptor{
    ...
}
// 需要添加到WebMvcConfigurar的实现类中

class TestConfig implements WebMvcConfigurar{
    addInteceptors(InteceptorRegistry registry){
        registry.addInteceptor(new TestInteceptor());
    }
}

```
