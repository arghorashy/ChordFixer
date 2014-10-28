
function getChordContainer()
{
	var $elem = $(".tb_ct");
	if ($elem.length != 1) 
	{
		alert("Could not process webpage. \n\nDeveloper Note: The number of HTML elements of class \"tb_ct\" in page was not exactly 1.");
		return;
	}

	$elem = $("#cont", $elem);
	if ($elem.length != 1) 
	{
		alert("Could not process webpage. \n\nDeveloper Note: the number of HTML elements of id \"cont\" under div.tb_ct in page was not exactly 1.");
		return;
	}

	// Need to fix the dev note here!!!
	$elem = $("pre[style*='font-size:']:not('.print-visible')", $elem);

	if ($elem.length != 1) 
	{
		alert("Could not process webpage. "+$elem.length+" \n\nDeveloper Note: the number of pre HTML elements of under div.cont in page was less than 2.");
		//return;
	}

	return $elem;

}


function processChordPage()
{
	var $chordContainer = getChordContainer();

	if ($chordContainer != undefined)
	{
		var strHtml = $chordContainer.html()

		var cl = new ChordLines(strHtml);

		$chordContainer.html(cl.getAnnotatedHtmlLines());
		//console.log(cl.getAnnotatedHtmlLines());

		
	}

}

function debugLog(str)
{
	chrome.extension.sendRequest(str, null);	
}

processChordPage();



