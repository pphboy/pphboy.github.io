---
title: Go Web项目结构 + 基础代码
date: 2023-08-25 21:12:00
---

# Go Web工程


下面是项目的包图，可以通过包图来理清项目包的结构。

# Go Web工程


下面是项目的包图，可以通过包图来理清项目包的结构。

![image](https://img2023.cnblogs.com/blog/2146100/202308/2146100-20230825210636487-2029757761.png)


因为我是从Java转过来的，其实这种包的结构与Java的类似。Java是Controller、Service、Respository。

Go就变成了 api、service、dao， 其实也差不多，因为Go设计思想跟Java的区别还是很大，但本质还是通过架构来**解耦**。

## 路由配置

建立 `routes/router.go` 文件。 此文件用来配置api的URI，配置路由、路由分组、添加中间件。

```go
func InitRouter() http.Handler {

    r := gin.New()
    // 设置可信代理
    r.SetTrustedProxies([]string{"*"})    
    // 设置静态文件目录 
    r.Use(middleware.Logger())             // 自定义的 zap 日志中间件
	r.Use(middleware.ErrorRecovery(false)) // 自定义错误处理中间件
	r.Use(middleware.Cors())               // 跨域中间件
	
	// 需要鉴权的接口
	auth := base.Group("") // "/admin"
	// 需要鉴权的接口
	auth.Use(middleware.JWTAuth())      // JWT 鉴权中间件
	auth.Use(middleware.RBAC())         // casbin 权限中间件
	auth.Use(middleware.ListenOnline()) // 监听在线用户
	auth.Use(middleware.OperationLog()) // 记录操作日志
	
    // 路由配置
    page := auth.Group("/page")
	{
		page.GET("/list", pageAPI.GetList)  // 页面列表
		page.POST("", pageAPI.SaveOrUpdate) // 新增/编辑页面
		page.DELETE("", pageAPI.Delete)     // 删除页面
	}
	
    return r
}
```

## 数据库配置

```go
func InitMySQLDB() *gorm.DB {
	mysqlCfg := config.Cfg.Mysql
	dns := fmt.Sprintf("%s:%s@tcp(%s:%s)/%s?charset=utf8mb4&parseTime=True&loc=Local",
		mysqlCfg.Username,
		mysqlCfg.Password,
		mysqlCfg.Host,
		mysqlCfg.Port,
		mysqlCfg.Dbname,
	)

	db, err := gorm.Open(mysql.Open(dns), gormConfig())

	if err != nil {
		log.Fatal("MySQL 连接失败, 请检查参数")
	}

	log.Println("MySQL 连接成功")

	// 迁移数据表，在没有数据表结构变更时候，建议注释不执行
	// MakeMigrate(db)

	sqlDB, _ := db.DB()
	sqlDB.SetMaxIdleConns(10)                  // 设置连接池中的最大闲置连接
	sqlDB.SetMaxOpenConns(100)                 // 设置数据库的最大连接数量
	sqlDB.SetConnMaxLifetime(10 * time.Second) // 设置连接的最大可复用时间

	return db
}

// gorm 配置
func gormConfig() *gorm.Config {
	return &gorm.Config{
		// gorm 日志模式
		Logger: logger.Default.LogMode(getLogMode(config.Cfg.Mysql.LogMode)),
		// 禁用外键约束
		DisableForeignKeyConstraintWhenMigrating: true,
		// 禁用默认事务（提高运行速度）
		SkipDefaultTransaction: true,
		NamingStrategy: schema.NamingStrategy{
			// 使用单数表名，启用该选项，此时，`User` 的表名应该是 `user`
			SingularTable: true,
		},
	}
}

```

## 编码规范

这个主要是看人家怎么写的接口，怎么调用业务层。分析一下。

### Api

`routes/router.go`
```go
	auth.GET("/home", blogInfoAPI.GetHomeInfo) // 后台首页信息
```

**注：这里的API层非常的简单，只是对于 Service的一个调用**

`api/v1/home.go`
```go
func (*BlogInfo) GetHomeInfo(c *gin.Context) {
	r.SuccessData(c, blogInfoService.GetHomeInfo())
}
```

#### RESTFul 返回操作

在`utils\r\result.go` 为 `*gin.Context` 实现了返回的方法，因为使用的是指针，所以不需要返回值，可以直接进行传递函数调用。
```go
// 返回 JSON 数据
func ReturnJson(c *gin.Context, httpCode, code int, msg string, data any) {
	// c.Header("", "") // 根据需要在头部添加其他信息
	c.JSON(httpCode, Response{
		Code:    code,
		Message: msg,
		Data:    data,
	})
}
// 语法糖函数封装

// 自定义 httpCode, code, data
func Send(c *gin.Context, httpCode, code int, data any) {
	ReturnJson(c, httpCode, code, GetMsg(code), data)
}

// 自动根据 code 获取 message, 且 data == nil
func SendCode(c *gin.Context, code int) {
	Send(c, http.StatusOK, code, nil)
}

// 自动根据 code 获取 message, 且 data != nil
func SendData(c *gin.Context, code int, data any) {
	Send(c, http.StatusOK, code, data)
}

func SuccessData(c *gin.Context, data any) {
	Send(c, http.StatusOK, OK, data)
}

func Success(c *gin.Context) {
	Send(c, http.StatusOK, OK, nil)
}

```

### Service

因为在Api内调用的Service服务，返回的都是需要反序列化为Json的View Object，这个VO放在Model内，用于在持久层查询的Model也放在model里。感觉有点混乱，看可不可能把VO放在 service包里。

VO的目的就是把格式变成符合URI业务需求的一个结构体。把一些数据放到里面。

```go
// 根据 [文章id] 获取 [文章详情]
func (*Article) GetInfo(id int) resp.ArticleDetailVO {
	article := dao.GetOne(model.Article{}, "id", id)
	category := dao.GetOne(model.Category{}, "id", article.CategoryId)
	tagNames := tagDao.GetTagNamesByArtId(id)

	articleVo := utils.CopyProperties[resp.ArticleDetailVO](article)
	// 前端 category 为 '' 不显示 placeholder, 为 null 显示 placeholder
	if category.ID != 0 {
		articleVo.CategoryName = &category.Name
	}
	articleVo.TagNames = tagNames
	return articleVo
}
```

### Dao 

Dao层的所有方法或函数

<mark>注：</mark>

1. 不具有普适性的函数功能，应变成某个结构体的方法，变成方法后仅能其结构体初始化的变量调用
2. 反之，则可以使用泛型

####  如何给 Dao包全局变量 `dao.DB` 赋值。

在`dao`包下，所有的使用到`DB`变量的go代码文件内，直接声明`var DB *gorm.DB`全局变量 。

在`route`初始函数里，对`dao`包的`DB`变量 也就是 `dao.DB` 进行赋值，赋的值，也就是关于初始化的`gorm.DB`。

`routes/router.go` 初始化全局变量

```go
// 初始化全局变量
func InitGlobalVariable() {
	// 初始化 Viper
	utils.InitViper()
	// 初始化 Logger
	utils.InitLogger()
	// 初始化数据库 DB
	dao.DB = utils.InitMySQLDB() // 需要先导入 gvb.sql
	// dao.DB = utils.InitSQLiteDB("gorm.db") // TODO: 默认无数据，暂时无法使用
	// 初始化 Redis
	utils.InitRedis()
	// 初始化 Casbin
	utils.InitCasbin(dao.DB)
}

```


#### 基于泛型的普适型写法

这样，其使用Model进行创建的时候，就不需要指定类型了。非常方便用于简单的业务。如果很多业务的CURD都有共同特性，那么也可以如此。

```go
func Create[T any](data *T) {
	err := DB.Create(&data).Error
	if err != nil {
		panic(err)
	}
}
```

#### 针对特定结构体的写法

Views Object居然也被用于在Model进行查询，这个我感觉没必要。因为实体结构体与视力结构体应有所区分。

```go
func (*Article) GetInfoById(id int) (res resp.FrontArticleDetailVO) {
	DB.Table("article").
		Preload("Category").
		Preload("Tags").
		Where("id = ? AND is_delete = 0 AND status = 1", id).
		First(&res)
	return
}
```

### 中间件

鉴权的原理就是，拦截一条线路，然后判断每次请求访问此条线路的权限。

根据我们开发时，我们的开发习惯是，基于一个原始URI为一组路由，这个原始URI就是我们鉴权的根据点。

例如 需要检查 `/sys`下所有的接口是否已登录，则 与`/sys/**` 匹配都会被进行鉴权。

<mark>就是钩子，一层一层的拦截</mark>


![image](https://img2023.cnblogs.com/blog/2146100/202308/2146100-20230825210710941-389810573.png)



```go

// 需要鉴权的接口
auth := base.Group("") // "/admin"
// !注意使用中间件的顺序
auth.Use(middleware.JWTAuth())      // JWT 鉴权中间件
auth.Use(middleware.RBAC())         // casbin 权限中间件
auth.Use(middleware.ListenOnline()) // 监听在线用户
auth.Use(middleware.OperationLog()) // 记录操作日志

```

#### Cors 跨域处理

这个就是使用别人写好的中间件，地址在: [cors](https://github.com/gin-contrib/cors)

[cros.go](https://github.com/gin-contrib/cors/blob/master/examples/example.go)

```go
// 跨域中间件
func Cors() gin.HandlerFunc {
	return cors.New(cors.Config{
		// 允许跨域请求网站
		AllowOrigins: []string{"*"},
		// 允许使用的请求方式
		AllowMethods: []string{"PUT", "POST", "GET", "DELETE", "OPTIONS", "PATCH"},
		// 允许使用的请求头
		AllowHeaders: []string{"Origin", "Authorization", "Content-Type", "X-Requested-With"},
		// 暴露的请求头
		ExposeHeaders: []string{"Content-Type"},
		// 凭证共享
		AllowCredentials: true,
		// 允许跨域的源网站
		AllowOriginFunc: func(origin string) bool {
			return true
		},
		// 超时时间设定
		MaxAge: 24 * time.Hour,
	})
}
```

#### Middleware 小结

Go语言里，函数也是一个值，可以直接转送匿名函数作为值。

中间件的写法就是

`middleware/XXX.go`
```go
func XXX() gin.HandlerFunc {
    return func(c *gin.Context) {
        // anything else
    }
}
```

将XXX挂在哪个基础的URI上。

`routes/router.go`
```go
sys := router.Group("/sys")
sys.Use(middleware.XXX())
```
### 模板技术

渲染这是一个常用的技术。

```go

// 指定导入模板的目录
router.LoadHTMLGlob("template/*")

```

测试模板渲染的代码
```go
router.GET("/index", func(c *gin.Context) {
    c.HTML(http.StatusOK, "index.html", gin.H{"title": "我是测试", "ce": "123456"})
})
```

模板代码

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>{{.title}}</title>
</head>
    <body>
        Number: <h1>{{.ce}}</h1>
    </body>
</html>
```

头尾分离，模块化写法
注 ： 需要提前定义好 `public/header`,`public/footer`

[Gin HTML 渲染模板：https://www.topgoer.cn/docs/ginkuangjia/ginhtmlxuanran ](https://www.topgoer.cn/docs/ginkuangjia/ginhtmlxuanran)

```html
{{ define "user/index.html" }}
{{template "public/header" .}}
        Address: {{.address}}
{{template "public/footer" .}}
{{ end }}
```






因为我是从Java转过来的，其实这种包的结构与Java的类似。Java是Controller、Service、Respository。

Go就变成了 api、service、dao， 其实也差不多，因为Go设计思想跟Java的区别还是很大，但本质还是通过架构来**解耦**。

## 路由配置

建立 `routes/router.go` 文件。 此文件用来配置api的URI，配置路由、路由分组、添加中间件。

```go
func InitRouter() http.Handler {

    r := gin.New()
    // 设置可信代理
    r.SetTrustedProxies([]string{"*"})    
    // 设置静态文件目录 
    r.Use(middleware.Logger())             // 自定义的 zap 日志中间件
	r.Use(middleware.ErrorRecovery(false)) // 自定义错误处理中间件
	r.Use(middleware.Cors())               // 跨域中间件
	
	// 需要鉴权的接口
	auth := base.Group("") // "/admin"
	// 需要鉴权的接口
	auth.Use(middleware.JWTAuth())      // JWT 鉴权中间件
	auth.Use(middleware.RBAC())         // casbin 权限中间件
	auth.Use(middleware.ListenOnline()) // 监听在线用户
	auth.Use(middleware.OperationLog()) // 记录操作日志
	
    // 路由配置
    page := auth.Group("/page")
	{
		page.GET("/list", pageAPI.GetList)  // 页面列表
		page.POST("", pageAPI.SaveOrUpdate) // 新增/编辑页面
		page.DELETE("", pageAPI.Delete)     // 删除页面
	}
	
    return r
}
```

## 数据库配置

```go
func InitMySQLDB() *gorm.DB {
	mysqlCfg := config.Cfg.Mysql
	dns := fmt.Sprintf("%s:%s@tcp(%s:%s)/%s?charset=utf8mb4&parseTime=True&loc=Local",
		mysqlCfg.Username,
		mysqlCfg.Password,
		mysqlCfg.Host,
		mysqlCfg.Port,
		mysqlCfg.Dbname,
	)

	db, err := gorm.Open(mysql.Open(dns), gormConfig())

	if err != nil {
		log.Fatal("MySQL 连接失败, 请检查参数")
	}

	log.Println("MySQL 连接成功")

	// 迁移数据表，在没有数据表结构变更时候，建议注释不执行
	// MakeMigrate(db)

	sqlDB, _ := db.DB()
	sqlDB.SetMaxIdleConns(10)                  // 设置连接池中的最大闲置连接
	sqlDB.SetMaxOpenConns(100)                 // 设置数据库的最大连接数量
	sqlDB.SetConnMaxLifetime(10 * time.Second) // 设置连接的最大可复用时间

	return db
}

// gorm 配置
func gormConfig() *gorm.Config {
	return &gorm.Config{
		// gorm 日志模式
		Logger: logger.Default.LogMode(getLogMode(config.Cfg.Mysql.LogMode)),
		// 禁用外键约束
		DisableForeignKeyConstraintWhenMigrating: true,
		// 禁用默认事务（提高运行速度）
		SkipDefaultTransaction: true,
		NamingStrategy: schema.NamingStrategy{
			// 使用单数表名，启用该选项，此时，`User` 的表名应该是 `user`
			SingularTable: true,
		},
	}
}

```

## 编码规范

这个主要是看人家怎么写的接口，怎么调用业务层。分析一下。

### Api

`routes/router.go`
```go
	auth.GET("/home", blogInfoAPI.GetHomeInfo) // 后台首页信息
```

**注：这里的API层非常的简单，只是对于 Service的一个调用**

`api/v1/home.go`
```go
func (*BlogInfo) GetHomeInfo(c *gin.Context) {
	r.SuccessData(c, blogInfoService.GetHomeInfo())
}
```

#### RESTFul 返回操作

在`utils\r\result.go` 为 `*gin.Context` 实现了返回的方法，因为使用的是指针，所以不需要返回值，可以直接进行传递函数调用。
```go
// 返回 JSON 数据
func ReturnJson(c *gin.Context, httpCode, code int, msg string, data any) {
	// c.Header("", "") // 根据需要在头部添加其他信息
	c.JSON(httpCode, Response{
		Code:    code,
		Message: msg,
		Data:    data,
	})
}
// 语法糖函数封装

// 自定义 httpCode, code, data
func Send(c *gin.Context, httpCode, code int, data any) {
	ReturnJson(c, httpCode, code, GetMsg(code), data)
}

// 自动根据 code 获取 message, 且 data == nil
func SendCode(c *gin.Context, code int) {
	Send(c, http.StatusOK, code, nil)
}

// 自动根据 code 获取 message, 且 data != nil
func SendData(c *gin.Context, code int, data any) {
	Send(c, http.StatusOK, code, data)
}

func SuccessData(c *gin.Context, data any) {
	Send(c, http.StatusOK, OK, data)
}

func Success(c *gin.Context) {
	Send(c, http.StatusOK, OK, nil)
}

```

### Service

因为在Api内调用的Service服务，返回的都是需要反序列化为Json的View Object，这个VO放在Model内，用于在持久层查询的Model也放在model里。感觉有点混乱，看可不可能把VO放在 service包里。

VO的目的就是把格式变成符合URI业务需求的一个结构体。把一些数据放到里面。

```go
// 根据 [文章id] 获取 [文章详情]
func (*Article) GetInfo(id int) resp.ArticleDetailVO {
	article := dao.GetOne(model.Article{}, "id", id)
	category := dao.GetOne(model.Category{}, "id", article.CategoryId)
	tagNames := tagDao.GetTagNamesByArtId(id)

	articleVo := utils.CopyProperties[resp.ArticleDetailVO](article)
	// 前端 category 为 '' 不显示 placeholder, 为 null 显示 placeholder
	if category.ID != 0 {
		articleVo.CategoryName = &category.Name
	}
	articleVo.TagNames = tagNames
	return articleVo
}
```

### Dao 

Dao层的所有方法或函数

<mark>注：</mark>

1. 不具有普适性的函数功能，应变成某个结构体的方法，变成方法后仅能其结构体初始化的变量调用
2. 反之，则可以使用泛型

####  如何给 Dao包全局变量 `dao.DB` 赋值。

在`dao`包下，所有的使用到`DB`变量的go代码文件内，直接声明`var DB *gorm.DB`全局变量 。

在`route`初始函数里，对`dao`包的`DB`变量 也就是 `dao.DB` 进行赋值，赋的值，也就是关于初始化的`gorm.DB`。

`routes/router.go` 初始化全局变量

```go
// 初始化全局变量
func InitGlobalVariable() {
	// 初始化 Viper
	utils.InitViper()
	// 初始化 Logger
	utils.InitLogger()
	// 初始化数据库 DB
	dao.DB = utils.InitMySQLDB() // 需要先导入 gvb.sql
	// dao.DB = utils.InitSQLiteDB("gorm.db") // TODO: 默认无数据，暂时无法使用
	// 初始化 Redis
	utils.InitRedis()
	// 初始化 Casbin
	utils.InitCasbin(dao.DB)
}

```


#### 基于泛型的普适型写法

这样，其使用Model进行创建的时候，就不需要指定类型了。非常方便用于简单的业务。如果很多业务的CURD都有共同特性，那么也可以如此。

```go
func Create[T any](data *T) {
	err := DB.Create(&data).Error
	if err != nil {
		panic(err)
	}
}
```

#### 针对特定结构体的写法

Views Object居然也被用于在Model进行查询，这个我感觉没必要。因为实体结构体与视力结构体应有所区分。

```go
func (*Article) GetInfoById(id int) (res resp.FrontArticleDetailVO) {
	DB.Table("article").
		Preload("Category").
		Preload("Tags").
		Where("id = ? AND is_delete = 0 AND status = 1", id).
		First(&res)
	return
}
```

### 中间件

鉴权的原理就是，拦截一条线路，然后判断每次请求访问此条线路的权限。

根据我们开发时，我们的开发习惯是，基于一个原始URI为一组路由，这个原始URI就是我们鉴权的根据点。

例如 需要检查 `/sys`下所有的接口是否已登录，则 与`/sys/**` 匹配都会被进行鉴权。

<mark>就是钩子，一层一层的拦截</mark>

![](vx_images/314093520260183.png)


```go

// 需要鉴权的接口
auth := base.Group("") // "/admin"
// !注意使用中间件的顺序
auth.Use(middleware.JWTAuth())      // JWT 鉴权中间件
auth.Use(middleware.RBAC())         // casbin 权限中间件
auth.Use(middleware.ListenOnline()) // 监听在线用户
auth.Use(middleware.OperationLog()) // 记录操作日志

```

#### Cors 跨域处理

这个就是使用别人写好的中间件，地址在: [cors](https://github.com/gin-contrib/cors)

[cros.go](https://github.com/gin-contrib/cors/blob/master/examples/example.go)

```go
// 跨域中间件
func Cors() gin.HandlerFunc {
	return cors.New(cors.Config{
		// 允许跨域请求网站
		AllowOrigins: []string{"*"},
		// 允许使用的请求方式
		AllowMethods: []string{"PUT", "POST", "GET", "DELETE", "OPTIONS", "PATCH"},
		// 允许使用的请求头
		AllowHeaders: []string{"Origin", "Authorization", "Content-Type", "X-Requested-With"},
		// 暴露的请求头
		ExposeHeaders: []string{"Content-Type"},
		// 凭证共享
		AllowCredentials: true,
		// 允许跨域的源网站
		AllowOriginFunc: func(origin string) bool {
			return true
		},
		// 超时时间设定
		MaxAge: 24 * time.Hour,
	})
}
```

#### Middleware 小结

Go语言里，函数也是一个值，可以直接转送匿名函数作为值。

中间件的写法就是

`middleware/XXX.go`
```go
func XXX() gin.HandlerFunc {
    return func(c *gin.Context) {
        // anything else
    }
}
```

将XXX挂在哪个基础的URI上。

`routes/router.go`
```go
sys := router.Group("/sys")
sys.Use(middleware.XXX())
```
### 模板技术

渲染这是一个常用的技术。

```go

// 指定导入模板的目录
router.LoadHTMLGlob("template/*")

```

测试模板渲染的代码
```go
router.GET("/index", func(c *gin.Context) {
    c.HTML(http.StatusOK, "index.html", gin.H{"title": "我是测试", "ce": "123456"})
})
```

模板代码

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>{{.title}}</title>
</head>
    <body>
        Number: <h1>{{.ce}}</h1>
    </body>
</html>
```

头尾分离，模块化写法
注 ： 需要提前定义好 `public/header`,`public/footer`

[Gin HTML 渲染模板：https://www.topgoer.cn/docs/ginkuangjia/ginhtmlxuanran ](https://www.topgoer.cn/docs/ginkuangjia/ginhtmlxuanran)

```html
{{ define "user/index.html" }}
{{template "public/header" .}}
        Address: {{.address}}
{{template "public/footer" .}}
{{ end }}
```

致谢:

[https://github.com/szluyu99/gin-vue-blog](https://github.com/szluyu99/gin-vue-blog)


GIN

GORM
