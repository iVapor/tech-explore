<template>
<div class="search-transfer">
    <Tree :data="data3"
          :load-data="loadData"
          @on-toggle-expand="hideOtherTree"
          show-checkbox></Tree>
</div>
</template>

<script>
import { log } from "@/utils/tools";

export default {
    name: "SearchTransfer",
    components: {
    },
    props: {
    },
    data() {
        return {
            data3: [{
                id: 11,
                title: '你是',
                loading: false,
                children: []
            }, {
                id: 12,
                title: '被折叠项',
                loading: false,
                expand: true,
                children: []
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
        loadData (item, callback) {
            log('item', item)
            setTimeout(() => {
                let data = [{
                    id: 0,
                    title: '我的大女儿',
                    loading: false,
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
                        log('resData', resData)
                    }
                    this.loading = false
                })
                .catch(err => {
                    log(err);
                });
        },
        hideOtherTree(current) {
            log('current', current)
            this.foldSibling(current.id)
        },
        foldSibling(activeId) {
            log('activeId', activeId)
            if (activeId === 11) {
                this.data3[1].expand = false
            }

        }
    },
}
</script>

<style lang="scss" scoped>
    .search-transfer {
        position: relative;
    }
</style>
