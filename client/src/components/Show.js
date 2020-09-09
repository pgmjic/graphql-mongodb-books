import React from 'react';
import { useHistory , useRouteMatch, Link } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { GET_BOOKS, GET_BOOK, DELETE_BOOK } from '../Queries';

function Show() {

  const match = useRouteMatch();
  const history = useHistory();
  const [removeBook] = useMutation(DELETE_BOOK, {
    refetchQueries: [{ query:GET_BOOKS }],
    onCompleted(data) {
      history.push('/');
    }
  });

  const { loading, error, data:bookInfo } = useQuery(GET_BOOK, { 
    variables: { bookId: match.params.id },
  });
  if (loading) return 'Loading...';
  if (error) return `Error! ${error.message}`;

  function deleteBook() {
    removeBook(
      {
        update: (proxy, mutationResult) => {
          console.log('mutationResult: ', mutationResult);
        },
        variables: { id: bookInfo.book._id},
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
          <div className="row">
            <div className="col-10">
              <h3 className="panel-title">
                {bookInfo?.book?.title}
              </h3>
            </div>
            <div className="col">
              <img src={`../images/${bookInfo?.book?.image_src}`} alt="" />
            </div>
          </div>
        </div>
        <div className="panel-body">
          <dl>
            <dt>ISBN:</dt>
            <dd>{bookInfo?.book?.isbn}</dd>
            <dt>Category:</dt>
            <dd>{bookInfo?.book?.category}</dd>
            <dt>Author:</dt>
            <dd>{bookInfo?.book?.author}</dd>
            <dt>Description:</dt>
            <textarea readOnly cols="120" rows="6" 
              defaultValue={bookInfo?.book?.description} />
            <dt>Published Year:</dt>
            <dd>{bookInfo?.book?.published_year}</dd>
            <dt>Publisher:</dt>
            <dd>{bookInfo?.book?.publisher}</dd>
            <dt>Updated:</dt>
            <dd>{bookInfo?.book?.updated_date}</dd>
          </dl>
          <div>
            <form
              onSubmit={e => {
                e.preventDefault();
                deleteBook({ variables: { id: bookInfo?.book?._id } });
              }}>
              <Link to={`/edit/${bookInfo?.book?._id}`} className="btn btn-success">
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