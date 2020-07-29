import {log} from "@/utils/tools";
import OperateCell from "@/components/OperateCell";

export const orderTableCol = function () {
    return [
        {
            title: 'Name',
            key: 'name'
        },
        {
            title: 'Age',
            key: 'age'
        },
        {
            title: 'Address',
            key: 'address'
        },
        {
            title: '操作',
            minWidth: 80,
            key: 'orgName',
            align: 'center',
            render: (h, params) => {
                let row = params.row
                log('row', row)

                return h(OperateCell, {
                    props: {
                        rowIndex: row._index,
                        address: row.address,
                    },
                    on: {
                        upRow: (index) => {
                            this.changeRowOrder(index)
                        },
                        updateCell: (index, property, value) => {
                            this.updateTableData(index, property, value)
                        }
                    }
                })
            }
        },
    ]
}