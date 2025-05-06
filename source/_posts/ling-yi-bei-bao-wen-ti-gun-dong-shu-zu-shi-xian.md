---
title: 零一背包问题，滚动数组实现
date: 2022-10-15 19:52:00
---

其实最难理解的内循环，也就是j的循环。

j 的条件是大于  w[i]，而w[i]则是当前 第 i 个物品的重量，则j 是一在从 背包容量，向 j-w[i]靠近。

j-w[i]就是剩下来的空间，而这一波操作就是在找剩下来的空间中，最大的那个值。

但是，剩下来的值也并不是最大的，所以要拿，dp[j-w[i]]+v[i] 与 dp[j]来比较，取一个最大。

能拿到最新的最优值，至于最优解，我目前没想到怎么做。


```c++
#include <iostream> 

using namespace std;

int v[] = {10,25,30};
int w[] = {2,4,6};
int n = 3; // 物品数量 
int c = 6; // 背包容量
int dp[999] = {0}; 	  // dp的索引是 背包容量最小单元的数列 
// c=6, 则索引 为 0,1,2,3,4,5,6 

int main(){
	
	for(int i = 0; i < n ;i++){
		for(int j = c;j >= w[i] ;j--){
			dp[j] = max(dp[j],dp[j-w[i]]+v[i]);
		}
	}
	
	for(int i = 0; i<c;i++){
		cout << dp[i] << endl;
	}
	return 0;
} 
```