"use strict";
var fs = require("fs");
var PDFdocument = require("pdfkit"); 

/**
 * 
 * PDFファイルを作成する。
 * 
 * @param {*} request 
 * @param {*} response 
 */
module.exports.execute = function (request, ctx) {
    var json = require("../etc/pdf/example.json");
    var doc = new PDFdocument(json.options);
    var reportPath = './temp/example.pdf';
    doc.pipe(fs.createWriteStream(reportPath));
    
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
            case "text":
                text(doc, layout[i], co);    
                break;
            case "grid":
                grid(doc, layout[i], co);    
                break;
        }
    }
    doc.end();
    return {"code":0, "message": "", "result": {"path": reportPath}}
}

function init(j) {
    var mmpi = 0.0394;
    var world = {"Xmin":0,"Xmax":j.paper.w,"Ymin":0,"Ymax":j.paper.h};
    var screen = {"Xmin":0,"Xmax": 594,"Ymin": 0,"Ymax": 820};
    var scale = {"fx": 0, "fy": 0};
    
    scale.fx = (screen.Xmax - screen.Xmin) / (world.Xmax - world.Xmin);
    scale.fy = (screen.Ymax - screen.Ymin) / (world.Ymax - world.Ymin);

    var co;
    return co = {
        "screen" : screen,
        "world"  : world,
        "scale": scale,
        "debug": j.debug
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
    d.strokeColor(l.stroke).moveTo(s.x, s.y).lineTo(e.x, e.y).lineWidth(l.lw).stroke();
}

// align:center,left,right,justify,indent,column, columnGap, fillcolor
function text(d, l, c) {
    var s = calc(l.co[0], l.co[1], c);
    var e = calc(l.co[2], l.co[3], c);
    if (c.debug) {
        d.rect(s.x, s.y, e.x, e.y).lineWidth(1).stroke("#bababa");
    }
  
    if ("option" in l) {
        l.option.width = e.x;
        if ("header" in l.option) {
            l.option.height = e.y;
        }
        d.fontSize(l.size).fillColor('green').text(l.value, s.x, s.y, l.option);
    } else {
        d.fontSize(l.size).fillColor('green').text(l.value, s.x, s.y);
    }
}

function grid(d, l, c) {




    
}    