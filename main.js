// Supported page types and the url matching criteria
var supportedPages = {};
supportedPages["GH"] = ["tabs.ultimate-guitar.com"];

// Javascript file for each page type
var javascriptFiles = {};
javascriptFiles["GH"] = "processGH.js" 

// Show Action Page icon and bind click, if necessary
function preparePageAction( tabId, changeInfo, tab ) {

	pass = false;
	type = "";

	Object.keys(supportedPages).forEach(
		function (key)
		{
			if (pass) return;
			supportedPages[key].forEach(
				function (matchPattern){
					if (tab.url.indexOf(matchPattern)>=0)
					{
						type = key;
						pass = true;
						return;
					}
				}
			)
		}
	);

	if (pass)
	{
		// Show Action Page icon
		chrome.pageAction.show(tabId);
		addOnClickListener(type);


    }
}



function addOnClickListener(type)
{
	chrome.pageAction.onClicked.addListener(
		function (tab) { //Fired when User Clicks ICON
	        chrome.tabs.executeScript(tab.id, {"file": javascriptFiles[type]}, 
	        	function () 
	        	{ // Execute your code
	            	console.log(javascriptFiles[type] + " executed .. "); // Notification on Completion
	        	});
	    
	});	

	console.log("Bound click with " + javascriptFiles[type] + ".");
}


// Determine whether the Action Page icon should be shown every time a page is loaded
chrome.tabs.onUpdated.addListener(preparePageAction);

