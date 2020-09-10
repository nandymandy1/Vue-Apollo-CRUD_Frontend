<template>
  <div class="single-upload">
    <div class="d-flex justify-content-around">
      <div class="upload-container d-flex justify-content-center align-items-center">
        <input
          :id="id"
          type="file"
          ref="imageUploader"
          class="input-uploader"
          @change="imageInserted"
        />
        <img class="uploader-icon" src="../../assets/img/upload.png" alt />
      </div>
      <div class="flex-grow-1 d-flex flex-column px-3 justify-content-around">
        <!-- <bProgress v-if="isUploading" :value="value" :max="max" show-progress animated /> -->
        <div class="progress md-progress">
          <div
            role="progressbar"
            aria-valuemin="0"
            :aria-valuemax="max"
            :aria-valuenow="50"
            :style="{width: `${50}%`}"
            class="progress-bar bg-success"
          />
        </div>
        <img
          height="80px"
          width="80px"
          v-if="uploadedImage"
          :src="uploadedImage"
          alt="Responsive image"
          class="mt-1 img-fluid img-thumbnail"
        />
      </div>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import { SINGLE_FILE_UPLOAD } from "@/graphql/images";

export default {
  props: {
    id: {
      type: String,
      required: true,
    },
  },
  data: () => ({
    value: 0,
    max: 100,
    file: null,
    isUploading: false,
    uploadedImage: null,
  }),
  methods: {
    async imageInserted() {
      this.file = this.$refs.imageUploader.files[0];
      this.$refs.imageUploader.value = null;
      await this.uploadImageMethod();
    },

    async uploadImageMethod() {
      this.isUploading = true;
      let { data } = await this.$apollo.mutate({
        mutation: SINGLE_FILE_UPLOAD,
        variables: {
          file: this.file,
        },
      });
      this.isUploading = false;
      this.uploadedImage = data.uploadSingle.serverFile;
      this.$emit("image-uploaded", this.uploadedImage);
    },
  },
  created() {},
};
</script>

<style lang="scss" scoped>
.single-upload {
  .upload-container {
    height: 100px !important;
    width: 100px !important;
    border: 2px dashed #ccc;
    border-radius: 5px !important;
    :hover {
      background-color: #ccc !important;
    }
  }
  .input-uploader {
    opacity: 0;
    position: absolute;
    width: 100px !important;
    height: 100px !important;
  }
  .uploader-icon {
    width: 50px !important;
    height: 50px !important;
  }
}
</style>