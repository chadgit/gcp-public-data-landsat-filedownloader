const https = require('https');
const fs = require('fs');
const xml2js = require('xml2js');
const parser = new xml2js.Parser({attrkey: "ATTR"});
const host = "storage.googleapis.com";
const bucket = "gcp-public-data-landsat";
const downloadFolder = "downloads";
const protocol = "https://";
const logFile = "log.txt";
const preFix = "LC08/01/001/067";
const maxKeys = 2;

let req = https.get(protocol + host + "/" + bucket + "?prefix=" + preFix + "&max-keys=" + maxKeys, function(res) {

    let data = '';
    res.on('data', function(stream) {
        data += stream;
    });

    res.on('end', function() {
        parser.parseString(data, function(error, data) {
            if (error === null) {
                readElements(data);
                } else {
                console.log(error);
            }
        });
    });

});

function readElements(data) {

    let results = data.ListBucketResult;
    let contents = results.Contents;
    // let nextMarker = results.NextMarker;

    Object.keys(contents).forEach(function(key) {

        let regex = new RegExp('/', 'g');
        let downloadedFile = contents[key].Key[0].replace(regex, '-');

        writeBinaryFile(protocol + host + "/" + bucket + "/" + contents[key].Key[0], downloadedFile, fileDownloaded);
    
    });

}

function writeBinaryFile(url, downloadedFile, cb) {

    let file = fs.createWriteStream("./" + downloadFolder + "/" + downloadedFile);

    https.get(url, function(response) {
        response.pipe(file);
        file.on('finish', function() {
            file.close(cb(downloadedFile));
        });
    });
}

function fileDownloaded(downloadedFile) {

    writeToLogFile("./" + downloadFolder + "/"+ logFile, downloadedFile);

}

function writeToLogFile(logFilePathName, downloadedFile){

    let timeStamp = dateTimeStringBuilder();
    fs.appendFile(logFilePathName, timeStamp + "\t" + downloadedFile + "\r", (err) => {
 
        if (err) throw err;
 
        console.log("File "+ downloadedFile + " written to the log.");
 
    });

}

function dateTimeStringBuilder(){

    let dateTime = new Date();
    let timeStamp = dateTime.getFullYear() + "-" + Number(dateTime.getMonth()+1) + "-" + dateTime.getDay() + " " + dateTime.getHours() + ":" + dateTime.getMinutes() + ":" + dateTime.getSeconds();
    return timeStamp;

}