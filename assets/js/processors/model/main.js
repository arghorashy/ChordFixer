


function processChordPage()
{
	// Choose right getChordContainer function.
	var $chordContainer = getChordContainer();

	if ($chordContainer != undefined)
	{
		var strHtml = $chordContainer.html()

		// Choose right ChordLines class!
		var cl = new ChordLines(strHtml);

		$chordContainer.html(cl.getAnnotatedHtmlLines());
		
	}

}



processChordPage();



