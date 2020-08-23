import { createSlice } from '@reduxjs/toolkit'
import { createSelector } from 'reselect'
import { apiCallBegan } from './api'
import moment from 'moment'

const apiUrl = '/bugs'

// Slice
const bugsStore = createSlice({
	name: 'bugs',
	initialState: { list: [], loading: false, lastFetch: null },
	reducers: {
		bugsRequested: (state, action) => {
			state.loading = true
		},

		bugsRequestFailed: (state, action) => {
			state.loading = false
		},

		bugsReceived: (state, action) => {
			state.list = action.payload
			state.loading = false
			state.lastFetch = Date.now()
		},

		bugAdded: (state, action) => {
			state.list.push(action.payload)
		},

		bugResolved: (state, action) => {
			const index = state.list.findIndex((bug) => bug.id === action.payload.id)
			state.list[index].resolved = true
		},

		bugRemoved: (state, action) => {
			const index = state.list.findIndex((bug) => bug.id === action.payload.id)
			state.list.splice(index)
		},

		bugAssigned: (state, action) => {
			const index = state.list.findIndex(
				(bug) => bug.id === action.payload.bugId
			)
			state.list[index].memberId = action.payload.memberId
		},
	},
})

export default bugsStore.reducer

const {
	bugAdded,
	bugRemoved,
	bugResolved,
	bugAssigned,
	bugsReceived,
	bugsRequested,
	bugsRequestFailed,
} = bugsStore.actions

// Action Creators
export const loadBugs = () => (dispatch, getState) => {
	const { lastFetch } = getState().entities.bugs
	const diffInMinutes = moment().diff(moment(lastFetch), 'minutes')

	if (diffInMinutes < 10) return

	return dispatch(
		apiCallBegan({
			url: apiUrl,
			onStart: bugsRequested.type,
			onSuccess: bugsReceived.type,
			onError: bugsRequestFailed.type,
		})
	)
}

export const addBug = (bug) =>
	apiCallBegan({
		url: apiUrl,
		method: 'post',
		data: bug,
		onSuccess: bugAdded.type,
	})

export const resolveBug = (bug) =>
	apiCallBegan({
		url: apiUrl,
		method: 'patch',
		data: bug,
		onSuccess: bugResolved.type,
	})

export const getBugsForMember = (memberId) =>
	createSelector(
		(state) => state.entities.bugs,
		(bugs) => bugs.filter((bug) => bug.memberId === memberId)
	)

export const getUnresolvedBugs = createSelector(
	(state) => state.entities.bugs,
	(bugs) => bugs.list.filter((bug) => !bug.resolved)
)
