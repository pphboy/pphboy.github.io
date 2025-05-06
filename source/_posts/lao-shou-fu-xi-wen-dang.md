---
title: Mybatis老手复习文档
date: 2020-10-15 16:09:00
---

# Mybatis学习笔记

再次学习Mybatis，日后，有时间会把这个文档更新，改的越来越好，然后，改成新手老手通用的文档

# 1、我的认识

**Mybatis 是一个持久层框架，（之前 我虽然学了这个mybatis但一直 没有深入的学习，只是达到会用的程度，没有写过什么笔记，后来转jpa+hibernate和tk.mybatis）,用jpa用久了之后，需要用到mybatis时候才来用的mybatis**

* mybatis永不过时
* 经常听说人家说mybatis效率不高，可是 这几天重学mybatis我发现，mybatis对于某些细节上做的是非常不错的，虽然，这些在jpa内都可以使用注解 来做，但是，对于快捷的持久层框架来说，灵活又强大，才能使一个框架走的越远
* 动态SQL的细节，是我最喜欢mybatis的地方，因为，使用mybatis的动态sql标签，你可以做很多，“骚操作”例如使用那些动态sql标签来简化的你的业务的冗余代码===我目前发现，框架好像都在做一件事`解耦`

下面是maven坐标

```xml
<!-- https://mvnrepository.com/artifact/org.mybatis/mybatis -->
<dependency>
    <groupId>org.mybatis</groupId>
    <artifactId>mybatis</artifactId>
    <version>3.4.6</version>
</dependency>
```

# 2、一个Mybatis的开始

官网其实很详细： https://mybatis.org/mybatis-3/zh/configuration.html

不过我要做的是更简单化的复习mybatis框架

```java
package com.pipihao.pojo;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;
import java.util.Date;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Blog implements Serializable {
    private String id;
    private String title;
    private String author;
    private Date createTime;
    private int view;
}

```



**首先是mybatis-config.xml配置文件，这个文件主要是用的配置mybatis的一些操作，例如：扫描一个xxx.xxx.mapper的包**

``` xml
<?xml version="1.0" encoding="UTF-8" ?>
<!DOCTYPE configuration
        PUBLIC "-//mybatis.org//DTD Config 3.0//EN"
        "http://mybatis.org/dtd/mybatis-3-config.dtd">
<configuration>
    <!--对应下面 development配置信息-->
    <properties resource="db.properties" />
    <settings>
        <!--配置日志应用-->
        <setting name="logImpl" value="LOG4J"/>
        <!--开启自动的大小写转换-->
        <!--官网的解释:开启驼峰命名自动映射，即从经典数据库列名 A_COLUMN 映射到经典 Java 属性名 aColumn。-->
        <setting name="mapUnderscoreToCamelCase" value="true"/>
        <!--开启缓存，默认是开启的-->
        <setting name="cacheEnabled" value="true"/>
    </settings>
    <!--扫描当前包下的 所有java bean 然后取成别名 Text => text 类似这样的别名，使用的时候也要可以使用text作为别名-->
    <typeAliases>
        <package name="com.pipihao.pojo"/>
    </typeAliases>
    <!--基本配置信息不作解释-->
    <environments default="development">
        <environment id="development">
            <transactionManager type="JDBC"/>
            <dataSource type="POOLED">
                <property name="driver" value="${driver}"/>
                <property name="url" value="${url}"/>
                <property name="username" value="${username}"/>
                <property name="password" value="${password}"/>
            </dataSource>
        </environment>
    </environments>
    <!-- 配置mapper类，用的这个package是扫描mapper包下所有的mapper类-->
    <mappers>
        <package name="com.pipihao.mapper"/>
    </mappers>
</configuration>
```

# 3、一个例子

首先我们得写一个XxxMapper类，下面我以BlogMapper为例

```java
package com.pipihao.mapper;

import com.pipihao.pojo.Blog;
import org.apache.ibatis.annotations.Param;

import java.util.List;
import java.util.Map;

public interface BlogMapper {

    Blog findBlogById(int id);
}

```

在这个类目录的下面要配置一个BlogMapper.xml

```xml
<?xml version="1.0" encoding="UTF-8" ?>
<!DOCTYPE mapper
        PUBLIC "-//mybatis.org//DTD Config 3.0//EN"
        "http://mybatis.org/dtd/mybatis-3-mapper.dtd">
<mapper namespace="com.pipihao.mapper.BlogMapper">
	<!--就是这一个标签二级缓存-->
    <cache/>
<!--
	这个resutlType指定返回值的类型，使用的是类的别名，因为我们在上面的mybatis-config.xml中配置了自动扫描
	resultMap 是使用指定返回值的映射配置 id,这个在后面会讲，
	！！且 resultType和resultMap不能混用，不然会报错
	parameterType 是指定参数在官网表内指定了这个参数的
-->
    <select id="findBlogById" resultType="blog" parameterType="int">
        select * from blog where id = #{id}
    </select>
</mapper>
```

