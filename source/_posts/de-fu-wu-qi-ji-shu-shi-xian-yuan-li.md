---
title: Unix C的Http服务器技术实现原理
date: 2023-07-11 22:34:00
---


基于tiny-httpd的一个http server，可处理 GET和POST请求。

知识范围：

## POSIX接口

**pipe(int arr[2])**
pipe(int arr[2]);  使用pipe会创建通道，arr[0]为读，arr[1]为写。


**dup2 - 复制文件描述符**
 
这个fd我目前理解是用来读数据的，使用dup2相当于直接复制了oldfd对应的数据

```c
dup2(oldfd,newfd)
dup2(arr[1],1);
dup2(arr[0],0);
```


官方文档内容:
>  On program startup, the integer file descriptors associated with the streams stdin, stdout, and stderr are 0, 1, and 2,  respectively.
       The  preprocessor  symbols STDIN_FILENO, STDOUT_FILENO, and STDERR_FILENO are defined with these values in <unistd.h>.

* fd也就是文件描述符
    
   * 0 表示 STDIN 标准输入流
   * 1 表示 STDOUT 标准输出流
   * 2 表示 STDERR 标准错误输出流

**I/O 操作**

fopen的介绍，fopen(filename,mode)
mode 填写  w 就是创建和覆盖的意思，上传文件的时候可以直接使用w

```
       The fopen() function opens the file whose name is the string pointed to
       by pathname and associates a stream with it.

       The argument mode points to a string beginning with one of the  follow‐
       ing sequences (possibly followed by additional characters, as described
       below):

       r      Open text file for reading.  The stream is positioned at the be‐
              ginning of the file.

       r+     Open  for  reading and writing.  The stream is positioned at the
              beginning of the file.

       w      Truncate file to zero length or create text  file  for  writing.
              The stream is positioned at the beginning of the file.

       w+     Open  for  reading  and writing.  The file is created if it does
              not exist, otherwise it is truncated.  The stream is  positioned
              at the beginning of the file.

       a      Open  for  appending (writing at end of file).  The file is cre‐
              ated if it does not exist.  The stream is positioned at the  end
              of the file.

       a+     Open  for  reading  and appending (writing at end of file).  The
              file is created if it does not exist.  Output is always appended
              to  the  end  of  the file.  POSIX is silent on what the initial
              read position is when using this mode.  For glibc,  the  initial
              file  position  for reading is at the beginning of the file, but
              for Android/BSD/MacOS, the initial file position for reading  is
              at the end of the file.

```

需要实现一个类似于把文件读取 到连接的文件描述符中


文件读取和写入
```c
#include <stdio.h>

void create_newfile(char *filename){
  FILE* res = NULL;
  res = fopen(filename, "w");
  char bus[1024];
  sprintf(bus, "{\n\t\"a\":\"%s\"\n}",filename);
  
  fputs(bus, res);
  fflush(res);
  fclose(res);
}

int main(void) {
  char *a = "./b.txt";

  FILE *res = NULL;
  char buf[1024];
  int i = -1;
  
    // 创建文件并写文件
  create_newfile(a);
  
    // 读文件
  res = fopen(a, "r");
  printf("\n");
  fgets(buf, sizeof buf, res);
  
  while(!(i = feof(res))) {
    printf("%s",buf);

    fgets(buf, sizeof buf, res);
  }
  printf("%s",buf);
  
  printf("\n");
  printf("i = %d\n",i);
  fclose(res);
  
  return 0;
}

```

**使用子进程执行cgi程序** 

这里的重点是需要了解 父进程是可能比子进程 早完成，所以需要使用wait() 或者 waitpid()进行等待子进程完成

```c
// child thread cgi
#include <stdlib.h>
#include <stdio.h>
#include <unistd.h>

int main(void) {
  char *path = "c.cgi";
  int pid = -1,status = -1;
    
  if((pid = fork()) < 0) {
    perror("CreateP");
    exit(1);
  }
  if(pid == 0) {
    execl(path,path,NULL);
    exit(0);
  }else {
    printf("Faker\n");
    // 如果不等待子进程完成，那么父进程可能比子进程先执行完，那么子进程就变成了孤儿进程
    // 会导致 程序无法正常退出，所以需要使用wait() 或 waitpid()
    waitpid(pid, &status, 0);
    printf("Status:%d\n",status);
    printf("Pid:%d\n",pid);
  }
  return 0;
}
```

