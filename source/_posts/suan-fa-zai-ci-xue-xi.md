---
title: KMP 算法 再次学习
date: 2022-10-09 20:47:00
---

c++ 版后面再补
```java
package cn.kbug.dynamic;

import java.util.Arrays;

/**
 * KMP 算法本质上是对 搜索的字符串做优化，然后在匹配的时候，能做到非常省时间
 * 如果搜索的串，都没有最大公连接相等子串，则此算法与暴力匹配无异
 * @author Administrator
 *
 */

public class KMPStringSearch {
	public static void main(String[] args) {
		// index = 14 是 
//		orgin[14] = 'A'
		String orign = "BBC ABBCDABCD ABBADDACCD AB";
		String key = "ABBA";
		
		int next[] = getNext(key);
		System.out.println(Arrays.toString(next));
		int index = kmpSearchString(orign, key, next);
		System.out.println("index="+index);

	}
	/**
	 * 
	 * @param origin
	 * @param key
	 * @param next next数组是key的部分匹配表
	 * @return
	 */
	public static int kmpSearchString(String origin,String key,int next[]) {
		for(int i = 0,j=0;i<origin.length();i++) {
			// 这里就是说，拿到子串的上一个相同的字符进行比较
			while(j > 0 && origin.charAt(i) != key.charAt(j)) {
				j = next[j-1];
			}
			// 如果两个字符相当，则把 key的指针提前向后移一位
			if(origin.charAt(i) == key.charAt(j)) {
				j++;
			}
			// 我也不知道为什么要这样写
			// 作用是返回当前匹配成功的字符串
			// 原理我是真没明白，因为 在匹配的时候，i指针往后走，j也会往后走
			// 但j 指的是key字符串，而i指的是 origin的指针
			// j == key.length() 时，显然已经必然匹配成功
			// 所以 i 则是匹配成功最后一个字符的位置
			// 将 i 的位置 - j其实就是减key的字符长度
			// +1 是因为 j 是等于字符长度，而非数组索引（因为j = key.len)
			// 因为 每次判断后都会给j提前加上 1，所以j是越界的，但如果j 与key.len相等，则说明匹配成功
			if(j == key.length()) {
				// 写成 更好理解，j-1就是j的索引
				return i-(j-1);
//				return i-j+1;
			}
		}
		
		return -1;
	}
	
	public static int[] getNext(String dest) {
		int next[] = new int[dest.length()];
		// 第一个永远是0，因为仅有一个字符串的时候，只能是0
		next[0] = 0;
		for (int i = 1, j = 0; i < dest.length(); i++) {
			// 一直去寻找i与j相等的字符
			// 如果没找到就把 j 的上一个next的值给J，意思说
			// 如果没找到就从上一个开始重新找，但这个重新找
			// 意味着必然会在数据中，找到 next[j-1]与i相等的字符
			// 如果找不到，直到 j <= 0 了，则会自动跳出这次循环
//			System.out.printf("j=%d, i =%d %c -> %c \n",j,i,dest.charAt(i) ,dest.charAt(j));
			// 循环里的条件，每一次都会进行判断，所以不应该单拿出来
			while(j >0 && dest.charAt(i) != dest.charAt(j)) {
//				System.out.println("a");
				j = next[j-1];
			}
			// 相等就把J++，则相等的长度+1
			if(dest.charAt(i) == dest.charAt(j)) {
				j++;
			}
			
			next[i] = j;
		}
		
		
		return next;
	}
}


```