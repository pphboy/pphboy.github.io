---
title: 如何查找一个为NULL的MYSQL字段
date: 2020-10-09 16:17:00
---

 -- 4、查询平均成绩小于60分的同学的学生编号和学生姓名和平均成绩        -- (包括有成绩的和无成绩的) 
### 前言：在做这个题目 https://www.cnblogs.com/pipihao/p/13786304.html
因为之前 我好像没有接触过什么 为NULL字段的查询，细节不小
### WHERE 字段 IS NULL 
### WHERE 字段 IS NOT NULL
##### 
```
# 这是数据查询的SQL
SELECT 
	s.*,(s1.`s_score`+s2.`s_score`+s3.`s_score`)/3 平均成绩
FROM 
	student s
LEFT JOIN score s1 ON s1.`s_id` = s.`s_id` AND s1.`c_id` = 01
LEFT JOIN score s2 ON s2.`s_id` = s.`s_id` AND s2.`c_id` = 02 
LEFT JOIN score s3 ON s3.`s_id` = s.`s_id` AND s3.`c_id` = 03
```
![](https://img2020.cnblogs.com/blog/2146100/202010/2146100-20201009161204920-372015533.png)

```
# 这是我自己之前写的SQL 
SELECT 
	s.*,(s1.`s_score`+s2.`s_score`+s3.`s_score`)/3 平均成绩
FROM 
	student s
LEFT JOIN score s1 ON s1.`s_id` = s.`s_id` AND s1.`c_id` = 01
LEFT JOIN score s2 ON s2.`s_id` = s.`s_id` AND s2.`c_id` = 02 
LEFT JOIN score s3 ON s3.`s_id` = s.`s_id` AND s3.`c_id` = 03
WHERE   (s1.`s_score`+s2.`s_score`+s3.`s_score`)/3 < 60 
```
![](https://img2020.cnblogs.com/blog/2146100/202010/2146100-20201009161402591-1478256604.png)

```
# 这是完善之后 的SQL 加了IS NULL 可以判断字段是否为NULL
SELECT 
	s.*,(s1.`s_score`+s2.`s_score`+s3.`s_score`)/3 平均成绩
FROM 
	student s
LEFT JOIN score s1 ON s1.`s_id` = s.`s_id` AND s1.`c_id` = 01
LEFT JOIN score s2 ON s2.`s_id` = s.`s_id` AND s2.`c_id` = 02 
LEFT JOIN score s3 ON s3.`s_id` = s.`s_id` AND s3.`c_id` = 03
WHERE   
	(s1.`s_score`+s2.`s_score`+s3.`s_score`)/3 < 60 
OR 
	(s1.`s_score`+s2.`s_score`+s3.`s_score`)/3 IS NULL
```
![](https://img2020.cnblogs.com/blog/2146100/202010/2146100-20201009161536745-779223655.png)
