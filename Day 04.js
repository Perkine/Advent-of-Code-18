var data = ``;

data = data.split('\n').map(function(line) {
 var re = /\[(\d{4})-(\d{2})-(\d{2}) (\d{2}):(\d{2})\] (.+)/;
 var r = re.exec(line);
 return {date: new Date(+r[1], r[2] - 1, +r[3], +r[4], +r[5]), rest: r[6]};
});

data.sort((a, b) => a.date - b.date);

var timeTable = [];

do {
  let record = data.shift();
  let guard = /#(\d+)/.exec(record.rest)[1];

  if(!(guard in timeTable)) {
    timeTable[guard] = new Array(61).fill(0);
  }

  while(data.length && !~data[0].rest.indexOf('Guard')) {
    record = data.shift();
    let sleep = record.date.getMinutes();
    record = data.shift();
    let wake = record.date.getMinutes();
    for(let i=sleep; i<wake; i++) {
      timeTable[guard][i]++;
      timeTable[guard][60]++; // total time
    }
  }
} while(data.length);


var totals = timeTable.map(guard => guard[60]);
var max = Math.max(...totals.filter(_ => true));
var guard = totals.indexOf(max);
var maxMinute = timeTable[guard].indexOf(Math.max(...timeTable[guard].slice(0, 60)));
console.log('Part 1', guard * maxMinute);


totals = timeTable.map(guard => Math.max(...guard.slice(0, 60)));
max = Math.max(...totals.filter(_ => true));
guard = totals.indexOf(max);
maxMinute = timeTable[guard].indexOf(max)
console.log('Part 2', guard * maxMinute);
