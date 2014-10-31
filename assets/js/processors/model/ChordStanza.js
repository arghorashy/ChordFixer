function ChordStanza(chordlines)
{
	this.cl = chordlines;
	this.origLines = this.cl.origHtmlLines;
	this.cleanedLines = this.cl.cleanedHtmlLines;

	this._defined = false;
    this._startLine = -1;
    this._endLine =  -1;

    this.sig = {};
    this.classification = "";

}

ChordStanza.prototype.getClassification = function()
{
	
	if (this.isInvalid())
	{
		this.classification = "invalid"
	}
	else if (this.isChorded())
	{
		this.classification = "chorded"
	}
	else if (this.isNonChorded())
	{
		this.classification = "non-chorded"
	}

	return this.classification;
}


// Override with function indicating whether a stanza is properly chorded
ChordStanza.prototype.isChorded = function()
{
	var signature = this.sig['sig'];
	return ((signature.match(/ct/g)||[]).length > 0)
}

// Override with function indicating whether a stanza is non-chorded
ChordStanza.prototype.isNonChorded = function()
{
	return true
}

// Override with function indicating whether a stanza is neither properly chorded nor chorded
ChordStanza.prototype.isInvalid = function()
{
	var signature = this.sig['sig'];
	return ((signature.match(/cc/g)||[]).length > 0 || signature[signature.length - 1] == "c")
}



ChordStanza.prototype.getStanzaSignature = function()
{
	this.sig['sz_lines'] = {};
	this.sig['sg_lines'] = {};
	this.sig['sig'] = "";
	this.sig['tnum'] = 0;

	for(i = this._startLine; i <= this._endLine; i++)
	{
		this.sig['sg_lines'][i] = {};
		this.sig['sz_lines'][i - this._startLine] = {};

		if (this.isNotChordLine(i)) 
		{
			this.sig['sig'] = this.sig['sig'] + "t";
			this.sig['sg_lines'][i]['orig'] = this.origLines[this._startLine + i];
			this.sig['sg_lines'][i]['clean'] = this.origLines[this._startLine + i];
			this.sig['sg_lines'][i]['sig'] = "t";

			this.sig['tnum']++;
		}
		else if (this.isChordLine())
		{
			this.sig['sig'] = this.sig['sig'] + "c";
			this.sig['sg_lines'][i]['orig'] = this.origLines[this._startLine + i];
			this.sig['sg_lines'][i]['clean'] = this.origLines[this._startLine + i];
			this.sig['sg_lines'][i]['sig'] = "c";
		}

		this.sig['sz_lines'][i - this._startLine] = this.sig['sg_lines'][i];
	}

	return this.sig['sig'];
}

// Override with function indicating whether line is not chord line 
ChordStanza.prototype.isNotChordLine = function(i)
{
	return (this.origLines[i].indexOf("span>") < 0);
}

// Override with function indicating whether line is a chord line
ChordStanza.prototype.isChordLine = function(i)
{
	return true;
}

ChordStanza.prototype.findCsForTs = function()
{
	this.sig['ts'] = {};

	tcounter = 0;
	cAbove = ""

	for(i = this._startLine; i <= this._endLine; i++)
	{
		if (this.sig['sg_lines'][i]['sig'] == "c") cAbove = this.origLines[i];
		else if (this.sig['sg_lines'][i]['sig'] == "t")
		{
			this.sig['ts'][tcounter] = cAbove;

			tcounter++;
			cAbove = "";
		}

	}

	
}



ChordStanza.prototype.getOrigLinesStanza = function()
{
	if (this.isDefined())
	{
		return this.origLines.slice(this._startLine, this._endLine+1);
	}
}

ChordStanza.prototype.getCleanedLinesStanza = function()
{
	if (this.isDefined())
	{
		return this.cleanedLines.slice(this._startLine, this._endLine+1);
	}
}

ChordStanza.prototype.getNthLineOfOrig = function(n)
{
	if (this.isDefined())
	{
		return this.origLines[this._startLine + n - 1];
	}
}

ChordStanza.prototype.getNthLineOfCleaned = function(n)
{
	if (this.isDefined())
	{
		return this.cleanedLines[this._startLine + n - 1];
	}
}

ChordStanza.prototype.isDefined = function()
{
	if ((this._startLine < 0 || this._endLine < 0) 
		|| (this._startLine >= this.origLines.length || this.endLine >= this.origLines.length) 
		|| this._startLine > this._endLine)
	{
		this._defined = false;
	}
	else this._defined = true;

	return this._defined;
}

ChordStanza.prototype.setStart = function(startLine)
{
	if (!this.isDefined())
	{
		this._startLine = startLine;
		this.isDefined();
		return true;
	}
	else return false;
}

ChordStanza.prototype.setEnd = function(endLine)
{
	if (! this.isDefined())
	{
		this._endLine = endLine;
		this.isDefined();
		return true;
	}
	else return false;
}

ChordStanza.prototype.getStart = function()
{
	if (this.isDefined())
	{
		return this._startLine;
	}
}

ChordStanza.prototype.getEnd = function()
{
	if (this.isDefined())
	{
		return this._endLine;
	}
}


