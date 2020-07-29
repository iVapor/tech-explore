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

let code = "abc d efg 1 3 'gua' 'lang' 'kuai bian cheng' ( )[]"
// 这次我们比 a2 增加了 1 个功能
// 0, 单引号字符串可能带空格
// 下面例子的输出如下
// log(tokens2(code))
// ['abc', 'd', 'efg', '1', '3', 'gua', 'lang', 'kuai bian cheng', '(', ')', '[', ']']


const tokens2 = function(code) {
    let s = code + ' '
    let i = 0
    let container = []

    // 包含空格的单引号字符串
    // 其实也简单, quoteStringEnd 是找到单引号下标的
    // 所以上题你如果实现好了，这里应该会直接返回正确结果的

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

log(tokens2(code))
