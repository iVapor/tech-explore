import StatusCell from "./StatusCell";
import ShowFrontCell from "./ShowFrontCell";
import PriceCell from "./PriceCell";
import ProductIdCell from "./ProductIdCell";

import OrderCell from "./OrderCell";
import { findListLabel } from "@/utils/tools";
import { log } from "@/utils/tools";

const onePayCol = function () {
    return [{
        title: '有效期',
        minWidth: 60,
        render: (h, params) => {
            let { validType, validRange } = params.row
            let unit = findListLabel(this.dateList, validType)
            let str = validType === 4 ? unit : `${ validRange } ${ unit }`

            return h('div', str)
        }
    }, {
        title: '客户端',
        width: 100,
        render: (h, params) => {
            let { clientSource } = params.row
            let client = findListLabel(this.clientList, clientSource)
            return h('div', client)
        }
    }, {
        title: '定价',
        align: 'left',
        minWidth: 130,
        render: (h, params) => {
            let { price, _index } = params.row
            return h(PriceCell, {
                props: {
                    rowIndex: _index,
                    dataKey: 'price',
                    price,
                    detailMode: this.detailMode,
                },
                on: {
                    updateCell: this.updateOnePay
                }
            })
        },
    }, {
        title: 'Product ID',
        align: 'left',
        minWidth: 150,
        render: (h, params) => {
            let { productId, clientSource, _index } = params.row
            return h(ProductIdCell, {
                props: {
                    productId,
                    client: clientSource,
                    rowIndex: _index,
                    detailMode: this.detailMode,
                },
                on: {
                    updateCell: this.updateOnePay,
                }
            })
        },
    }, {
        title: '前端展示',
        align: 'center',
        minWidth: 80,
        render: (h, params) => {
            let { id, isFrontDisplay, equitySize, isEnable, _index } = params.row
            return h(ShowFrontCell, {
                props: {
                    frontStatus: isFrontDisplay,
                    status: isEnable,
                    id: id,
                    rightCount: equitySize,

                    rowIndex: _index,
                    detailMode: this.detailMode,
                },
                on: {
                    updateCell: this.updateOnePay,
                }
            })
        },
    }, {
        title: '启用状态',
        align: 'center',
        minWidth: 80,
        key: 'industryName',
        render: (h, params) => {
            let { id, isEnable, equitySize, _index } = params.row
            return h(StatusCell, {
                props: {
                    status: isEnable,
                    id: id,
                    rightCount: equitySize,

                    rowIndex: _index,
                    detailMode: this.detailMode,
                },
                on: {
                    updateCell: (data) => {
                        this.updateOnePay(data)
                        this.syncUpdateFront('one', data)
                    },
                }
            })
        },
    }, {
        title: '排序',
        align: 'center',
        minWidth: 150,
        render: (h, params) => {
            return h(OrderCell, {
                props: {
                    row: params.row,
                    list: this.onePayData,
                    detailMode: this.detailMode,
                },
                on: {
                    updateCell: this.updateOnePay,
                    orderRow: this.sortOneRow,
                },
            })
        },
    }, ]
}

const autoPayCol = function () {
    return [{
        title: '有效期',
        minWidth: 60,
        render: (h, params) => {
            let { validType, validRange } = params.row
            let unit = findListLabel(this.dateList, validType)
            let str = validType === 4 ? unit : `${ validRange } ${ unit }`

            return h('div', str)
        }
    }, {
        title: '客户端',
        width: 100,
        render: (h, params) => {
            let { clientSource } = params.row
            let client = findListLabel(this.clientList, clientSource)
            return h('div', client)
        }
    }, {
        title: '首次订阅价',
        align: 'left',
        minWidth: 130,
        render: (h, params) => {
            let { firstSubscribePrice, _index } = params.row
            return h(PriceCell, {
                props: {
                    rowIndex: _index,
                    dataKey: 'firstSubscribePrice',
                    price: firstSubscribePrice,
                    detailMode: this.detailMode,
                },
                on: {
                    updateCell: this.updateAutoPay
                }
            })
        },
    }, {
        title: '续费价格',
        align: 'left',
        minWidth: 130,
        render: (h, params) => {
            let { autoPayPrice, _index } = params.row
            return h(PriceCell, {
                props: {
                    rowIndex: _index,
                    dataKey: 'autoPayPrice',
                    price: autoPayPrice,
                    detailMode: this.detailMode,
                },
                on: {
                    updateCell: this.updateAutoPay
                }
            })
        },
    }, {
        title: 'Product ID',
        align: 'left',
        minWidth: 150,
        render: (h, params) => {
            let { productId, clientSource, _index } = params.row
            return h(ProductIdCell, {
                props: {
                    productId,
                    client: clientSource,
                    rowIndex: _index,
                    detailMode: this.detailMode,
                },
                on: {
                    updateCell: this.updateAutoPay,
                }
            })
        },
    }, {
        title: '前端展示',
        align: 'center',
        minWidth: 80,
        key: 'industryName',
        render: (h, params) => {
            let { id, isFrontDisplay, equitySize, isEnable, _index } = params.row

            log('isEnable', isEnable, params.row)
            return h(ShowFrontCell, {
                props: {
                    frontStatus: isFrontDisplay,
                    status: isEnable,
                    id: id,

                    rightCount: equitySize,
                    rowIndex: _index,
                    detailMode: this.detailMode,
                },
                on: {
                    updateCell: this.updateAutoPay,
                }
            })
        },
    }, {
        title: '启用状态',
        align: 'center',
        minWidth: 80,
        render: (h, params) => {
            let { id, isEnable, equitySize, _index } = params.row

            return h(StatusCell, {
                props: {
                    status: isEnable,
                    id: id,
                    rightCount: equitySize,

                    rowIndex: _index,
                    detailMode: this.detailMode,
                },
                on: {
                    updateCell: (data) => {
                        this.updateAutoPay(data)
                        this.syncUpdateFront('auto', data)
                    },
                }
            })
        },
    }, {
        title: '排序',
        align: 'center',
        minWidth: 80,
        render: (h, params) => {
            return h(OrderCell, {
                props: {
                    row: params.row,
                    list: this.autoPayData,
                    detailMode: this.detailMode,
                },
                on: {
                    updateCell: this.updateAutoPay,
                    orderRow: this.sortAutoRow,
                }
            })
        },
    }, ]
}

export { onePayCol, autoPayCol }
