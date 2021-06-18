<template>
<div >
    <Tooltip :content="'尚有未配置的用户权益项，无法启用'"
             :disabled="rightCount !== 0"
             placement="top">
        <i-switch v-model="open" @on-change="changeStatus"
                  :disabled="detailMode"
        >
            <Icon type="md-checkmark" slot="open"></Icon>
            <Icon type="md-close" slot="close"></Icon>
        </i-switch>
    </Tooltip>

</div>
</template>

<script>
import { log } from "@/utils/tools";

export default {
    name: "StatusCell",
    components: {
    },
    props: {
        status: Number,
        id: Number,
        rightCount: Number,
        rowIndex: Number,
        detailMode: Boolean,
    },
    data() {
        return {
            open: this.status === 1,
        };
    },
    computed: {
        switchStatus() {
            // 设置过权益后才能开启
            let canChange =
                    this.rightCount !== 0
            return !canChange
        }
    },
    watch: {
        status(updateStatus) {
            this.open = updateStatus === 1
        }
    },
    created() {
    },
    mounted() {

    },
    methods: {
        changeStatus() {
            // 只有编辑时，才有规则 id。
            let isEditCell = this.id !== undefined
            if (this.open) {
                this.openPriceRow()

            } else if (!this.open && isEditCell) {
                this.getServiceCard()
            } else {
                this.openPriceRow()
            }

        },
        showStatusPop(serviceRemain) {
            let content = serviceRemain ? '当前有未兑换的服务卡的用户，停用后拥有服务卡的用户将不能兑换该会员权益，且不会再新增付费会员，自动续费仍生效，现有的付费会员仍可享受权益至有效期结束，确定停用?' : '停用后不会再新增付费会员，自动续费仍生效，现有的付费会员仍可享受权益至有效期结束，确定停用?'
            this.$Modal.confirm({
                title: '停用',
                content: content,
                onOk: () => {
                    this.openPriceRow()
                },
                onCancel: () => {
                    this.open = !this.open
                }
            });
        },
        getServiceCard() {
            let server = '/grade-server'
            let url = server + '/api/pay/card/sub/remainRegisterCard'
            // 付费规则
            let data = {
                id: this.id,
            }

            this.$ajaxGet(url, data)
                .then(res => {
                    if (res && res.code === 10000) {
                        let serviceRemain = res.data
                        this.showStatusPop(serviceRemain)
                    }
                })
                .catch(err => {
                    log(err);
                });
        },
        openPriceRow() {
            let data = {
                index: this.rowIndex,
                property: 'isEnable',
                value: this.open ? 1 : 0,
            }
            this.$emit('updateCell', data)
        },
    },
}
</script>

<style lang="scss" scoped>

</style>
