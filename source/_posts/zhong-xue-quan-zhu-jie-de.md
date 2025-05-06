---
title: 重学SpringBoot. step1 全注解的SpringBoot
date: 2022-05-08 19:39:00
---

参考：《深入浅出SpringBoot 2.x》
## 全注解的SpringBoot
用户可以通过注解将所需要的对象，存放到IOC容器中，然后SpringBoot可以根据这些需要使用的情况，自动注入到需要的Bean中。

### Component 组件
如果你需要重复的使用一个类，而这个类又不属于业务，只是数据处理，那么就可以使用Component注解标记该类，然后使用ComponentScan即可将该类实例化到容器中。

ComponentScan就是一个扫描器，在SpringApplication中也带着一个这样的扫描器。有这种包含的扫描，那么又引出了ComponentScan注解中引出了excludeFilters属性，可以指定哪些类不被扫描器扫描到。

可以看下SpringBootApplication注解中，也使用了ComponentScan的注解，也就是SpringBoot应用的启动类同级的包，或者是类，默认会被扫描器扫描到。

在Configuration的类中，可以定义一些带@Bean注解的方法，这些方法的返回值，被加入到IOC容器中，如果不指定Bean的Name属性，那么将会使用该方法的方法名作为对象的名称存入到IOC容器中。

### 依赖注入
依赖注入，用的是多态来体现，一个对象，多种形态，然后用@Autowired给对象注入依赖，之后可以通过@Primary设置注入时候的容器中的实例的优先级和@Quelifier直接指定bean的名称。

这里我感觉还是很混乱，容器中的实例，一直没有个名称，一直说是用Bean装配到IOC容器中，这里其实已经理论混乱了。

Bean实例存放在容器之中，但Bean对应的实例有多种形态，也称之为Bean的依赖，Bean有多种依赖，所以需要进行选择，不然就会报错。所以注入的Bean的名称都是唯一的。

### 读取属性文件
@Value("\${...}")  这样的占位符可以读取application.yml的的配置



还有一种读取的方法是用类来读取，

需要在类上加两个注解，Component，ConfgurationProperties("前缀名")

然后就可以读取指定的配置

例如: file.path = "/home/files"

```java
@Component
@ConfigurationProperties("file")
@Data
public class Path(){
    private String path;// = file.path
}
```
### Bean的作用域
Bean可以直接设定其类型，不用的作用域会产生不同的Bean，或者相同的作用域，每次都会刷新。

所以可以使用@Scope注解给每个SpringBoot的组件指定在WEB中访问的范围。

### @Profile
加载多套配置文件的注解。

一个很常见的例子，多个测试环境中有不同的数据库，在这里已经得到了答案。

可以通过Profile直接给指定的方法来指定。

> 本来我以为是用来同时加载不同的配置文件

书上讲的不是特别好，就是spring.profiles.active也可以指定其加载的文件

```yaml
spring:
    profiles: 
        active:  dev
```
### SpringEl
在@Value注解中使用El表达式，可以写一些简单的代码运算，或者代码的调用 

```java

@Value("${file.path}")
private String path;

@Value("#{1+1}")
int a;

@Value("#{T(System).currentTimeMillis()}")
private long time;
@Test
public void test(){
    System.out.println(a);
    System.out.println(time);
}
```