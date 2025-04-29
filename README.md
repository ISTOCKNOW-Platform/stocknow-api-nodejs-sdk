# stocknow-api-nodejs-sdk
StockNow platform nodejs (npm) sdk, allow developer accessing investment data and insights easily.

# getting started
## install stocknow.xyz-sdk
```
npm i stocknow.xyz-sdk
```
## sample code
```
// List news of given ticker
async function fetchNews(apiKey) {
  try {
    await listNews('AMZN', apiKey);
  } catch (error) {
    console.error('Failed to fetch news:', error.message);
  }
}
```
