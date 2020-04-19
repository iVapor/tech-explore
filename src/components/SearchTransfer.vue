<template>
<div class="search-transfer">
    <Tree :data="data3"
          :empty-text="'某的东西'"
          :load-data="loadData"
          :render="renderContent"
          @on-toggle-expand="hideOtherTree"
          show-checkbox></Tree>
</div>
</template>

<script>
import { log } from "@/utils/tools";
import TreeNode from "./TreeNode";

export default {
    name: "SearchTransfer",
    components: {
        TreeNode,
    },
    props: {
    },
    data() {
        return {
            data3: [{
                id: 0,
                title: '',
                loading: false,
                children: [],
            }, ],
        };
    },
    watch: {

    },
    created() {
        this.getList()
    },
    mounted() {

    },
    methods: {
        renderContent (h, { root, node, data }) {
            log('node', node)
           log('root', root)
            return h(TreeNode, {
                props: {
                    root: root,
                    source: this.data3,
                    node: node,
                    data: data,
                }
            })
        },
        loadData (item, callback) {
            log('item', item)
            setTimeout(() => {
                let data = [{
                    id: 0,
                    title: '关闭状态',
                    loading: false,
                    disable: true,

                    children: [{
                        id: 3,
                        title: '漂亮懂事',
                        loading: false,
                        children: []
                    }, ]
                }, {
                    id: 1,
                    title: '我的大弟',
                    loading: false,
                    selected: true,

                    expand: true,
                    children: [{
                        id: 2,
                        title: '英俊帅气',
                        loading: false,
                        children: []
                    }, ]
                }, ];
                if (item.nodeKey === 2) {
                    data = [{
                        title: '家乡的云',
                        loading: false,
                        children: []
                    }]
                }
                callback(data);
            }, 100);
        },
        getList() {
            let server = '/goods-server'
            let url = server + '/goods/category/list'
            // this.list = []
            this.$ajaxGet(url)
                .then(res => {
                    if (res && res.code === 10000) {

                        let resData = res.data

                        this.renderPage(resData)
                    }
                    this.loading = false
                })
                .catch(err => {
                    log(err);
                });
        },
        renderPage(data) {
            let tempList = []
            data.forEach(item => {
                let format = {
                    id: item.id,
                    title: item.name,
                    disableCheckbox: true,
                    loading: false,
                    expand: false,
                    parentId: item.parentId,
                    children: []
                }
                tempList.push(format)
            })
            this.data3 = tempList
        },
        hideOtherTree(current) {
            this.foldSibling(current.id)
        },
        foldSibling(activeId) {
            log('activeId', activeId)
            if (activeId === 11) {
                this.data3[1].expand = false
            }
            this.setSibling(this.data3, activeId)
        },
        setSibling(source, activeId) {
            for(let i = 0; i < source.length; i++) {

            }

        },

    },
}
</script>

<style lang="scss" scoped>
    .search-transfer {
        position: relative;
    }

    .color-text {
        color: #7c8e8e;
        cursor: not-allowed;
    }
</style>
