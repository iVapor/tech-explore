// import { log } from "@/utils/tools";
import LevelNameCell from "./LevelNameCell";
import LogoCell from "./LogoCell";

const levelNameCol = function () {
    return [{
        title: '会员等级',
        minWidth: 60,
        render: (h, params) => {
            let {levelId} = params.row
            let level = levelId.slice(4)
            let str = `SVIP ${level}`

            return h('div', str)
        }
    }, {
        title: '名称',
        width: 240,
        align: 'left',
        render: (h, params) => {
            let {levelName, _index} = params.row
            return h(LevelNameCell, {
                props: {
                    rowIndex: _index,
                    levelName,
                },
                on: {
                    updateCell: this.updateLevel
                }
            })
        }
    }, {
        title: '徽标',
        minWidth: 60,
        render: (h, params) => {
            let {levelLogo, _index} = params.row
            return h(LogoCell, {
                props: {
                    rowIndex: _index,
                    levelLogo,
                },
                on: {
                    updateCell: this.updateLevel
                }
            })
        }
    }, {
        title: '操作',
        minWidth: 60,
        render: (h, params) => {
            let {_index} = params.row
            let isLast = _index === (this.levelData.length - 1)
            let text = isLast ? '移除' : '-'

            return h('div', {
                class: 'action-text',
                on: {
                    click: () => {
                        if (isLast) {
                            this.removeLevel(_index)
                        }
                    }
                }
            }, text)
        }
    },]
}

export { levelNameCol }
