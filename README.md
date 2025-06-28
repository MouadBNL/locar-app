# Locar App

Application under developement.<br/>

## Setup

First make sure you have `pnpm`, and maybe learn a little bit about how workspaces work.<br/>
Clone this project, and open `package.json` to find the list of scripts you can execute.<br/>
<br/>

`pnpm api [...args]` execute pnpm commands in apps/api.<br/>
`pnpm web [...args]` execute pnpm commands in apps/web.<br/>
`pnpm api-client [...args]` same things.<br/>

to start all applications:<br/>
`pnpm dev` which executes `pnpm run -r --parallel --aggregate-output dev`
