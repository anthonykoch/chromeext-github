'use strict';

const TAB_SIZE = 4;

window.addEventListener('DOMContentLoaded', onDOMContentLoaded);

/**
 * When the DOM loads, start listening to child list changes on the pjax
 * container.
 */
function onDOMContentLoaded() {
	setTimeout(observe, 400);
	setTabSize();
}

/**
 * Sets the tab size for all elements which have a data-tab-size attribute
 */
function setTabSize() {
	Array.from(document.querySelectorAll('[data-tab-size]'))
		.forEach(function(el) {
			el.style.tabSize = TAB_SIZE;
		});
}

chrome.runtime.onMessage.addListener(function (action) {
	switch (action.type) {
		case 'UPDATE_URL':
			// Whenever the URL updates, set the tab size
			setTimeout(setTabSize, 100);
	}
});

/**
 * Since Github is a single page application, we need to listen to changes
 * on the container of repositories views.
 */
function observe() {
	const target = document.querySelector('#js-repo-pjax-container');

	if (target) {
		const observer = new MutationObserver(function(mutations) {
			setTabSize();
		});

		const config = {
			attributes: true,
			childList: true,
			characterData: true
		};

		observer.observe(target, config);
	}
}