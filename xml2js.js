const https = require('https');
const fs = require('fs');
const xml2js = require('xml2js');
const parser = new xml2js.Parser({ attrkey: "ATTR" });

// reference headers for filtering
const urlRoot = "https://storage.googleapis.com/gcp-public-data-landsat/";
let req = https.get(urlRoot+ "?prefix=LC08/01/001/067&max-keys=20", function(res) {
    let data = '';
    res.on('data', function(stream) {
        data += stream;
    });
    res.on('end', function(){
        parser.parseString(data, function(error, data) {
            if(error === null) {
                readElements(data);
            }
            else {
                console.log(error);
            }
        });
    });
});

function readElements(data){
    
    let results = data.ListBucketResult;
    let contents = results.Contents;
    let nextMarker = results.NextMarker;

    console.log(nextMarker[0]);

    Object.keys(contents).forEach(function(key) {
        
        let regex = new RegExp('/', 'g');
        let downloadedFile = contents[key].Key[0].replace(regex, '-');

        console.log(downloadedFile);     
        writeBinaryFile(urlRoot+contents[key].Key[0], downloadedFile, fileDownloaded);
    });

}

function writeBinaryFile(url, downloadedFile, cb){

    let downloadFolder = "./downloads/";
    let file = fs.createWriteStream(downloadFolder + downloadedFile);

    https.get(url, function(response) {
        response.pipe(file);
        file.on('finish', function() {
        file.close(cb(downloadedFile));
        });
    });
}

function fileDownloaded(downloadedFile){

    console.log("file " + downloadedFile + " was downloaded");

}