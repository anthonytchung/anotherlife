class FetchApiService {
    private static baseUrl: string = "http://localhost:8080"

    private async request(route: string, options: RequestInit) {
        const res = await fetch(`${FetchApiService.baseUrl}${route}`, {
            ...options,
            credentials: "include",
            headers: {
                "Content-Type": "application/json"
            },
        })
        if (!res.ok) {
        const error = await res.json();
        throw new Error(`HTTP ${res.status}: ${error}`);
      }
      return res.json();
    }

    public async get(route: string): Promise<any> {
        return this.request(route, {
            method: "GET"
        })
    }

    public async post(route: string, body: object): Promise<any> {
        return this.request(route, {
            method: "POST",
            body: JSON.stringify(body)
        })
    }
}

const api = new FetchApiService()
export default api