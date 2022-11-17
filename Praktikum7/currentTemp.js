const https = require('node:https');

//process.env.argv[2]
https.get(`https://wttr.in/${process.argv[2] || 'Winterthur'}?format=j1`, (res) => {
  let dataConcat = "";

  res.on('data', (data) => {
    dataConcat += data
  });

  res.on('end', () => {
    jsonData = JSON.parse(dataConcat)
    console.log(jsonData.current_condition[0].FeelsLikeC + "°")
  })

}).on('error', (e) => {
  console.error(e);
});