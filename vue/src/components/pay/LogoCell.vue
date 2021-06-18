<template>
    <div class="avatar-item">
        <Upload :action="upload" ref="logoUrl"
                class="upload-class before-upload"
                v-show="!logoUrl"
                :show-upload-list="false"
                name="file"
                :format="['jpg','jpeg','png','sJPEG','JPG','PNG']"
                :max-size="1024"
                :on-format-error="handleFormatError"
                :on-exceeded-size="handleMaxSize"
                :on-success="handleSuccess"
                :headers="headers"
                :on-error="handlerError">
            <div>
                <Icon type="ios-log-out" size="18" :color="uploadIcon"
                      class="pointer"
                      style="font-weight: bold;transform: rotate(-90deg);"></Icon>
            </div>
        </Upload>
        <div class="image-position" v-show="logoUrl">
            <img :src="logoUrl" alt="avatar"/>
            <div class="demo-upload-list-cover">
                <Icon type="ios-trash-outline" size="24" @click.native="handleRemove"></Icon>
            </div>
        </div>
    </div>
</template>

<script>
// import { log } from "@/utils/tools";

export default {
    name: "LogoCell",
    components: {
    },
    props: {
        rowIndex: Number,
        levelLogo: String,
    },
    data() {
        return {
            upload: '/file-server/api/resources/files/upload',
            uploadIcon: '#939295',
            uploadStatus: false,
            headers: {
                token: localStorage.getItem('token'),
            },
            logoUrl: this.levelLogo,
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

        handleFormatError() {
            this.$Message.error('仅支持：JPEG/JPG/PNG 格式');
        },
        handleMaxSize(file) {
            let message = `${file.name} 太大, 不能超过 1MB，请重新选择`;
            this.$Message.error(message);
        },
        handleSuccess(res) {
            if (res && res.code === 10000) {
                this.$Message.success(res.message)
                this.logoUrl = res.data
                this.uploadStatus = true
                let data = {
                    index: this.rowIndex,
                    property: 'levelLogo',
                    value: this.logoUrl,
                }
                this.$emit('updateCell', data)
            }
        },
        handlerError() {
            this.$Message.error('上传失败');
            this.uploadStatus = false;
        },
        handleRemove() {
            this.logoUrl = ''
            this.uploadStatus = false
            let data = {
                index: this.rowIndex,
                property: 'levelLogo',
                value: this.logoUrl,
            }
            this.$emit('updateCell', data)
        },
    },
}
</script>

<style lang="scss" scoped>
    .avatar-item {
        width: 80px;
        height: 80px;
        margin: unset;

        border-radius: unset;
        overflow: hidden;

        .before-upload {
            border: 1px dashed #E5E2E5;

            &:hover {
                background-clip: content-box;
                padding: 2px;
                border: 1px dashed rgba(255, 140, 8, 1);
            }
        }


        .image-position {
            position: relative;
            width: 72px;
            height: 72px;
            text-align: center;

            border: 1px solid rgba(226, 226, 234, 1);
            cursor: pointer;
            background: rgba(0, 0, 0, .2);
            line-height: 72px;

            background-clip: content-box;
            padding: 2px;
            border-radius: 4px;

            img {
                height: 66px;
                width: 66px;
            }

            &:hover .demo-upload-list-cover {
                position: absolute;
                background: rgba(23, 23, 37, 0.6);
                color: #fff;
                left: 0;

                top: 0;
                width: 72px;
                height: 72px;
                background-clip: content-box;
                border: 1px solid rgba(255, 141, 10, 1);

                padding: 2px;
                border-radius: 4px;
            }

            .had-upload {

                &:hover {

                }
            }
        }
    }

    .upload-class {
        background: #FCF9FC;
        background-clip: content-box;
        padding: 2px;
        line-height: 68px;
        border-radius: 4px;

        &:hover {
            background: rgba(255, 246, 236, 1);

            .pointer {
                color: rgba(255, 140, 8, 1);
            }
        }
    }
</style>
