

function processChordPage()
{
	// Choose right getChordContainer function.
	var $chordContainer = GH_getChordContainer();

	if ($chordContainer != undefined)
	{
		var strHtml = $chordContainer.html()

		// Choose right ChordLines class!
		var cl = new GH_ChordLines(strHtml);

		$chordContainer.html(cl.getAnnotatedHtmlLines());


		
	}

}

processChordPage();



