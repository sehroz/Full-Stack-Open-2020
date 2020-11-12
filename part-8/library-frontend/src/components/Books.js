import React, { useState } from "react";

const Books = (props) => {
  const [genre, setGenre] = useState(null);
  if (!props.show) {
    return null;
  }

  const books = props.books;

  var genreItems = books.map((a) => a.genres.map((g) => g)).flat();

  var uniqueItems = Array.from(new Set(genreItems));

  const showBooks = genre
    ? books.filter((book) => book.genres.includes(genre))
    : books;

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
          {showBooks.map((a) => (
            <tr key={a.id}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {uniqueItems.map((g) => (
        <button key={g} onClick={() => setGenre(g)}>
          {g}
        </button>
      ))}
    </div>
  );
};

export default Books;
