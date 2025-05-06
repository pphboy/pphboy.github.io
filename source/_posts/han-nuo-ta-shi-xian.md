---
title: 汉诺塔  Java &amp;&amp; Cpp 实现
date: 2022-09-17 17:13:00
---


不论多少盘，都看成是两个盘在移动，只需要把上面的两个盘移动好就行。

```java
public static void hanoiTower(int num,char a,char b ,char c) {
	if(num == 1) {
		System.out.println("第1个盘从"+a + " -> " + c);
	}else {
		//  A 到 B ，中间变量 为 c
		hanoiTower(num-1,a,c,b);
		System.out.printf("第%d个盘从%c -> %c \n",num,a,c);
		// B 到 C，中间变量 为 A
		hanoiTower(num-1,b,a,c);
	}
}

```

```cpp
void hanoi(int n, char a,char b, char c){
    if(n>0){
        hanoi(n-1,a,c,b);
        cout << "第" << n << "号盘子 "<<  a << " -> " << c  << "\n";
        hanoi(n-1,c,b,a);
    }
}
```