const log = console.log.bind(console)

let code = "abc 12 234 asjf931 asdf"
// code 是变量名 和 数字组成的字符串，用空格分隔
// 输出所有的数字（字符串形式），下面例子的输出如下
// log(numbers(code))
// ["12", "234"]

const isNumber = (char) => {
    let lib = '1234567890'
    let exist = lib.includes(char)
    return exist
}

const isString = (char) => {
    let lib = 'abcdefghijklmnopqrstuvwxyz'
    let exist = lib.includes(char)
    return exist
}

const isSpace = (char) => {
    return char === ' '
}

const numberEnd = (s, index) => {
    let end = index
    for (let i = index; i < s.length; i++) {
        let next = s[i + 1]

        if (isSpace(next)) {
            log('next', next)
            end = i + 1
            break
        }
    }

    return end
}

const stringEnd = (s, index) => {
    let end = index
    for (let i = index; i < s.length; i++) {
        let next = s[i + 1]
        if (isSpace(next)) {
            end = i + 1
            break
        }
    }

    return end
}

const numbers = function(code) {
    let s = code + ' '
    let i = 0
    let container = []

    // 用下标 i 循环遍历字符串 s
    // 如果 s[i] 是空格则往前走
    // 如果是字母，就调用自己实现的 stringEnd(s, i) 函数找到并返回空格的下标
    // 如果是数字，则调用自己实现的 numberEnd(s, i) 函数找到并返回空格的下标
    for (; i < s.length; i++) {
        let a = s[i]
        let spaceIndex

        if (isSpace(a)) {
            i++
            continue
        } else if (isNumber(a)) {
            spaceIndex = numberEnd(s, i)
        } else if (isString(a)) {
            let next = stringEnd(s, i)
            i = next
            continue
        }

        let cell = s.slice(i, spaceIndex)
        i = spaceIndex
        container.push(cell)
    }

    return container
    // 找结尾下标的函数，如果遇到空格则返回空格的下标
    // 具体下标怎么定位你自己纸笔来推算

    // 字符串结尾可能不是空格（比如这里的 asdf）
    // 最简单的做法是，先在末尾加个空格再解析
    // 你知道很多编译器必须要求最后一个字符是回车键吗？
}

log(numbers(code))
