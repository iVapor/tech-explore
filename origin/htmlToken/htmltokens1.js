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

const isSpace = (char) => {
    return char === ' '
}

const isSymbol = (char) => {
    let lib = "{}:,()[]+-*/=<>"
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

const htmlTokens = function(htmlString) {
    // htmlString 是 HTML 格式的字符串
    // 解析字符串, 返回对应的 tokens

    let s = htmlString + ' '
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
        }
    }

    log('container', container)
    return container
}

const testHtmlTokens = function() {
    let s1 = '<img>'
    let e1 = ['<', 'img', '>']

    let s2 = '<img id>'
    let e2 = ['<', 'img', 'id', '>']

    let s3 = '<img id="id-img-gua">'
    let e3 = ['<', 'img', 'id', '=', 'id-img-gua', '>']

    let s4 = '<img id="id-img-gua" alt>'
    let e4 = ['<', 'img', 'id', '=', 'id-img-gua', 'alt', '>']

    let s5 = '<img id="id-img-gua" alt="kuai bian cheng">'
    let e5 = ['<', 'img', 'id', '=', 'id-img-gua', 'alt', '=', 'kuai bian cheng', '>']

    let s6 = '<div></div>'
    let e6 = ['<', 'div', '>', '<', '/', 'div', '>']

    let s7 = '<div id="app"></div>'
    let e7 = ['<', 'div', 'id', '=', 'app', '>', '<', '/', 'div', '>']

    ensure(arrayEquals(htmlTokens(s1), e1), 'test html tokens1')
    ensure(arrayEquals(htmlTokens(s2), e2), 'test html tokens2')
    ensure(arrayEquals(htmlTokens(s3), e3), 'test html tokens3')
    ensure(arrayEquals(htmlTokens(s4), e4), 'test html tokens4')
    ensure(arrayEquals(htmlTokens(s5), e5), 'test html tokens5')
    ensure(arrayEquals(htmlTokens(s6), e6), 'test html tokens6')
    ensure(arrayEquals(htmlTokens(s7), e7), 'test html tokens7')
}

testHtmlTokens()
