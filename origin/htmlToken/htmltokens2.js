const log = console.log.bind(console)

const ensure = (condition, message) => {
    if (!condition) {
        log('测试失败', message)
    } else {
        log('测试成功')
    }
}

const arrayEquals = (first, second) => {
    let length = first.length !== second.length
    if ( length ) {
        return false
    }

    for (let i = 0; i < first.length; i++) {
        let firstEle = first[i]
        let secondEle = second[i]
        if (firstEle !== secondEle) {
            return false
        }
    }

    return true
}

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

const isBracket = (char) => {
    let lib = "{}"
    let exist = lib.includes(char)
    return exist
}

const isSpace = (char) => {
    return char === ' '
}

const isSymbol = (char) => {
    let lib = ":,()[]+-*/=<>"
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
            end = i
            break
        } else if (isSymbol(next)) {
            end = i
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

const bracketEnd = (s, index) => {
    let end = index
    for (let i = index; i < s.length; i++) {

        let next = s[i + 1]
        if (isBracket(next)) {
            end = i + 1
            break
        }

    }

    return end
}

const htmlTokens = function(htmlString) {
    // htmlString 是 HTML 格式的字符串
    // 解析字符串, 返回对应的 tokens

    let s = htmlString + ' '
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
            let cell = s.slice(i, str + 1)
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
        } else if (isBracket(a)) {
            let b = bracketEnd(s, i)
            log('i', i)
            log('b', b)
            let cell = s.slice(i, b + 1)
            log('cell', cell)

            container.push(cell)
            i = b
        }
    }

    log('container', container)
    return container
}

const testHtmlTokens = function() {
    let s1 = '<img>'
    let e1 = ['<', 'img', '>']

    let s2 = '<h1 id>'
    let e2 = ['<', 'h1', 'id', '>']

    let s3 = '<h2 id="id-img-gua"></h2>'
    let e3 = ['<', 'h2', 'id', '=', 'id-img-gua', '>', '<', '/', 'h2', '>']

    let s4 = '<div id="id-img-gua"><h2>hello</h2></div>'
    let e4 = ['<', 'div', 'id', '=', 'id-img-gua', '>',
        '<', 'h2', '>', 'hello', '<', '/', 'h2', '>',
        '<', '/', 'div', '>',
    ]

    let s5 = '<div>{{ name }}</div>'
    let e5 = ['<', 'div', '>', '{{', 'name', '}}', '<', '/', 'div', '>']


    // ensure(arrayEquals(htmlTokens(s1), e1), 'test html tokens1')
    // ensure(arrayEquals(htmlTokens(s2), e2), 'test html tokens2')
    // ensure(arrayEquals(htmlTokens(s3), e3), 'test html tokens3')
    // ensure(arrayEquals(htmlTokens(s4), e4), 'test html tokens4')
    ensure(arrayEquals(htmlTokens(s5), e5), 'test html tokens5')
}

testHtmlTokens()
