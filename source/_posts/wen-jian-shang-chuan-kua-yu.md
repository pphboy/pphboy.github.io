---
title: Vditor文件上传跨域
date: 2021-01-27 19:06:00
---

### Vditor文件上传跨域

官网是发了一次请求，而我这里发了两次请求。

有一个option请求，形成了跨域。

虽然我在后端配置了允许跨域，但事实上，我用JWT的拦截器把文件上传的接口给拦截了。

且走的是OPTION，然后报错了跨域。

我的MVC拦截器

```js
this.vditor = new Vditor('vditor', {
    height: 360,
    toolbarConfig: {
        pin: true,
    },
    cache: {
        enable: false,
    },
    upload: {
        fieldName:"file",
        headers:{
            token:main.local.get("piyu").token,
        },
        withCredentials:true,
        accept: 'image/*,.mp3, .wav, .rar',
        token: main.local.get("piyu").token,
        url:this.$api.API_UPLOAD_FILE,
        linkToImgUrl:this.$api.API_UPLOAD_FILE,
        filename (name) {
            return name.replace(/[^(a-zA-Z0-9\u4e00-\u9fa5\.)]/g, '').
            replace(/[\?\\/:|<>\*\[\]\(\)\$%\{\}@~]/g, '').
            replace('/\\s/g', '')
        },
    },
    after: () => {
        this.vditor.setValue("");
    },
    toolbar: [
        'emoji',
        'headings',
        'bold',
        'italic',
        'strike',
        'link',
        '|',
        'list',
        'ordered-list',
        'check',
        'outdent',
        'indent',
        '|',
        'quote',
        'line',
        'code',
        'inline-code',
        'insert-before',
        'insert-after',
        '|',
        'upload',
        // 'record',
        'table',
        '|',
        'undo',
        'redo',
        '|',
        'edit-mode',
        // 'content-theme',
        'code-theme',
        'export',
        {
            name: 'more',
            toolbar: [
                'fullscreen',
                'both',
                'preview',
                'info',
                'help',
            ],
        }],
})
```



```java
package com.pipihao.piyu.config;

import com.pipihao.piyu.interceptor.JWTInterceptor;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import java.util.ArrayList;
import java.util.List;

@Configuration
public class InterceptorConfig implements WebMvcConfigurer {

    /**
     * 解决跨域
     * @param registry
     */
    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")
                .allowedOrigins("*")
                .allowCredentials(true)
                .allowedMethods("GET", "POST", "DELETE", "PUT","OPTIONS")
                .maxAge(3600);
    }

    /**
     * 拦截器
     * @param registry
     */
    @Override
    public void addInterceptors(InterceptorRegistry registry) {
        registry.addInterceptor(new JWTInterceptor())
                .addPathPatterns("/**") //拦截的接口，（理论上是所有的都拦截了）
                .excludePathPatterns(
                        "/login",
                        "/user/register",
                        "/file/upload",
                        "/class/all" //所有分类
                ); // 不拦截的链接前端得加上“/”
    }

}

```

解决方案：不拦截文件上传接口，在文件上传的接口内使用JWT验证即可。

```java
    @PostMapping("/file/upload")
    public Map<String,Object> upload(@RequestParam("file") MultipartFile filename, HttpServletRequest request) throws IOException {
        Map<String,Object> map = new HashMap<>();

        try{
            JWTUtils.verifyToken(request.getHeader("token"));
        }catch (Exception e){
            /*此处记录来访者的ip*/
            map.put("msg","非法数据访问");
            return map;
        }

       //文件保存
        return map;
    }

```
