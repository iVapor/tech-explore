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
const isEscape = (char) => {
    let lib = "\\"
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
        let current = s[i]
        log('current', current)
        if (isEscape(current)) {
            log('in if current', current)
            i++
        }

        let next = s[i + 1]
        if (isQuote(next)) {
            end = i + 1
            break
        }

    }

    return end
}


// 本题实现字符串中转义字符的解析
let code = "abc ok 1 3 'gua\\'lang' 'kuai bian cheng' ( )[]"
// 输出如下
// ['abc', 'ok', '1', '3', 'gua'lang', 'kuai bian cheng', '(', ')', '[', ']']

const tokens3 = function(code) {
    let s = code + ' '
    let i = 0
    let container = []

    // 转义字符，就是在 quoteStringEnd 函数中如果读到 | 就往前读一个字符
    // 我们目前只支持 \'
    // 所以如果下一个字符是 ' 就替换 \' 为单引号
    // 其他情况是错误的，且在我们的作业中不考虑也不处理

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
            cell = cell.split("\\'").join("'")

            container.push(cell)
            i = q
        } else if (isBracket(a)) {
            container.push(a)
        }
    }

    return container
}

log(tokens3(code))
