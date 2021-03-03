# gcp-public-data-landsat-filedownloader
(note once I realized it was XML output and not json, this repo name ceased to make sense.)
Todo: rename this repo. 

During the 1 hour search for node modules that can read xml, I tried xml2js. 

Reasoning is that JSON objects are easier to feed to Data Grids in either React or Angular apps. 

To run the app:
in command line execute: node xml2js.js

Check the downloads folder, notice the terminal logs async so it takes a little while for the 20 files in "max-keys" setting to download to the folder completely. 

(a more fitting file name would be gcp-public-data-landsat-filedownloader.js...)
Todo: rename the execution file. 

Todo: output the results to either a React, Angular, or Vue .js Single Page App into a popular data grid with paging. 

Todo: Copy some of these files and structure to a private bucket in a test GCP, and apply Google OAUTH 2 via a Google Apps Script API and incorporate authorization.  (maybe do this with OKTA). 
