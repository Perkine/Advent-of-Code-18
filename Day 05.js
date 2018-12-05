var data = ``;

var re = /Aa|Bb|Cc|Dd|Ee|Ff|Gg|Hh|Ii|Jj|Kk|Ll|Mm|Nn|Oo|Pp|Qq|Rr|Ss|Tt|Uu|Vv|Ww|Xx|Yy|Zz|zZ|yY|xX|wW|vV|uU|tT|sS|rR|qQ|pP|oO|nN|mM|lL|kK|jJ|iI|hH|gG|fF|eE|dD|cC|bB|aA/g;
var polymers = 'abcdefghijklmnopqrstuvwxwz';

data = react(data, re);
console.log('Part 1', data.length);
console.log('Part 2', findShortest(data));

function react(data, re) {
  while(re.test(data)){
    data = data.replace(re, '');
  }
  return data;
};

function findShortest(data) {
  var shortest = data.length;

  for(p of polymers) {
    let reg = new RegExp(p +'|'+ p.toUpperCase(), 'g');
    let l = react( data.replace(reg, ''),  re).length;
    shortest = Math.min(shortest, l);
  }

  return shortest;
};