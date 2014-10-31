/************************************************
*************************************************
*			Beginning of ChordLines Class
*************************************************
************************************************/

function BaC_ChordLines(html) {
    // Calls the person constructor with `this` as its context
    ChordLines.call(this, html);
}

// Make our prototype from Person.prototype so we inherit Person's methods
BaC_ChordLines.prototype = Object.create(ChordLines.prototype);
BaC_ChordLines.prototype.constructor = GH_ChordLines;


// Override with appropriate clean up function
BaC_ChordLines.prototype.cleanHtml = function(html)
{
	var h = html;
	h =  h.split("<a href=\"javascript:;\" class=\"ac\" onclick=\"g_AffImgClkAcc(this.innerHTML);\" onMouseOver=\"g_AfficherImageOverAccord(this.innerHTML);\" onMouseOut=\"g_MasquerImageOverAccord();\">").join("");
	h = h.split("</a>").join("");
	h = h.split("<blockquote>").join("");
	h = h.split("</blockquote>").join("");
	h = h.split("&nbsp;").join("");
	h = h.split(" ").join("");
	return h;
}


// Override with name of appropriate ChordStanza name
BaC_ChordLines.prototype.newChordStanzaObject = function()
{
	var a = new BaC_ChordStanza(this);
	return a;
}



/************************************************
*************************************************
*			End of ChordLines Class
*************************************************
************************************************/