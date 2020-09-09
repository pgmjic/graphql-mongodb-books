import React, { Component } from 'react';
import { Mutation } from "react-apollo";
import { Link } from 'react-router-dom';
import { GET_BOOKS, ADD_BOOK } from '../Queries';
import FormPage from './FormPage';
import { bookStates, toggleOpen, validateForm, evtHandler } from './Utils';

class Create extends Component {

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
      <Mutation 
        mutation={ADD_BOOK} 
        refetchQueries={[{ query:GET_BOOKS }]}
        onCompleted={() => this.props.history.push('/')}
      >
        {(addBook, { loading, error }) => (
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
                  onSubmit={ e => {
                    e.preventDefault();
                    addBook({
                      variables:
                      {
                        isbn: this.state.isbn,
                        title: this.state.title,
                        author: this.state.author,
                        description: this.state.description,
                        publisher: this.state.publisher,
                        published_year: this.state.published_year,
                        image_src: this.state.image_src,
                      }
                    });
                  }}>
                  <FormPage
                    pageType={'create'}
                    evtHandler={this.evtHandler}
                    toggleOpen={this.toggleOpen}
                    menuClass={menuClass}
                    state={this.state}
                  />
                  <button 
                    type="submit" 
                    className="btn btn-success"
                    disabled={!this.state.formValid}
                  >
                    Submit
                  </button>
                </form>
                {loading && <p>Loading...</p>}
                {error && <p>Error :( Please try again</p>}
              </div>
            </div>
          </div>
        )}
      </Mutation>
    );
  }
}

export default Create;