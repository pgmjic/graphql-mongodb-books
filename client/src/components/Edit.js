import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Query, Mutation } from "react-apollo";
import { GET_BOOK, UPDATE_BOOK } from '../Queries';
import FormPage from './FormPage';
import { bookStates, toggleOpen, validateForm, evtHandler } from './Utils';

class Edit extends Component {

  constructor() {
    super();

    this.toggleOpen = toggleOpen.bind(this);
    this.validateForm = validateForm.bind(this);
    this.evtHandler = evtHandler.bind(this);
    this.state = bookStates;
  }

  render() {
    const menuClass = `dropdown-menu${this.state.isOpen ? " show" : ""}`;

    return (
      <Query 
        query={GET_BOOK} 
        variables={{ bookId: this.props.match.params.id }}
      >
        {({ loading, error, data }) => {
          if (loading) return 'Loading...';
          if (error) return `Error! ${error.message}`;

          return (
            <Mutation 
              mutation={UPDATE_BOOK} 
              key={data.book._id}
              refetchQueries={[{
                query:GET_BOOK, 
                variables:{ bookId: this.props.match.params.id }}]}
              onCompleted={() => this.props.history.push(`/`)
            }>
              {(updateBook, { loading, error }) => (
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
                        onSubmit={ e => {
                          e.preventDefault();
                          updateBook({
                            variables:
                            {
                              id: data.book._id,
                              isbn: this.state.isbn.length === 0 ? data.book.isbn 
                                                                 : this.state.isbn,
                              title: this.state.title.length === 0 ? data.book.title 
                                                                   : this.state.title,
                              author: this.state.author.length === 0 ? data.book.author 
                                                                     : this.state.author,
                              description: this.state.description.length === 0 ? data.book.description 
                                                                               : this.state.description,
                              publisher: this.state.publisher.length === 0 ? data.book.publisher 
                                                                           : this.state.publisher,
                              published_year: this.state.published_year === 0 ? data.book.published_year 
                                                                           : this.state.published_year,
                              image_src: this.state.image_src.length === 0 ? data.book.image_src 
                                                                           : this.state.image_src,
                              category: this.state.category.length === 0 ? data.book.category 
                                                                           : this.state.category,
                            }
                          });
                        }}
                      >
                        <FormPage 
                          pageType={'edit'}
                          book={data.book}
                          evtHandler={this.evtHandler}
                          toggleOpen={this.toggleOpen}
                          menuClass={menuClass}
                          state={this.state}
                        />
                        <button type="submit" className="btn btn-success">Submit</button>
                      </form>
                      {loading && <p>Loading...</p>}
                      {error && <p>Error :( Please try again</p>}
                    </div>
                  </div>
                </div>
              )}
            </Mutation>
          );
        }}
      </Query>
    );
  }
}

export default Edit;