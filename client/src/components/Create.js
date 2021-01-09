import React, { useEffect } from 'react';
import { useMutation } from '@apollo/react-hooks';
import { useHistory, Link } from 'react-router-dom';
import { GET_BOOKS, ADD_BOOK } from '../Queries';
import { useBookstates, useCategory } from './Utils';
import { Error, Loading } from './Status';
import FormPage from './FormPage';

const Create = () => {

  const { category, selectCategory } = useCategory();
  const { bookStates, toggleOpen, evtHandler, validateForm } = useBookstates();
  const history = useHistory();
  const [addBook, { loading, error }] = useMutation(ADD_BOOK, {
    refetchQueries: [{ query:GET_BOOKS }],
    onCompleted() {
      history.push('/');
    }
  });
  const menuClass = `dropdown-menu${bookStates.isOpen ? " show" : ""}`;

  useEffect(() => {
    validateForm();
  }, [bookStates.published_year, bookStates.title]);
 
  // test function to verify parameters prior to mutation call
  const okayToAddBook = () => {
    // these tests should always pass because of defaults
    if (bookStates.isbn.length === 0) return false
    if (bookStates.author.length === 0) return false
    if (bookStates.description.length === 0) return false
    if (bookStates.publisher.length === 0) return false
    if (bookStates.image_src.length === 0) return false
    if (category.length === 0) return false
    // these two are the critical tests needed for the server
    if (bookStates.title.length === 0) return false
    if (bookStates.published_year < 1900 ||
        bookStates.published_year > 2100) return false
    
    return true
  }

  if (loading) return (<Loading/>)
  if (error) return (<Error error={error.message}/>)
 
  return (
    <>
      <div className="container">
        <div className="panel panel-default">
          <div className="panel-heading">
            <h3 className="panel-title">
              ADD BOOK
            </h3>
          </div>
          <div className="panel-body">
            <h4><Link to="/" className="btn btn-primary">Book List</Link></h4>
            <form
              onSubmit={e => {
                e.preventDefault();
                if ( okayToAddBook() )
                  addBook({
                    variables:
                    {
                      isbn: bookStates.isbn,
                      title: bookStates.title,
                      author: bookStates.author,
                      description: bookStates.description,
                      publisher: bookStates.publisher,
                      published_year: bookStates.published_year,
                      category: category,
                      image_src: bookStates.image_src,
                    }
                  });
              }}
            >
              <FormPage
                pageType={'create'}
                evtHandler={evtHandler}
                toggleOpen={toggleOpen}
                menuClass={menuClass}
                state={bookStates}
                category={category}
                selectCategory={selectCategory}
              />
              <button
                type="submit"
                className="btn btn-success"
                disabled={!bookStates.formValid}
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
//}

export default Create;