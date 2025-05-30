import { buildSchema } from "graphql";

const gql = String.raw;

const typeDefs = gql`
  type Query {
    posts: [Post!]!
  }

  type Mutation {
    addPost(inputPost: InputPost): Post
  }

  input InputPost {
    title: String!
    content: String!
    authorId: ID!
  }

  type Post {
    id: ID!
    title: String!
    content: String!
    author: Author!
  }

  type Author {
    id: ID!
    name: String!
  }
`;

export const schema = buildSchema(typeDefs);
