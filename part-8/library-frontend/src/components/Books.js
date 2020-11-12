import React, { useState, useEffect } from "react";
import { useQuery, useLazyQuery } from "@apollo/client";
import { ALL_BOOKS } from "../queries";

const Books = (props) => {
  const [genre, setGenre] = useState(null);
  const allBooks = useQuery(ALL_BOOKS);
  const [genreBooks, genreBooksResult] = useLazyQuery(ALL_BOOKS);
  const [books, setBooks] = useState(null);
  const [genres, setGenres] = useState([]);

  useEffect(() => {
    if (allBooks.data && allBooks.data.allBooks && !genre) {
      let books = allBooks.data.allBooks;
      setBooks(books);

      const genreItems = books.map((a) => a.genres.map((g) => g)).flat();
      const uniqueItems = Array.from(new Set(genreItems));

      setGenres(uniqueItems);
      console.log("ok");
    }
  }, [allBooks.data, genre]);

  useEffect(() => {
    if (genreBooksResult.data) {
      setBooks(genreBooksResult.data.allBooks);
    }
  }, [genreBooksResult.data]);

  if (!props.show) {
    return null;
  }

  const onGenreClick = (newGenre) => {
    setGenre(newGenre);
    genreBooks({
      variables: {
        genre: newGenre,
      },
    });
  };

  console.log(genreBooksResult);
  return (
    <div>
      <h2>books</h2>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books !== null &&
            books.map((a) => (
              <tr key={a.id}>
                <td>{a.title}</td>
                <td>{a.author.name}</td>
                <td>{a.published}</td>
              </tr>
            ))}
        </tbody>
      </table>
      {genres.map((g) => (
        <button key={g} onClick={() => onGenreClick(g)}>
          {g}
        </button>
      ))}
    </div>
  );
};

export default Books;
