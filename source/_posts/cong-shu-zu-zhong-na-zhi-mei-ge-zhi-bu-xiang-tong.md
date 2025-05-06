---
title: C++ 从数组中拿值，每个值不相同
date: 2023-02-08 22:22:00
---

### 代码和思路

原理就是生成0，n个索引，每个索引不相同即可。
索引再到数组拿数据就行

```cpp
#include <iostream>
#include <vector>
#include <random>

using namespace std;

default_random_engine e;// 生成随机整数

void extract(int len,vector<int> arr){
	uniform_int_distribution<int> u(0,arr.size() -1);
		
	vector<int> vic;
	bool exist = false;
	
	cout << "[ ";
	while(vic.size() != len){
		int num = lround(u(e));
		for(auto a: vic){
			if(a == num){
				exist = true;
			}
		}
		if(!exist){
			vic.push_back(num);	
			cout << num << ((vic.size() == len ) ? " ":",");
		}
		exist=false; // 每次执行完后需要初始化 
	}
	cout << "]"<< endl;
}

int main(){
	
	vector<int> a = {31,42,53,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19};
	for(int i = 0; i < 500;i++){
		extract(10,a);
	}

	
	return 0;
}
```

### 测试数据
![image](https://img2023.cnblogs.com/blog/2146100/202302/2146100-20230208222054304-505017283.png)
