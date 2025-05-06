---
title: SpringBoot配置简单拦截器 已解决静态资源访问问题
date: 2023-04-21 15:28:00
---


```
public class LoginInterceptor implements HandlerInterceptor {

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {

        System.out.println(request.getRequestURI());
        if(ObjectUtils.isEmpty(request.getSession().getAttribute("admin"))){
            return false;
        }
        return true;
    }
}

```

添加的资源得是 /** 意思就是 /** 下如果访问到资源了，都是直接返回资源文件。

资源路径不需要exclude.

```
@Configuration
public class WebConfig extends WebMvcConfigurationSupport {

    @Override
    protected void addInterceptors(InterceptorRegistry registry) {
        registry.addInterceptor(new LoginInterceptor()).addPathPatterns("/hg/**");
    }

    @Override
    protected void addResourceHandlers(ResourceHandlerRegistry registry) {
        registry.addResourceHandler("/**","/hg/**").addResourceLocations("classpath:/static/");
    }
}
```