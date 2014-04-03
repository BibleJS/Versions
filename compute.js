// require the file
var VDDC = require ("./RO/json/verses");

// each object
for (var i = 0; i < VDDC.length; ++i) {

    // get the current verse
    var cVDDC = VDDC[i];

    // remove HTML tags
    cVDDC.text = cVDDC.text
        .replace(/<\/?[^>]+(>|$)/g, " ")
        .replace(/\*/g, "")
        .replace(/  /g, " ");
}

// write the fixed json
require("fs").writeFileSync("./RO/json/verses.json", JSON.stringify(VDDC, null, 4));
