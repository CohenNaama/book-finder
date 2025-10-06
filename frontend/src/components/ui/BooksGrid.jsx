/**
 * BooksGrid component.
 *
 * Displays a table of book results with cover, title, and authors.
 * Fully responsive and styled with custom CSS (BooksGrid.css).
 *
 * Accepts props:
 *  - rows: array of book data
 *  - onRowClick: callback for book selection
 */

import PropTypes from "prop-types";
import "./BooksGrid.css";


export default function BooksGrid({ rows = [], onRowClick }) {
  if (!Array.isArray(rows) || rows.length === 0) {
    return (
      <p style={{ textAlign: "center", color: "#475569" }}>
        No results found.
      </p>
    );
  }

  return (
    <div className="books-grid-container">
      <table className="books-table">
        <thead>
          <tr className="table-header">
            <th>Cover</th>
            <th>Title</th>
            <th>Authors</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((book) => (
            <tr key={book.id} onClick={() => onRowClick(book)}>
              <td className="cover-cell">
                {book.cover ? (
                  <img src={book.cover} alt={book.title} />
                ) : (
                  <div className="no-cover" />
                )}
              </td>
              <td>{book.title}</td>
              <td>{book.authors}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

BooksGrid.propTypes = {
  rows: PropTypes.array.isRequired,
  onRowClick: PropTypes.func.isRequired,
};

