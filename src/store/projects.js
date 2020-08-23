import { createSlice } from '@reduxjs/toolkit'

let latestId = 0

const projectStore = createSlice({
	name: 'projects',
	initialState: [],
	reducers: {
		projectAdded: (state, action) => {
			state.push({
				id: ++latestId,
				description: action.payload.description,
			})
		},
		projectRemoved: (state, action) => {
			let index = state.findIndex((project) => project.id === action.payload.id)
			state.splice(index)
		},
		projectEdited: (state, action) => {
			let index = state.findIndex((project) => project.id === action.payload.id)
			state[index].description = action.payload.description
		},
	},
})

export default projectStore.reducer

export const {
	projectAdded,
	projectEdited,
	projectRemoved,
} = projectStore.actions