**使用dup2改变标准输入输出流**

作用就是可以直接拿子进程的输入输出流的数据，如果需要输入数据那么就操作 STDIN(0) ，获取子进程的输出数据  STDOUT(1)

因为使用的是操作 文件描述符，适合底层操作，因为POSIX中用的就是文件描述符，TCP 通讯也是  文件描述符 (就是那个 fd)


```c
int open(const char *pathname, int flags);
int open(const char *pathname, int flags, mode_t mode);
int creat(const char *pathname, mode_t mode);
                   
/*
 flags
 
O_RDONLY：以只读方式打开文件。
O_WRONLY：以只写方式打开文件。
O_RDWR：以读写方式打开文件。
O_CREAT：如果文件不存在，则创建一个新文件。
O_APPEND：在文件末尾附加数据，而不覆盖现有内容。
O_TRUNC：如果文件已存在，则截断（清空）文件。

mode
S_IRUSR：用户（owner）可读权限
S_IWUSR：用户（owner）可写权限
S_IXUSR：用户（owner）可执行权限

*/
```


```c
#include <stdlib.h>
#include <stdio.h>
#include <unistd.h>
#include <sys/types.h>
#include <sys/stat.h>
#include <fcntl.h>
#include <sys/wait.h>

int main(void) {
  char *path = "c.cgi";
  char *log = "log";
  int pid = -1,status = -1;
  int pfd = -1;
  pfd = open(log, O_WRONLY | O_CREAT | O_TRUNC,S_IRUSR | S_IWUSR);
  
  if((pid = fork()) < 0) {
    perror("CreateP");
    exit(1);
  }
  
  if(pid == 0) {
    // 直接将 STDOUT 输入到 文件夹
    dup2(pfd,1);
    execl(path,path,NULL);
    exit(0);
  }else {
            
    printf("Faker\n");
    // 如果不等待子进程完成，那么父进程可能比子进程先执行完，那么子进程就变成了孤儿进程
    // 会导致 程序无法正常退出，所以需要使用wait() 或 waitpid()
    waitpid(pid, &status, 0);
    close(pfd);
    printf("Status:%d\n",status);
    printf("Pid:%d\n",pid);
  }
  return 0;
}

```

**使用管道进行文件描述转换**

pipe(pipe_array) 创建一个管道

使用 dup2() 复制 STDOUT 到 pipe_array[1] 

等程序执行完成后，再把 pipe_array[0] 中的数据写到文件中去



```c
// child thread cgi
#include <stdlib.h>
#include <stdio.h>
#include <unistd.h>
#include <sys/types.h>
#include <sys/stat.h>
#include <fcntl.h>
#include <sys/wait.h>

int main(void) {
  char *path = "c.cgi";
  char *log = "log";
  char buf[1024];
  char c;
  int pid = -1,status = -1;
  int pfd = -1;
  int pipe_output[2];

  // disable umask
  // 还需要重新学一下怎么配置umask
  // umask control file privilege,if you dont disable or set umask, than you will cant change some privilege about new file
  umask(0);
    pfd = open(log, O_WRONLY | O_CREAT | O_TRUNC, 0777);
  printf("FILE P:%d\n", S_IRWXU | S_IRGRP | S_IXGRP | S_IROTH | S_IXOTH);

  if(pipe(pipe_output) < 0){
    perror("PIPE");
    exit(1);
  }

  printf("PIPE_OUTPUT:%d\n",pipe_output[1]);
  
  if((pid = fork()) < 0) {
    perror("CreateP");
    exit(1);
  }
  
  if(pid == 0) {
    // 直接将 STDOUT 输入到 管道中
    dup2(pipe_output[1],1);
    execl(path,path,NULL);
    // finished writing, should close the file descriptor
    close(pipe_output[0]);
    exit(0);
  }else {
    // in parent process, the first should close the writing pipe 
    close(pipe_output[1]);
    
    printf("Faker\n");
    
    waitpid(pid, &status, 0);
    int read_len = read(pipe_output[0],&buf,sizeof buf);
    printf("read_len:%d\n",read_len);
    
    while( read_len > 0) {
      // if data dont have 1024 bytes size, shoud add \0 in the end of content
      if(read_len < 1024 ) {
        buf[read_len] = '\0';
      }
      write(pfd,&buf,read_len);
      read_len = read(pipe_output[0],&buf,sizeof buf);
    }

    printf("Buf:\n%s",buf);
    printf("read_len: %d\n",read_len);
    close(pfd);
    close(pipe_output[1]);
    
  }
  return 0;
}
```

