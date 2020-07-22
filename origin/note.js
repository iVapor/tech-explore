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

const findNodeByLevel = (arr, level) => {
    let index = 0
    for(let i = 0; i < arr.length; i++) {
        let cell = arr[i]
        if (cell.parent_id === level) {
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

const hasChild = (arr, level) => {
    let childIndex = []
    arr.forEach((item, index) => {
        if (item.parent_id === level) {
            childIndex.push(index)
        }
    })

    return childIndex
}

const createNodeIndex = (arr, index, level) => {
    let node = arr[index]
    let model = {
        node_id: node.node_id,
        parent: level,
        name: node.name,
        children: [],
    }

    return model
}

const createTree = (arr, level) => {
    if (arr.length === 0) {
        return {}
    }
    let model = {
        node_id: 1,
        parent: level,
        name: '',
        children: [],
    }

    let index = findNodeByLevel(arr, level)
    let node = arr[index]
    Object.assign(model, {
        node_id: node.node_id,
        name: node.name,
    })

    let childIndex = hasChild(arr, level + 1)
    if (childIndex.length > 0) {
        let child = []
        childIndex.forEach(nodeIndex => {
            let modal = createNodeIndex(arr, nodeIndex, level + 1)
            child.push(modal)
        })

        model.children = child
    }

    return model
}

const tree = (arr) => {
    let treeNode = createTree(arr, 0)
    return treeNode
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
    // ensure(equals(tree(l3), e3), 'test tree 3')
    ensure(equals(tree(l4), e4), 'test tree 4')
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

const compareObjKey = (firstKeys, secondKeys) => {
    let equalLength = firstKeys.length === secondKeys.length
    let key = firstKeys.every((item, index) => {
        return item === secondKeys[index]
    })

    return equalLength && key
}

const equalArray = (source, object) => {
    let equal = source.every((item, index) => {
        return equals(item, object[index])
    })

    return equal
}

const equals = (first, second) => {
    log('in equals\n', 'first\n', first, '\nsecond\n', second)
    let firstKeys = Object.keys(first)
    let secondKeys = Object.keys(second)

    // 先比较 key
    let keyEqual = compareObjKey(firstKeys, secondKeys)
    if (!keyEqual) {
        return false
    }

    let value = firstKeys.every((item) => {
        let firstItem = first[item]
        let secondItem = second[item]
        let isArray = Array.isArray(firstItem)

        if (isArray) {
            let children = equalArray(firstItem, secondItem)
            return children
        } else {
            return first[item] === second[item]
        }

    })
    log('value', value)
    if (!value) {
        return false
    }

    return true
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