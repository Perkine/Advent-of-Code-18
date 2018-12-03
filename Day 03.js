var data = ``;

data =data.split('\n').map(function(line) {
 var re = /#(\d+) @ (\d+),(\d+): (\d+)x(\d+)/;
 var r = re.exec(line);
 return {id: +r[1], x: +r[2], y: +r[3], w: +r[4], h: +r[5]};
});

function runSquares(checkOverlap) {
  for(let square of data) {
    square.overlap = false;
    for(var y=square.y; y<square.y+square.h; y++) {
      for(var x=square.x; x<square.x+square.w; x++) {
        if(checkOverlap) {
          fabric[(1000 * y) + x]++;
        } else {
          square.overlap |= fabric[(1000 * y) + x] > 1;
        }
      }
    }
    if(checkOverlap && !square.overlap){
      return square.id;
    }
  }
  return fabric.filter(v => v>1).length;
};

var fabric = new Int8Array(1e6); //new Array(1000000).fill(0);

console.log('Part 1', runSquares(false));
console.log('Part 2', runSquares(true));
