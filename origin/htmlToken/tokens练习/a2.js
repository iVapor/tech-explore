const log = console.log.bind(console)

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

const isQuote = (char) => {
    let lib = "'"
    let exist = lib.includes(char)
    return exist
}

const isSpace = (char) => {
    return char === ' '
}

const isBracket = (char) => {
    let lib = "()[]"
    let exist = lib.includes(char)
    return exist
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

const quoteStringEnd = (s, index) => {
    let end = index
    for (let i = index; i < s.length; i++) {
        let next = s[i + 1]
        if (isQuote(next)) {
            end = i + 1
            break
        }
    }

    return end
}



let code = "abc d efg 1 3 'gua' 'lang' ( )[]"
// 这次我们增加 3 个功能
// 0, 字符串也要能解析出来
// 1, 给单引号包裹的字符串增加一个特例，找到一个单引号的下标
// 2, 增加 ()[] 四个符号的判断
// 下面例子的输出如下
// log(tokens1(code))
// ["abc", "d", "efg", "gua", "lang", "(", ")", "[", "]"]


const tokens1 = function(code) {
    let s = code + ' '
    let i = 0
    let container = []

    // 上一题已经实现寻找数字和字符串结尾下标的函数，这里就是多了一个单引号字符串而已
    // 怎么办呢？
    // 无非是给单引号包裹的字符串增加一个特例，找到一个单引号的下标
    // 如果是单引号，就调用自己实现的 quoteStringEnd(s, i) 函数找到并返回单引号下标 + 1
    // 如果是 ()[] 这四个符号就直接加到结果数组中

    for (;i < s.length;i++) {
        let a = s[i]

        if (isSpace(a)) {

        } else if (isNumber(a)) {
            let num = numberEnd(s, i)
            i = num
        } else if (isString(a)) {
            let str = stringEnd(s, i)
            let cell = s.slice(i, str)
            i = str

            container.push(cell)

        } else if (isQuote(a)) {
            let q = quoteStringEnd(s, i)
            let cell = s.slice(i + 1, q)

            container.push(cell)
            i = q
        } else if (isBracket(a)) {
            container.push(a)
        }
    }

    return container
}

log(tokens1(code))
