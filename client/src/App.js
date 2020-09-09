import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import ListBooks from './components/List';

class App extends Component {

  render() {
    return (
      <div className="container">
        <div className="panel panel-default">
          <div className="panel-heading">
            <h3 className="panel-title">
              LIST OF BOOKS
                  </h3>
            <h4><Link to="/create">Add Book</Link></h4>
          </div>
          <div className="panel-body">
            <table className="table table-stripe">
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Author</th>
                </tr>
              </thead>
              <tbody>
                <ListBooks />
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
}

export default App;