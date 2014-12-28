// Supported page types and the url matching criteria
var supportedPages = {};
supportedPages["GH"] = ["tabs.ultimate-guitar.com"];
supportedPages["BaC"] = ["http://www.boiteachansons.net/Partitions"];

// Javascript file for each page type
var javascriptFiles = {};
javascriptFiles["GH"] = "assets/js/processors/GH/GH_main.js" 
javascriptFiles["BaC"] = "assets/js/processors/BaC/BaC_main.js"

// Determine page type matching with the root urls in supportedPages 
function detPageType(tab)
{
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

	if (pass) return type;
	else return null;
}

// Show Action Page icon and bind click, if necessary
function preparePageAction( tabId, changeInfo, tab ) 
{
	var type = detPageType(tab);

	if (type != null && type != null)
	{
		// Show Action Page icon
		chrome.pageAction.show(tabId);
		addOnClickListener(tabId, changeInfo, tab);


    }
}



function addOnClickListener(tabId, changeInfo, tab)
{
	if (tab.url !== undefined && changeInfo.status == "complete")
	{
		chrome.pageAction.onClicked.addListener(
			function (tab) 
			{ //Fired when User Clicks ICON
				var type = detPageType(tab);
		        chrome.tabs.executeScript(tab.id, {"file": javascriptFiles[type]}, 
		        	function () 
		        	{ // Execute your code
		            	console.log(javascriptFiles[type] + " executed .. "); // Notification on Completion
		        	});
			});
	}

}



// Determine whether the Action Page icon should be shown every time a page is loaded
chrome.tabs.onUpdated.addListener(preparePageAction);



