import { fetchRepos, parseLinkHeader } from './actions'
import axios from 'axios'
import MockedFunction = jest.MockedFunction

jest.mock('axios')

describe('homepage actions', () => {
  describe('fetchRepos', () => {
    it('returns an error if the query is invalid', async () => {
      const formData = new FormData()
      formData.set('owner', '')
      const result = await fetchRepos(null, formData)

      expect(result).toEqual({
        error: 'Invalid query',
        success: false,
      })
    })

    it('returns an error if the response status is 400 or greater', async () => {
      ;(
        axios.request as MockedFunction<typeof axios.request>
      ).mockResolvedValueOnce({
        status: 400,
        statusText: 'Bad Request',
      })

      const formData = new FormData()
      formData.set('owner', 'octocat')

      const result = await fetchRepos(null, formData)

      expect(result).toEqual({
        error: '400: Bad Request',
        success: false,
      })
    })

    it('constructs a query string from form data', async () => {
      ;(
        axios.request as MockedFunction<typeof axios.request>
      ).mockResolvedValue({
        status: 200,
        data: { items: [] },
        headers: {
          link: '',
        },
      })

      const formData = new FormData()
      formData.set('owner', 'octocat')
      await fetchRepos(null, formData)
      expect(axios.request).toHaveBeenCalledWith(
        expect.objectContaining({
          params: expect.objectContaining({
            q: expect.stringMatching(/user:octocat/),
          }),
        }),
      )

      formData.set('stars', '100')
      await fetchRepos(null, formData)
      expect(axios.request).toHaveBeenCalledWith(
        expect.objectContaining({
          params: expect.objectContaining({
            q: expect.stringMatching(/stars:>=100/),
          }),
        }),
      )

      formData.set('sort', 'updated')
      formData.set('order', 'asc')
      await fetchRepos(null, formData)
      expect(axios.request).toHaveBeenCalledWith(
        expect.objectContaining({
          params: expect.objectContaining({
            q: expect.stringMatching(/sort:updated-asc/),
          }),
        }),
      )

      formData.set('license', 'gpl')
      await fetchRepos(null, formData)
      expect(axios.request).toHaveBeenCalledWith(
        expect.objectContaining({
          params: expect.objectContaining({
            q: expect.stringMatching(/license:gpl/),
          }),
        }),
      )
    })
  })

  describe('parseLinkHeader', () => {
    it('returns an object with the next and prev links', () => {
      const linkHeader = `
      <https://api.github.com/search/repositories?q=octocat&page=2>; rel="next",
      <https://api.github.com/search/repositories?q=octocat&page=34>; rel="last"
    `
      const result = parseLinkHeader(linkHeader)

      expect(result).toEqual({
        next: 'https://api.github.com/search/repositories?q=octocat&page=2',
        last: 'https://api.github.com/search/repositories?q=octocat&page=34',
      })
    })
  })
})
