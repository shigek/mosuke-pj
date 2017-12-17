"use strict";
var fs = require("fs");
var PDFdocument = require("pdfkit"); 
/**
 * 
 * @param {*} ctx 
 */
module.exports.output = function(ctx) {
    try {
        var json = require("./template/example.json");
        var doc = new PDFdocument(json.options);
        doc.pipe(fs.createWriteStream('./temp/example.pdf'));
       
        var co = init(json);
        // console.log(co);
        // console.log(calc(210, 297, co));

        var layout = json.layout;
        for (var i=0; i<layout.length; i++) {
            switch(layout[i].type) {
                case "box":
                    box(doc, layout[i], co);
                    break;
                case "line":
                    line(doc, layout[i], co);    
                    break;
                case "dcline":
                    dcline(doc, layout[i], co);    
                    break;
                case "text":
                    text(doc, layout[i], co);    
                    break;
            }
        }
     doc.end();
    } catch (e) {
        console.log(e);
        ctx.throw(e);
    }
}

function init(j) {
    var mmpi = 0.0394;
    var world = {"Xmin":0,"Xmax":j.paper.w,"Ymin":0,"Ymax":j.paper.h};
    var screen = {"Xmin":0,"Xmax": 594,"Ymin": 0,"Ymax": 840};
    var scale = {"fx": 0, "fy": 0};
    
    scale.fx = (screen.Xmax - screen.Xmin) / (world.Xmax - world.Xmin);
    scale.fy = (screen.Ymax - screen.Ymin) / (world.Ymax - world.Ymin);

    var co;
    return co = {
        "screen" : screen,
        "world"  : world,
        "scale"  : scale
    };
}

function calc(x, y, j) {
    var cordi = {};
    cordi.x = Math.floor(j.screen.Xmin + j.scale.fx * (x - j.world.Xmin));
    cordi.y = Math.floor(j.screen.Ymin + j.scale.fy * (y - j.world.Ymin));
    return cordi;
}

//始点と幅・高さで四角形を描画
function box(d, l, c) {
    var s = calc(l.co[0], l.co[1], c);
    var e = calc(l.co[2], l.co[3], c);
    console.log(s);
    console.log(e);
    d.rect(s.x, s.y, e.x, e.y).lineWidth(l.lw).stroke(l.stroke);
}

//終点は幅・高さではありません。
function line(d, l, c) {
    var s = calc(l.co[0], l.co[1], c);
    var e = calc(l.co[2], l.co[3], c);
    d.moveTo(s.x, s.y).lineTo(e.x, e.y).lineWidth(l.lw).stroke(l.strike);
}

// align:center,left,right,justify,indent,column, columnGap, fillcolor
function text(d, l, c) {
    var s = calc(l.co[0], l.co[1], c);
    var e = calc(l.co[2], l.co[3], c);
  
    l.option.width  = (e.x - s.x);
//    l.option.height = (e.y - s.y);
    console.log(l);
    d.fontSize(l.size).fillColor('green').text(l.value, s.x, s.y, l.option);
}
