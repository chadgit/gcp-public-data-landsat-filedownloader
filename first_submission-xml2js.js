const http = require('http');
const fetch = require("node-fetch");
const fs = require('fs');
const xml2js = require('xml2js');
const parser = new xml2js.Parser({ attrkey: "ATTR" });

let req = http.get("http://storage.googleapis.com/gcp-public-data-landsat/", function(res) {
    let data = '';
    res.on('data', function(stream) {
        data += stream;
    });
    res.on('end', function(){
        parser.parseString(data, function(error, result) {
            if(error === null) {
                //console.log(result);

                // CC: Todo, use the xml2js filter commands to get elements like "key" which contain the file for download
                readElements(result);
            }
            else {
                console.log(error);
            }
        });
    });
});

function readElements(binaryFilePath){

    // from the incoming result, filter by element Contents => Key
    // start loop - note watch out for memory here, possibly write a paging approach local log file, and begin operation
    
    console.log(binaryFilePath.ListBucketResult.Contents);
    
    //writeBinaryFile(binaryFilePath);
    // end loop 
}

function writeBinaryFile(binaryFilePath){
    // hardcoded example of file 
    fetch('http://storage.googleapis.com/gcp-public-data-landsat/LC08/01/001/002/LC08_L1GT_001002_20160817_20170322_01_T2/LC08_L1GT_001002_20160817_20170322_01_T2_ANG.txt')
.then(r=>r.body.buffer())
// .then(r=>r.body.arrayBuffer())
.catch(console.error)

    //write file to a disk
    fs.writeFile('helloworld.txt', 'Hello World!', function (err) {
        if (err) return console.log(err);
        console.log('Hello World > helloworld.txt');
      });

}