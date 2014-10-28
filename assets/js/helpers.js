function forcePushIntoHash(hash, key, value)
{
	if ((typeof hash[key]) == "undefined")
	{
		hash[key] = [];
	}
	hash[key].push(value);
	return
}

function nthChar(string, character, n){
    var count= 0, i=0;
    while(count<n && (i=string.indexOf(character,i)+1)){
        count++;
    }
    if(count== n) return i-1;
    return NaN;
}