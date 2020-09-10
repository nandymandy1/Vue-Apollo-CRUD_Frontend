<template>
  <div class="hello">
    <div class="row">
      <div class="col-md-4 col-sm-6 mt-3" v-for="post in posts" :key="post.id">
        <PostCard :post="post" />
      </div>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import PostCard from "./PostCard";
export default {
  components: {
    PostCard,
  },
  props: {
    posts: {
      type: Array,
      required: true,
    },
  },
};
</script>
