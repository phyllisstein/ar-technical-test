'use client'

import { useState } from 'react'

export const RepoSearch = () => {
  const [owner, setOwner] = useState('')

  return (
    <div className='flex flex-row justify-center w-full h-12 my-1'>
      <label className='relative block'>
        <span className='absolute inset-y-0 left-0 flex items-center pl-3'>
          @
        </span>
        <input
          className='rounded-md border-zinc-200 border-2 items-stretch grow m-1 hover:border-sky-300 focus:outline-none focus:border-sky-400 outline-none placeholder:neutral-500 py-2 pl-6 pr-3 leading-none'
          name='owner'
          type='search'
          placeholder='octocat'
          onChange={e => setOwner(e.target.value)}
        />
      </label>
      <button
        className='basis-4 rounded-md m-1 bg-sky-500 px-2 py-1 text-neutral-50 hover:bg-sky-600 active:bg-sky-700 focus:outline-none focus:ring-sky-300 disabled:bg-zinc-200 disabled:text-neutral-500'
        type='submit'
        disabled={owner === ''}>
        Search
      </button>
    </div>
  )
}
