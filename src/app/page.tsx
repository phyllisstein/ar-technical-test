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
        <form action={dispatch} className='flex flex-col'>
          <div className='flex flex-row justify-center w-full h-12 my-1'>
            <label className='relative block'>
              <span className='absolute inset-y-0 left-0 flex items-center pl-2'>
                @
              </span>
              <input
                className='rounded-md border-zinc-200 border-2 items-stretch grow m-1 hover:border-sky-300 focus:outline-none focus:border-sky-400 outline-none placeholder:neutral-500 py-2 pl-5 pr-3 leading-none'
                name='owner'
                type='search'
                placeholder='octocat'
              />
            </label>
            <button
              className='basis-4 rounded-md m-1 bg-sky-500 px-2 py-1 text-neutral-50 hover:bg-sky-600 active:bg-sky-700 focus:outline-none focus:ring-sky-300'
              type='submit'>
              Search
            </button>
          </div>
          <details className='flex md:block my-2'>
            <summary>
              <span className='text-neutral-500'>Advanced</span>
            </summary>
            <label className='inline-flex items-center p-2'>
              <span className='text-neutral-500 basis-2/12 md:basis-auto mr-1'>
                Sort by
              </span>
              <select
                className='rounded-md border-zinc-200 border-2 items-stretch grow m-1 hover:border-sky-300 focus:outline-none focus:border-sky-400 outline-none px-2 py-1'
                name='sort'>
                <option value=''>Best match</option>
                <option value='updated'>Last Updated</option>
              </select>
            </label>
            <label className='inline-flex items-center p-2'>
              <span className='text-neutral-500 basis-2/12 md:basis-auto mr-1'>
                Order
              </span>
              <select
                className='rounded-md border-zinc-200 border-2 items-stretch grow m-1 hover:border-sky-300 focus:outline-none focus:border-sky-400 outline-none px-2 py-1'
                name='order'>
                <option value='desc'>Descending</option>
                <option value='asc'>Ascending</option>
              </select>
            </label>
            <label className='inline-flex items-center p-2'>
              <span className='text-neutral-500 basis-2/12 md:basis-auto mr-1'>
                Minimum Stars
              </span>
              <input
                className='rounded-md border-zinc-200 border-2 items-stretch grow m-1 hover:border-sky-300 focus:outline-none focus:border-sky-400 outline-none px-2 py-1'
                name='stars'
                type='number'
              />
            </label>
            <label className='inline-flex items-center p-2'>
              <span className='text-neutral-500 basis-2/12 md:basis-auto mr-1'>
                License
              </span>
              <select
                className='rounded-md border-zinc-200 border-2 items-stretch grow m-1 hover:border-sky-300 focus:outline-none focus:border-sky-400 outline-none px-2 py-1'
                name='license'>
                <option value=''>Any</option>
                <option value='apache'>Apache 2.0</option>
                <option value='gpl'>GPL</option>
                <option value='mit'>MIT</option>
              </select>
            </label>
          </details>
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
