---
title: 使用Axios下载Nignx文件，并重命名
date: 2023-04-27 23:19:00
---

需求：因为下载的nginx的文件地址是UUID组成的，要下载呢就需要用axios。然后结合我上一篇文章，把nginx的跨域打开。

```
http://localhost:8085/project_1/2023/04/27/C9E9CC592AF849F7BFA025F16E2271BD.sql
```
https://www.cnblogs.com/pphboy/p/17360526.html
```js
export function downloadFile(url:string, filename:string) {
  axios({
    url: url,
    method: 'GET',
    responseType: 'blob', // 以二进制流的形式请求数据
  }).then(response => {
    // 创建一个 <a> 标签，设置 URL 和新文件名，并模拟点击下载
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(new Blob([response.data]));
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  });
}
```