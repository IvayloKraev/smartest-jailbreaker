const baseFetch = window.fetch.bind(window)

const detailsUrlRegex = /^https:\/\/api\.smartest\.bg\/api\/testSessions\/[0-9A-Fa-f-]{36}\/details$/;

interface Details {
    startDate: string
    endDate: string
    testTitle: string
    showResultAfterEnd: boolean
    strictMode: boolean
    serverTime: string
    authenticationType: number
    gradeFormulaType: number
}

function getUrl(input: RequestInfo | URL): string {
    if (input instanceof Request) {
        return input.url;
    }
    return String(input);
}

window.fetch = async function (input: RequestInfo | URL, init?: RequestInit): Promise<Response> {
    const url = getUrl(input);
    const response = await baseFetch(url, init);

    if (!detailsUrlRegex.test(url)) {
        return response
    }

    const payload: Details = await response.clone().json();

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