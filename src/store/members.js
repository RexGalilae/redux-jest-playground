import { createSlice } from '@reduxjs/toolkit'

let latestId = 0

const memberStore = createSlice({
	name: 'members',
	initialState: [],
	reducers: {
		memberAdded: (state, action) => {
			state.push({
				id: ++latestId,
				name: action.payload.name,
			})
		},

		memberRemoved: (state, action) => {
			let id = state.findIndex((member) => member.id === action.payload.id)
			state.splice(id)
		},
	},
})

export default memberStore.reducer

export const { memberAdded, memberRemoved } = memberStore.actions
