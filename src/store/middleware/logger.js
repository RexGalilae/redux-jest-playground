const logger = (store) => (next) => (action) => {
	console.log(store)
	return next(action)
}

export default logger
