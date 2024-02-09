'use server'

import axios from 'axios'

interface FormState {
  query: string
}

interface RepoItem {
  description: string
  full_name: string
  html_url: string
  id: number
  stargazers_count: number
}

export interface FetchResult {
  data?: RepoItem[]
  error?: string
  success: boolean
}

interface Response {
  items: RepoItem[]
}

export const fetchRepos = async (
  _previousState: FormState,
  formData: FormData,
): Promise<FetchResult> => {
  const owner = formData?.get('owner')
  const stars = formData?.get('stars') as string
  const sort = formData?.get('sort') as string
  const order = formData?.get('order') as string
  const license = formData?.get('license') as string

  if (typeof owner !== 'string') {
    return {
      error: 'Invalid query',
      success: false,
    }
  }

  const searchString = [
    `user:${owner}`,
    stars && `stars:>=${stars}`,
    sort && `sort:${sort}-${order}`,
    license && `license:${license}`,
  ]
    .filter(Boolean)
    .join(' ')

  const response = await axios.request<Response>({
    method: 'GET',
    url: 'https://api.github.com/search/repositories',
    headers: {
      Accept: 'application/vnd.github+json',
      'X-GitHub-Api-Version': '2022-11-28',
    },
    params: {
      q: searchString,
    },
  })

  if (response.status >= 400) {
    return {
      error: `${response.status}: ${response.statusText}`,
      success: false,
    }
  }

  return {
    data: response.data.items,
    success: true,
  }
}
