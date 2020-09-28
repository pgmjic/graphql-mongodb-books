import React, { Component } from 'react';
import { Query } from "react-apollo";
import { connect } from 'react-redux';

import { GET_BOOKS_NAME } from '../Queries';
import { Button, Modal } from 'react-bootstrap'

import { ValidFields } from '../components/Utils';
import { checkedIsbn, checkedAuthor, checkedCategory } from '../actions';

class FieldList extends Component {
  constructor() {
    super();

    this.checkedState = this.checkedState.bind(this);
    this.handleCheckBox = this.handleCheckBox.bind(this);
  }

  checkedState(item) {
    let { isbnChecked, authorChecked, categoryChecked} = this.props;

    switch (item) {
      case 'isbn': return isbnChecked;
      case 'author': return authorChecked;
      case 'category': return categoryChecked;
      default: return false;
    }
  }

  handleCheckBox(e, item) {
    const { dispatch } = this.props;
    switch (item) {
      case 'isbn': 
        dispatch(checkedIsbn(e.target.checked));
        break;
      case 'author': 
        dispatch(checkedAuthor(e.target.checked));
        break;
      case 'category': 
        dispatch(checkedCategory(e.target.checked));
        break;
      default: return false;
    }
  }

  render() {

    return (
      <Query 
        query={GET_BOOKS_NAME}
      >
        {({ loading, error, data: book }) => {
          if (loading) return 'Loading...';
          if (error) return `Error! ${error.message}`;
          let test = book?.__type.fields;
          let checkBoxItems=[];

          test.filter(item => {
            if (ValidFields.includes(item.name))
              checkBoxItems.push(item.name)
          });

          return (
            <>
              <div className="col">
                <div className="form-group">
                  <Button className='mt-2' variant="primary" onClick={this.props.toggleOpen}>
                    Field List
                  </Button>
                  <Modal show={this.props.state.isOpen} onHide={this.props.handleClose}>
                    <Modal.Header closeButton>
                      <Modal.Title>Select Fields to Show:</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                      <form>
                        { checkBoxItems && checkBoxItems.map( (item, index) => (
                          <div key={index} className="form-check">
                            <label className="form-check-label">
                              <input
                                type="checkbox"
                                name={item}
                                className="form-check-input"
                                onChange={ (event) => this.handleCheckBox(event, item) }
                                checked={ this.checkedState(item) }
                              />
                              {item}
                            </label>
                          </div>
                          ))}
                      </form>
                    </Modal.Body>
                    <Modal.Footer>
                      <Button variant="primary" onClick={this.props.handleClose}>
                        Select
                      </Button>
                    </Modal.Footer>
                  </Modal>
                </div>
              </div>
            </>
          )
        }}
    </Query>
  )};
}

const mapStateToProps = (state) => {
  let { isbnChecked, authorChecked, categoryChecked} = state.categoryCheck;

  return {
    isbnChecked, 
    authorChecked, 
    categoryChecked
  }
}

export default connect(mapStateToProps)(FieldList)