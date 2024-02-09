import { fetchRepos } from './actions'
import axios from 'axios'

jest.mock('axios')

describe('fetchRepos', () => {
  it('returns an error if the query is invalid', async () => {
    const result = await fetchRepos()

    expect(result).toEqual({
      error: 'Invalid query',
      success: false,
    })
  })

  it('returns an error if the response status is 400 or greater', async () => {
    axios.request.mockResolvedValueOnce({
      status: 400,
      statusText: 'Bad Request',
    })

    const formData = new FormData()
    formData.set('query', 'octocat')

    const result = await fetchRepos(null, formData)

    expect(result).toEqual({
      error: '400: Bad Request',
      success: false,
    })
  })
})
