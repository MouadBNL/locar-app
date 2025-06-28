# Locar App

Application under developement.

## Setup

First make sure you have `pnpm`, and maybe learn a little bit about how workspaces work.
Clone this project, and open `package.json` to find the list of scripts you can execute.

`pnpm api [...args]` execute pnpm commands in apps/api.
`pnpm web [...args]` execute pnpm commands in apps/web.
`pnpm api-client [...args]` same things.

to start all applications:
`pnpm dev` which executes `pnpm run -r --parallel --aggregate-output dev`
