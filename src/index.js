'use strict';

const axios = require('axios');
const fs = require('fs');
const path = require('path');

/**
 * Makes a REST API call and dumps the response
 * @param {Object} options - Configuration options
 * @param {string} options.url - The API endpoint URL
 * @param {string} options.method - HTTP method (GET, POST, PUT, DELETE, etc.)
 * @param {Object} [options.headers] - Request headers
 * @param {Object} [options.data] - Request payload for POST/PUT requests
 * @param {Object} [options.params] - URL parameters for GET requests
 * @param {string} [options.outputPath] - Path to save response (defaults to current directory)
 * @param {string} [options.outputFilename] - Filename to save response (defaults to 'api-response.json')
 * @param {boolean} [options.logToConsole=true] - Whether to log response to console
 * @returns {Promise<Object>} - The API response data
 */
async function callApiAndDump(options) {
  if (!options.url) {
    throw new Error('URL is required');
  }
  
  if (!options.method) {
    throw new Error('HTTP method is required');
  }

  const config = {
    url: options.url,
    method: options.method,
    headers: options.headers,
    ...(options.data && { data: options.data }),
    ...(options.params && { params: options.params })
  };

  try {
    console.log(`Making ${options.method} request to ${options.url}...`);
    console.log(`Config: ${JSON.stringify(config)}`)
    const response = await axios(config);
    
    const outputPath = options.outputPath || process.cwd();
    const outputFilename = options.outputFilename || 'api-response.json';
    const fullPath = path.join(outputPath, outputFilename);
    
    // Ensure directory exists
    if (!fs.existsSync(outputPath)) {
      fs.mkdirSync(outputPath, { recursive: true });
    }
    
    // Write response to file
    fs.writeFileSync(
      fullPath, 
      JSON.stringify(response.data, null, 2),
      'utf8'
    );
    
    console.log(`Response saved to ${fullPath}`);
    
    // Log to console if requested
    if (options.logToConsole !== false) {
      console.log('API Response:', response.data);
    }
    
    return response.data;
  } catch (error) {
    console.error('API Call Failed:', error.message);
    if (error.response) {
      console.error('Response status:', error.response.status);
      console.error('Response data:', error.response.data);
    }
    throw error;
  }
}

/**
 * Makes a REST API call and dumps the response
 * @param {string} ticker - The Ticker Name
 * @param {string} apikey - The apikey from StockNow
 * @returns {Promise<Object>} - The API response data
 */
async function listNews(ticker, apikey) {
    try {
        await callApiAndDump({
          url: `https://api.stocknow.xyz/v1/tickers/${ticker}/news`,
          method: 'GET',
          headers: {'api-key': apikey, 'Content-Type': 'application/json'},
          outputPath: './responses', // Save to a subfolder
          outputFilename: 'news.json',
          logToConsole: true
        });
      } catch (error) {
        console.error('Failed to fetch news:', error.message);
      }
}

module.exports = {
  callApiAndDump,
  listNews
};