export const RepoFilters = () => {
  return (
    <details className='flex md:block mb-8'>
      <summary>
        <span className='text-neutral-500'>Filters</span>
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
  )
}
