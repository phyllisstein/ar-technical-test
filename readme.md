# Axion Ray Technical Test
This small application fetches the repos belonging to a GitHub user or organization. It's a single-page app with a single page: input a handle, get back a list.


## Getting Started
You'll need Node `v20` and a global Yarn installation. Run `yarn install` to fetch the app's dependencies, then `yarn start:dev` to spin up a development server. The application also runs in a Docker container. Run `docker-compose up` to build the image and start the service. Either way, the app will be available on port `:3000`.


## Technical Choices
The core technical tools are TypeScript, React, and Next.js. You'll also find Tailwind for component styling, Jest for testing, and Axios for REST requests. (Axios snuck in because Jest couldn't mock `fetch`.) All six are familiar in the React ecosystem.

In context, Next.js and Tailwind were exploratory choices. This was my first time working with React server components; Tailwind has always left me ambivalent.

The code is organized along the guidelines for the Next.js [app router](https://nextjs.org/docs/getting-started/project-structure).

<!-- The container shadows `node_modules` with a Docker volume and uses Watchman to run Yarn when the lockfile changes. This guarantees dependencies with binary builds do not leak between the host and the container: Sass on the host is built for macOS, Sass in the container for Linux. Watchman also runs the dev server, restarting when necessary, and monitors its own configuration for changes. See [`scripts/develop.sh`][develop-sh]. -->


## TODO
### Tooling
- **Server components.** Thinly documented and available only in canary builds of React. Mistakes interleaving server and client components cause Next to silently fall back on client-side rendering. Steep learning curve for a low-data app; took up too much oxygen in a time-bounded task.
- **Client-side `<Home />`.** Move embedded event handlers into isolated client components and remove `useFormState` hook so `<Home />` becomes a valid server components.
- **Tailwind.** Semantics shot to hell by smorgasbord of CSS classes. What does this button do?

    ```jsx
    <button className='basis-4 rounded-md m-1 bg-sky-500 px-2 py-1 text-neutral-50 hover:bg-sky-600 active:bg-sky-700 focus:outline-none focus:ring-sky-300 disabled:bg-zinc-200 disabled:text-neutral-500' />
    ```
    
    Replace with CSS modules or, better, CSS-in-JS.

### Design
- **Drilling component trees.** [`<RepoFilters />`][repo-filters] and [`<RepoSearch />`][repo-search] are self-closing components taking no props that wrap complex behavior and deeply nested component trees. Hoisting child components would yield more legible, composable code. It would also obviate the need to violate bounded context of components with clumsy event handlers like `<RepoSearch onSubmit />`.
- **Implicit `<form />`.** `<RepoFilters />` and `<RepoSearch />` assume they are children of a `<form />`. Hoisting their children would make it easier to surface that dependency.
- **`app` junk drawer.** Next's app router colocates non-route files with page components, but, as evinced by [`actions.ts`][actions-ts], routes can now become junk drawers. `actions` would be intention-revealing in a GitHub module, for instance, or a search module.

### Hygiene
- **a11y.** Expand on scattered ARIA attributes.
- **Testing.** Add component tests---e.g., to exercise display of filtered and sorted results.

### UI/UX
- **Looks like an engineer did this.** An engineer did this.


[repo-filters]: https://github.com/phyllisstein/ar-technical-test/blob/92b57e8978e5d6c1653879be059946194c79c48b/src/components/repo-search/repo-filters.tsx
[repo-search]: https://github.com/phyllisstein/ar-technical-test/blob/92b57e8978e5d6c1653879be059946194c79c48b/src/components/repo-search/repo-search.tsx
[implicit-form]: https://github.com/phyllisstein/ar-technical-test/blob/92b57e8978e5d6c1653879be059946194c79c48b/src/app/page.tsx#L24-L24
[actions-ts]: https://github.com/phyllisstein/ar-technical-test/blob/711a6a2110914319158efcf0a6f544d8cebd4f83/src/app/actions.ts
[develop-sh]: https://github.com/phyllisstein/ar-technical-test/blob/e0ad10669848b00480c65d75d3876c4d721fa947/scripts/develop.sh
