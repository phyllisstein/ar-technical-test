import type { ReactNode } from 'react'

interface RepoProps {
  children: ReactNode
  description: string
  stars: number
  url: string
}

export const Repo = ({ children, description, stars, url }: RepoProps) => {
  return (
    <div className='contents' role='row'>
      <div role='cell'>
        <a href={url} className='hover:underline hover:text-blue-600'>
          {children}
        </a>
      </div>
      <div className='hidden md:flex' role='cell'>
        {description}
      </div>
      <div className='w-min' role='cell'>
        {stars}
      </div>
    </div>
  )
}
