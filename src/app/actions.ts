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
  next?: string
  prev?: string
}

interface Response {
  items: RepoItem[]
}

interface Links {
  first?: string
  last?: string
  next?: string
  prev?: string
}

export const parseLinkHeader = <T>(linkHeader: string): T => {
  const links = linkHeader.split(',').map(link => {
    const [url, rel] = link.split(';')
    return {
      rel: rel.match(/rel="(.+)"/)[1],
      url: url.match(/<(.+)>/)[1],
    }
  })

  return links.reduce((acc, link) => {
    acc[link.rel] = link.url
    return acc
  }, {} as T)
}

export const fetchRepos = async (
  _previousState: FormState,
  formData: FormData,
): Promise<FetchResult> => {
  const owner = formData.get('owner')
  const stars = formData.get('stars') as string
  const sort = formData.get('sort') as string
  const order = formData.get('order') as string
  const license = formData.get('license') as string
  const page = formData.get('page') || '1'

  if (typeof owner !== 'string' || !owner) {
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
      per_page: 10,
      page,
    },
  })

  if (response.status >= 400) {
    return {
      error: `${response.status}: ${response.statusText}`,
      success: false,
    }
  }

  const linkHeader = response.headers['link']

  if (typeof linkHeader !== 'string' || !linkHeader) {
    return {
      data: response.data.items,
      success: true,
    }
  }

  const links = parseLinkHeader<Links>(linkHeader)
  const next = links.next && new URL(links.next).searchParams.get('page')
  const prev = links.prev && new URL(links.prev).searchParams.get('page')

  return {
    next,
    prev,
    data: response.data.items,
    success: true,
  }
}
