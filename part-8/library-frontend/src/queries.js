import { gql } from "@apollo/client";

export const ADD_BOOK = gql`
  mutation createBook(
    $author: String!
    $title: String!
    $published: Int!
    $genres: [String]
  ) {
    addBook(
      author: $author
      title: $title
      published: $published
      genres: $genres
    ) {
      author
      title
      published
      genres
    }
  }
`;

export const ALL_AUTHORS = gql`
  query {
    allAuthors {
      name
      born
      bookCount
    }
  }
`;

export const ALL_BOOKS = gql`
  query {
    allBooks {
      title
      author
      published
    }
  }
`;
