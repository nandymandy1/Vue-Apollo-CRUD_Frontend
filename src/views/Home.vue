<template>
  <div class="home container mb-5">
    <AddPost @update-list="updateList" />
    <ApolloQuery :query="gql => FETH_ALL_POSTS" :variables="{ name }">
      <template v-slot="{ result: { loading, error, data } }">
        <Loading v-if="loading" />
        <div v-else-if="error" class="error apollo">An error occurred</div>
        <div v-else-if="data" class="result apollo">
          <Posts :posts="data.getAllPost" />
        </div>
        <div v-else class="no-result apollo">No result :(</div>
      </template>
    </ApolloQuery>
    <!-- <Posts :posts="posts" v-if="posts" /> -->
  </div>
</template>


<script>
/* eslint-disable */
import { FETH_ALL_POSTS } from "@/graphql/posts";
import Posts from "../components/Posts/Posts";
import Loading from "../components/Loader/Loader";
import AddPost from "../components/Posts/AddPost";

export default {
  name: "Home",
  components: {
    Posts,
    AddPost,
    Loading,
  },
  data: () => ({
    name: "",
    FETH_ALL_POSTS,
  }),
  // apollo: {
  //   posts: gql`
  //     query GET_ALL_POSTS {
  //       posts: getAllPost {
  //         id
  //         title
  //         content
  //         createdAt
  //         postImage
  //       }
  //     }
  //   `,
  // },
  methods: {
    updateList(res) {
      console.log("RESP", res);
    },
  },
};
</script>
