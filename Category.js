import React, { Component } from 'react';
import { Query } from "react-apollo";
import { GET_CATEGORY } from '../Queries';

class Category extends Component {

  render() {

    return (
      <Query 
        query={GET_CATEGORY}
      >
        {({ loading, error, data: category }) => {
          let menuItems = [];
          if (loading) return 'Loading...';
          if (error) return `Error! ${error.message}`;
          menuItems = category.__type.enumValues;

          return (
            <>
              <div className="col">
                <div className="form-group">
                  <label htmlFor="category">
                    Select: {this.props.state.category.length === 0
                      ? this.props.book?.category
                      : this.props.state.category}
                  </label>
                  <div className="dropdown" onClick={this.props.toggleOpen}>
                    <button
                      className="btn btn-primary dropdown-toggle"
                      type="button"
                      id="dropdownMenuButton"
                      data-toggle="dropdown"
                      aria-haspopup="true"
                    >
                      Category
                        </button>
                    <div className={this.props.menuClass} >
                      {menuItems.map((item, index) => (
                        <button  key={index}
                          className="dropdown-item"
                          type="button"
                          name="category"
                          onClick={this.props.evtHandler}
                          value={item.name}>{item.name}</button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </>
          )
        }}
    </Query>
  )};
}

export default Category;
