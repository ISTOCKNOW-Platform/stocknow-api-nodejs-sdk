// example.js - Sample usage of the API caller package
import { listNews } from 'stocknow.xyz-sdk';

// List news of given ticker
async function fetchNews(apiKey) {
  try {
    await listNews('AMZN', apiKey);
  } catch (error) {
    console.error('Failed to fetch news:', error.message);
  }
}

// Run the examples
async function runExamples() {
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    console.error("\nPlease setup environment variable API_KEY");
    return
  }

  console.log('\n=== Running Example 4: ListNews for AMZN ===');
  await fetchNews(apiKey)
}

runExamples();