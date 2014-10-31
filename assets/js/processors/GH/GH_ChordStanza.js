

function GH_ChordStanza(chordlines) {
    // Calls the person constructor with `this` as its context
    ChordStanza.call(this, chordlines);
}

// Make our prototype from Person.prototype so we inherit Person's methods
GH_ChordStanza.prototype = Object.create(ChordStanza.prototype);
GH_ChordStanza.prototype.constructor = GH_ChordStanza;


GH_ChordStanza.prototype.isInvalid = function()
{
	var signature = this.sig['sig'];
	return ((signature.match(/cc/g)||[]).length > 0 || signature[signature.length - 1] == "c");
}

GH_ChordStanza.prototype.isChorded = function()
{
	var signature = this.sig['sig'];
	return ((signature.match(/ct/g)||[]).length > 0);
}

GH_ChordStanza.prototype.isNonChorded = function()
{
	return true;
}

GH_ChordStanza.prototype.isNotChordLine = function(i)
{
	return (this.origLines[i].indexOf("span>") < 0);
}

GH_ChordStanza.prototype.isChordLine = function(i)
{
	return true;
}

