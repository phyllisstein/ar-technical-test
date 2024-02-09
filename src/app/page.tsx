'use client'

import { useFormState } from 'react-dom'

import { Repo, RepoList } from 'components/repo-list'
import { RepoFilters, RepoSearch } from 'components/repo-search'

import { fetchRepos, type FetchResult } from './actions'

const Home = () => {
  // @ts-expect-error: Types out of date
  const [state, dispatch] = useFormState<FetchResult>(fetchRepos, {
    query: '',
  })

  return (
    <div>
      <main className='p-4'>
        <form action={dispatch} className='flex flex-col'>
          <RepoSearch />
          <RepoFilters />
        </form>
        {state?.success && (
          <RepoList>
            {state?.data?.map(repo => (
              <Repo
                key={repo.id}
                description={repo.description}
                stars={repo.stargazers_count}
                url={repo.html_url}>
                {repo.full_name}
              </Repo>
            ))}
          </RepoList>
        )}
        {state?.success === false && (
          <p className='text-red-600 font-semibold text-lg'>{state?.error}</p>
        )}
      </main>
    </div>
  )
}

export default Home
