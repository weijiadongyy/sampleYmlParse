function _urlMerge(host, path) {
    if (host == "") {
        return path
    }
    if (path == "") {
        return host
    }
    return host + "/" + path
}

function urlDfs(data, url, result) {
    for (let key in data) {

        if (typeof data[key] == "string") {
            result[key] = _urlMerge(url, data[key])
        } else {
            urlDfs(data[key], _urlMerge(url, key), result)
        }
    }
}

function urlMerge(yml) {
    var obj = sampleYmlParse(yml)
    console.log(obj)
    var result = []
    for (let o of obj) {
        let _result = {}
        urlDfs(o, "", _result)
        result.push(_result)
    }
    console.log(result)
    return result


}

function ENUM() {

}

const OSS = "https://xxx.com"

ENUM.getTOPS = function () {
    // console.log("引用啦")
    if (ENUM.TOPS) {
        return ENUM.TOPS
    }



    var TOPS = `
        ${OSS}
            aaaaaa
                0 top1.png
                1 top2.png
                2 top3.png
                3 top4.png
            bbbbbb
                4 top5.png
            cccccc
                5 top6.png
                6 top7.png
                7 top8.png
                8 top9.png
                
        // 数据格式参考yml。支持单行注释(将这段注释直接复制到字符串内，不影响结果)，缩进统一为4个空格，可以整体缩进
        // 写这个主要因为看着配置冗余太多，心累，写成object，只抽离域名还好，抽成目录树更蛋疼了，这样写相比object 可以少写很多{} [] 格式看到更加清楚
        // 正常写object还会带上key 而不是用value直接当key。用代码生成的中间格式就无所谓了
        //
        // aaaaa
        //     bbbbb
        //         k_1 v_1
        //         k_2 v_2
        //     ccccc
        //         k_3 v_4
        // ddddd
        //     - v_5
        //     - v_6
        //
        // 等价于
        //
        // var obj = {
        //     aaaaa:{
        //         bbbbb:{
        //             k_1: v_1,
        //             k_2: v_2
        //         },
        //         ccccc:{
        //             k_2: v_2
        //         }
        //     },
        //     ddddd:[
        //         v_5,
        //         v_6
        //     ]
        // }
    `
    ENUM.TOPS = urlMerge(TOPS)[0]

    return ENUM.TOPS
    // console.log(ENUM.TOPS)
}

let TOPS = ENUM.getTOPS()