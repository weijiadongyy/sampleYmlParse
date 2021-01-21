# sampleYmlParse
## 为啥要写这个
就是被这样的代码恶心心到了
```javascript
var pic = {
    1: "https://weijiadongyy2018-1234567981.cos.ap-guangzhou.myqcloud.com/weijiadongyy_decoration/ranking/top1.png",
    2: "https://weijiadongyy2018-1234567981.cos.ap-guangzhou.myqcloud.com/weijiadongyy_decoration/ranking/top2.png",
    3: "https://weijiadongyy2018-1234567981.cos.ap-guangzhou.myqcloud.com/weijiadongyy_decoration/ranking/top3.png",
    4: "https://weijiadongyy2018-1234567981.cos.ap-guangzhou.myqcloud.com/weijiadongyy_decoration/ranking/top4.png",
}
```
## 为啥不用现成的对象或者json

然后吧也想过直接写object，json啥的，但是主要有两个问题，

- 正常对象和json那个key啊，都是有意义的。
```javascript
var obj = {
    dir:"https://weijiadongyy2018-1234567981.cos.ap-guangzhou.myqcloud.com"
    path:{
        ...
    }
}
```

一级还好
```javascript
var obj = {
    dir:"https://weijiadongyy2018-1234567981.cos.ap-guangzhou.myqcloud.com"
    path:[
        {
            dir:"weijiadongyy_decoration",
            path:{}
        }
    ]
}
```
多级目录就很蛋疼，path还只能写成数组，因为一个文件夹下还能有多个文件夹。
最好是直接用文件夹当key了。但是这个不符合正常对象或者json的写法，会感觉很奇怪
但是正常对象json写法，又和文件目录不匹配。

- 正常对象json，至少对于写这种配置，冒号 花括号 中括号啥的太影响格式
```javascript
    `
        https://weijiadongyy2018-1234567981.cos.ap-guangzhou.myqcloud.com
            weijiadongyy_decoration/ranking
                1 top1.png
                2 top2.png
    `
```
个人感觉显然更好

