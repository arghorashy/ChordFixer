/************************************************
*************************************************
*			Beginning of ChordLines Class
*************************************************
************************************************/

function ChordLines (html) {
    this.origHtmlLines = html.split("\n");

    this.cleanedHtmlLines = this.cleanHtml(html).split("\n");

    this.stanzas = this.findStanzas();
    this.stanzaSignatures = this.getStanzaSignatures();
    this.classifiedSignatures = this.classifySingatures();
        
    this.annotations = this.buildAnnotations();

    this.annotatedHtmlLines = this.applyAnnotations();


}

ChordLines.prototype.getAnnotatedHtmlLines = function()
{
	return this.annotatedHtmlLines;
}

ChordLines.prototype.applyAnnotations = function()
{
	newLines = ""

	this.stanzas.forEach(
		function(stanza)
		{
			tnum = stanza.sig['tnum'];

			if (stanza.classification == "invalid" || stanza.classification == "chorded")
			{
				newLines = newLines + stanza.getOrigLinesStanza().join("\n") + "\n\n";
			} 
			else if (stanza.classification == "non-chorded")
			{
				if (this.annotations[tnum] == undefined)
				{
					newLines = newLines + stanza.getOrigLinesStanza().join("\n") + "\n\n";
				}
				else
				{
					for (i = 0; i < tnum; i++)
					{
						newLines = newLines + this.annotations[tnum][i] + stanza.getNthLineOfOrig(i+1) + "\n";
					}
				}
				newLines = newLines + "\n\n";
			}

		},
	this);

	return newLines;

}

ChordLines.prototype.buildAnnotations = function()
{
	var annotations = {};

	Object.keys(this.classifiedSignatures['non-chorded']).forEach(
		function(numOfLines)
		{
			if (this.classifiedSignatures['chorded'][numOfLines] == undefined) return;

			annotations[numOfLines] = [];

	
			for (i = 0; i < numOfLines; i++)
			{
				var currAnnotation = "";

				this.classifiedSignatures["chorded"][numOfLines].forEach(
					function (stanza)
					{
						currAnnotation = currAnnotation + stanza.sig['ts'][i] + "\n";

					},
				this);

				annotations[numOfLines].push(currAnnotation);
			}

		},
	this);

	return annotations;
}

ChordLines.prototype.augmentHtmlLines = function()
{
	var augmentedHtmlLines = this.origHtmlLines.slice(0);


}

ChordLines.prototype.classifySingatures = function()
{
	var classifiedSignatures = {};
	classifiedSignatures['chorded'] = {};
	classifiedSignatures['non-chorded'] = {};
	classifiedSignatures['invalid'] = {};


	this.stanzas.forEach(
		function(stanza)
		{
			signature = stanza.sig['sig'];
			classification = stanza.getClassification();

			if (classification == "invalid")
			{
				forcePushIntoHash(classifiedSignatures['invalid'], (signature.match(/t/g)||[]).length, stanza);
			}
			else if (classification == "chorded")
			{
				forcePushIntoHash(classifiedSignatures['chorded'], (signature.match(/t/g)||[]).length, stanza);
			}
			else if (classification == "non-chorded")
			{
				forcePushIntoHash(classifiedSignatures['non-chorded'], (signature.match(/t/g)||[]).length, stanza);
			}
		}
	);

	return classifiedSignatures;
}

// Override this function to clean HTML according to what is needed for particular application
ChordLines.prototype.cleanHtml = function(html)
{
	return html.split("<span>").join("").split("</span>").join("").split(" ").join("");
}

ChordLines.prototype.findStanzas = function()
{
	var stanzas = [];
	var currentStanza = this.newChordStanzaObject();
	var stanzaStarted = false;

	this.origHtmlLines.forEach(
		function(line, index)
		{
			if (line.length == 0)
			{
				if (stanzaStarted)
				{
					currentStanza.setEnd(index-1);
					stanzas.push(currentStanza);
					currentStanza = this.newChordStanzaObject();
					stanzaStarted = false;
				}


			}
			else
			{
				if (!stanzaStarted)
				{
					currentStanza.setStart(index);
					stanzaStarted = true;
				}
			}
		},
	this);

	if (stanzaStarted)
	{
		currentStanza.setEnd(this.cleanedHtmlLines.length-1);
		stanzas.push(currentStanza);
	}
	return stanzas;
}

// Override with name of appropriate ChordStanza name
ChordLines.prototype.newChordStanzaObject = function()
{
	return new ChordStanza(this);
}

ChordLines.prototype.getStanzaSignatures = function()
{
	var stanzaSignatures = [];

	this.stanzas.forEach
	(
		function(stanza)
		{
			stanzaSignatures.push(stanza.getStanzaSignature());
			stanza.findCsForTs();
		},
	this);

}


/************************************************
*************************************************
*			End of ChordLines Class
*************************************************
************************************************/