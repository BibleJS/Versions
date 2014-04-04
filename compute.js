// require the file
var VDDC = require ("./RO/json/verses")
  , Books = require ("./RO/json/books")
  , Verses = []
  ;

  /*
 *  This function searches returns the objects from an array
 *  that contains objects
 *
 *  {
 *      site_id: "61",
 *      name: "18"
 *  }
 *
 * */
function findQuery (array, query) {

    // get the collection
    var col = array
      , res = []
      ;

    // array empty or not valid
    if (!col || !col.length || col.constructor !== Array) {
        return res;
    }

    // start dance
    itemsToFindForLoop:

    // each item
    for (var i = 0; i < col.length; ++i) {

        // get current item
        var cItem = col[i];

        // each filter from query
        for (var f in query) {

            // get filter value
            var fValue = query[f];

            if (typeof cItem[f] === "string" && typeof fValue === "string") {
                // a filter doesn't match to the query
                if (cItem[f] !== fValue) continue itemsToFindForLoop;
            } else if (typeof cItem[f] === "string" &&  fValue && fValue.constructor === Array) {
                // a filter doesn't match to the query
                if (fValue.indexOf(cItem[f]) === -1) continue itemsToFindForLoop;
            }
        }

        // item matches to the query, push it
        res.push(cItem);
    }

    // return array
    return res;
}

/**
 * private: getBookId
 *  Returns the book id providing the book name as the first parameter.
 *
 */
function getBookName (id, books) {

    // search for book name
    var book = findQuery (books, {
        id: id
    })[0];

    // not found
    if (!book || !book.id) {
        return null;
    }

    // return book id
    return book.book;
}

// each object
for (var i = 0; i < VDDC.length; ++i) {

    // get the current verse
    var cVDDC = VDDC[i];

    // save only verses
    if (cVDDC.type !== "SCR") continue;

    // remove HTML tags
    cVDDC.text = cVDDC.text
        .replace(/<\/?[^>]+(>|$)/g, " ")
        .replace(/\*/g, "")
        .replace(/  /g, " ")
        .trim();

    // push the new verse
    Verses.push({
        bookname:   getBookName (cVDDC.book, Books)
      , chapter:    cVDDC.chapter
      , verse:      cVDDC.verse
      , text:       cVDDC.text
    });
}

// write the fixed json
require("fs").writeFileSync("./RO/json/verses.json", JSON.stringify(Verses, null, 4));
