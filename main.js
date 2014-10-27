// Supported page types and the url matching criteria
var supportedPages = {};
supportedPages["GH"] = ["tabs.ultimate-guitar.com"];

// Javascript file for each page type
var javascriptFiles = {};
javascriptFiles["GH"] = "processGH.js" 

// Show Action Page icon and bind click, if necessary
function preparePageAction( tabId, changeInfo, tab ) {

	var pass = false;
	var type = "";

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
		addOnClickListener(type, tabId, changeInfo, tab);


    }
}



function addOnClickListener(type, tabId, changeInfo, tab)
{
	if (tab.url !== undefined && changeInfo.status == "complete")
	{
		chrome.pageAction.onClicked.addListener(
			function (tab) { //Fired when User Clicks ICON
		        chrome.tabs.executeScript(tab.id, {"file": javascriptFiles[type]}, 
		        	function () 
		        	{ // Execute your code
		            	console.log(javascriptFiles[type] + " executed .. "); // Notification on Completion
		        	});
			});
	}


	console.log("Bound click with " + javascriptFiles[type] + ".");
}

function addDebuggingConnection()
{

	chrome.extension.onRequest.addListener(
		function (request, sender, sendResponse) 
		{	
			console.log("hihihihi");
			if (typeof(request) == "string")
			{
				console.log("hihihihi");
				// console.log("<Message from "+sender.url+">\n"+request+"\n</Message from "sender.url+">\n");
				sendResponse(true);
			}
			else sendResponse(false);
		});
}

// Determine whether the Action Page icon should be shown every time a page is loaded
chrome.tabs.onUpdated.addListener(preparePageAction);

// Debugging connection with content scripts
addDebuggingConnection();