**设置Socket状态**

建立套接字后需要设置套接字的状态，须使用 `setsockopt()`

```
#include <sys/types.h>          /* See NOTES */
#include <sys/socket.h>

int getsockopt(int sockfd, int level, int optname,
                void *optval, socklen_t *optlen);
int setsockopt(int sockfd, int level, int optname,
                const void *optval, socklen_t optlen);
```

解释一下参数的意思
 sockfd， 就是sock的文件描述符
 level就是sock所处的层次 一般用`SOL_SOCKET` 代表TCP
 optname   表示需要设置的选项
 
    ```
    SO_DEBUG：打开或关闭排错模式
    SO_REUSEADDR：在bind()函数中允许本地IP地址可重复使用
    SO_TYPE：返回socket形态
    SO_ERROR：返回socket已发生的错误原因
    SO_DONTROUTE：发送的数据包不要利用路由设备来传输
    SO_BROADCAST：使用广播方式传送
    SO_SNDBUF：设置发送的暂存区大小
    SO_RCVBUF：设置接收的暂存区大小
    SO_KEEPALIVE：定期确定连线是否已终止
    SO_OOBINLINE：当接收到OOB 数据时会马上送至标准输入设备
    SO_LINGER：确保数据可以安全可靠地传送出去。
    ```
   optval 设置参数返回值的指针
   optlen表示optval的长度。
   setsockopt 执行成功返回 0 ,执行失败返回1

## Makefile 简单使用

单文件的，先简单使用一下，主要是先用起来，后面再补

```makefilie
CC = gcc

BIN = make_test

BIN_DIR = bin
OBJS_DIR = obj
SRC_DIR = src

OBJS = ../$(OBJS_DIR)/%.o

all:COMPILE

COMPILE: CHECK_DIR
	$(CC) -c $(SRC_DIR)/*.c
	mv *.o $(OBJS_DIR)
	$(CC) -o $(BIN) $(OBJS_DIR)/*.o

CHECK_DIR: ECHO
	@mkdir -p $(BIN_DIR)
	@mkdir -p $(OBJS_DIR)

ECHO: 
	@echo $(SUBDIRS)
	@echo begin compile

clean:
	@$(RM) $(OBJS_DIR)/*.o
	@rm -rf $(BIN_DIR)

```


## Tiny Httpd实现步骤

1. 创建一个 listenfd 用于 绑定端口
    * 设置 sockfd 的状态为 setsockopt(connfd, SOL_SOCKET, SO_REUSEADDR, &re, sizeof(re)) ;
        * https://zhuanlan.zhihu.com/p/77023584
    * 使用htons 绑定端口， htonl(INADDR_ANY) 绑定 0.0.0.0 的IP 地址
2. 通过accept接收一个关于listenfd的 链接 connfd
3. 使用recv接收connfd的请求头数据，如下所示
    ```
    RECV N: 82
    GET /path HTTP/1.1
    Host: 127.0.0.1:8081
    User-Agent: curl/7.74.0
    Accept: */*
    ```
4. 获取特定的函数处理以上请求头，获取请求体
5. 在发送数据之前先把请求头写到connfd中
    * 还需要完成  一些错误处理的函数
    * 根据 数字返回请求头  `headers(int connfd,int  HttpStatus)`
    * HttpStatus  用枚举可好？ HTTP_OK , HTTP_NOT_FOUD
5. 判断是否要执行 cgi，就是说 如果请求的 `/path` 是 cgi的名字，那么就执行cgi
    
    1. 先把准备好的请求参数放到子进程的运行环境中
    2. cgi程序需要位于 /cgi目录于  请求时 类似于 请求 http://127.0.0.1/cgi/test.cgi
    3. 如果 `path` 前缀是 /cgi 则判断文件 是否存在，存在则执行，不存在则报404
    
6. 判断是否是静态文件，反正不在 `/cgi` 的都是静态文件，默认 请求的path为 `/` ，指向 `/index.html` 或 `index.cgi`
    * index.html为静态文件
    * index.cgi为  c语言的可执行程序
    * 如果这两个都不存在，则报 404
    
7.  执行完后，需要close(connfd) 
