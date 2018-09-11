# cocos creator 制作h5游戏添加微信分享（分享可带参数）
给ccc的h5游戏添加微信分享或使用jssdk的其他功能，主要操作在构建发布之后的index.html文件中操作。需要php配合

H5构建（添加微信参数）
下载jssdk.php文件到根目录
构建发布之后，找到index.html入口文件，将后缀名改为php。使用php，new一个jssdk对象，将appid和密钥作为参数传入。此步骤作为
拉取jssdk的配置，用于初始化。
分享：引入jssdk.php，引入jssdk接口的js文件（官方文档中有），获取到jssdk信息用于初始化wx.config。到此index.php配置完毕。
在ccc工程内部，可以把任何jssdk接口中的方法，添加到命名空间中，然后就可以随用随调。也可以带参数分享，调用支付等。
