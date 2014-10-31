/************************************************
*************************************************
*			Beginning of ChordLines Class
*************************************************
************************************************/

function GH_ChordLines(html) {
    // Calls the person constructor with `this` as its context
    ChordLines.call(this, html);
}

// Make our prototype from Person.prototype so we inherit Person's methods
GH_ChordLines.prototype = Object.create(ChordLines.prototype);
GH_ChordLines.prototype.constructor = GH_ChordLines;


// Override with appropriate clean up function
GH_ChordLines.prototype.cleanHtml = function(html)
{
	return html.split("<span>").join("").split("</span>").join("").split(" ").join("");
}


// Override with name of appropriate ChordStanza name
GH_ChordLines.prototype.newChordStanzaObject = function()
{
	var a = new GH_ChordStanza(this);
	return a;
}



/************************************************
*************************************************
*			End of ChordLines Class
*************************************************
************************************************/