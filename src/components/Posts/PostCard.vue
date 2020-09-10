<template>
  <div class="card">
    <img class="card-img-top" :src="post.postImage" alt="Card image cap" />
    <div class="card-body">
      <h4 class="card-title">
        <a>{{ post.title }}</a>
      </h4>
      <p class="card-text">{{ post.content }}</p>
      <button class="btn btn-primary btn-sm">Read More</button>
      <button @click="deletePost" class="btn btn-danger btn-sm">Delete</button>
    </div>
  </div>
</template>

<script>
import { DELETE_A_POST_BY_ID } from "@/graphql/posts";
export default {
  props: {
    post: {
      type: Object,
      required: true,
    },
  },
  methods: {
    async deletePost() {
      let result = await this.$apollo.mutate({
        mutation: DELETE_A_POST_BY_ID,
        variables: {
          id: this.post.id,
        },
      });
      console.log("DELETE_RESP", result.data.deletePostById);
    },
  },
};
</script>

<style>
</style>