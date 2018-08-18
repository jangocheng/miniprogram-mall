# 商城小程序客户端 + 服务端 Node.js
此小程序是基于腾讯云 Wafer2 开发套件建立的一套商城应用。实现的功能十分精简，没有冗余，也不具备扩展性。设计思路来自于UDACITY，在此基础上做了适当的调整，让代码的可读性更好。

## 部署
 * [腾讯云一站式部署开通指引](README-Wafer2.md)
 * 自行部署到 Docker
#### Docker 部署方法
这一部分可以指导你自行部署，完全掌控小程序服务端。如果你熟悉 Docker，我会建议你使用此方法部署。
在项目目录下面的 [Dockerfile](Dockerfile) 提供了构建小程序服务器容器的方法。但由于目前还未完全实现自动的容器化构建脚本，所以你需要在使用 `Dockerfile` 构建镜像之前就将小程序服务端的配置文件 [config.js](server/config.js) 中的信息填写完整，之后再进行镜像的构建。

下面是简单的示例：

```Bash
# 获得一份源代码拷贝
git clone https://github.com/binarization/mall-wechat-weapp.git
# 构建镜像
docker build --rm -f Dockerfile -t mall-wechat-weapp:latest .
# 启动容器
docker run --name mall-weapp -p 5757:5757 -d mall-wechat-weapp:latest
# 检查容器运行状况
docker ps
...
```

## Q&A: Node服务端启动失败？

* 查找问题
  * [server/config.js](server/config.js) 配置文件是否填写合法
* Issues

## TODO
 - [ ] 真实支付/交易接口
 - [ ] API 规范
 - [ ] 用户数据缓存
 - [ ] 自动CI/CD
 - [ ] 完善的容器化构建
