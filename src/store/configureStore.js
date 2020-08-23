import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'
import reducer from './reducer'
import logger from './middleware/logger'
import toastify from './middleware/toastify'
import api from './middleware/api'

export default function () {
	const store = configureStore({
		reducer,
		middleware: [...getDefaultMiddleware(), toastify, api],
	})
	return store
}
