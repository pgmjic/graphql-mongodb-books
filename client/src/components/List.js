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
          { props.categoryStates.author &&
            <td>{book.author}</td>
          }
          { props.categoryStates.category &&
            <td>{book.category}</td>
          }
          { props.categoryStates.isbn &&
            <td>{book.isbn}</td>
          }
        </tr>
      ))}
    </>
  )
}

export default graphql(GET_BOOKS)(ListBooks);