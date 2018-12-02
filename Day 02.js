var data = ``.split('\n');

var re = /(.)\1{1,2}/g,
    c2 = 0,
    c3 = 0,
    r;

for(let line of data) {
 let matches = [,,0,0];
 line = [...line].sort().join('');

 re.lastIndex = 0;
 while( r = re.exec(line) ) {
  matches[r[0].length] |= 1;
 }

 matches[2] && c2++;
 matches[3] && c3++;
}

console.log('Part 1', c2 * c3);

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

function checkDifferences(a, b) {
 for(var i=0, diffCount=0, lastDiffPos=0; i<a.length && diffCount<2; i++) {
  (a[i] != b[i]) && (diffCount++, lastDiffPos=i);
 }
 return (diffCount>1) || lastDiffPos;
}

outer:for(var i=0; i<data.length; i++) {
 for(var j=i+1; j<data.length; j++) {
  ret = checkDifferences(data[i], data[j]);
  if(ret !== true) {
   break outer;
  }
 }
}

console.log('Part 2', data[i].slice(0, ret) + data[i].slice(ret+1));