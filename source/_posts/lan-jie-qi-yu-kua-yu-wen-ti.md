---
title: JWT拦截器与跨域问题
date: 2021-01-28 10:48:00
---

 本文参考： https://blog.csdn.net/csdn_x_w/article/details/108027940
 
我发现走的都是OPTIONS协议，然后JWT 却把OPTIONS拦截了，于是参考上文
放行了OPTION请求

#### 拦截器
```
package com.pipihao.piyu.interceptor;

import com.auth0.jwt.exceptions.AlgorithmMismatchException;
import com.auth0.jwt.exceptions.SignatureVerificationException;
import com.auth0.jwt.exceptions.TokenExpiredException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.pipihao.piyu.utils.JWTUtils;
import org.springframework.web.servlet.HandlerInterceptor;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.security.SignatureException;
import java.util.HashMap;
import java.util.Map;

public class JWTInterceptor implements HandlerInterceptor {

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
        if(request.getMethod().toUpperCase().equals("OPTIONS")){
            return true; // 通过所有OPTION请求
        }else{
            Map<String,Object> map = new HashMap<>();
            // 获取请求令牌
            String token = request.getHeader("token");
            try{
                JWTUtils.verifyToken(token); // 验证令牌
                return true;
            }catch (SignatureVerificationException e){
                e.printStackTrace();
                map.put("msg","签名无效");
            }catch (TokenExpiredException e){
                e.printStackTrace();
                map.put("msg","token过期");
            }catch(AlgorithmMismatchException e){
                e.printStackTrace();
                map.put("msg","token算法不一致");
            }catch (Exception e){
                e.printStackTrace();
                map.put("msg","token无效");
            }finally {
                /*如果进入到 finally内，则必然是报错了*/
                // 将Map转换成Json
                String json = new ObjectMapper().writeValueAsString(map);
                response.setContentType("application/json;charset=UTF-8");
                response.getWriter().println(json);
                return false;
            }
        }

    }
}
```

#### MVC配置

```
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
                .allowedMethods("GET", "POST", "DELETE", "PUT")
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

 这个文章这样做不太聪明，https://www.cnblogs.com/pipihao/p/14336510.html

#### 反省
对于跨域没有一个清楚的认识，对于 OPTIONS 协议的玩法模糊。
不熟悉拦截器原理，不熟悉Servlet原理。（很少看过API）

通过此文 https://www.cnblogs.com/heioray/p/9392533.html
认识了OPTIONS 感觉该作者
