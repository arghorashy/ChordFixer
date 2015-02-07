
// Customise this function so that it returns the HTML element with the chords
function GH_getChordContainer()
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
	$elem = $("pre:not('.print-visible')", $elem);

	if ($elem.length != 2) 
	{
		alert("Could not process webpage. "+$elem.length+" \n\nDeveloper Note: the number of pre HTML elements of under div.cont in page was less than 2.");
		return;
	}

	return $elem.eq(1);  
	// using .get(int) or [int] returns the DOM element, which means it 
	// is no longer wraped inside a jQuery object, which implies that 
	// the nice JQuery functions are no longer available...

}