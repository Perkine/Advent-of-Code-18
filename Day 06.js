var data = ``;

data = data.split('\n').map(line => line.split(', '));

var maxX = 1 + data.reduce((max, [x, y]) => Math.max(max, x), 0),
    maxY = 1 + data.reduce((max, [x, y]) => Math.max(max, y), 0),
    map = new Array(maxY).fill(null).map(_ => new Array(maxX)),
    count = 0;

function distance(x, y, toX, toY) {
  return Math.abs(x - toX) + Math.abs(y - toY);  
};

// build map - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

for(var y=0; y<maxY; y++) {
  for(var x=0; x<maxX; x++) {
    map[y][x] = {id: -1, total: 0, distance: distance(0, 0, maxX, maxY)};
    for(var i=0, dist; i<data.length; i++) {
      dist = distance(x, y, data[i][0], data[i][1]);
      map[y][x].total += dist;
      if(dist < map[y][x].distance) {
        map[y][x].id = i;
        map[y][x].distance = dist;
      }
      else if(dist == map[y][x].distance) {
        map[y][x].id = -1;
      }
    }
  }
}

// count region size - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

data = data.map(_ => 0); 

for(var y=0; y<maxY; y++) {
  for(var x=0; x<maxX; x++) {
    data[map[y][x].id]++;
    if(map[y][x].total < 10000){
      count++;
    }
  }
}

// remove infinite - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

for(var x=0; x<maxX; x++) {
  data[map[0][x].id] = null;
  data[map[maxY-1][x].id] = null;
}
for(var y=0; y<maxY; y++) {
  data[map[y][0].id] = null; 
  data[map[y][maxX-1].id] = null; 
}

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

console.log('Part 1',  Math.max(...data));
console.log('Part 2', count);