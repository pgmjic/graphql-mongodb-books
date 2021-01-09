import React, { useEffect } from 'react';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { useHistory, Link } from 'react-router-dom';
import { GET_BOOK, UPDATE_BOOK } from '../Queries';
import { useBookstates, useCategory } from './Utils';
import { Error, Loading } from './Status';
import FormPage from './FormPage';

//
const Edit = props => {

  const { category, selectCategory } = useCategory();
  const { bookStates, populateBookstates, toggleOpen, evtHandler } = useBookstates();
  const history = useHistory();
  
  const { loading, error, data } = useQuery(GET_BOOK, { 
    variables: { bookId: props.match.params.id },
  });

  const [updateBook, { loading:loadingUpdate, error:errorUpdate }] = useMutation(UPDATE_BOOK, {
    refetchQueries: [{
      query:GET_BOOK, 
      variables:{ bookId: props.match.params.id } }],
    onCompleted() {
      history.push('/');
    }
  });
  const menuClass = `dropdown-menu${bookStates.isOpen ? " show" : ""}`;

  useEffect(() => {
    if (loading) return (<Loading/>)
    if (error) return (<Error error={error.message}/>)
    if (data) {
      populateBookstates(data.book)
    }
  }, [loading, error, data])

  return (
    <>
      <div className="container">
        <div className="panel panel-default">
          <div className="panel-heading">
            <h3 className="panel-title">
              EDIT BOOK
            </h3>
          </div>
          <div className="panel-body">
            <h4><Link to="/" className="btn btn-primary">Book List</Link></h4>
            <form
              onSubmit={e => {
                e.preventDefault();
                updateBook({
                  variables:
                  {
                    id: data.book._id,
                    isbn: bookStates.isbn.length === 0 ? data.book.isbn
                      : bookStates.isbn,
                    title: bookStates.title.length === 0 ? data.book.title
                      : bookStates.title,
                    author: bookStates.author.length === 0 ? data.book.author
                      : bookStates.author,
                    description: bookStates.description.length === 0 ? data.book.description
                      : bookStates.description,
                    publisher: bookStates.publisher.length === 0 ? data.book.publisher
                      : bookStates.publisher,
                    published_year: bookStates.published_year === 0 ? data.book.published_year
                      : bookStates.published_year,
                    image_src: bookStates.image_src.length === 0 ? data.book.image_src
                      : bookStates.image_src,
                    category: category.length === 0 ? data.book.category
                      : category,
                  }
                });
              }}
            >
              <FormPage
                pageType={'edit'}
                book={data.book}
                evtHandler={evtHandler}
                toggleOpen={toggleOpen}
                menuClass={menuClass}
                state={bookStates}
                category={category}
                selectCategory={selectCategory}
              />
              <button type="submit" className="btn btn-success">Submit</button>
            </form>
            {loadingUpdate && <p>Loading...</p>}
            {errorUpdate && <p>Error :( Please try again</p>}
          </div>
        </div>
      </div>
    </>
  )
}

export default Edit;