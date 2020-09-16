import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import ListBooks from './components/List';
import FieldList from './components/FieldList';
import { bookStates, toggleOpen, handleClose, handleCheckBox } from './components/Utils';

class App extends Component {
  constructor() {
    super();

    this.toggleOpen = toggleOpen.bind(this);
    this.handleClose = handleClose.bind(this);
    this.handleCheckBox = handleCheckBox.bind(this);
    this.state = bookStates;
  }

  render() {
    let checkBoxItems = ['A', 'b'];

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
                handleCheckBox={this.handleCheckBox}
                state={this.state}
              />
            </div>
          </div>
          <div className="panel-body">
            <table className="table table-stripe">
              <thead>
                <tr>
                  <th>Title</th>
                  {this.state.author_checked &&
                    <th>Author</th>
                  }
                  {this.state.category_checked &&
                    <th>Category</th>
                  }
                  {this.state.isbn_checked &&
                    <th>ISBN</th>
                  }
                </tr>
              </thead>
              <tbody>
                <ListBooks state={this.state} />
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
}

export default App;