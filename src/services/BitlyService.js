const BITLY_TOKEN = 'f404fe0ec7e25e3b87196f69187714232d0b86cc'
const fetch = require('node-fetch')

class BitlyService {
  async shortenUrl (longUrl) {
    try {
      const params = {
        long_url: longUrl,
        title: 'Linkdrop widget wallet demo: ethereum onboarding made easy.'
      }
      const bitlyApiUrl = 'https://api-ssl.bitly.com/v4/bitlinks'
      const result = await fetch(bitlyApiUrl, {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${BITLY_TOKEN}`
        },
        method: 'POST',
        body: JSON.stringify(params)
      }).then(res => res.json())
      console.log('Got short link: ', result)
      return result.link
    } catch (err) {
      console.error('ERROR while creating bitly link: ', err)
      return longUrl
    }
  }
}

export default new BitlyService()
