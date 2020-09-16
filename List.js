import React from 'react';
import { Link } from 'react-router-dom';
import { graphql } from 'react-apollo';
import { GET_BOOKS } from '../Queries';

// This component uses the deprecated React Apollo HOC API, graphql()
const ListBooks = props => {
  return (
    <>
      {props.data?.books?.map((book, index) => (
        <tr key={index}>
          <td><Link to={`/show/${book._id}`}>{book.title}</Link></td>
          { props.state.author_checked &&
            <td>{book.author}</td>
          }
          { props.state.category_checked &&
            <td>{book.category}</td>
          }
          { props.state.isbn_checked &&
            <td>{book.isbn}</td>
          }
        </tr>
      ))}
    </>
  )
}

export default graphql(GET_BOOKS)(ListBooks);
