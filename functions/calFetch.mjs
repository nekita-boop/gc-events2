import fetch from 'node-fetch';


const BASEPARAMS = `orderBy=startTime&singleEvents=true&timeMin=${new Date().toISOString()}`
const BASEURL = `https://www.googleapis.com/calendar/v3/calendars/a8b24e392c7efa2e93a3c70e9ca85400939730f42d64fdd79664201bfb6928af@group.calendar.google.com
/events?${BASEPARAMS}`

const HEADERS = {
  'Content-Type': 'application/json',
  'Access-Control-Allow-Methods': 'GET',
}

exports.handler = async function (event, context) {
  console.log(event.queryStringParameters)
  const finalURL = `${BASEURL}${event.queryStringParameters.maxResults ? `&maxResults=${event.queryStringParameters.maxResults}` : ''}&key=AIzaSyActYHsMt59hUtuBbTFMi5h2f-bfkSZ0lY`
  //const finalURL = `${BASEURL}${`&maxResults=${eventAmtToFetch}`}&key=AIzaSyActYHsMt59hUtuBbTFMi5h2f-bfkSZ0lY`

  console.log(finalURL)
  try {
    if (event.httpMethod === 'GET') {
      return fetch(finalURL)
        .then((response) => response.json())
        .then((data) => ({
          statusCode: 200,
          body: JSON.stringify(data.items, null, 2),
          HEADERS
        }))
    }
    return {
      statusCode: 401
    }
  } catch (e) {
    console.error(e)
    return {
      statusCode: 500,
      body: e.toString()
    }
  }
}
