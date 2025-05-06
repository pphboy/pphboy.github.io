---
title: QSqlTableMode | QTableWidget 清除数据
date: 2023-02-06 22:08:00
---


当我使用QTableView绑定QSqlTableModel的时候，我需要清除数据，但我又不能使用QSqlTableModel::clear()，因为使用clear就会把表名等一些设置好的数据清除掉。

所以我用的是
```c++
    model->removeRows(0,model->rowCount());
// 或者
    while(ui->categoryTableWidget->rowCount() != 0){
        ui->categoryTableWidget->removeRow(0);
    }
```


> tip: 我发现QSqlTableView的实例，设置条件后居然会自动查询