import React, { Component } from 'react';
import { useRouteMatch, Link } from 'react-router-dom';
import gql from 'graphql-tag';
import { useQuery, useMutation } from '@apollo/react-hooks';

const GET_BOOK = gql`
  query book($bookId: String) {
    book(id: $bookId) {
      _id
      isbn
      title
      author
      description
      published_year
      publisher
      updated_date
    }
  }
`;

const DELETE_BOOK = gql`
  mutation removeBook($id: String!) {
    removeBook(id:$id) {
      _id
    }
  }
`;

function Show() {

  const match = useRouteMatch();
  const [removeBook, {refetch}] = useMutation(DELETE_BOOK, {
    onCompleted(data) {
      // Refetch to refresh data
      refetch();
    }
  });
  const bookInfo = useQuery(GET_BOOK, { 
    variables: { bookId: match.params.id },
    pollInterval: 1000 
  });
  if (bookInfo.loading) return 'Loading...';
  if (bookInfo.error) return `Error! ${bookInfo.error.message}`;

  function deleteBook() {
    removeBook(
      {
        update: (proxy, mutationResult) => {
          console.log('mutationResult: ', mutationResult);
        },
        variables: { id: bookInfo.data.book._id},
      }
    ).then (
      res => {
        console.log(res);
      },
      err => {
        console.log(err);
      }
    );
  }
  
  return (
    <div className="container">
      <div className="panel panel-default">
        <div className="panel-heading">
          <h4><Link to="/">Book List</Link></h4>
          <h3 className="panel-title">
            {bookInfo.data?.book?.title}
          </h3>
        </div>
        <div className="panel-body">
          <dl>
            <dt>ISBN:</dt>
            <dd>{bookInfo.data?.book?.isbn}</dd>
            <dt>Author:</dt>
            <dd>{bookInfo.data?.book?.author}</dd>
            <dt>Description:</dt>
            <dd>{bookInfo.data?.book?.description}</dd>
            <dt>Published Year:</dt>
            <dd>{bookInfo.data?.book?.published_year}</dd>
            <dt>Publisher:</dt>
            <dd>{bookInfo.data?.book?.publisher}</dd>
            <dt>Updated:</dt>
            <dd>{bookInfo.data?.book?.updated_date}</dd>
          </dl>
          <div>
            <form
              onSubmit={e => {
                e.preventDefault();
                deleteBook({ variables: { id: bookInfo.data?.book?._id } });
              }}>
              <Link to={`/edit/${bookInfo.data?.book?._id}`} className="btn btn-success">
                Edit
              </Link>
              &nbsp;
              <button type="submit" className="btn btn-danger">Delete</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Show;