import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { connect } from 'react-redux';

import { GET_BOOKS_NAME } from '../Queries';
import { Button, Modal } from 'react-bootstrap'

import { ValidFields } from '../components/Utils';
import { checkedIsbn, checkedTitle, checkedAuthor, checkedCategory } 
        from '../actions';
import {Error, Loading} from './Status';

const FieldList = props => {
  const { loading, error, data: book } = useQuery(GET_BOOKS_NAME);
  if (loading) return (<Loading/>)
  if (error) return (<Error error={error.message}/>)

  function checkedState(item) {
    let { isbnChecked, titleChecked, authorChecked, categoryChecked} = props;

    switch (item) {
      case 'Isbn': return isbnChecked;
      case 'Title': return titleChecked;
      case 'Author': return authorChecked;
      case 'Category': return categoryChecked;
      default: return false;
    }
  }

  function handleCheckBox(e, item) {
    const { dispatch } = props;
    switch (item) {
      case 'Isbn': 
        dispatch(checkedIsbn(e.target.checked));
        break;
      case 'Title': 
        dispatch(checkedTitle(e.target.checked));
        break;
      case 'Author': 
        dispatch(checkedAuthor(e.target.checked));
        break;
      case 'Category': 
        dispatch(checkedCategory(e.target.checked));
        break;
      default: return false;
    }
  }

  let checkBoxItems = [];
  if (book) {
    let test = book?.__type.fields;

    test.filter(item => {
      if (ValidFields.includes(item.name)) {
        // capitalize the name
        let name = item.name.substring(0,1).toUpperCase()+item.name.substring(1)
        checkBoxItems.push(name);
      }
      return null
    });
  }

 return (
   <>
     <div className="col">
       <div className="form-group">
         <Button className='mt-2' variant="primary" onClick={props.toggleOpen}>
           Field List
        </Button>
         <Modal show={props.state.isOpen} onHide={props.handleClose}>
           <Modal.Header closeButton>
             <Modal.Title>Select Fields to Show:</Modal.Title>
           </Modal.Header>
           <Modal.Body>
             <form>
               {checkBoxItems && checkBoxItems.map((item, index) => (
                 <div key={index} className="form-check">
                   <label className="form-check-label">
                     <input
                       type="checkbox"
                       name={item}
                       className="form-check-input"
                       onChange={(event) => handleCheckBox(event, item)}
                       checked={checkedState(item)}
                       disabled={(props.byField === item) ? true : false }
                     />
                     {item}
                   </label>
                 </div>
               ))}
             </form>
           </Modal.Body>
           <Modal.Footer>
             <Button variant="primary" onClick={props.handleClose}>
               Select
            </Button>
           </Modal.Footer>
         </Modal>
       </div>
     </div>
   </>
 )
}

const mapStateToProps = (state) => {
  let { isbnChecked, titleChecked, authorChecked, categoryChecked} = state.categoryCheck;

  return {
    isbnChecked,
    titleChecked,
    authorChecked, 
    categoryChecked
  }
}

export default connect(mapStateToProps)(FieldList)