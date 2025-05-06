---
title: Linux C 获取 域名IP 地址
date: 2023-06-20 22:53:00
---

```
#include <stdio.h>
#include <sys/socket.h>
#include <netdb.h>
#include <string.h>
// 使用inet_ntoa 需要 引包  <arpa/inet.h>
#include <arpa/inet.h>


int main(int argc,char *argv[]){
  struct hostent *host;

  char hostname[]="www.kbug.cn";
  char hostname2[] = "www.baidu2.com1";
  struct in_addr in;
  struct sockaddr_in addr_in;
  extern int h_errno;

  if((host = gethostbyname(hostname)) != NULL ) {
    memcpy(&addr_in.sin_addr.s_addr, host->h_addr,4); // 复制地址
    in.s_addr = addr_in.sin_addr.s_addr;
    printf("Real Number : %x \n",in.s_addr);
    printf("Domain name:%s \n",hostname);
    printf("IP length: %d \n",host->h_length);
    printf("Type: %d \n",host->h_addrtype);
    printf("IP： %s\n",inet_ntoa(in));
  }else {
    // 出错处理
    printf("Domain Name: %s Error: %d \n %s\n",hostname,h_errno,hstrerror(h_errno));
  }


  if((host = gethostbyname(hostname2)) != NULL ) {
    memcpy(&addr_in.sin_addr.s_addr, host->h_addr,4); // 复制地址
    in.s_addr = addr_in.sin_addr.s_addr;
    printf("Domain2 name:%s \n",hostname2);
    printf("IP length: %d \n",host->h_length);
    printf("Type: %d \n",host->h_addrtype);
    printf("IP： %s\n",inet_ntoa(in));
  }else {
    // 出错处理
    printf("Domain Name: %s Error: %d \n %s\n",hostname2,h_errno,hstrerror(h_errno));
  }
  return 0;
}
```