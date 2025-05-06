---
title: MySQL的执行顺序
date: 2021-08-01 16:31:00
---


MySQL语句一共分为11步，最先执行的是FROM操作，最后执行的是LIMIT操作，其中每一个操作都会产生一张虚拟的表，这个虚拟的表作为一个处理的输入，只是虚拟的表对用户来说是透明的，只有最后一个虚拟表会被作为结果返回，如果没有在语句中指定某一个子句，那么将会跳过相应的步骤。

```mysql
(8) SELECT 
	(9) DISTINCT<Select_list>
(1) FROM <LEFT_TABLE>
(3) <join type> JOIN <right_table>
(2)	ON <join_condition>
(4) WHERE <where_condition>
(5) GROUP BY <grou_by_list>
(6) WITH {CUBE|ROLLUP}
(7) HAVING <having_condition>
(10) ORDER BY <order_by_list>
(11) LIMIT <limit_number>
```

**详情：**

1. FROM : 对 FROM 的左边的表和右边的表计算笛卡尔积，产生虚表VT1
2. ON：对虚表VT1 进行ON筛选，只有那些符合 \<join-condition>的行才会被记录在虚表VT2中。
3. JOIN：如果指定了OUTER JOIN（比如left join, right join)，那么保留表中未匹配的竺就会作为外部添行添加到VT2中，产生虚表VT3，rug from 中包含两个以上的表话，那么就会对上一个join连接产生结果的VT3和下一个表重复执行步骤1~3，一直到处理完所有表为止。
4. WHERE：对虚拟表VT3进行WHERE 条件过滤，只有符合 \<where-condition>的记录才会被插入到虚拟表VT4中。
5. GROUP BY: 根据group by 子句中的列，对VT4的记录进行分组操作，产生 VT5.
6. CUBE| ROLLUP：对表VT5进行CUBE或者rollup操作，产生 VT6。
7. HAVING: 对虚拟表VT6 应用having过滤，只有符合\<having-condition>的记录才会被插入到虚拟表VT7中。