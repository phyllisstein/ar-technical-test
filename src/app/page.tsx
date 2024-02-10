'use client'

import { useRef } from 'react'
import { useFormState } from 'react-dom'

import { Repo, RepoList } from 'components/repo-list'
import { RepoFilters, RepoSearch } from 'components/repo-search'

import { fetchRepos, type FetchResult } from './actions'

const Home = () => {
  // @ts-expect-error: Types out of date
  const [state, dispatch] = useFormState<FetchResult>(fetchRepos, {
    query: '',
    next: 0,
    prev: 0,
  })
  const formRef = useRef<HTMLFormElement>()
  const pageRef = useRef<HTMLInputElement>()

  return (
    <div>
      <main className='p-4'>
        <form ref={formRef} action={dispatch} className='flex flex-col'>
          <RepoSearch
            onSubmit={e => {
              if (!formRef.current || !pageRef.current) return

              e.preventDefault()
              pageRef.current.value = '1'
              e.currentTarget.form?.requestSubmit()
            }}
          />
          <RepoFilters />
          <button
            className='basis-4 rounded-md m-1 bg-sky-500 px-2 py-1 text-neutral-50 hover:bg-sky-600 active:bg-sky-700 focus:outline-none focus:ring-sky-300 disabled:bg-zinc-200 disabled:text-neutral-500'
            disabled={!state.prev}
            type='button'
            onClick={e => {
              if (!formRef.current || !pageRef.current) return

              e.preventDefault()
              e.currentTarget.form?.requestSubmit()
              pageRef.current.value = String(state.prev)
            }}>
            Previous
          </button>
          <button
            className='basis-4 rounded-md m-1 bg-sky-500 px-2 py-1 text-neutral-50 hover:bg-sky-600 active:bg-sky-700 focus:outline-none focus:ring-sky-300 disabled:bg-zinc-200 disabled:text-neutral-500'
            disabled={!state.next}
            type='button'
            onClick={e => {
              if (!formRef.current || !pageRef.current) return

              e.preventDefault()
              pageRef.current.value = String(state.next)
              e.currentTarget.form?.requestSubmit()
            }}>
            Next
          </button>
          <input ref={pageRef} name='page' type='hidden' />
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
