chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (tab.url && tab.url.startsWith("https://www.smartest.bg/")) {
        if (changeInfo.status === "loading") {
            chrome.scripting.executeScript({
                target: { tabId },
                world: "MAIN",
                files: [
                    "substitute.js"
                ]
            })
        }
    }
})