import React from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@apollo/react-hooks';
import { GET_BOOKS } from '../Queries';
import {Error, Loading} from './Status';

// This component uses the deprecated React Apollo HOC API, graphql()
const ListBooks = props => {
  const { loading, error, data } = useQuery(GET_BOOKS);
  if (loading) return (<tr><td><Loading/></td></tr>)
  if (error) return (<tr><td><Error error={error.message}/></td></tr>)

  return (
    <>
      {data?.books?.map((book, index) => (
        <tr key={book._id}>
          <td>
            <Link to={`/show/${book._id}`}>
              {props.byField === 'Title' ? book.title : book.author}
            </Link>
          </td>
          { props.categoryStates.title &&
            <td>{book.title}</td>
          }
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

export default ListBooks;