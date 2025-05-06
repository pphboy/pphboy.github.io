---
title: 计算机算法设计与分析  实验题 及代码
date: 2022-10-09 15:48:00
---

很舒服的题目，不难。科班的知识就是舒服。

实验2：递归与分治
实验目的
熟悉递归算法的基本思想和基本步骤，熟练掌握递归公式的推导和定义方法，用递归算法解决实际问题。

实验要求 f
对本实验中的问题，设计出算法并编程实现。
实验内容：

注意：以下算法要求使用函数实现，都放到一个程序文件里面。即只使用使用一个main函数。

1 求最大公约数 (30分)
使用辗转相除法和递归求两个正整数m和n的最大公约数。	

输入格式:
输入两个正整数m,n。

输出格式:
按要求输出辗转相除过程及最终结果，输出结果之间空格分隔。

输入样例:
21 35	
输出样例:
gcd(21,35) gcd(35,21) gcd(21,14) gcd(14,7) 7
```c++
int maxgyNum(int n1,int n2){
	
	if(n1 < n2){
		printf("gcb(%d,%d) ",n1,n2);
		return maxgyNum(n2,n1);
	}else{
		int n3=n1%n2;
		if(n3 % n2 != 0){
			printf("gcb(%d,%d) ",n1,n2);
			return maxgyNum(n3,n2);
		}else {
			return n2;
		}
	}
}

int main(){
	int a = maxgyNum(21,35);
	cout << a << endl;
	return 0;
}



```

2.使用递归算法判断是否是完数，并输出2-2000的所有完数
```c++
#include <iostream>

using namespace std;

//6 3 2 1
//28 14 7 4 2 1

bool isPN(int num,int next,int sum){
	if(num % next == 0){
		sum += next;
		//cout << next  <<"-" << sum<< endl;
		if(next==1){
			return sum == num;
		}	
	}
	if(next <=1){
		return false;
	}
	return isPN(num,--next,sum);
}


// 获取完全数
void getPN(int num){
	if(isPN(num,num-1,0)){
		cout << num <<endl;
	}
	if(num<=2){
		return;
	}
	getPN(--num);
}


int main(){
	getPN(2000);
	//cout << isPN(18,17,0) << endl;
	//cout << 28 % 28 <<endl;
	return 0;
}

```

3 递归实现逆序输出整数 (15分)
本题目要求读入1个正整数n，然后编写递归函数reverse(int n)实现将该正整数逆序输出。
输入格式:
输入在一行中给出1个正整数n。

输出格式:
对每一组输入，在一行中输出n的逆序数。

输入样例:
12345
输出样例:
54321
```
int reverse(int n){
	if(n <= 0) return 0;
	cout << n%10;
	reverse(n/10);
}
```


4.一球从100米高度自由落下，每次落地后反跳回原高度的一半；再落下，求它在第10次落地时，共经过多少米？第10次反弹多
```

#include <math.h>
#include <iostream>
using namespace std;

float rebound(int n,float high){
	if(n<=1) {
		return 100;
	}
	return rebound(n-1,high) + (high/pow(2,n-1))*2;	
}
int main(){
	cout << rebound(10,100) << endl;
	return 0;
} 

```

5 递归 递推 (15分)
大一新生LinYX 最近学了一个新的算法—递归，他发现这个算法可以解决一些高中的数列问题，如果已知f1以及公式fn=a*fn-1+b，求fn很方便。聪明的你也应该已经学会了递归，那就来表现一下吧。
输入格式:
输入包含若干行数据，每行都有4个整数，n，f1,a，b。

输出格式:
输出fn 。每组测试数据显示在不同行。

输入样例:
在这里给出一组输入。例如：
	n
1 4 1 1  f1 = 1*
1 6 2 3
2 2 1 1
输出样例:
在这里给出相应的输出。例如：

4
6
3
```c++
#include <iostream>

using namespace std;

int recursion(int n,int fn,int a,int b){
	if(n<=1){
		return fn; // 因为是fn-1，并且提供了n，当n=1时 ,fn = f1 
	}
	return a*recursion(n-1,fn,a,b)+b;
}

int main(){
	cout << recursion(2,2,1,1) << endl;
	return 0;
}
```

6 函数的递归调用 (10分)
有n个人坐在一起，第n个人比第n-1个人大2岁，第n-1个人比第n-2个人大2岁，以此类推，……，第1个人是10岁。请问第n个人年龄多大？
输入格式:
输入一个整数表示第几个人。

输出格式:
输出第n个人是m岁。

输入样例:
5
输出样例:
Number 5 is 18 age!
```c++
int cAge(int num){
	if(num<=1) return 10;
	return cAge(num-1)+2;
}
int main(){
	cout << cAge(100) << endl;
	return 0;
}

```
