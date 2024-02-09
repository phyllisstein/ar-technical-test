import type { ReactNode } from 'react'

interface RepoListProps {
  children: ReactNode
}

export function RepoList({ children }: RepoListProps) {
  return (
    <>
      <h2 id='a11y-description' className='sr-only'>
        List of repositories
      </h2>
      <div
        className='grid grid-cols-[1fr_auto] md:grid-cols-[2fr_3fr_auto] grid-rows-[2rem_1fr] gap-y-1'
        role='table'
        aria-describedby='a11y-description'>
        <div className='contents' role='row'>
          <div className='font-semibold flex items-center' role='columnheader'>
            Repository
          </div>
          <div
            className='hidden md:flex font-semibold items-center'
            role='columnheader'>
            Description
          </div>
          <div
            className='w-min font-semibold flex items-center'
            role='columnheader'>
            Stars
          </div>
        </div>
        {children}
      </div>
    </>
  )
}
