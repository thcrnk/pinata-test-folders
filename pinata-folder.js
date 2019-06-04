//imports needed for this function
const axios = require('axios');
const fs = require('fs');
const FormData = require('form-data');
const recursive = require('recursive-fs');

const pinDirectoryToIPFS = async (pinataApiKey, pinataSecretApiKey) => {
    const url = `https://testapi.pinata.cloud/pinning/pinFileToIPFS`;
    const src = './exampleDirectory';

    let data = new FormData();

    //for each file stream, we need to include the correct relative file path
    await data.append(`file`, fs.createReadStream(__dirname + '/test1.js'), {
        filepath: 'exampleDirectory/test1.js'
    });

    await data.append(`file`, fs.createReadStream(__dirname + '/test2.js'), {
        filepath: 'exampleDirectory/test2.js'
    });

    const metadata = JSON.stringify({
        name: 'testname',
        keyvalues: {
            exampleKey: 'exampleValue'
        }
    });

    await data.append('pinataMetadata', metadata);

    let result = await axios.post(url,
        data,
        {
            maxContentLength: 'Infinity', //this is needed to prevent axios from erroring out with large directories
            headers: {
                'Content-Type': `multipart/form-data; boundary= ${data._boundary}`,
                'pinata_api_key': pinataApiKey,
                'pinata_secret_api_key': pinataSecretApiKey
            }
        }
    );

    return result;
};

module.exports = {pinDirectoryToIPFS};