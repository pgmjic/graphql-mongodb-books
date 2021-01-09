import { combineReducers } from 'redux'
import {
	CHECKED_ISBN,
	CHECKED_TITLE,
	CHECKED_AUTHOR,
	CHECKED_CATEGORY
} from '../actions'

const initialState = {
  isbnChecked: false,
  titleChecked: false,
  authorChecked: true,
  categoryChecked: false
}

const categoryCheck = (state = initialState, action) => {
	switch(action.type) {
		case CHECKED_ISBN:
			return {
				...state,
				isbnChecked: action.isbnChecked
			}
		case CHECKED_TITLE:
			return {
				...state,
				titleChecked: action.titleChecked
			}
		case CHECKED_AUTHOR:
			return {
				...state,
				authorChecked: action.authorChecked
			}
    case CHECKED_CATEGORY:
      return {
				...state,
				categoryChecked: action.categoryChecked
			}
	  default:
			return state
	}
}

const rootReducer = combineReducers({
	categoryCheck
})

export default rootReducer