<template>
  <div class="apollo-template-way mt-5 mb-5">
    <div class="card">
      <div class="card-header">
        <h3 class="text-success font-weight-bold">Add New Post</h3>
      </div>
      <div class="card-body">
        <form @submit.prevent="submitPost">
          <div class="form-group">
            <label for="title">Title</label>
            <input
              id="title"
              type="text"
              name="title"
              v-model="title"
              placeholder="Post Title"
              class="form-control"
            />
          </div>
          <div class="form-group">
            <label for="content">Content</label>
            <textarea
              rows="5"
              id="content"
              name="content"
              v-model="content"
              class="form-control"
              placeholder="Post Content..."
            />
          </div>
          <div class="form-group">
            <label for="post-image">Post Image</label>
            <SingleUploader id="post-image" @image-uploaded="handleImageUrl" />
          </div>
          <div class="form-group">
            <button class="btn btn-success" :disabled="isLoading">Add Post</button>
            <Loader v-if="isLoading" />
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import Loader from "../Loader/Loader";
import { ADD_NEW_POSTS } from "../../graphql/posts";
import SingleUploader from "../Uploader/SingleUploader";
export default {
  components: {
    Loader,
    SingleUploader,
  },
  methods: {
    handleImageUrl(url) {
      this.postImage = url;
    },
    async submitPost() {
      if (this.title !== "" && this.content !== "") {
        this.isLoading = true;
        const result = await this.$apollo.mutate({
          mutation: ADD_NEW_POSTS,
          variables: {
            title: this.title,
            content: this.content,
            postImage: this.postImage,
          },
        });
        this.isLoading = false;
        this.title = "";
        this.content = "";
        this.postImage = "";
        this.$emit("update-list", result.data);
      } else {
        alert("Title and Content of the post is required.");
      }
    },
  },
  data: () => ({
    title: "",
    content: "",
    postImage: "",
    isLoading: false,
  }),
};
</script>
