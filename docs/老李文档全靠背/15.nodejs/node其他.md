# node 其他

## 1. 缓存

- 缓存可以重用已获取的资源能够有效的提升网站与应用的性能。
- Web 缓存能够减少延迟与网络阻塞，进而减少显示某个资源所用的时间。
- 借助 HTTP 缓存，Web 站点变得更具有响应性。
- 缓存分为两点：强制缓存和协商缓存

### 1.1 强制缓存

- 概念
  - 强制缓存就是向浏览器缓存查找该请求结果，并根据该结果的缓存规则来决定是否使用该缓存结果的过程。
  - 简单来讲就是强制浏览器使用当前缓存
- 强制缓存的设置过程
  - 客户端请求的时候，需要携带 Cache-Control 请求头字段，值是 max-age=XXXX（秒数）
  - 服务端响应的时候，也需要携带 Cache-Contorl 的响应头字段，值是 max-age=XXXX（秒数）
  - 当下次再次请求的时候，判断自己是否符合强制缓存条件，如果符合，则直接读取缓存，如果不符合，则会走协商缓存

### 1.2 协商缓存

- 概念
  - 协商缓存就是强制缓存失效后，浏览器携带缓存标识向服务器发起请求，由服务器根据缓存标识决定是否使用缓存的过程。
- 实现：
  - Last-Modified / If-Modified-Since
  - Etag / If-None-Match
  - Etag / If-None-Match 优先级比 Last-Modified / If-Modified-Since 高。
- Last-modified
  - 记录服务器返回资源的最后修改时间
  - 由客户端发送给服务器
- If-Modified-Since
  - 记录服务器返回资源的最后修改时间
  - 由服务器发送给客户端
- Etag
  - 当前文件的唯一标识（由服务器生成）
  - 由客户端发送给服务器
- If-None-Match
  - 当前文件的唯一标识（由服务器生成）
  - 由服务器发送给客户端
- 工作流程：
  - 第一次：由服务器返回 If-None-Match 和 If-Modified-Since 字段通过响应头方式返回
  - 第二次：下次浏览器请求时，携带了 Etag（值为上一次的 If-None-Match 的值）和 Last-modified（值为上一次的 If-None-Since 的值）发送给服务器
  - 服务器先检查 Etag 是否等于最新的 If-None-Match 的值，如果相等直接走浏览器本地缓存，不相等就返回新的资源
  - 如果没有 Etag，才看 Last-modified 的值，检查 Last-modified 是否等于最新的 If-None-Since 的值，如果相等直接走浏览器本地缓存，不相等就返回新的资源

### 1.3 缓存返回值

- 200(from memory cache)
  - 命中强制缓存
  - 缓存来自于内存
- 200(from disk cache)
  - 命中强制缓存
  - 缓存来自于磁盘
- 304 Not Modified
  - 命中协商缓存
- 200
  - 没有命中缓存

## 2. zlib 压缩

- nodejs 的 zlib 模块提供了资源压缩功能。例如在 http 传输过程中常用的 gzip，能大幅度减少网络传输流量，提高速度。

- 在服务器中和客户端的传输过程中，浏览器（客户端）通过 Accept-Encoding 消息头来告诉服务端接受的压缩编码，服务器通过 Content-Encoding 消息头来告诉浏览器（客户端）实际用于编码的算法。

- 常见三种压缩方式:gzip，deflate，br

  ```js
  //zlib举例
  const path = require('path');
  const fs = require('fs');
  const zlib = require('zlib');

  //对服务端的文件创建可读流
  const rs = fs.createReadStream(filePath);
  //把可读流写入到一个压缩容器中
  const gzipFile = rs.pipe(zlib.createGzip());
  //告诉客户端我响应的压缩格式是什么
  res.set('content-encoding', 'gzip');
  //把压缩好的文件写入到响应中
  return gzipFile.pipe(res); //22.1kb
  ```

## 3.自动打开浏览器

- 子进程`child-process`中的 exec 方法可以执行终端命令

- 在终端中使用 start/open/xdg-open 等命令可以打开浏览器，命令后跟浏览网页的地址

- 分别检测系统不同 使用不同的命令

  ```js
  switch (process.platform) {
    case 'win32': //window
      cmd = 'start';
      break;
    case 'darwin': //mac
      cmd = 'open';
      break;
    case 'linux': //linux
      cmd = 'xdg-open';
      break;
  }

  exec(`${cmd} ${url}`);
  ```
