import api_client from "@locar/api-client"

const client = api_client("http://localhost:3000");


export const HealthRepository = {
    up: async () => {
        const res = await client.api.health.up.$get();
        const data = await res.json();
        return data;
    }
}