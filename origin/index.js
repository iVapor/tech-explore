const log = console.log.bind(console);

const getBranch = (arr, layer) => {
    return arr.filter(item => item.layer === layer)
}

const handle = (arr, layer) => {
    let branch = getBranch(arr, layer)
    if (branch.length === 0) {
        return []
    }

    for (let i = 0; i < branch.length; i++) {
        let eachBranch = branch[i]
        let sub = getBranch(arr, layer + 1)
        if (sub.length > 0) {

            let children = handle(arr, layer + 1)
            let rightSon = children.filter(item => item.pid === eachBranch.id)
            eachBranch.children = rightSon
        }
    }

    return branch
}

let tree = handle(data.result, 1)
log('tree', tree)
