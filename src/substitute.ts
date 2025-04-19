const baseFetch = window.fetch

window.fetch = async function (input: RequestInfo | URL, init?: RequestInit): Promise<Response> {
    if (
        typeof input === "string" &&
        input.startsWith("https://api.smartest.bg/api/testSessions/") &&
        input.endsWith("/details")
    ) {
        const response = await baseFetch(input, init)
        const data = await response.json()

        const modifiedData = {
            ...data,
            strictMode: false
        }

        const modifiedBlob = new Blob([JSON.stringify(modifiedData)], { type: 'application/json' });

        return new Response(
            modifiedBlob,
            {
                headers: response.headers,
                status: response.status,
                statusText: response.statusText,
            }
        )
    }
    else {
        return baseFetch(input, init)
    }
};