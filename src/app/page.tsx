'use client'

import { useFormState } from 'react-dom'

import { Repo, RepoList } from 'components/repo-list'
import { fetchRepos, type FetchResult } from './actions'

function Home() {
  // @ts-expect-error: Types out of date
  const [state, dispatch] = useFormState<FetchResult>(fetchRepos, {
    query: '',
  })

  return (
    <div>
      <main className='p-4'>
        <form
          action={dispatch}
          className='flex flex-row justify-evenly w-full h-12'>
          <input
            className='rounded-md border-zinc-200 border-2 items-stretch grow m-1 hover:border-sky-300 focus:outline-none focus:border-sky-400 outline-none px-2 py-1'
            name='query'
            type='search'
          />
          <button
            className='basis-4 rounded-md m-1 bg-sky-500 px-2 py-1 text-neutral-50 hover:bg-sky-600 active:bg-sky-700 focus:outline-none focus:ring-sky-300'
            type='submit'>
            Search
          </button>
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
