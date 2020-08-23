import configureStore from './store/configureStore'
import { projectAdded, projectEdited, projectRemoved } from './store/projects'
import { bugAdded, bugAssigned, loadBugs, addBug } from './store/bugs'
import { memberAdded } from './store/members'
import { apiCallBegan, apiCallSuccess, apiCallFailed } from './store/api'
const store = configureStore()

store.dispatch(addBug({ description: 'a' }))
// store.dispatch(loadBugs())

// store.dispatch(projectAdded({ description: 'Shit project' }))
// store.dispatch(projectEdited({ id: 1, description: 'Still sheet' }))
// store.dispatch(projectRemoved({ id: 1 }))

// store.dispatch(bugAdded({ description: 'Shit bug' }))
// store.dispatch(memberAdded({ name: 'Asshat' }))
// store.dispatch(bugAssigned({ bugId: 1, memberId: 1 }))
// store.dispatch({ type: 'error', payload: { message: 'An error occured' } })
