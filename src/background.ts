chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (changeInfo.status === "complete") {
        chrome.scripting.executeScript({
            target: { tabId },
            world: "MAIN",
            files: [
                "substitute.js"
            ]
        })
    }
})