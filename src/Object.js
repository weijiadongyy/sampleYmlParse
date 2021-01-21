function isArray(v) {
    if (typeof Array.isArray == "function") {
        return Array.isArray(v)
    } else {
        return Object.prototype.toString.call(value) == "[object Array]"
    }
}

/**
 * 判断obj时发存在
 * @param obj
 * @returns {boolean}
 */
function objectValidation(obj) {
    return typeof obj == "undefined"
}

/**
 * 合并obj
 * @param des
 * @param src
 * @param noChange
 * @returns {*}
 */
function objectMerge(des, src, noChange = {}) {
    if (objectValidation(des) || objectValidation(src)) {
        console.log("对象合并失败，参数对象不存在", "des:", des, "src:", src)
        return null
    }

    if (isArray(des) && isArray(src)) {
        return [...des, ...src]
    }

    if (!isArray(des) && !isArray(src)) {
        for (let key in src) {
            des[key] = noChange.hasOwnProperty(key) ? des[key] : src[key]
        }
        return des
    }

    return null


}

function trim(str) {
    return str.replace(/(^\s*)|(\s*$)/g, "")
}

function trimL(str) {
    return str.replace(/(^\s*)/g, "")
}

function trimR(str) {
    return str.replace(/(\s*$)/g, "")
}

export {
    isArray,
    objectValidation,
    objectMerge,
    trim,
    trimL,
    trimR
}