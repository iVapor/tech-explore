import { keepTwo, removeComma } from "@/utils/tools";
import _ from 'lodash'
const countIndex = (actionRow, sourceList) => {
    let { validType, validRange } = actionRow
    let pack = []
    let list = sourceList

    for (let i = 0; i < list.length; i++ ) {
        let cell = list[i]
        if (cell === undefined) {
            break
        }
        if (cell.validType === validType &&
            cell.validRange === validRange) {
            pack.push(i)
        }
    }

    return pack
}

const stringPriceOne = (list) => {
    let tempList = _.cloneDeep(list)
    tempList.map(item => {
        let { price } = item
        item.price = price === undefined ? '' : keepTwo(String(price))
        return item
    })

    return tempList
}

const stringPriceAuto = (list) => {
    let tempList = _.cloneDeep(list)
    tempList.map(item => {
        let { firstSubscribePrice, autoPayPrice } = item
        item.firstSubscribePrice = firstSubscribePrice === undefined ? '' :
            keepTwo(String(firstSubscribePrice))
        item.autoPayPrice = autoPayPrice === undefined ? '' : keepTwo(String(autoPayPrice))
        return item
    })

    return tempList
}

const numberPriceOne = (list) => {
    let tempList = _.cloneDeep(list)
    tempList.map(item => {
        let { price } = item
        item.price = price === '' ? '' : removeComma(price).toFixed(2)
        return item
    })

    return tempList
}

const numberPriceAuto = (list) => {
    let tempList = _.cloneDeep(list)
    tempList.map(item => {
        let { firstSubscribePrice, autoPayPrice } = item
        item.firstSubscribePrice = firstSubscribePrice === '' ? '' : removeComma(firstSubscribePrice).toFixed(2)
        item.autoPayPrice = autoPayPrice === '' ? '' : removeComma(autoPayPrice).toFixed(2)
        return item
    })

    return tempList
}

export { countIndex, stringPriceOne, stringPriceAuto, numberPriceOne, numberPriceAuto }
