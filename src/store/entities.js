import { combineReducers } from 'redux'
import projectsReducer from './projects'
import bugsReducer from './bugs'
import membersReducer from './members'

export default combineReducers({
	bugs: bugsReducer,
	projects: projectsReducer,
	members: membersReducer,
})
