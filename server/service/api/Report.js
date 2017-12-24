"use strict";
var fs = require("fs");
var PDFdocument = require("pdfkit"); 
var utils = require("../../common/sdk/utils");
/**
 * 
 * PDFファイルを作成する。
 * 
 * @param {*} request 
 * @param {*} response 
 */
module.exports.execute = function (request, ctx) {
    var json = require("../etc/pdf/example.json");
    // console.log(co);
    // console.log(calc(210, 297, co));

    var footerData = {
        aaaa: "",
        bbbb: "",
        cccc: "10",
        dddd: "100,000",
        eeee: "1,000,000"
    }
    var bodyData = {
        item: [
            {
                aaaa: "aaaaa",
                bbbb: "bbbb",
                cccc: "cccc",
                dddd: "dddd",
                eeee: "eeee"
            },
            {
                aaaa: "aaaaa",
                bbbb: "aaaaa",
                cccc: "aaaaa",
                dddd: "aaaaa",
                eeee: "aaaaa"
            },
            {
                aaaa: "aaaaa",
                bbbb: "aaaaa",
                cccc: "aaaaa",
                dddd: "aaaaa",
                eeee: "aaaaa"
            },
            {
                aaaa: "aaaaa",
                bbbb: "aaaaa",
                cccc: "aaaaa",
                dddd: "aaaaa",
                eeee: "aaaaa"
            }
        ]
    }
    var layout = json.layout;
    var result = utils.filter(layout, "id", "grid1");
    if (result.length == 1) {
        result[0].data.body = bodyData;
        result[0].data.footer = footerData;
    } else {
        let message = (result.length == 0) ?
            "指定したキーが存在しません [type=grid,id=grid2]" :
            "指定したキーが重複しています。 [type=grid,id=grid2]"
        return { "code": "9", "message": message };
    }

    // console.log(result[0]);
    var doc = new PDFdocument(json.options);
    var reportPath = './temp/example.pdf';
    doc.pipe(fs.createWriteStream(reportPath));
    if ("font" in json) {
        doc.font(json.font);
    }
    
    var co = init(json);
    for (var i = 0; i < layout.length; i++) {
        switch(layout[i].type) {
            case "box":
                box(doc, layout[i], co);
                break;
            case "line":
                line(doc, layout[i], co);    
                break;
            case "text":
                text(doc, layout[i], co, {});    
                break;
            case "grid":
                grid(doc, layout[i], co);    
                break;
        }
    }
    doc.end();
    return {"code":"0", "message": "", "result": {"path": reportPath}}
}

function init(j) {
    // PDFのスクリーンサイズは、width = (x/25.4) * 72
    // PDFのスクリーンサイズは、height = (x/25.4) * 72
    var world = {"Xmin":0,"Xmax":j.paper.w,"Ymin":0,"Ymax":j.paper.h};
    var screen = {"Xmin":0,"Xmax": (j.paper.w/25.4) * 72,"Ymin": 0,"Ymax": (j.paper.h/25.4) * 72};
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
    // console.log(s);
    // console.log(e);
    d.rect(s.x, s.y, e.x, e.y).lineWidth(l.lw).stroke(l.stroke);
}

//終点は幅・高さではありません。
function line(d, l, c) {
    var s = calc(l.co[0], l.co[1], c);
    var e = calc(l.co[2], l.co[3], c);
    d.strokeColor(l.color).moveTo(s.x, s.y).lineTo(e.x, e.y).lineWidth(l.lw).stroke();
}

// align:center,left,right,justify,indent,column, columnGap, fillcolor
function text(d, l, c, p) {
    var s = calc(l.co[0], l.co[1], c);
    var e = calc(l.co[2], l.co[3], c);
    if (c.debug) {
        d.rect(s.x, s.y, e.x, e.y).lineWidth(1).stroke("#bababa");
    }
  
    var value = match(l.value, p);
    var size = ("size" in l) ? l.size : optimumFont(l, l.value);
    // console.log(size);

    
    if ("option" in l) {
        l.option.width = e.x;
        l.option.height = e.y;
        d.fontSize(size).fillColor('green').text(value, s.x, s.y, l.option);
    } else {
        d.fontSize(size).fillColor('green').text(value, s.x, s.y);
    }
}

function match(s, b) {
    var r = /\$\{([^\}]*)\}/g;
    var a = [];
    var m;
    while ((m = r.exec(s)) != null) {
        a.push(m[1]);
    }

    for (var i = 0; i < a.length; i++) {
        s = s.replace("${" + a[i] + "}", b[((a[i] != null) ? a[i] : "")]);
    } 
    return s;
}

function optimumFont(l, text) {
    var w = l.co[2];
    var h = l.co[3];

    var vh = Math.floor(h / 0.35);
    var vw = Math.floor(w / (0.35 * text.length)) * 2;

    // console.log(vh);
    // console.log(vw);
    return vh < vw ? vh : vw;
}

function grid(d, l, c) {

    var co = [];
    Object.assign(co, l.co);
   
    // console.log(co);
    let sy = co[1];

    //header
    if (("header" in l) && l.header.length > 1) {
        l.header[0].co = [co[0], co[1], co[2], co[3]];
        let sx = co[0];
        text(d, l.header[0], c, l.data.header);
        for (let j = 1; j < l.header.length; j++) {
            l.header[j].co = [(co[0] += (co[2] + l.hspace)), co[1], co[2], co[3]];
            text(d, l.header[j], c, l.data.header);
        }
        sy += (co[3] + l.vspace);
        Object.assign(co, l.co);
    }

    //body
    l.body[0].co = [co[0], co[1], co[2], co[3]];
    let sx = co[0];
    for (let i = 1; i < l.body.length; i++) {
        sx += (co[2] + l.hspace);
        l.body[i].co = [sx, sy, co[2], co[3]];
    }

    var data = l.data.body.item;
    for (let i = 0; i < data.length; i++) {
        for (let j = 0; j < l.body.length; j++) {
            l.body[j].co[1] = sy;
            text(d, l.body[j], c, data[i]);
        }
        sy += (co[3] + l.vspace);        
    }

    //footer
    if (("footer" in l) && l.footer.length > 1) {
        sx = co[0];
        l.footer[0].co = [co[0], sy, co[2], co[3]];
        text(d, l.footer[0], c, l.data.footer);
        for (let j = 1; j < l.footer.length; j++) {
            l.footer[j].co = [(co[0] += (co[2] + l.hspace)), sy, co[2], co[3]];
            text(d, l.footer[j], c, l.data.footer);
        }

        let ex = l.co[2] * l.footer.length + l.footer.length * l.hspace + l.co[0];
        let ln = { type: "line", co: [l.co[0] - 2, sy - 1, ex, sy - 1], lw: 1, color: "red" };
        // console.log(ln);
        line(d, ln, c);
    }
}