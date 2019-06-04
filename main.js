const pinataFolder = require('./pinata-folder.js');
fs = require('fs');

run = async () => {
    const apiKey = "cc5bd14df66a990e8661";
    const apiSecret = "a6d0784ca06c025195c8eafab553bbb05fab39a04ac965c542ea68c57810fa77";

    let res = await pinataFolder.pinDirectoryToIPFS(apiKey, apiSecret);
    console.log(res)
};

run();