import {trim, trimR, trimL, isArray} from "./Object";

const defaultSpaceN = 4

function getFirstStr(str) {
    return str.substring(0, 1)
}

function getLSpaceN(str) {
    return str.length - trimL(str).length
}

function ymlArrToValue(ymlArr) {
    if (!isArray(ymlArr) || ymlArr.length == 0) {
        return null
    }

    for (let key in ymlArr) {
        let n = getLSpaceN(ymlArr[key])
        if (defaultSpaceN > n) {
            return null
        }
        ymlArr[key] = ymlArr[key].substring(defaultSpaceN)
    }
    // console.log(ymlArr)

    var _ymlArr = ymlArrSplit(ymlArr)

    var fStr = getFirstStr(ymlArr[0])

    var result = {}
    if (fStr == "-") {
        result = []
    }

    for (let o of _ymlArr) {
        if (o.length == 1) {
            // console.log(o)
            var _arr = o[0].split(" ")
            if (_arr.length != 2) {
                console.log("yml解析错误")
                return []
            }
            if (fStr == "-") {
                result.push(_arr[1])
            } else {
                result[_arr[0]] = _arr[1]
            }
        } else if (o.length > 1) {
            if (fStr == "-") {
                result.push(ymlArrToObj(o))
            } else {
                let key = o.shift()
                // console.log(o)
                // console.log("key", key)
                result[key] = ymlArrToValue(o)
            }
        } else {
            console.log("yml解析错误")
            return []
        }
    }

    // console.log(result)
    return result


    // while (ymlArr.length > 0)
    //
    //     for (let key in ymlArr) {
    //         if (getFirstStr(ymlArr[key]) == fStr) {
    //
    //         }
    //     }
}

function ymlArrSplit(ymlArr) {
    if (!isArray(ymlArr)) {
        return []
    }

    var obj = []
    var result = []
    for (let o of ymlArr) {
        if (getLSpaceN(o) == 0) {
            if (obj.length > 0) {
                result.push(obj)
            }
            obj = []
            obj.push(o)
        } else {
            obj.push(o)
        }
    }
    result.push(obj)
    return result
}

function ymlArrToObj(ymlArr) {
    if (!isArray(ymlArr)) {
        return []
    }

    var result = []
    var _ymlArr = ymlArrSplit(ymlArr)

    for (let o of _ymlArr) {
        var obj = {}
        var key = o.shift()
        var value = ymlArrToValue(o)
        // console.log(value)
        if (!value) {
            return {}
        }

        obj[key] = value
        result.push(obj)
    }


    // console.log(result)

    return result
}

function ymlToArr(yml) {
    if (typeof yml != "string") {
        console.log("yml不是标准字符串")
        return null
    }

    var ymlArr = yml.split("\n")
    for (let key = ymlArr.length - 1; key >= 0; key--) {
        var t_str = trim(ymlArr[key])
        if (t_str == "" || t_str.substring(0, 2) == "//") {
            ymlArr.splice(key, 1)
        } else {
            ymlArr[key] = trimR(ymlArr[key])
        }
    }

    if (ymlArr.length < 1) {
        return null
    }

    let lSpaceN = getLSpaceN(ymlArr[0])


    for (let key in ymlArr) {
        let n = getLSpaceN(ymlArr[key])
        if (lSpaceN > n) {
            return null
        }
        ymlArr[key] = ymlArr[key].substring(lSpaceN)
    }


    // console.log(ymlArr)

    return ymlArr
}


function sampleYmlParse(yml) {
    return ymlArrToObj(ymlToArr(yml))
}


export {
    sampleYmlParse
}