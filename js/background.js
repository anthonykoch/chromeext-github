"use strict";

{
	/**
	 * Track URL changes
	 * @type {Object}
	 */
	const urls = {};

	/**
	 * Since we can't detect a URL change, we have to listen to chrome's
	 * onUpdated event for tabs and send
	 */
	chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
		if (urls[tabId] !== tab.url) {
			chrome.tabs.sendMessage(tabId, {
				type: 'UPDATE_URL',
				data: {
					url: tab.url
				}
			});
			urls[tabId] = tab.url;
		}
	});
}