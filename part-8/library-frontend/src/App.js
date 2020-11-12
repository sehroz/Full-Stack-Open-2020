import React, { useState, useEffect } from "react";
import Authors from "./components/Authors";
import Books from "./components/Books";
import NewBook from "./components/NewBook";
import { useQuery } from "@apollo/client";
import { ALL_AUTHORS, ALL_BOOKS } from "./queries";
import Login from "./components/Login";

const App = () => {
  const [page, setPage] = useState("books");
  const [token, setToken] = useState(null);
  const authorData = useQuery(ALL_AUTHORS);
  const bookData = useQuery(ALL_BOOKS);

  useEffect(() => {
    const token = localStorage.getItem("libToken");
    if (token) {
      setToken(token);
    }
  }, []);

  const logout = () => {
    setToken(null);
    localStorage.removeItem("libToken");
  };

  if (authorData.loading || bookData.loading) {
    return <div>loading...</div>;
  }

  return (
    <div>
      <div>
        <button onClick={() => setPage("authors")}>authors</button>
        <button onClick={() => setPage("books")}>books</button>

        {!token ? (
          <button onClick={() => setPage("login")}>login</button>
        ) : (
          <>
            <button onClick={() => setPage("add")}>add book</button>
            <button onClick={logout}>logout</button>
          </>
        )}
      </div>

      <Authors show={page === "authors"} authors={authorData.data.allAuthors} />

      <Books show={page === "books"} books={bookData.data.allBooks} />

      <NewBook show={page === "add"} />
      <Login setToken={setToken} setPage={setPage} show={page === "login"} />
    </div>
  );
};

export default App;
