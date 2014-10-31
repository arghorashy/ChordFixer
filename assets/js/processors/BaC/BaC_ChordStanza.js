

function BaC_ChordStanza(chordlines) {
    // Calls the person constructor with `this` as its context
    ChordStanza.call(this, chordlines);
}

// Make our prototype from Person.prototype so we inherit Person's methods
BaC_ChordStanza.prototype = Object.create(ChordStanza.prototype);
BaC_ChordStanza.prototype.constructor = BaC_ChordStanza;


BaC_ChordStanza.prototype.isInvalid = function()
{
	var signature = this.sig['sig'];
	return ((signature.match(/cc/g)||[]).length > 0 || signature[signature.length - 1] == "c")
}

BaC_ChordStanza.prototype.isChorded = function()
{
	var signature = this.sig['sig'];
	return ((signature.match(/ct/g)||[]).length > 0)
}

BaC_ChordStanza.prototype.isNonChorded = function()
{
	return true
}

BaC_ChordStanza.prototype.isNotChordLine = function(i)
{
	return (this.origLines[i].indexOf("<a href=\"javascript:;\" class=\"ac\"") < 0);
}

BaC_ChordStanza.prototype.isChordLine = function(i)
{
	return !(this.origLines[i].indexOf("<a href=\"javascript:;\" class=\"ac\"") < 0);
}

