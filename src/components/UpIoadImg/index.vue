<template>
  <div>
    <el-upload
      v-loading="loading"
      element-loading-text="加载中..."
      element-loading-spinner="el-icon-loading"
      element-loading-background="rgba(0, 0, 0, 0.3)"
      action="#"
      list-type="picture-card"
      :http-request="onRequest"
      :file-list="fileList"
      :on-change="onChange"
      :on-remove="onRemove"
      :on-preview="onPreview"
      :limit="1"
      :class="fileList.length == 1 ? 'hide' : ''"
      class="custom-upload"
      :before-upload="beforUpload"
    >
      <i class="el-icon-plus"></i>
    </el-upload>
    <el-dialog title="" :visible.sync="dialogVisible">
      <img :src="imgUrl" alt="" style="width: 100%" />
    </el-dialog>
  </div>
</template>

<script>
// SecretId: AKID55oGRLyQdaHitoVv52lEQKxKQ0JNAgvt
// SecretKey: jAKDpAE1YomTt3vWqtfANKzNTIq77qIU

import COS from "cos-js-sdk-v5";
var cos = new COS({
  SecretId: "AKID55oGRLyQdaHitoVv52lEQKxKQ0JNAgvt",
  SecretKey: "jAKDpAE1YomTt3vWqtfANKzNTIq77qIU",
});
// console.log(cos);
export default {
  name: "UploadImg",
  data() {
    return {
      fileList: [],
      dialogVisible: false,
      imgUrl: "",
      loading: false,
    };
  },

  created() {},

  methods: {
    // 自定义上传
    onRequest({ file }) {
      this.loading = true;
      console.log(file);
      console.log("自定义上传");
      cos.putObject(
        {
          Bucket: "hrsass-1313341583" /* 必须桶名 */,
          Region: "ap-shanghai" /* 存储桶所在地域，必须字段 */,
          Key: file.name /* 必须 文件名*/,
          StorageClass: "STANDARD",
          Body: file, // 上传文件对象
          onProgress: function (progressData) {
            // console.log(JSON.stringify(progressData));
          },
        },
        (err, data) => {
          // 成功或者失败都进入该函数
          this.loading = false;
          // err  null false 没有错误
          // err 不为 null true 有错
          if (err || data.statusCode !== 200) {
            return this.$message.error("上传失败，请重试！");
          }
          this.$emit("onSuccess", {
            url: `http://${data.Location}`,
          });
        }
      );
    },
    // 上传移除触发
    onChange(file, fileList) {
      this.fileList = fileList;
      console.log(fileList);
    },
    // 移除触发
    onRemove(file, fileList) {
      this.fileList = fileList;
    },
    // 点击已经上传的图片的事件
    onPreview(file) {
      this.dialogVisible = true;
      this.imgUrl = file.url;
    },
    beforUpload(file) {
      const acceptsType = ["image/jpeg", "image/gif", "image/jpg"];
      const maxSize = 2 * 1024 * 1024;
      if (!acceptsType.includes(file.type)) {
        this.$message.error(
          `文件上传类型只能是${acceptsType.join("或者")}格式图片`
        );
        return false;
      }
      if (file.size > maxSize) {
        this.$message.error("图片不能超过2MB");
        return false;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
// .hide .el-upload--picture-card {
//   display: none;
// }

.custom-upload {
  width: 148px;
  height: 148px;
  overflow: hidden;
}
</style>
