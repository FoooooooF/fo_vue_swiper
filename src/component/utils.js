//深克隆
function deepClone(origin, target) {
    var target = (target || {}),
        toStr = Object.prototype.toString,
        arrStr = "[object Array]";
    for (var prop in origin) {
        if (origin.hasOwnProperty(prop)) {
            if (origin[prop] !== "null" && typeof (origin[prop]) == 'object') {
                target[prop] = toStr.call(origin[prop]) == arrStr ? [] : {};
                deepClone(origin[prop], target[prop]);
            } else {
                target[prop] = origin[prop];
            }
        }
    }
    return target;
}

//浅克隆
function clone(origin, target) {
    var target = target || {}; 
    //容错，即防止用户不传递目标参数。若用户传递了参数就用，若没传则拿一个空对象当目标
    for (var prop in origin) {
        target[prop] = origin[prop];
    }
    return target;
}
export {
    deepClone,
    clone
}