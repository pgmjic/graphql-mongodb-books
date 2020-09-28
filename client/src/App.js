import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import ListBooks from './components/List';
import FieldList from './components/FieldList';
import { bookStates, toggleOpen, handleClose } from './components/Utils';

class App extends Component {
  constructor() {
    super();

    this.toggleOpen = toggleOpen.bind(this);
    this.handleClose = handleClose.bind(this);
    this.state = bookStates;
  }

  render() {
    let { isbnChecked, authorChecked, categoryChecked} = this.props;

    return (
      <div className="container">
        <div className="panel panel-default">
          <div className="panel-heading">
            <div className="row">
              <div className="col-10">
                <h3 className="panel-title">
                  LIST OF BOOKS
                 </h3>
                <h4><Link to="/create">Add Book</Link></h4>
              </div>
              <FieldList
                toggleOpen={this.toggleOpen}
                handleClose={this.handleClose}
                state={this.state}
              />
            </div>
          </div>
          <div className="panel-body">
            <table className="table table-stripe">
              <thead>
                <tr>
                  <th>Title</th>
                  {authorChecked &&
                    <th>Author</th>
                  }
                  {categoryChecked &&
                    <th>Category</th>
                  }
                  {isbnChecked &&
                    <th>ISBN</th>
                  }
                </tr>
              </thead>
              <tbody>
                <ListBooks categoryStates={{
                  'isbn': isbnChecked,
                  'author': authorChecked,
                  'category': categoryChecked}
                 } />
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  let { isbnChecked, authorChecked, categoryChecked} = state.categoryCheck;

  return {
    isbnChecked, 
    authorChecked, 
    categoryChecked
  }
}

export default connect(mapStateToProps)(App)