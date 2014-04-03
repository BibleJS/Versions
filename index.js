// dependencies
var CsvToArray = require ("csv-to-array")
  , Fs = require ("fs")
  , PATHS = {
        csv:  "./RO/csv/"
      , json: "./RO/json/"
    }
  , csvData = [
        {
            file: "books"
          , columns: [
                "id"
              , "book"
            ]
        }
      , {
            file: "verses"
          , columns: [
                "book"
              , "chapter"
              , "verse"
              , "type"
              , "text"
            ]
        }
    ]
  ;

// each object in csv data
for (var i = 0; i < csvData.length; ++i) {

    (function (cDataObj) {

        // convert CSV to JSON
        CsvToArray ({
            csvOptions: {
                delimiter: ";"
            }
          , file: PATHS.csv + cDataObj.file + ".csv"
          , columns: cDataObj.columns
        }, function (err, response) {

            // handle error
            if (err) {
                console.log ("Cannot convert " + cDataObj.file + ": ", err);
                return;
            }

            // output
            console.log ("Writing " + cDataObj.file + ".json ...");

            // write file
            Fs.writeFileSync(PATHS.json + cDataObj.file + ".json", JSON.stringify (response, null, 2));
        });
    })(csvData[i]);
}
