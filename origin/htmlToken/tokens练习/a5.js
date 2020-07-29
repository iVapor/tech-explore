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

const isSymbol = (char) => {
    let lib = "()[]+-*/"
    let exist = lib.includes(char)
    return exist
}

const numberEnd = (s, index) => {
    let end = index
    for (let i = index; i < s.length; i++) {
        let next = s[i + 1]

        if (!isNumber(next)) {
            log('next', next)
            end = i
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
        if (isEscape(current)) {
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


// code 是一个如下的字符串，只包含符号和数字
// 符号一共有 6 种 [ ] + - * /
// 数字就只有十进制数字
let code = '[+ 123 456]'
// 对于上面一行字符串，返回下面的内容，注意数字类型被转换了
// ['[', '+', 123, 456, ']']

const tokens4 = function(code) {
    let s = code + ' '
    let i = 0
    let container = []

    for (;i < s.length;i++) {
        let a = s[i]
        log('a', a)

        if (isSpace(a)) {

        } else if (isNumber(a)) {
            let num = numberEnd(s, i)
            let cell = s.slice(i, num + 1)
            let numCell = parseInt(cell)

            container.push(numCell)
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
        } else if (isSymbol(a)) {
            container.push(a)
        }
    }

    return container
}

log(tokens4(code))
