import React, { Component } from 'react';
import Category from './Category';

class FormPage extends Component {

  render() {

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
                onChange={this.props.evtHandler}
                placeholder="ISBN" 
                defaultValue={this.props.pageType === 'edit' ? this.props.book.isbn : ""}
              />
            </div>
          </div>
          <Category
            evtHandler={this.props.evtHandler}
            toggleOpen={this.props.toggleOpen}
            menuClass={this.props.menuClass}
            state={this.props.state}
            book={this.props.book}
          />
        </div>
        <div className="form-group">
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            className="form-control"
            name="title"
            onChange={this.props.evtHandler}
            placeholder="Title" 
            defaultValue={this.props.pageType === 'edit' ? this.props.book.title : ""}
          />
        </div>
        <div className="form-group">
          <label htmlFor="author">Author:</label>
          <input
            type="text"
            className="form-control"
            name="author"
            onChange={this.props.evtHandler}
            placeholder="Author" 
            defaultValue={this.props.pageType === 'edit' ? this.props.book.author : ""}
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description:</label>
          <textarea
            className="form-control"
            name="description"
            onChange={this.props.evtHandler}
            placeholder="Description"
            cols="80" rows="3" 
            defaultValue={this.props.pageType === 'edit' ? this.props.book.description : ""}
          />
        </div>
        <div className="form-group">
          <label htmlFor="author">Publisher:</label>
          <input
            type="text"
            className="form-control"
            name="publisher"
            onChange={this.props.evtHandler}
            placeholder="Publisher" 
            defaultValue={this.props.pageType === 'edit' ? this.props.book.publisher : ""}
          />
        </div>
        <div className="form-group">
          <label htmlFor="author">Published Year:</label>
          <input
            type="number"
            className="form-control"
            name="published_year"
            onChange={this.props.evtHandler}
            placeholder="Published Year" 
            defaultValue={this.props.pageType === 'edit' ? this.props.book.published_year : ""}
          />
        </div>
        <div className="form-group">
          <label htmlFor="image">
            Image source: : {this.props.pageType === 'edit' ? this.props.book.image_src : "" }
          </label>
          <input
            type="file"
            className="form-control"
            name="image_src"
            onChange={this.props.evtHandler}
            placeholder="image Source"
            accept='image/*'
          />
        </div>
      </>
    );
  }
}

export default FormPage;