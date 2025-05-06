---
title: 记录一下第一次写 50行 SQL代码
date: 2020-10-08 09:20:00
---

#### 这 是一个电商项目，做的是报表的展示，我还以为要请求几次，结果，用一个SQL全部查完了
#### 下面是目标效果图
![](https://img2020.cnblogs.com/blog/2146100/202010/2146100-20201008091442556-1007071529.png)
#### 这是我的SQL代码
```sql
SELECT
	product.NAME,
product.price,
	pros.order_num,
	product.price * pros.count_product sum_price,
	ads.create_time,
	ads.contact_address,
	ads.contact_name,
	ads.contact_mobile
FROM
	product,
	(
		SELECT
			order_num,
			product_id,
			COUNT(product_id) count_product
		FROM
			order_item
		WHERE
			order_num = "O2020100500001"
		GROUP BY
			product_id
	) pros,
	(
		SELECT
			of.create_time,
			ot.product_id pid,
			of.contact_address,
			of.contact_name,
			of.contact_mobile
		FROM
			order_item ot,
			order_info of
		WHERE
		 of.order_num = "O2020100500001"
		AND ot.order_num = "O2020100500001"
	) ads
WHERE
	id IN (
		SELECT
			product_id
		FROM
			order_item
		WHERE
			order_num = "O2020100500001"
		GROUP BY
			product_id
	)
AND id = pros.product_id and id = ads.pid
group by id
```
#### 这是我的查询效果
![](https://img2020.cnblogs.com/blog/2146100/202010/2146100-20201008091702555-1723269620.png)
## 总结
1. 在sql之中，可以使用结果集做为表来查询（以前会，只不过忘了）
2. 在sql之中，可以使用这个嵌套查询来做为复杂查询（会牺牲效率，但鬼换取的是一劳永逸）
