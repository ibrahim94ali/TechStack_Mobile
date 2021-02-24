import { gql } from "@apollo/client";

export const GET_TECHS = gql`
  query {
    technologies {
      id
      name
      posts {
        id
        title
        owner
        link
        date
      }
    }
  }
`;
