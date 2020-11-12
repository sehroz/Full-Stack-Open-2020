require("dotenv").config();
const { ApolloServer, UserInputError, gql } = require("apollo-server");

const mongoose = require("mongoose");
const Book = require("./models/book");
const Author = require("./models/author");
const User = require("./models/user");
const jwt = require("jsonwebtoken");
const JWT_SECRET = "sehroz";

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

  type User {
    username: String!
    favoriteGenre: String!
    id: ID!
  }

  type Token {
    value: String!
  }

  type Mutation {
    addBook(
      title: String!
      published: Int!
      author: String!
      genres: [String!]!
    ): Book

    editAuthor(name: String, born: Int): Author

    createUser(username: String!, favoriteGenre: String!): User
    login(username: String!, password: String!): Token
  }

  type Query {
    authorCount: Int!
    bookCount: Int!
    allBooks(author: String, genre: String): [Book!]!
    allAuthors: [Author!]
    me: User
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

let books;
const resolvers = {
  Query: {
    me: (root, args, context) => {
      return context.currentUser;
    },
    authorCount: () => Author.countDocuments(),
    bookCount: () => Book.countDocuments(),
    allBooks: async (root, args) => {
      const query = {};
      if (args.genre) {
        query.genres = { $in: [args.genre] };
      }

      if (args.author) {
        const authorer = await Author.findOne({ name: args.author });
        query.author = authorer.id;
      }

      return Book.find(query).populate("author");
    },
    allAuthors: async (root, args) => {
      books = await Book.find();
      return Author.find({});
    },
  },
  Author: {
    bookCount: async (root) => {
      let count = books.filter(
        (author) => String(author.author) === String(root.id)
      ).length;
      if (!count) {
        count = 0;
      }
      return count;
    },
  },
  Mutation: {
    createUser: async (root, args) => {
      const user = new User({
        username: args.username,
        favoriteGenre: args.favGenre,
      });

      return user.save().catch((error) => {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        });
      });
    },

    login: async (root, args) => {
      const user = await User.findOne({ username: args.username });

      if (!user || args.password !== "12345") {
        throw new UserInputError("wrong credentials");
      }

      const userForToken = {
        username: user.username,
        id: user._id,
      };

      return { value: jwt.sign(userForToken, JWT_SECRET) };
    },
    addBook: async (root, { title, published, genres, author }, context) => {
      if (!context.currentUser) {
        throw new AuthenticationError("unauthenticated");
      }

      let book = new Book({ title, published, genres });
      try {
        book.author = await findIt(author);
        await book.save();
        book = await Book.findById(book.id).populate("author");
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: error.path,
        });
      }

      return book;
    },
    editAuthor: async (root, { name, born }, context) => {
      if (!context.currentUser) {
        throw new AuthenticationError("unauthenticated");
      }

      try {
        const author = await Author.findOne({ name });
        author.born = born;
        await author.save();
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        });
      }
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    const auth = req ? req.headers.authorization : null;
    if (auth && auth.toLowerCase().startsWith("bearer ")) {
      const decodedToken = jwt.verify(auth.substring(7), JWT_SECRET);
      const currentUser = await User.findById(decodedToken.id);
      return { currentUser };
    }
  },
});

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`);
});
