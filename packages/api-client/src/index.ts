import { hc } from 'hono/client'
import { AppType } from "@locar/api/router"


const client = hc<AppType>("");
export type Client = typeof client;

export default (...args: Parameters<typeof hc>): Client =>
    hc<AppType>(...args);