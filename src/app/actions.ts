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
  'use server'

  const query = formData?.get('query')

  if (typeof query !== 'string') {
    return {
      error: 'Invalid query',
      success: false,
    }
  }

  const response = await axios.request<Response>({
    method: 'GET',
    url: 'https://api.github.com/search/repositories',
    headers: {
      Accept: 'application/vnd.github+json',
      'X-GitHub-Api-Version': '2022-11-28',
    },
    params: {
      q: query,
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
