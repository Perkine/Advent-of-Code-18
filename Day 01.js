var input = ``;

console.log('Part A', eval(input));

var data = input.split('\n'),
    set = new Set([0]),
    c = 0;

outer:while(true) {
 for(let v of data) {
  c += +v;
  if(set.has(c)) {
   break outer;
  }
  set.add(c);
 }
}

console.log('Part B', c);