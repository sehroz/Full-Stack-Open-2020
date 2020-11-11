require("dotenv").config();
const { ApolloServer, UserInputError, gql } = require("apollo-server");
const { v1: uuid } = require("uuid");

const mongoose = require("mongoose");
const Book = require("./models/book");
const Author = require("./models/author");

const MONGODB_URI = `${process.env.MONGO_URI}`;
mongoose
  .connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })
  .then(() => {
    console.log("connected to MongoDB");
  })
  .catch((error) => {
    console.log("error connection to MongoDB:", error.message);
  });

const typeDefs = gql`
  type Book {
    title: String!
    published: Int!
    author: Author!
    genres: [String!]!
    id: ID!
  }

  type Author {
    name: String!
    born: Int
    id: ID!
    bookCount: Int!
  }

  type Mutation {
    addBook(
      title: String!
      published: Int!
      author: String!
      genres: [String!]!
    ): Book

    editAuthor(name: String, born: Int): Author
  }

  type Query {
    authorCount: Int!
    bookCount: Int!
    allBooks(author: String, genre: String): [Book!]!
    allAuthors: [Author!]
  }
`;

const findIt = async (name) => {
  let author = await Author.findOne({ name });

  if (!author) {
    author = new Author({ name });
    await author.save();
  }

  return author;
};

const resolvers = {
  Query: {
    authorCount: () => Author.countDocuments(),
    bookCount: () => Book.countDocuments(),
    allBooks: async (root, args) => {
      const query = {};

      if (args.author) {
        const authorer = await Author.findOne({ name: args.author });
        query.author = authorer.id;
      }

      return Book.find(query).populate("author");
    },
    allAuthors: async () => {
      return Author.find({});
    },
  },
  Author: {
    bookCount: async (root) => {
      books.filter((author) => String(author.author) === String(root.id))
        .length;
    },
  },
  Mutation: {
    addBook: async (root, { title, published, genres, author }) => {
      let book = new Book({ title, published, genres });

      book.author = await findIt(author);
      await book.save();

      book = await Book.findById(book.id).populate("author");

      return book;
    },
    editAuthor: (root, args) => {
      const author = authors.find((author) => author.name === args.name);
      if (!author) {
        return null;
      }

      const updatedAuthor = { ...author, born: args.born };
      authors = authors.map((author) =>
        author.name === args.name ? updatedAuthor : author
      );
      return updatedAuthor;
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`);
});
