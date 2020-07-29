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
    let lib = `'"`
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
    let lib = "{}:,()[]+-*/"
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

// s 是只包含以下 6 种元素的 JSON 格式字符串（也包括空白符号）
// { } : ,   十进制整数   字符串(不包含特殊符号，不支持转义符)
let s = `
    {
        "name": "gua",
        "height": 169
    }
`
// 对于上面的 s 将返回以下数据
// 注意 169 是数字
// ["{", "name", ":", "gua", ",", "height", ":", 169, "}"]

const jsonTokens = function(jsonString) {
    let s = jsonString + ' '
    let i = 0
    let container = []

    for (;i < s.length;i++) {
        let a = s[i]

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

log(jsonTokens(s))
