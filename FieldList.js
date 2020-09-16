import React, { Component } from 'react';
import { Query } from "react-apollo";
import { GET_BOOKS_NAME } from '../Queries';
import { Button, Modal } from 'react-bootstrap'
import { bookStates } from '../components/Utils';


class FieldList extends Component {

  render() {

    return (
      <Query 
        query={GET_BOOKS_NAME}
      >
        {({ loading, error, data: book }) => {
          if (loading) return 'Loading...';
          if (error) return `Error! ${error.message}`;
          let fields = Object.keys(bookStates);
          let test = book?.__type.fields;
          let checkBoxItems=[];

          test.filter(item => {
            if (fields.includes(item.name))
              checkBoxItems.push(item.name)
          });

          return (
            <>
              <div className="col">
                <div className="form-group">
                  <Button className='mt-2' variant="primary" onClick={this.props.toggleOpen}>
                    Modify Field List
                  </Button>
                  <Modal show={this.props.state.isOpen} onHide={this.props.handleClose}>
                    <Modal.Header closeButton>
                      <Modal.Title>Modal heading</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                      <form>
                        { checkBoxItems && checkBoxItems.map( (item, index) => (
                          <div key={index} className="form-check">
                            <label className="form-check-label">
                              <input
                                type="checkbox"
                                name={item}
                                onChange={this.props.handleCheckBox}
                                className="form-check-input"
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

export default FieldList;