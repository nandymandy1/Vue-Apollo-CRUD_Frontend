import gql from "graphql-tag";

export const SINGLE_FILE_UPLOAD = gql`
    mutation UPLOD_SINGLE($file: Upload!) {
        uploadSingle(file: $file) {
            serverFile
        }
    }
`;