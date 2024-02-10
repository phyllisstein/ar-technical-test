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
      <div className='cell m-2 md:m-4'>
        <a href={url} className='hover:underline hover:text-blue-600'>
          {children}
        </a>
      </div>
      <div className='hidden md:flex m-4' role='cell'>
        {description}
      </div>
      <div className='w-min m-2 md:m-4' role='cell'>
        {stars}
      </div>
    </div>
  )
}
