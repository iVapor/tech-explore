const log = console.log.bind(console)

const findParent = (arr) => {
    let index = 0
    for(let i = 0; i < arr.length; i++) {
        let cell = arr[i]
        if (cell.parent_id === 0) {
            index = i
        }
    }

    return index
}

const createChildren = (arr, mark) => {
    let pack = []
    for(let i = 0; i < arr.length; i++) {
        let cell = arr[i]
        if (cell.parent_id === mark) {
            pack.push(cell)
        }
    }

    return pack
}

const tree = (arr) => {
    // let treeNode = createTreeNode(arr, 0)
    if (arr.length === 0) {
        return {}
    }
    let parentIndex = findParent(arr)
    let parentNode = arr[parentIndex]

    let parent = {
        node_id: parentNode.node_id,
        parent: 0,
        name: parentNode.name,
        children: [],
    }
    if (arr.length === 1) {
        return parent
    } else {
        let children = createChildren(arr, 1)
        parent.children = children
    }

    return parent
}

const testTree = () => {
    let l1 = []
    let e1 = {}
    let l2 = [
        {
            node_id: 1,
            parent_id: 0,
            name: 'n1',
        },
    ]
    let e2 = {
        node_id: 1,
        parent: 0,
        name: 'n1',
        children: [],
    }
    let l3 = [
        {
            node_id: 1,
            parent_id: 0,
            name: 'n1',
        },
        {
            node_id: 2,
            parent_id: 1,
            name: 'n2',
        },
    ]
    let e3 = {
        node_id: 1,
        parent: 0,
        name: 'n1',
        children: [
            {
                node_id: 2,
                parent: 1,
                name: 'n2',
                children: [],
            },
        ],
    }
    let l4 = [
        {
            node_id: 1,
            parent_id: 0,
            name: 'n1',
        },
        {
            node_id: 2,
            parent_id: 1,
            name: 'n2',
        },
        {
            node_id: 3,
            parent_id: 1,
            name: 'n3',
        },
    ]
    let e4 = {
        node_id: 1,
        parent: 0,
        name: 'n1',
        children: [
            {
                node_id: 2,
                parent: 1,
                name: 'n2',
                children: [],
            },
            {
                node_id: 3,
                parent: 1,
                name: 'n3',
                children: [],
            },
        ],
    }
    let l5 = [
        {
            node_id: 1,
            parent_id: 0,
            name: 'n1',
        },
        {
            node_id: 2,
            parent_id: 1,
            name: 'n2',
        },
        {
            node_id: 3,
            parent_id: 1,
            name: 'n3',
        },
        {
            node_id: 4,
            parent_id: 2,
            name: 'n4',
        },
    ]
    let e5 = {
        node_id: 1,
        parent: 0,
        name: 'n1',
        children: [
            {
                node_id: 2,
                parent: 1,
                name: 'n2',
                children: [
                    {
                        node_id: 4,
                        parent: 2,
                        name: 'n3',
                        children: [],
                    }
                ],
            },
            {
                node_id: 3,
                parent: 1,
                name: 'n3',
                children: [],
            },
        ],
    }
    let l6 = [
        {
            node_id: 1,
            parent_id: 0,
            name: 'n1',
        },
        {
            node_id: 2,
            parent_id: 1,
            name: 'n2',
        },
        {
            node_id: 3,
            parent_id: 1,
            name: 'n3',
        },
        {
            node_id: 4,
            parent_id: 2,
            name: 'n4',
        },
        {
            node_id: 5,
            parent_id: 3,
            name: 'n5',
        },
    ]
    let e6 = {
        node_id: 1,
        parent: 0,
        name: 'n1',
        children: [
            {
                node_id: 2,
                parent: 1,
                name: 'n2',
                children: [
                    {
                        node_id: 4,
                        parent: 2,
                        name: 'n3',
                        children: [],
                    }
                ],
            },
            {
                node_id: 3,
                parent: 1,
                name: 'n3',
                children: [
                    {
                        node_id: 5,
                        parent: 3,
                        name: 'n5',
                        children: [],
                    }
                ],
            },
        ],
    }
    let l7 = [
        {
            node_id: 1,
            parent_id: 0,
            name: 'n1',
        },
        {
            node_id: 2,
            parent_id: 1,
            name: 'n2',
        },
        {
            node_id: 3,
            parent_id: 1,
            name: 'n3',
        },
        {
            node_id: 4,
            parent_id: 2,
            name: 'n4',
        },
        {
            node_id: 5,
            parent_id: 3,
            name: 'n5',
        },
        {
            node_id: 6,
            parent_id: 4,
            name: 'n6',
        },
    ]
    let e7 = {
        node_id: 1,
        parent: 0,
        name: 'n1',
        children: [
            {
                node_id: 2,
                parent: 1,
                name: 'n2',
                children: [
                    {
                        node_id: 4,
                        parent: 2,
                        name: 'n3',
                        children: [
                            {
                                node_id: 6,
                                parent: 4,
                                name: 'n6',
                                children: [],
                            }
                        ],
                    }
                ],
            },
            {
                node_id: 3,
                parent: 1,
                name: 'n3',
                children: [
                    {
                        node_id: 5,
                        parent: 3,
                        name: 'n5',
                        children: [],
                    }
                ],
            },
        ],
    }

    // ensure(equals(tree(l1), e1), 'test tree 1')
    // ensure(equals(tree(l2), e2), 'test tree 2')
    ensure(equals(tree(l3), e3), 'test tree 3')
    // ensure(equals(tree(l4), e4), 'test tree 4')
    // ensure(equals(tree(l5), e5), 'test tree 5')
    // ensure(equals(tree(l6), e6), 'test tree 6')
    // ensure(equals(tree(l7), e7), 'test tree 7')
}

const ensure = (condition, message) => {
    // 在条件不成立的时候, 输出 message
    if (!condition) {
        log('*** 测试失败:', message)
    } else {
        log('测试成功')
    }
}

const judgeChildren = (first, second) => {
    let empty = first.length === 0 && second.length === 0
    return empty
}

const equals = (first, second) => {
    log('first', first)
    log('second', second)
    let firstKeys = Object.keys(first)
    let equal = false
    let count = 0

    let equalChildren
    for(let i = 0; i < firstKeys.length; i++) {
        let key = firstKeys[i]
        if (first[key] === second[key]) {
            count++
        } else if (key === 'children') {
            equalChildren = judgeChildren(first.children, second.children)
            return equalChildren
        } else {
            return false
        }
    }

    if (count === firstKeys.length) {
        equal =  equalChildren
    } else {
        equal =  false
    }
    return equal
}



const test = () => {
    let a = {
        node: 2,
        parent_id: 2,
        name: '23'
    }
    equals(a)
}

const __main = () => {
    // test()
    testTree()
}

__main()