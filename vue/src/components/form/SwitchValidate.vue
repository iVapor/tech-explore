<template>
<div>
    <Form ref="memberInfo" :label-width="90" :model="memberForm"
          :rules="memberModalValidate">
        <FormItem label="账号：" prop="account">
            <RadioGroup
                v-model="accountType"
            >
                <Radio label="phone">手机号</Radio>
                <Radio label="idCard">证件号</Radio>
            </RadioGroup>
            <div v-if="accountType === 'phone'">
                <Input class="w280" placeholder="请输入用户手机号"
                       :maxlength="11"
                       v-model="memberForm.phone"/><br>
                <a-switch
                    v-model="autoPhone"
                    checked-children="自动分配号码"
                    un-checked-children="自动分配号码" default-checked />
                <div class="frozen-desc">开启后系统自动分配虚拟号，且虚拟号不可更改。</div>
            </div>
            <div v-else>
                <i-input v-model="memberForm.papersNo"
                         maxlength="18"
                         class="w280"
                         placeholder="请输入身份证">
                    <Select
                        v-model="memberForm.papersType"
                        slot="prepend" style="width: 80px">
                        <Option value="1">身份证</Option>
                    </Select>
                </i-input>
                <div class="frozen-desc">初始密码为证件号后八位。</div>
            </div>

        </FormItem>
    </Form>
</div>
</template>

<script>
// import {log} from "@/utils/tools";
const log = console.log.bind(console)

export default {
    name: "${NAME}",
    components: {},
    props: {
    },
    data() {
        const validatePhone = () => {
            let p = new Promise((resolve, reject) => {
                let value = this.memberForm.phone
                let rightLength = value.length !== 11

                if (!value) {
                    reject("请输入手机号")
                } else if (rightLength) {
                    reject("手机号为 11 位")
                } else {
                    resolve();
                }
            })
            return p
        }

        const validateId = () => {
            let p = new Promise((resolve, reject) => {
                let value = this.memberForm.phone
                let reg = /^[1-8][0-9]{5}(19|20)\d{2}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|[1-2][0-9]))[0-9]{3}[0-9Xx]$/;

                let wrongId = !reg.test(value)
                if (!value) {
                    reject("请输入身份证号")
                } else if (wrongId) {
                    reject("请输入正确的证件号")
                } else {
                    resolve();
                }
            })
            return p
        }
        const validateAccount = (rule, value) => {
            log('value', value)
            log('this.accountType', this.accountType)
            if (this.accountType === 'phone') {
                let p = validatePhone()
                return p
            } else {
                let id = validateId()
                return id
            }

        }
        return {
            memberForm: {
                phone: '',
                memberName: '',
                sex: '',
                birthday: '',

                papersNo: '',
                papersType: '1',
            },
            autoPhone: false,
            accountType: 'phone',
            memberModalValidate: {
                phone: [
                    {
                        required: true,
                        message: "请输入手机号",
                        trigger: 'blur',
                        type: 'string'
                    },
                    {
                        len: 11,
                        trigger: 'blur',
                        message: "手机号为 11 位",
                    }
                ],
                account: [
                    {
                        asyncValidator: validateAccount, trigger: 'blur'
                    },
                ],
            },
        };
    },
    computed: {

    },
    watch: {

    },
    created() {
    },
    mounted() {

    },
    methods: {

    },
}
</script>

<style lang="scss" scoped>

</style>
