const fetch = require('node-fetch')
const parseString = require('xml2js').parseString;


async function getLewd(returnChannel, args, client) {
    const channel = client.channels.cache.get(returnChannel);
    var cache = args.split(/[ ,]+/);
    const arguments = args.substring(cache[0].length);
    const url = 'https://rule34.xxx/index.php?page=dapi&s=post&q=index&tags=' + arguments;
  try {
    const response = await fetch(url)
    apiData = await response.text()
    parseString(apiData, function (error, result) {
      let postCount = result.posts.$.count - 1;
      if(postCount > 100) {
        postCount = 100;
      }
      if(postCount > 0) {
        var picNum = Math.floor(Math.random() * postCount) + 0;
        var r34Pic = result.posts.post[picNum].$.file_url;
        channel.send({files: [r34Pic]});
      } else {
        channel.send("Replace space with _ or be more general!");
      }
    })
  } catch (error) {
    console.log(error)
    channel.send("There was an error with rule34.xxx")
  }
}

module.exports = {
  name: 'hentai',
	description: 'Posts lewd image from rule34.xxx',
    execute(returnChannel, args, client) {
        const channel = client.channels.cache.get(returnChannel);
        try {
            getLewd(returnChannel, args, client)
        } catch (error) {
            console.log(error)
            channel.send("There was an error with rule34.xxx")
        }
        
	}
}
