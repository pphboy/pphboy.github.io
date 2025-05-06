---
title: jwtUtils顾名思意
date: 2020-09-05 09:24:00
---

<div class="cnblogs_code">
<pre><span style="color: #008080;"> 1</span> <span style="color: #0000ff;">package</span><span style="color: #000000;"> com.pipihao.blog.util;
</span><span style="color: #008080;"> 2</span> <span style="color: #0000ff;">import</span><span style="color: #000000;"> java.util.Date;
</span><span style="color: #008080;"> 3</span>   
<span style="color: #008080;"> 4</span> <span style="color: #0000ff;">import</span><span style="color: #000000;"> javax.crypto.SecretKey;
</span><span style="color: #008080;"> 5</span> <span style="color: #0000ff;">import</span><span style="color: #000000;"> javax.crypto.spec.SecretKeySpec;
</span><span style="color: #008080;"> 6</span>   
<span style="color: #008080;"> 7</span> <span style="color: #0000ff;">import</span><span style="color: #000000;"> org.apache.commons.codec.binary.Base64;
</span><span style="color: #008080;"> 8</span>   
<span style="color: #008080;"> 9</span> <span style="color: #0000ff;">import</span><span style="color: #000000;"> com.alibaba.fastjson.JSONObject;
</span><span style="color: #008080;">10</span> <span style="color: #0000ff;">import</span><span style="color: #000000;"> io.jsonwebtoken.Claims;
</span><span style="color: #008080;">11</span> <span style="color: #0000ff;">import</span><span style="color: #000000;"> io.jsonwebtoken.ExpiredJwtException;
</span><span style="color: #008080;">12</span> <span style="color: #0000ff;">import</span><span style="color: #000000;"> io.jsonwebtoken.JwtBuilder;
</span><span style="color: #008080;">13</span> <span style="color: #0000ff;">import</span><span style="color: #000000;"> io.jsonwebtoken.Jwts;
</span><span style="color: #008080;">14</span> <span style="color: #0000ff;">import</span><span style="color: #000000;"> io.jsonwebtoken.MalformedJwtException;
</span><span style="color: #008080;">15</span> <span style="color: #0000ff;">import</span><span style="color: #000000;"> io.jsonwebtoken.SignatureAlgorithm;
</span><span style="color: #008080;">16</span> <span style="color: #0000ff;">import</span><span style="color: #000000;"> io.jsonwebtoken.SignatureException;
</span><span style="color: #008080;">17</span> <span style="color: #0000ff;">import</span><span style="color: #000000;"> io.jsonwebtoken.UnsupportedJwtException;
</span><span style="color: #008080;">18</span>   
<span style="color: #008080;">19</span> <span style="color: #008000;">/**</span>
<span style="color: #008080;">20</span> <span style="color: #008000;"> * JWTUtils工具类，生成jwt和解析jwt
</span><span style="color: #008080;">21</span> <span style="color: #008000;"> * JSON WEB TOKEN 结构组成：
</span><span style="color: #008080;">22</span> <span style="color: #008000;"> * (1)Header(头部)：包含加密算法，通常直接使用 HMAC SHA256
</span><span style="color: #008080;">23</span> <span style="color: #008000;"> * (2)Payload(负载)：存放有效信息，比如消息体、签发者、过期时间、签发时间等
</span><span style="color: #008080;">24</span> <span style="color: #008000;"> * (3)Signature(签名)：由header(base64后的)+payload(base64后的)+secret(秘钥)三部分组合，然后通过head中声明的算法进行加密
</span><span style="color: #008080;">25</span> <span style="color: #008000;"> * </span><span style="color: #808080;">@author</span><span style="color: #008000;"> sixmonth
</span><span style="color: #008080;">26</span> <span style="color: #008000;"> * @date 2019年3月20日
</span><span style="color: #008080;">27</span> <span style="color: #008000;"> *
</span><span style="color: #008080;">28</span>  <span style="color: #008000;">*/</span>
<span style="color: #008080;">29</span> <span style="color: #0000ff;">public</span> <span style="color: #0000ff;">class</span><span style="color: #000000;"> JWTUtils {
</span><span style="color: #008080;">30</span>      
<span style="color: #008080;">31</span>     <span style="color: #0000ff;">static</span> String SECRETKEY = "KJHUhjjJYgYUllVbXhKDHXhkSyHjlNiVkYzWTBac1Yxkjhuad"<span style="color: #000000;">;
</span><span style="color: #008080;">32</span>   
<span style="color: #008080;">33</span>     <span style="color: #008000;">/**</span>
<span style="color: #008080;">34</span> <span style="color: #008000;">     * 由字符串生成加密key
</span><span style="color: #008080;">35</span> <span style="color: #008000;">     * </span><span style="color: #808080;">@return</span>
<span style="color: #008080;">36</span>      <span style="color: #008000;">*/</span>
<span style="color: #008080;">37</span>     <span style="color: #0000ff;">public</span> <span style="color: #0000ff;">static</span><span style="color: #000000;"> SecretKey generalKey(String stringKey) {
</span><span style="color: #008080;">38</span>         <span style="color: #0000ff;">byte</span>[] encodedKey =<span style="color: #000000;"> Base64.decodeBase64(stringKey);
</span><span style="color: #008080;">39</span>         SecretKey key = <span style="color: #0000ff;">new</span> SecretKeySpec(encodedKey, 0, encodedKey.length, "AES"<span style="color: #000000;">);
</span><span style="color: #008080;">40</span>         <span style="color: #0000ff;">return</span><span style="color: #000000;"> key;
</span><span style="color: #008080;">41</span> <span style="color: #000000;">    }
</span><span style="color: #008080;">42</span>   
<span style="color: #008080;">43</span>     <span style="color: #008000;">/**</span>
<span style="color: #008080;">44</span> <span style="color: #008000;">     * 创建jwt
</span><span style="color: #008080;">45</span> <span style="color: #008000;">     * </span><span style="color: #808080;">@param</span><span style="color: #008000;"> uuid 唯一id，uuid即可
</span><span style="color: #008080;">46</span> <span style="color: #008000;">     * </span><span style="color: #808080;">@param</span><span style="color: #008000;"> subject json形式字符串或字符串，增加用户非敏感信息存储，如用户id或用户账号，与token解析后进行对比，防止乱用
</span><span style="color: #008080;">47</span> <span style="color: #008000;">     * </span><span style="color: #808080;">@param</span><span style="color: #008000;"> expirationDate  生成jwt的有效期，单位秒
</span><span style="color: #008080;">48</span> <span style="color: #008000;">     * </span><span style="color: #808080;">@return</span><span style="color: #008000;"> jwt token
</span><span style="color: #008080;">49</span> <span style="color: #008000;">     * </span><span style="color: #808080;">@throws</span><span style="color: #008000;"> Exception
</span><span style="color: #008080;">50</span>      <span style="color: #008000;">*/</span>
<span style="color: #008080;">51</span>     <span style="color: #0000ff;">public</span> <span style="color: #0000ff;">static</span> String createJWT(String uuid, String subject, <span style="color: #0000ff;">long</span> expirationDate) <span style="color: #0000ff;">throws</span><span style="color: #000000;"> Exception {
</span><span style="color: #008080;">52</span>         SignatureAlgorithm signatureAlgorithm =<span style="color: #000000;"> SignatureAlgorithm.HS256;
</span><span style="color: #008080;">53</span>         <span style="color: #0000ff;">long</span> nowMillis =<span style="color: #000000;"> System.currentTimeMillis();
</span><span style="color: #008080;">54</span>         Date now = <span style="color: #0000ff;">new</span><span style="color: #000000;"> Date(nowMillis);
</span><span style="color: #008080;">55</span>         SecretKey key =<span style="color: #000000;"> generalKey(SECRETKEY);
</span><span style="color: #008080;">56</span>         JwtBuilder builder = Jwts.builder().setIssuer(""<span style="color: #000000;">).setId(uuid).setIssuedAt(now).setSubject(subject)
</span><span style="color: #008080;">57</span> <span style="color: #000000;">                .signWith(signatureAlgorithm, key);
</span><span style="color: #008080;">58</span>         <span style="color: #0000ff;">if</span> (expirationDate &gt;= 0<span style="color: #000000;">) {
</span><span style="color: #008080;">59</span>             <span style="color: #0000ff;">long</span> expMillis = nowMillis + expirationDate*1000<span style="color: #000000;">;
</span><span style="color: #008080;">60</span>             Date exp = <span style="color: #0000ff;">new</span><span style="color: #000000;"> Date(expMillis);
</span><span style="color: #008080;">61</span> <span style="color: #000000;">            builder.setExpiration(exp);
</span><span style="color: #008080;">62</span> <span style="color: #000000;">        }
</span><span style="color: #008080;">63</span>         <span style="color: #0000ff;">return</span><span style="color: #000000;"> builder.compact();
</span><span style="color: #008080;">64</span> <span style="color: #000000;">    }
</span><span style="color: #008080;">65</span>   
<span style="color: #008080;">66</span>     <span style="color: #008000;">/**</span>
<span style="color: #008080;">67</span> <span style="color: #008000;">     * 解密jwt，获取实体
</span><span style="color: #008080;">68</span> <span style="color: #008000;">     * </span><span style="color: #808080;">@param</span><span style="color: #008000;"> jwt
</span><span style="color: #008080;">69</span>      <span style="color: #008000;">*/</span>
<span style="color: #008080;">70</span>     <span style="color: #0000ff;">public</span> <span style="color: #0000ff;">static</span> Claims parseJWT(String jwt) <span style="color: #0000ff;">throws</span><span style="color: #000000;"> ExpiredJwtException, UnsupportedJwtException,
</span><span style="color: #008080;">71</span> <span style="color: #000000;">            MalformedJwtException, SignatureException, IllegalArgumentException {
</span><span style="color: #008080;">72</span>         SecretKey key =<span style="color: #000000;"> generalKey(SECRETKEY);
</span><span style="color: #008080;">73</span>         Claims claims =<span style="color: #000000;"> Jwts.parser().setSigningKey(key).parseClaimsJws(jwt).getBody();
</span><span style="color: #008080;">74</span>         <span style="color: #0000ff;">return</span><span style="color: #000000;"> claims;
</span><span style="color: #008080;">75</span> <span style="color: #000000;">    }
</span><span style="color: #008080;">76</span>   
<span style="color: #008080;">77</span>     <span style="color: #008000;">/**</span>
<span style="color: #008080;">78</span> <span style="color: #008000;">    * 实例演示
</span><span style="color: #008080;">79</span>     <span style="color: #008000;">*/</span>
<span style="color: #008080;">80</span>     <span style="color: #0000ff;">public</span> <span style="color: #0000ff;">static</span> <span style="color: #0000ff;">void</span><span style="color: #000000;"> main(String[] args) {
</span><span style="color: #008080;">81</span>         <span style="color: #0000ff;">try</span><span style="color: #000000;"> {
</span><span style="color: #008080;">82</span>             JSONObject subject = <span style="color: #0000ff;">new</span> JSONObject(<span style="color: #0000ff;">true</span><span style="color: #000000;">);
</span><span style="color: #008080;">83</span>             subject.put("tem", "哈哈哈"<span style="color: #000000;">);
</span><span style="color: #008080;">84</span>             subject.put("userName", "sixmonth"<span style="color: #000000;">);
</span><span style="color: #008080;">85</span>             String token = createJWT(UUIDUtils.getUUID(), subject.toJSONString(), 10);<span style="color: #008000;">//</span><span style="color: #008000;">10秒过期
</span><span style="color: #008080;">86</span>             <span style="color: #008000;">//</span><span style="color: #008000;">System.out.println(token);</span>
<span style="color: #008080;">87</span>             Claims claims =<span style="color: #000000;"> parseJWT(token);
</span><span style="color: #008080;">88</span>             System.out.println("解析jwt："+<span style="color: #000000;">claims.getSubject());
</span><span style="color: #008080;">89</span>             JSONObject tem =<span style="color: #000000;"> JSONObject.parseObject(claims.getSubject());
</span><span style="color: #008080;">90</span>             System.out.println("获取json对象内容："+tem.getString("userName"<span style="color: #000000;">));   
</span><span style="color: #008080;">91</span>             System.out.println(claims.getExpiration()+"///"+<span style="color: #000000;">claims.getExpiration().getTime());
</span><span style="color: #008080;">92</span>         } <span style="color: #0000ff;">catch</span><span style="color: #000000;"> (Exception e) {
</span><span style="color: #008080;">93</span> <span style="color: #000000;">            e.printStackTrace();
</span><span style="color: #008080;">94</span> <span style="color: #000000;">        }
</span><span style="color: #008080;">95</span> <span style="color: #000000;">    }
</span><span style="color: #008080;">96</span> <span style="color: #000000;">}
</span><span style="color: #008080;">97</span>  </pre>
</div>
<p>&nbsp;</p>