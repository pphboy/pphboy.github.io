---
title: JavaScript正则学习笔记 
date: 2020-11-22 16:44:00
---

### RegExp

##### 元字符

* ' . ' 点号：匹配任意的字符

* ^ $ 位置字符

  * ^ 匹配字符串开始的位置
  * $ 匹配字符串结束的位置

* 匹配数字和非数字  \d 和 \D

* 匹配空白字符 \s 和 \S

  * \s 匹配空白字符
  * \S 匹配非空白字符

* 中文 unicode 码 的区间 [\u4e00-\u9fa5]

* [] 匹配里面的任意字符

* [^a-z] 匹配除a到z之外的所有字符

* \`+` 匹配一次或者 多次 （所约束的条件必须存在，不然无法匹配）

* ```js
  var reg = /[mM][jJ]+/g
  //可以这样写 
  var reg = /[m][j]+/gi
  // 是匹配的时候不区分大小写
  ```

* \`*` 匹配 0 次或者 多次  （真正意义 上的可有可无）

  * ![](https://img2020.cnblogs.com/blog/2146100/202011/2146100-20201122163720034-398712448.png)
  * ![](https://img2020.cnblogs.com/blog/2146100/202011/2146100-20201122163734697-1440255368.png)
  * 加号和星号的区别

* \`?` 匹配重复的一次或者是零次 ( 所受约束的条件可有至多为一次，可无为零次)

* 原子组 () 

  * 捕获的方法： RegExp.$1  $2 $3  
  * 有多少个组，就可以使用$num来获取第几组所匹配的字符串

* | 或者 

* \`?:` 分组匹配不捕获

* ![](https://img2020.cnblogs.com/blog/2146100/202011/2146100-20201122163744075-289602997.png)

#### 正向预查 

**?= 无正向肯定预查  表示肯定是元 ，但不匹配**

![](https://img2020.cnblogs.com/blog/2146100/202011/2146100-20201122163756389-1250463308.png)


* ?! 元 正向否定预查  表示肯定不是元，不匹配 **
![](https://img2020.cnblogs.com/blog/2146100/202011/2146100-20201122163802024-1574608713.png)!

![](https://img2020.cnblogs.com/blog/2146100/202011/2146100-20201122163912319-1641350233.png)

* ? <= ￥ 反向肯定预查 表示肯定是￥ ，但不匹配**
![](https://img2020.cnblogs.com/blog/2146100/202011/2146100-20201122163939408-766953754.png)

* ?<! ￥ 反向否定 预查 表示肯定不是￥，不匹配**
![](https://img2020.cnblogs.com/blog/2146100/202011/2146100-20201122164002110-1314339559.png)

![](https://img2020.cnblogs.com/blog/2146100/202011/2146100-20201122164009722-1529649921.png)

**重复类** /[\\d]{0,12}/g  大括号内表示的是所匹配的的长度，（也就是所匹配的字符的重复次数）

#### 正则实例对象的方法

##### test() 

* 返回一个布尔值,表示当前模式是否能匹配参数字符串

##### reg.exec(str)

* 用来返回匹配的结果，如果发现匹配，就返回一个数组，数组中的成员都是匹配的子字符串，否则返回null

#### 字符串方法

* match() 
  * 对字符串进行正则匹配,返回匹配的结果
  * ![](https://img2020.cnblogs.com/blog/2146100/202011/2146100-20201122164021807-203233237.png)
* search() 
  * 返回第一个满足条件的匹配结果在整个字符串中的位置,如果没有任何匹配,则返回-1
  * ![](https://img2020.cnblogs.com/blog/2146100/202011/2146100-20201122164029494-601765.png)
* replace()
  * 可以替换匹配的值,它接受两个参数,第一个是正则表达式,表示搜索模式,第二个是替换的内容
  * ![](https://img2020.cnblogs.com/blog/2146100/202011/2146100-20201122164037501-467892635.png)

#### 验证用户账号
![](https://img2020.cnblogs.com/blog/2146100/202011/2146100-20201122164108681-1849643909.png)

#### 验证手机号码

```js
function checkPhone(phone){
    var reg = /^1[3|5|6|7|8|9|]\d{9}$/g;
    if(reg.test(phone)){
        console.log(`此 ${phone} 手机号码格式正确`)
    }else{
        console.log(`此 ${phone} 手机号码格式错误`)
    }
}

console.log('手机号码验证')
checkPhone('12312312312')
checkPhone('16677777   ')
checkPhone('166777770000')
checkPhone('17775646924')
console.log('\n\n座机号码验证')
function checkTelPhone(phone){
    var reg = /^0\d{2,3}-?\d{7,8}/g;
    if(reg.test(phone)){
        console.log(`此 ${phone} 座机号码格式正确`)
    }else{
        console.log(`此 ${phone} 座机号码格式错误`)
    }
}
checkTelPhone("0108888888")
checkTelPhone("01088888889")
checkTelPhone("0108-8888889")
checkTelPhone("01088-888889")
checkTelPhone("1088-888889")
checkTelPhone("088-8888811")
checkTelPhone("088-888889")
```

![](https://img2020.cnblogs.com/blog/2146100/202011/2146100-20201122164123190-2105597459.png)


```js
// 匹配身份证号
// 18 位或者15位，15位全是数字 18位 前17都是数字，最后一位可能是数字或者字符x或X
function checkId(id){
    var reg = /(^\d{15}$)|(^\d{17}[x|\d]$)/gi;
    console.log(reg.test(id)? "正确":"错误");
}
checkId('123456789012345678')
checkId('12345678901234567x')
checkId('12345678901234567X')
checkId('123456789012345')
console.log("---------")
checkId('12345678901234')
checkId('1234567890123456789')
checkId('12345678901234567a')
```
![](https://img2020.cnblogs.com/blog/2146100/202011/2146100-20201122164129105-735224602.png)

```js
        //匹配邮箱
        // 第一部分@ 第二部分 .com | cn | net
        function checkEmail(email){
            var reg  = /^\w+@\w+\.(com|cn|net|cc)$/gi;
            console.log(reg.test(email) ? "邮箱格式正确":"邮箱格式错误");
        }
        checkEmail("pphboy@qq.com")
        checkEmail("pphboy@123.com")
        checkEmail("pphboy@123com")
        checkEmail("pphboy123.com")
```

![](https://img2020.cnblogs.com/blog/2146100/202011/2146100-20201122164136293-2131441644.png)
