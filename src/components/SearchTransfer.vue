<template>
<div class="search-transfer">
    hell
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
            data3: [
                {
                    title: 'parent',
                    loading: false,
                    children: []
                }
            ],
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
    },
}
</script>

<style lang="scss" scoped>
    .search-transfer {
        position: relative;
    }
</style>
