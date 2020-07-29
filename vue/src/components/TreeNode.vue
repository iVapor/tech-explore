<template>
    <div class="">{{ data.title }}hello{{ node.nodeKey
        }}
        <span @click="removeNode">移除节点</span>
        <Button @click="addNode" type="primary">新增</Button>
    </div>
</template>

<script>
    import { log } from "@/utils/tools";
    import _ from 'lodash'

    export default {
        name: "TreeNode",
        props: {
            root: Array,
            node: Object,
            source: Array,
            data: Object,
        },
        created() {
            log('in node, root', this.root)
        },
        methods: {
            removeNode() {
                // let index = _.findIndex(this.root, {nodeKey: 3})
                // log('index', index)
                // this.root.splice(index, 1)
                // log('this.root', this.root)
                this.source.splice(1, 1)
            },
            addNode() {
                let cell = {
                    id: 12,
                    title: '新增的',
                    disableCheckbox: true,
                    loading: false,
                    expand: true,
                    children: []
                }
                this.source.push(cell)
                // this.$set(this.source, cell)
                log('this.source', this.source)
            },
        }
    }
</script>

<style lang="scss" scoped>

</style>
