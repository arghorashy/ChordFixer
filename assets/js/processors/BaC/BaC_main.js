


function processChordPage()
{
	// Choose right getChordContainer function.
	var $chordContainer = BaC_getChordContainer();

	if ($chordContainer != undefined)
	{
		var strHtml = $chordContainer.html()

		// Choose right ChordLines class!
		var cl = new BaC_ChordLines(strHtml);

		$chordContainer.html(cl.getAnnotatedHtmlLines());


		
	}

}

processChordPage();



