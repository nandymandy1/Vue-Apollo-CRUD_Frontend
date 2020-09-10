import gql from 'graphql-tag';

export const FETH_ALL_POSTS = gql`
    query GET_ALL_POSTS {
        getAllPost{
            id
            title
            content
            createdAt
            postImage
        }
    }
`;

export const ADD_NEW_POSTS = gql`
    mutation CREATE_NEW_POST(
        $title: String!
        $content: String!
        $postImage: String!
        ) {
        createNewPost(
            title: $title
            content: $content
            postImage: $postImage
        ) {
            id
            title
            postImage
            createdAt
        }
    }
`;

export const DELETE_A_POST_BY_ID = gql`
    mutation DELETE_POST_BY_ID($id: String!) {
        deletePostById(id: $id)
    }
`;