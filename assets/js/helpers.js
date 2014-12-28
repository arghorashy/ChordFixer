// Make it possible to array-push onto a hash's key, 
// regardless of whether an array has been delcared for that
// key yet or not.
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