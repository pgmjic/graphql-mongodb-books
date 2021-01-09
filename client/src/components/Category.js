import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { GET_CATEGORY } from '../Queries';
import {Error, Loading} from './Status';

//
const Category = props => {

  const { loading, error, data: category } = useQuery(GET_CATEGORY);
  if (loading) return (<Loading/>)
  if (error) return (<Error error={error.message}/>)

  let menuItems = [];
  menuItems = category?.__type.enumValues;

  return (
    <>
      <div className="col">
        <div className="form-group">
          <label htmlFor="category">
            Select: {props.pageType === 'edit' && props.category.length === 0
              ? props.book?.category
              : props.category}
          </label>
          <div className="dropdown" onClick={props.toggleOpen}>
            <button
              className="btn btn-primary dropdown-toggle"
              type="button"
              id="dropdownMenuButton"
              data-toggle="dropdown"
              aria-haspopup="true"
            >
              Category
            </button>
            <div className={props.menuClass} >
              {menuItems.map((item, index) => (
                <button
                  key={index}
                  className="dropdown-item"
                  type="button"
                  name="category"
                  onClick={props.evtHandler}
                  value={item.name}>{item.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Category;