# 4、配置配置解析

<u>其实我个人觉得这个配置文件，的太多细节在这个官方文档内，而我目前主要是记录下一些 常用的</u>

- [ ] **db.properties配置文件：properties文件的优先级大于mybatis-config.xml内 的properties的property的优先级，不过一般多是在db.properties配置好，然后在mybatis-config.xml中引入直接使用**

configuration（配置）

- [properties（属性）](https://mybatis.org/mybatis-3/zh/configuration.html#properties)
- [settings（设置）](https://mybatis.org/mybatis-3/zh/configuration.html#settings)
- [typeAliases（类型别名）](https://mybatis.org/mybatis-3/zh/configuration.html#typeAliases)
- [typeHandlers（类型处理器）](https://mybatis.org/mybatis-3/zh/configuration.html#typeHandlers)
- environments（环境配置）
  - environment（环境变量）
    - transactionManager（事务管理器）
    - dataSource（数据源）
- [mappers（映射器）](https://mybatis.org/mybatis-3/zh/configuration.html#mappers)

# 5、配置映射

**如果你的字段名和mysql的字段名都是规范的对应命名**

**例如： JavaBean的命名createTime ，mysql的字段命名create_time**

**这样则大多数不需要配置映射，只需要开在mybatis-config.xml中的setting中开启一个值即可**

```xml
<settings>
    <!--开启自动的大小写转换-->
    <!--官网的解释:开启驼峰命名自动映射，即从经典数据库列名 A_COLUMN 映射到经典 Java 属性名 aColumn。-->
    <setting name="mapUnderscoreToCamelCase" value="true"/>
</settings>
```

希望你是使用的规范命名，不然你的代码会显得很low

#### 如何配置映射

```xml
<?xml version="1.0" encoding="UTF-8" ?>
<!DOCTYPE mapper
        PUBLIC "-//mybatis.org//DTD Config 3.0//EN"
        "http://mybatis.org/dtd/mybatis-3-mapper.dtd">
<mapper namespace="com.pipihao.mapper.TeacherMapper">

    <select id="getTeacherByid" resultMap="testName">
       	select * from blog where id = #{id}
    </select>

    <!--这个id就是一个别名，用来 使用这个映射的名字而已,id的名字可以自定义，且resultMap		   则可以通过这个id来使用这个映射
		type是指定一个映射的严刑，目前是使用的是在mapper中配置扫描的pojo类的别名
		如果为id可以使用<id>标签
		property是对应类的属性名，column是对应数据库表的字段名
       		private String id;
            private String title;
            private String author;
            private Date createTime;
            private int view;
	-->
    <resultMap id="testName" type="blogs">
        <id property="id" column="id"/>
        <result property="author" column="author"/>
        <result property="title" column="title"/>
        <!--mysql建议使用规范命名-->
        <result property="createTime" column="create_time"/>
        <result property="view" column="view"/>
    </resultMap>
</mapper>
```



# 6、日志

* 主要是log4j 还有 配置

```xml
<?xml version="1.0" encoding="UTF-8" ?>
<!DOCTYPE configuration
        PUBLIC "-//mybatis.org//DTD Config 3.0//EN"
        "http://mybatis.org/dtd/mybatis-3-config.dtd">
<configuration>
    <settings>
        <!--
			这里配置的是LOG4J的名字，且setting的name不能出错，不然，很难查错
			字段内更不能出现这个空格
		-->
        <setting name="logImpl" value="LOG4J"/>
    </settings>
</configuration>
```

# 7、分页

**mybatis提供了一个rowBunds分页，不过仔细看了之后，发现还不如使用mysql的分页，缺点是增加了代码量，然后该做还是要做，并没有省什么操作（这里我建议，要么使用PageHelper,要么自己做原生的分页查询）**

原生分页

```xml
<select id="findBlogById" >
    select * from blog where id = #{tid} limit #{page},#{rows}
</select>
```

RowBunds

```xml
<select id="findBlogById" >
    select * from blog
</select>
```

```java
RowBounds rowBounds = new RowBounds(0,2);
List<Blog> rolesByrowBounds = mapper.findBlogById(rowBounds);
System.out.println(rolesByrowBounds.size());
```

# 8、使用注解开发

主要是注解开发也可以达到跟xml配置一样的 效果，所以在以后 的开发之中，大多数使用的是注解开发，但不过，xml，永不过时

@Select @Insert @Update @Delete

```java
public interface StudentMapper {
    @Select("select * from student where id = #{sid}")
    Students getStudentById(@Param("sid")int sid);
}
```

这个再提一下@Results 注解，这个是可以在注解实现和resultMap一样功能的注解，也可以设置id，可以复用

下面这个 是复制网上，大概知道这个有这个东西就可以了

```java
@Results(id="groupWithUsers",
         value = { 
            @Result(property = "groupId", column = "group_id", id = true),
            @Result(property = "name", column = "name"), 
            @Result(property = "accountId", column = "account_id"),
            @Result(property = "deleteFlag", column = "delete_Flag"),
            @Result(property = "parentId", column = "parent_Id"), 
            @Result(property = "userList", javaType=List.class, many =@Many(select="selectUsersByGroupId"), column = "group_id")})
//查询
@Select({"select * from group where account_id=#{accountId} and delete_flag=0"})
List<Group> selectGroupWithUsers(@Param("accountId") String accountId);
```



# 9、多对一处理

```xml
<mapper namespace="com.pipihao.mapper.StudentMapper">
    <select id="getStudentById" resultType="students">
        select * from student where tid = #{sid}
    </select>
    <resultMap id="stuteac" type="students">
        <result property="id" column="id"/>
        <result property="name" column="name"/>
        <association property="teacher" column="tid" javaType="teacher" select="com.pipihao.mapper.TeacherMapper.getTeacherById">
        </association>
    </resultMap>
</mapper>
```

# 10、一对多处理

主要还是看怎么用

```xml
<?xml version="1.0" encoding="UTF-8" ?>
<!DOCTYPE mapper
        PUBLIC "-//mybatis.org//DTD Config 3.0//EN"
        "http://mybatis.org/dtd/mybatis-3-mapper.dtd">
<mapper namespace="com.pipihao.mapper.TeacherMapper">
    <select id="getTeacherById" resultMap="teacherStudent">
        select * from teacher where id = #{tid}
    </select>

    <resultMap id="teacherStudent" type="teacher">
        <result column="id" property="id"/>
        <result column="name" property="name"/>
        <collection property="studentsList"
                    javaType="ArrayList"
                    column="id"
                    ofType="students"                    select="com.pipihao.mapper.StudentMapper.getStudentById">
        </collection>
    </resultMap>

    <select id="getTeacherByid" resultMap="teacherP">
        SELECT s.id sid,s.name sname,s.tid tid,t.name tname
        FROM teacher t,student s
        WHERE s.tid = t.id
        AND t.id = #{tid}
    </select>
    <resultMap id="teacherP" type="teacher">
        <id property="id" column="tid"/>
        <result property="name" column="tname"/>
        <collection property="studentsList" ofType="students">
            <result property="id" column="sid"/>
            <result property="name" column="sname"/>
            <result property="tid" column="tid"/>
        </collection>
    </resultMap>
</mapper>
```



#### 小结：

1. 关联-association [多对一]
2. 集合-collection [一对多]
3. javaType & ofType 
   1. javaType 用来指定实体类中属性的类型
   2. ofType用来指定映射到List或者集合中的pojo类型，泛型中的约束类型！

* 注意点：
  1. 保证 Sql的可读性，尽量保证通俗易懂
  2. 注意一对多和我对一中，属性我和字段的问题
  3. 如果问题不好排查错误，可以使用日志 ，建议使用Log4j
* 以后 要学 Mysql引擎，InnoDB底层原理， 索引 ，索引优化

# 11、 动态SQL

```tex
mapUnderscoreToCamelCase	是否开启驼峰命名自动映射，即从经典数据库列名 A_COLUMN 映射到经典 Java 属性名 aColumn。	true | false	False
```

choose我没有设置了，因为 choose是类似于一个switch case一次只会选择一个条件语句进行执行

```html
<select id="findActiveBlogLike"
     resultType="Blog">
  SELECT * FROM BLOG WHERE state = ‘ACTIVE’
  <choose>
    <when test="title != null">
      AND title like #{title}
    </when>
    <when test="author != null and author.name != null">
      AND author_name like #{author.name}
    </when>
    <otherwise>
      AND featured = 1
    </otherwise>
  </choose>
</select>
```

<font color="red" font-size="40px">动态SQL就是在拼接SQL语句，我们只要保证SQL的正确性，按照SQL的格式，去排列组合就可以了。</font>

```xml
<?xml version="1.0" encoding="UTF-8" ?>
<!DOCTYPE mapper
        PUBLIC "-//mybatis.org//DTD Config 3.0//EN"
        "http://mybatis.org/dtd/mybatis-3-mapper.dtd">
<mapper namespace="com.pipihao.mapper.BlogMapper">

    <cache/>
    <insert id="sendBlog" >
        insert into blog (id,title,author,create_time,view) values (
            #{id},#{title},#{author},#{createTime},#{view}
        );
    </insert>

    <select id="findBlogByMap" resultType="blog" parameterType="map">
        select * from blog
        <where>
            <include refid="ifsql"></include>
        </where>
    </select>
    <sql id="ifsql">
        <if test="title != null">
            and title = #{title}
        </if>
        <if test="author != null">
            and  author= #{author}
        </if>
    </sql>

    <update id="updateBlog" parameterType="map">
        update blog
        <set>
            <if test="title != null">title=#{title}</if>
            <if test="author != null">title=#{author}</if>
        </set>
        where id = #{id}
    </update>
    
    <select id="findBlogByList"  resultType="blog">
        select * from blog
        <where>
            <foreach collection="ids" item="id" open="and ( " separator="or" close=")">
                id = #{id}
            </foreach>
        </where>
    </select>

</mapper>
```

,choose,when,otherwise 这个类似switch case一次只会执行一个条件，本命的不执行

```xml
<select id="findBlogByMap" resultType="blog" parameterType="map">
    select * from blog
    <choose>
       <when test="title != null">
            and title = #{title}
        </when>
        <when test="author != null">
            and  author= #{author}
        </when>
        <otherwise> <!--类似default-->
          AND featured = 1
        </otherwise>
    </choose>
</select>
```

trim, 可以 给SQL语句加上前缀和后缀，然后，也可以去除某些前缀或后缀

```xml
<select id="selectUsersTrim" resultMap="resultListUsers" parameterType="Users">
    select * from users
    <trim prefix="where" prefixOverrides="and">
        <if test="name!=null">
            name=#{name}
        </if>
        <if test="address!=null">
            and address=#{address}
        </if>
    </trim>
</select>
```

foreach,可以遍历拼接sql

```xml
<select id="findBlogByList"  resultType="blog">
    select * from blog
    <where>
        <foreach collection="ids" item="id" open="and ( " separator="or" close=")">
            id = #{id}
        </foreach>
    </where>
</select>
```

```java
List<Blog> findBlogByList(@Param("ids")List<String> ids);
```

include,sql 增加mybatis的xml配置的复用性

```xml
<select id="findBlogByMap" resultType="blog" parameterType="map">
    select * from blog
    <where>
        <include refid="ifsql"></include>
    </where>
</select>
<sql id="ifsql">
    <if test="title != null">
        and title = #{title}
    </if>
    <if test="author != null">
        and  author= #{author}
    </if>
</sql>
```

where,if 和上面的代码意义相同，只是上面的代码，在业务复杂的情况下，耦合度更低

```xml
<select id="findBlogByMap" resultType="blog" parameterType="map">
    select * from blog
    <where>
       <if test="title != null">
            and title = #{title}
        </if>
        <if test="author != null">
            and  author= #{author}
        </if>
    </where>
</select>
```

建议：

* 先在Mysql中写出完整的SQL，再对应的去修改成为我们的动态 SQL实现通用即可！

# 12、缓存

这个在上面的配置文件配置了

### 一级缓存

默认开启的

小结：一极缓存黑夜是开启的，只在一次SqlSession中有效，也就是拿到连接到关闭连接这个区间段！一级缓存就相当于一个Map

### 二级缓存

| 设置名       | 描述                                                     | 有效值        | 默认值 |
| :----------- | :------------------------------------------------------- | :------------ | :----- |
| cacheEnabled | 全局性地开启或关闭所有映射器配置文件中已配置的任何缓存。 | true \| false | true   |

小结：

* 只要开启了二级缓存，在同一个Mapper下就有效
* 所有的数据都会先放在一级缓存中
* 只有当会话提交，或者的时候，才会提交到二级缓存中！

### 小结：

1. Mybatis相比于JPA的各种无根报错， 我倒觉得mybatis更加好用，因为我之前是重度的JPA用户，使用Mybatis不仅可以 提升自己的SQL水平，而且通过动态SQL还可以增加自己的业务水平上限
2. Mybatis的优点：快捷、易于学习、功能强大（虽然现在有REDIS这样的极限工具）但是，mybatis还是可以使用他自带的缓存，因为 一般的小项目可能大多数都可以使用他自带的二级缓存。
3. 且Mybatis的还是有一定的插件生态的，pagehelper,mybatis plus都是经典，相对持久层而言，如果 项目 不是特别大，我个人而言还是会优先使用 mybatis
4. JPA的熟练度也不高，只是达到那种CRUD的水平，难一点， 的优化我也不会，以后一定会的
5. 加个油，有错误请大佬指出，谢谢