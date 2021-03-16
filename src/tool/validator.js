export function username(fields, val, cb) {
    if (!/^\w{4,12}$/.test(val)) {
        return cb(new Error('用户名4-8位数字字母下划线'))
    }
    cb();
}

export function pwd(fields, val, cb) {
    if (!/^\w{4,12}$/.test(val)) {
        return cb(new Error('密码4-8位数字字母下划线'))
    }
    cb();
}