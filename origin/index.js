let a =  [{
    "id": "1",
    "title": "集团商户",
    "parentId": "0",
    "showOrder": 1,
    "orgId": "123456",
    "type": "1",
    "industryId": 1,
    "industry": null,
    "_disabled": false,
    "storeType": "Group",
    "level": 1,
    "children": [{
        "id": "226dd7e1-208e-4520-9aab-469213379beb",
        "title": "测试测试3",
        "parentId": "1",
        "showOrder": 6,
        "orgId": "07072544",
        "type": "5",
        "industryId": 1,
        "industry": null,
        "_disabled": true,
        "storeType": "Group",
        "level": 2,
        "children": [],
        "createType": 2
    }, {
        "id": "3da5a433-890b-4eba-840f-3c454eed3dca",
        "title": "测试测试5",
        "parentId": "1",
        "showOrder": 8,
        "orgId": "28219301",
        "type": "4",
        "industryId": 1,
        "industry": null,
        "_disabled": true,
        "storeType": "Group",
        "level": 2,
        "children": [],
        "createType": 3
    }, {
        "id": "87ede1c4-5d7f-4e5e-a8f9-1fed45244331",
        "title": "测试测试4",
        "parentId": "1",
        "showOrder": 8,
        "orgId": "62791249",
        "type": "4",
        "industryId": 1,
        "industry": null,
        "_disabled": true,
        "storeType": "Group",
        "level": 2,
        "children": [],
        "createType": 3
    }, {
        "id": "9878df93-a8bf-4f59-a675-bf768b88f8db",
        "title": "华北大区",
        "parentId": "1",
        "showOrder": 8,
        "orgId": "57170744",
        "type": "4",
        "industryId": 1,
        "industry": null,
        "_disabled": true,
        "storeType": "Group",
        "level": 2,
        "children": [{
            "id": "866483a9-a7e6-4255-9407-eca0d1d45a8d",
            "title": "北京商场",
            "parentId": "9878df93-a8bf-4f59-a675-bf768b88f8db",
            "showOrder": 8,
            "orgId": "28704543",
            "type": "5",
            "industryId": 1,
            "industry": null,
            "_disabled": true,
            "storeType": "Group",
            "level": 3,
            "children": [{
                "id": "1226127f-51c3-417c-9dbe-be8ab1947df6",
                "title": "北京麦当劳1店",
                "parentId": "866483a9-a7e6-4255-9407-eca0d1d45a8d",
                "showOrder": 8,
                "orgId": "36747846",
                "type": "10",
                "industryId": 1,
                "industry": null,
                "_disabled": true,
                "storeType": "Group",
                "level": 4,
                "children": [],
                "createType": 1
            }],
            "createType": 2
        }],
        "createType": 3
    }],
    "createType": 3
}]

/**
 * 创建级联的数据格式
 * @example createCascadeFormat(a, 'title', 'orgId' )
 * @param list 响应数据
 * @return {[]}
 */
const createCascadeFormat = (list, labelKey, valueKey) => {
    let base = []
    for (let i = 0; i < list.length; i++) {
        let node = list[i]
        let format = {
            label: node[labelKey],
            value: node[valueKey],
            children: [],
        }

        // 如果有子节点
        if (node.children.length > 0) {
            format.children = createCascadeFormat(node.children, labelKey, valueKey)
        }
        base.push(format)
    }
    return base
}

function validateContact(list) {
    let p = list.some(i => {
        let { relation, contactName, contactPhone } = i
        if (relation !== '' || contactName !== '' || contactPhone !== '') {
            return !relation || !contactName || !contactPhone
        }
    })
    return p
}
const __main = () => {
    log('in __main')
    let data = createCascadeFormat(a, 'title', 'orgId' )
    log('data', data)

    let list = [
        {
            "relation": 2,
            "contactName": "",
            "contactPhone": "",
            "status": true
        }
    ]
    let v = validateContact(list)
    log('v', v)
}

__main()
