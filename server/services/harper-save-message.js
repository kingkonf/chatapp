var axios = require('axios');

function harperSaveMessage(message, username, room) {
  const dbUrl = process.env.HARPERDB_URL;
  const dbPw = process.env.HARPERDB_PW;
  // console.log(dbUrl, dbPw)
  if (!dbUrl || !dbPw) return null;

  var data = JSON.stringify({
    operation: 'insert',
    schema: 'realtimechat',
    table: 'messages',
    records: [
      {
        message,
        username,
        room,
      },
    ],
  });

  var config = {
    method: 'post',
    url: dbUrl,
    headers: {
      'Content-Type': 'application/json',
      Authorization: dbPw,
    },
    data: data,
  };

  return new Promise((resolve, reject) => {
    axios(config)
      .then(function (response) {
        resolve(JSON.stringify(response.data));
      })
      .catch(function (error) {
        reject(error);
      });
  });
}

module.exports = harperSaveMessage;