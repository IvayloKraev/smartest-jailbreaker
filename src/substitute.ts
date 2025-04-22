const baseFetch = window.fetch.bind(window)

const detailsUrlPattern = /^https:\/\/api\.smartest\.bg\/api\/testSessions\/([0-9A-Fa-f]{8}-[0-9A-Fa-f]{4}-[0-9A-Fa-f]{4}-[0-9A-Fa-f]{4}-[0-9A-Fa-f]{12})\/details$/;

function getUrl(input: RequestInfo | URL): string {
    if (input instanceof Request) {
        return input.url;
    }
    return String(input);
}

window.fetch = async function (input: RequestInfo | URL, init?: RequestInit): Promise<Response> {
    const url = getUrl(input);
    if (!detailsUrlPattern.test(url)) {
        return baseFetch(input, init)
    }

    const response = await baseFetch(input, init)
    const clone = response.clone();
    const payload = await clone.json();

    const modifiedPayload = {
        ...payload,
        strictMode: false
    }
    const modifiedBlob = new Blob(
        [JSON.stringify(modifiedPayload)],
        {type: 'application/json'}
    );

    return new Response(
        modifiedBlob,
        {
            headers: response.headers,
            status: response.status,
            statusText: response.statusText,
        }
    )
};