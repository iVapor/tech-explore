<template>
    <div>
        <a-tree-select
            show-search
            style="width: 300px"
            :dropdown-style="{ maxHeight: '400px', overflow: 'auto' }"
            placeholder="Please select"
            allow-clear

            :tree-data="treeData"
            tree-checkable
            tree-default-expand-all
            :filterTreeNode="filterTree"
            @change="treeChange"
        >
<!--            <template slot="title" slot-scope="{ key, addInfo, titleCopy }" style="color: #08c">-->
<!--                <p>-->
<!--                    <span>{{ titleCopy }}</span>-->
<!--                    <span style="margin-left: 40px; color: orange;">{{ addInfo }}</span>-->
<!--                </p>-->
<!--            </template>-->
        </a-tree-select>
        <div class="yellow">
            {{ displayNode }}
        </div>
    </div>

</template>

<script>
import { log } from "../assets/utils/tools";

export default {
    name: 'HelloWorld',
    props: {
        msg: String
    },
    data() {
        return {
            treeData: [
                {
                    title: 'Node1',
                    value: '0-0',
                    key: '0-0',
                    children: [
                        {
                            value: '0-0-1',
                            key: '0-0-1',
                            addInfo: '哈哈1',//自己另外要展示的其他信息
                            title: 'Child Node1/Node1',//如果还需后端返回的标题，可自己处理下把title重新赋值给一个新的字段，因为下面的scopedSlots重定义title会与title字段冲突，如果title字段存在的话，a-tree-select会自动识别title，忽略scopedSlots，导致达不到你想要的的效果。
                            // scopedSlots: {title: 'title',},//自定义的标题插槽
                        },
                        {
                            title: 'Child Node2',
                            value: '0-0-2',
                            key: '0-0-2',
                            addInfo: '哈哈2',
                            // scopedSlots: {title: 'title',},
                        },
                    ],
                },
                {
                    title: 'Node2',
                    value: '0-1',
                    key: '0-1',
                },
            ],
            treeData1: [
                {
                    title: 'Node1',
                    value: '0-0',
                    key: '0-0',
                    children: [
                        {
                            value: '0-0-1',
                            key: '0-0-1',
                            addInfo: '哈哈1',//自己另外要展示的其他信息
                            titleCopy: 'Child Node1/Node1',//如果还需后端返回的标题，可自己处理下把title重新赋值给一个新的字段，因为下面的scopedSlots重定义title会与title字段冲突，如果title字段存在的话，a-tree-select会自动识别title，忽略scopedSlots，导致达不到你想要的的效果。
                            scopedSlots: {title: 'title',},//自定义的标题插槽
                        },
                        {
                            titleCopy: 'Child Node2',
                            value: '0-0-2',
                            key: '0-0-2',
                            addInfo: '哈哈2',
                            scopedSlots: {title: 'title',},
                        },
                    ],
                },
                {
                    title: 'Node2',
                    value: '0-1',
                    key: '0-1',
                },
            ],
            displayNode: '',
        }
    },
    methods: {
        filterTree(inputValue, treeNode) {
            let result = this.fuseSearch(inputValue, treeNode.data)
            return result
        },
        fuseSearch(mode, data) {
            let all = data.props.label
            for(let i = 0; i < all.length; i++) {
                let len = mode.length
                let match = all.slice(i, i + len)
                if (mode === match) {
                    return true
                }
            }
            return false
        },
        treeChange(value, label, extra) {
            log('treeChange', 'v', value, 'l', label)
            log('e', extra)
            this.displayNode = label[0]
            // this.$emit("change", saveValue, label.join(','), v)
        },
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.yellow {
    color: blue;
}
h3 {
    margin: 40px 0 0;
}

ul {
    list-style-type: none;
    padding: 0;
}

li {
    display: inline-block;
    margin: 0 10px;
}

a {
    color: #42b983;
}
</style>
