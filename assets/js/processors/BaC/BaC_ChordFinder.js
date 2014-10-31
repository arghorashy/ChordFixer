
// Customise this function so that it returns the HTML element with the chords
function BaC_getChordContainer()
{

	var $elem = $("div#dPartitionText");
	if ($elem.length != 1) 
	{
		alert("Could not process webpage. \n\nDeveloper Note: The number of 'div' HTML elements of ID \"dPartitionText\" in page was not exactly 1.");
		return;
	}

	$elem = $("pre", $elem);
	if ($elem.length != 1) 
	{
		alert("Could not process webpage. \n\nDeveloper Note: the number of 'pre' HTML elements under div#dPartitionText in page was not exactly 1.");
		return;
	}

	return $elem;

}