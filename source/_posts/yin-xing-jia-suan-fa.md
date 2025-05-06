---
title: 银行家算法
date: 2022-10-18 15:37:00
---

```c++
#include <iostream>
#include <vector>
#include <string>
	
 
using namespace std;
 
typedef struct{
	int A;
	int B;
	int C;
}MAX,ALLOCATION,NEED,AVAILABLE,WORK;
 
class PCB{
public:
	 MAX maxs;
	 ALLOCATION allocation; 
	 NEED need;
	 WORK work;
	 string pname;
	 bool finish;
	 PCB(){
	 	work = {0,0,0};
	 }
	 //PCB(string paname,MAX maxs,ALLOCATION allocation,NEED need,bool finish):pname(pname),maxs(maxs),allocation(allocation),need(need),finish(finish){}
	 bool runState(AVAILABLE a){
	 	return need.A <= a.A && need.B <= a.B && need.C <= a.C;	 
	 }
	 void show(){
		printf("线程名:%s \t MAX %d %d %d \t ALLOCATION %d %d %d \t NEED %d %d %d \t WORK %d %d %d FINISH: %s \n",
			pname.c_str(),maxs.A, maxs.B,maxs.C,allocation.A,allocation.B,allocation.C,need.A, need.B,need.C
,work.A, work.B,work.C,(finish ? "true":"false")		);
	 }
};
 
bool Request(PCB &pcb,AVAILABLE &available){
	// 判断是否可执行
	if(pcb.runState(available)){
		pcb.work = available;
		available.A+=pcb.allocation.A;
		available.B+=pcb.allocation.B;
		available.C+=pcb.allocation.C;
		pcb.finish=true;
		return true;
	}else return false;
}
void RunP(vector<PCB> &plist,AVAILABLE &available){
	int count = 0; // 进程运行完成总数
	int non = 0;
	int errorIndex = 0;
	vector<PCB> saveQueue;
	while(non < plist.size() && count < plist.size() ){ // 当 non 等于 线程数，则说明无法执行
		for(int i = 0; i < plist.size(); i ++)
		{
			if(plist[i].finish){
				continue;
			}
			// 判断是否能执行
			if(Request(plist[i],available)){
				saveQueue.push_back(plist[i]);
				plist[i].show();
				PCB t = plist[i];
//				printf("%s 执行", t.pname.c_str()); 
				count++;
			}else {
				non++;
				errorIndex = i;
			} // 如果没执行，则non加1
		}
	}
	
	// 如果相等则为运行成功，如果不相等，则是死锁
	cout << count << endl; 
	if(count == plist.size()){
		printf("运行成功 系统此时状态安全 安全序列为(");
		for(int i = 0; i < saveQueue.size(); i ++)
		{
			printf("%s",saveQueue[i].pname.c_str());
			if(i != saveQueue.size()-1) printf(",");
		}
		printf(")\n");
	}else {
		printf("运行失败，进程: %s 无法执行",plist[errorIndex].pname.c_str());
	}
	
}
 
int main(){
 
	// 初始化进程序列
	int n;
	cout <<"请输入进程个数:";
	cin >> n;
 
	AVAILABLE available;
	cout <<"请输入ABC的资源数(如: 1 3 4):";
	cin >> available.A >> available.B >> available.C;
	printf("AVAILABLE: A=%d B=%d C=%d \n", available.A , available.B, available.C);
	vector<PCB> plist;
	for(int i = 0; i < n;i++){
		PCB tempP;
		cout << "请输入线程名\t MAX A B C \t ALLOCATION A B C \t NEED A B C" << endl;
		printf( "如: P1 1 2 3 1 2 3 1 2 3\n");
		cin
			>>tempP.pname>>tempP.maxs.A>>tempP.maxs.B>>tempP.maxs.C>>
			tempP.allocation.A>>tempP.allocation.B>>tempP.allocation.C
			>>tempP.need.A>>tempP.need.B>>tempP.need.C;
			tempP.finish = false;
		tempP.show();
		plist.push_back(tempP);
	}
 	RunP(plist,available);
	return 0;
}
```