import React from 'react';
import Category from './Category';

const FormPage = props => {

  return (
    <>
      <div className="row">
        <div className="col-8">
          <div className="form-group">
            <label htmlFor="isbn">ISBN:</label>
            <input
              type="text"
              className="form-control"
              name="isbn"
              onChange={props.evtHandler}
              placeholder="ISBN"
              defaultValue={props.pageType === 'edit' ? props.book.isbn : ""}
            />
          </div>
        </div>
        <Category
          pageType={props.pageType}
          evtHandler={props.selectCategory}
          toggleOpen={props.toggleOpen}
          menuClass={props.menuClass}
          state={props.state}
          category={props.category}
          book={props.book}
        />
      </div>
      <div className="form-group">
        <label htmlFor="title">Title:</label>
        <input
          type="text"
          className="form-control"
          name="title"
          onChange={props.evtHandler}
          placeholder="Title"
          defaultValue={props.pageType === 'edit' ? props.book.title : ""}
        />
      </div>
      <div className="form-group">
        <label htmlFor="author">Author:</label>
        <input
          type="text"
          className="form-control"
          name="author"
          onChange={props.evtHandler}
          placeholder="Author"
          defaultValue={props.pageType === 'edit' ? props.book.author : ""}
        />
      </div>
      <div className="form-group">
        <label htmlFor="description">Description:</label>
        <textarea
          className="form-control"
          name="description"
          onChange={props.evtHandler}
          placeholder="Description"
          cols="80" rows="3"
          defaultValue={props.pageType === 'edit' ? props.book.description : ""}
        />
      </div>
      <div className="form-group">
        <label htmlFor="author">Publisher:</label>
        <input
          type="text"
          className="form-control"
          name="publisher"
          onChange={props.evtHandler}
          placeholder="Publisher"
          defaultValue={props.pageType === 'edit' ? props.book.publisher : ""}
        />
      </div>
      <div className="form-group">
        <label htmlFor="author">Published Year:</label>
        <input
          type="number"
          className="form-control"
          name="published_year"
          onChange={props.evtHandler}
          placeholder="Published Year"
          defaultValue={props.pageType === 'edit' ? props.book.published_year : ""}
        />
      </div>
      <div className="form-group">
        <label htmlFor="image">
          Image source: : {props.pageType === 'edit' ? props.book.image_src : ""}
        </label>
        <input
          type="file"
          className="form-control"
          name="image_src"
          onChange={props.evtHandler}
          placeholder="image Source"
          accept='image/*'
        />
      </div>
    </>
  );
}

export default FormPage;