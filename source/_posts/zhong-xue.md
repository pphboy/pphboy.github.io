---
title: 重学SpringBoot. step2 Spring AOP 
date: 2022-05-08 19:46:00
---

### Spring AOP
AOP的原理，就是生成对象的代理，然后通过在代理的执行中，添加一些钩子来扩展功能。

```java
@Aspect
public class MyAspect {

    @Pointcut("execution(* cn.kbug.code.service.impl.*.*(..))")
    public void pointCut(){

    }

    @Around("pointCut()")
    public void around(ProceedingJoinPoint pjp) throws Throwable {
        pjp.proceed();
        System.out.println("around");
    }

    @Before("pointCut()")
    public void before(){
        System.out.println("before .. ");
    }

    @After("pointCut()")
    public void after(){
        System.out.println(" after ..");
    }

    @AfterReturning("pointCut()")
    public void afterReturning(){
        System.out.println(" after returning ..");
    }

    @AfterThrowing("pointCut()")
    public void afterThrowing(){
        System.out.println(" afterThrowing ..");
    }
}
```
