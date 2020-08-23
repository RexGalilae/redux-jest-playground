import { addBug, resolveBug, loadBugs, getUnresolvedBugs } from '../bugs'
import configureStore from '../configureStore'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'

const stateWithTestBugs = () => {
	return {
		entities: {
			bugs: {
				list: [
					{
						id: 1,
						resolved: false,
					},
					{
						id: 2,
						resolved: false,
					},
					{
						id: 3,
						resolved: true,
					},
				],
			},
		},
	}
}
describe('bugSlice', () => {
	let fakeAxios
	let store

	beforeEach(() => {
		fakeAxios = new MockAdapter(axios)
		store = configureStore()
	})

	const bugsSlice = () => {
		return store.getState().entities.bugs
	}

	describe('addBug', () => {
		it("should add the bug to the store IF it's saved to the server", async () => {
			// Arrange
			const bug = { description: 'a' }
			const mockApiResponse = { ...bug, id: 1 }
			fakeAxios.onPost('/bugs').reply(200, mockApiResponse)

			// Act
			await store.dispatch(addBug(bug))

			// Assert
			expect(bugsSlice().list).toContainEqual(mockApiResponse)
		})

		it("should NOT add the bug to the store IF it's saved to the server", async () => {
			// Arrange
			const bug = { description: 'a' }
			fakeAxios.onPost('/bugs').reply(500)

			// Act
			await store.dispatch(addBug(bug))

			// Assert
			expect(bugsSlice().list).toHaveLength(0)
		})
	})

	describe('loadBugs', () => {
		let bug
		let mockApiResponse

		beforeEach(() => {
			bug = { description: 'a' }
			mockApiResponse = [{ ...bug, id: 1 }]
		})

		describe("if the DON'T bugs exist in the cache", () => {
			it('they should be fetched from the server and put in the store', async () => {
				fakeAxios.onGet('/bugs').reply(200, mockApiResponse)

				await store.dispatch(loadBugs())

				expect(bugsSlice().list).toHaveLength(1)
			})
		})

		describe('if the bugs exist in the cache', () => {
			it('they should not be fetched from the server again', async () => {
				fakeAxios.onGet('/bugs').reply(200, mockApiResponse)

				await store.dispatch(loadBugs())
				await store.dispatch(loadBugs())

				expect(fakeAxios.history.get).toHaveLength(1)
			})
		})
		describe('loading indicator', () => {
			it('should be true WHILE fetching data', async () => {
				// Arrange
				fakeAxios.onGet('/bugs').reply(() => {
					expect(bugsSlice().loading).toBe(true)
					return [200, mockApiResponse]
				})

				store.dispatch(loadBugs())
			})
			it('should be false AFTER fetching data', async () => {
				// Arrange
				fakeAxios.onGet('/bugs').reply(() => {
					return [200, mockApiResponse]
				})

				await store.dispatch(loadBugs())

				expect(bugsSlice().loading).toBe(false)
			})
			it('should be false IF the server returns an error', async () => {
				// Arrange
				fakeAxios.onGet('/bugs').reply(() => {
					return [500, mockApiResponse]
				})

				await store.dispatch(loadBugs())

				expect(bugsSlice().loading).toBe(false)
			})
		})
	})

	describe('getUnresolvedBugs', () => {
		it('should get a list of unresolved bugs', async () => {
			// Arrange
			const mockState = stateWithTestBugs()

			// Act
			const unresolved = getUnresolvedBugs(mockState)

			// Assert
			expect(unresolved).toHaveLength(2)
		})
	})
})
