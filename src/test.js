// example.js - Sample usage of the API caller package

const { callApiAndDump, listNews } = require('./index'); // Or require('your-package-name') if published

// Example 1: Simple GET request
async function getUsers() {
  try {
    await callApiAndDump({
      url: 'https://jsonplaceholder.typicode.com/users',
      method: 'GET',
      outputFilename: 'users.json'
    });
  } catch (error) {
    console.error('Failed to get users:', error.message);
  }
}

// Example 2: POST request with data
async function createPost() {
  try {
    const result = await callApiAndDump({
      url: 'https://jsonplaceholder.typicode.com/posts',
      method: 'POST',
      data: {
        title: 'My New Post',
        body: 'This is the content of my post',
        userId: 1
      },
      outputFilename: 'new-post.json',
      logToConsole: true // explicitly enable console logging
    });
    
    console.log('Post created with ID:', result.id);
  } catch (error) {
    console.error('Failed to create post:', error.message);
  }
}

// Example 3: GET request with query parameters
async function searchPosts() {
  try {
    await callApiAndDump({
      url: 'https://jsonplaceholder.typicode.com/posts',
      method: 'GET',
      params: {
        userId: 1,
        _limit: 5
      },
      outputPath: './responses', // Save to a subfolder
      outputFilename: 'filtered-posts.json',
      logToConsole: false // disable console logging
    });
  } catch (error) {
    console.error('Failed to search posts:', error.message);
  }
}

// Example 4: List news of given ticker
async function fetchNews() {
    try {
      await listNews('AMZN', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiIwMDdRIiwiY3JlYXRlZEF0IjoiMjAyNS0wNC0wNFQwNToxMDowOC4yOTRaIiwiaWF0IjoxNzQzNzQzNDA4LCJleHAiOjE3NDQzNDgyMDh9.ya-e5IhrhjuMWU_CZd8j9Z0xC3XhuU4ZtsnHKk57-v0');
    } catch (error) {
      console.error('Failed to fetch news:', error.message);
    }
}

// Run the examples
async function runExamples() {
  console.log('=== Running Example 1: GET Users ===');
  await getUsers();
  
  console.log('\n=== Running Example 2: POST Create Post ===');
  await createPost();
  
  console.log('\n=== Running Example 3: GET with Parameters ===');
  await searchPosts();

  console.log('\n=== Running Example 4: ListNews for AMZN ===');
  await fetchNews()
}

runExamples();