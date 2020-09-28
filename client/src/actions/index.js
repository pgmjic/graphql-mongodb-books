export const UPDATE_ISBN = 'UPDATE_ISBN'
export const UPDATE_TITLE = 'UPDATE_TITLE'
export const UPDATE_AUTHOR = 'UPDATE_AUTHOR'
export const UPDATE_DESCRIPTION = 'UPDATE_DESCRIPTION'
export const UPDATE_PUBLISHER = 'UPDATE_PUBLISHER'
export const UPDATE_PUBLISHER_YEAR = 'UPDATE_PUBLISHER_YEAR'
export const UPDATE_IMAGE_SRC = 'UPDATE_IMAGE_SRC'
export const UPDATE_CATEGORY = 'UPDATE_CATEGORY'

export const CHECKED_ISBN = 'CHECKED_ISBN'
export const CHECKED_AUTHOR = 'CHECKED_AUTHOR'
export const CHECKED_CATEGORY = 'CHECKED_CATEGORY'

export const checkedIsbn = isbnChecked => ({
	type: CHECKED_ISBN,
	isbnChecked
})

export const checkedAuthor = authorChecked => ({
	type: CHECKED_AUTHOR,
	authorChecked
})

export const checkedCategory = categoryChecked => ({
	type: CHECKED_CATEGORY,
	categoryChecked
})