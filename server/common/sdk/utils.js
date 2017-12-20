"use strict";

var s = 'a ${hogehoge} b ${fugafuga} c ${piyopiyo}';
var r = /\$\{([^\}]*)\}/g;

var b = {
    "hogehoge":　"TOYOTA",
    "fugafuga":　"HONDA",
    "piyopiyo":　"NISSAN",
};

var a = [];
var m;
var bbb;
while ((m = r.exec(s)) != null) {
    a.push(m[1]);
}
for (var i = 0; i < a.length; i++) {
    s = s.replace("${" + a[i] + "}", b[a[i]]);
}   
console.log(a); 
console.log(s);
