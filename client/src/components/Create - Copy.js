import React, { Component } from 'react';
import { Mutation } from "react-apollo";
import { Link } from 'react-router-dom';
import { GET_BOOKS, ADD_BOOK } from '../Queries';

class Create extends Component {

  state = {
    isbn: "",
    title: "",
    author: "",
    description: "",
    publisher: "",
    published_year: 0,
    formValid: false,
    errorMsg: ""
  }
  
  validateForm = () => {
    const { title, published_year } = this.state;
    let msg = "";
    if (title.length === 0)
      msg = "Title is required..";
    if (isNaN(published_year) || 
          published_year<1900 || published_year>2100) {
      if (msg.length > 0)
        msg += " && Valid Year is required"
      else
        msg = "Valid Year is required"
    }
    this.setState({
      formValid: msg.length === 0,
      errorMsg: msg
    })
  }


  render() {
    let isbn, title, author, description, published_year, publisher;
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
                <form onSubmit={e => {
                  e.preventDefault();
                  this.setState(
                    {
                      isbn: isbn.value,
                      title: title.value,
                      author: author.value,
                      description: description.value,
                      publisher: publisher.value,
                      published_year: parseInt(published_year.value)
                    }, () => this.validateForm()
                  )
                  if (this.state.formValid)
                    addBook({ variables: 
                    {
                      isbn: isbn.value,
                      title: title.value,
                      author: author.value,
                      description: description.value,
                      publisher: publisher.value,
                      published_year: parseInt(published_year.value)
                    }
                    });
                  else
                    alert(this.state.errorMsg)
                  isbn.value = "";
                  title.value = "";
                  author.value = "";
                  description.value = "";
                  publisher.value = null;
                  published_year.value = "";
                }}>
                  <div className="form-group">
                    <label htmlFor="isbn">ISBN:</label>
                    <input type="text" className="form-control" name="isbn" ref={node => {
                      isbn = node;
                    }} placeholder="ISBN" />
                  </div>
                  <div className="form-group">
                    <label htmlFor="title">Title:</label>
                    <input type="text" className="form-control" name="title" ref={node => {
                      title = node;
                    }} placeholder="Title" />
                  </div>
                  <div className="form-group">
                    <label htmlFor="author">Author:</label>
                    <input type="text" className="form-control" name="author" ref={node => {
                      author = node;
                    }} placeholder="Author" />
                  </div>
                  <div className="form-group">
                    <label htmlFor="description">Description:</label>
                    <textarea className="form-control" name="description" ref={node => {
                      description = node;
                    }} placeholder="Description" cols="80" rows="3" />
                  </div>
                  <div className="form-group">
                    <label htmlFor="author">Publisher:</label>
                    <input type="text" className="form-control" name="publisher" ref={node => {
                      publisher = node;
                    }} placeholder="Publisher" />
                  </div>
                  <div className="form-group">
                    <label htmlFor="author">Published Year:</label>
                    <input type="number" className="form-control" name="published_year" ref={node => {
                      published_year = node;
                    }} placeholder="Published Year" />
                  </div>
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
  }
}

export default Create;