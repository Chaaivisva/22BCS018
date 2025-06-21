const express = require('express');
const axios = require('axios');
const app = express();
const PORT = 9876;
const WINDOW_SIZE = 10;
const TIMEOUT = 500;

const BEARER_TOKEN = 'Bearer_Token_Here';

//endpoints
const endpoints = {
  'p': 'http://20.244.56.144/evaluation-service/primes',
  'f': 'http://20.244.56.144/evaluation-service/fibo',
  'e': 'http://20.244.56.144/evaluation-service/even',
  'r': 'http://20.244.56.144/evaluation-service/rand'
};

//window size - 10
let window = [];

async function fetchNumbers(type) {
  try {
    console.log(`Fetching ${type}`);
    const response = await axios.get(endpoints[type], {
      timeout: TIMEOUT,
      headers: {
        'Authorization': `Bearer ${BEARER_TOKEN}`,
        'Content-Type': 'application/json'
      }
    });
    
    if (response.data && Array.isArray(response.data.numbers)) {
      console.log(`Successfully fetched`);
      return response.data.numbers;
    } else {
      console.log(`Invalid response format`);
      throw new Error('Invalid response format from test server');
    }
  } catch (error) {
    console.error(`Failed to fetch numbers:`, error.message);
    throw error;
  }
}

function updateWindow(newNumbers) {
  const prevState = [...window];
  
  const uniqueNumbers = newNumbers.filter(num => !window.includes(num));
  window.push(...uniqueNumbers);
  
  if (window.length > WINDOW_SIZE) {
    window = window.slice(-WINDOW_SIZE);
  }
  
  console.log(`Window updated`);
  return prevState;
}

//average 
function calculateAverage() {
  if (window.length === 0) return 0.00;
  const sum = window.reduce((a, b) => a + b, 0);
  return parseFloat((sum / window.length).toFixed(2));
}

app.get('/numbers/:numberid', async (req, res) => {
  const { numberid } = req.params;
  
  if (!endpoints[numberid]) {
    return res.status(400).json({ 
      error: 'Invalid number type. Use p,e,r,f' 
    });
  }
  
  try {
    const numbers = await fetchNumbers(numberid);
    
    const windowPrevState = updateWindow(numbers);
    const windowCurrState = [...window];
    const avg = calculateAverage();
    
    //Response
    const response = {
      windowPrevState,
      windowCurrState,
      numbers,
      avg
    };
    
    console.log(`Request processed for ${numberid}:`);
    res.json(response);
    
  } catch (error) {
    console.error(`Error processing request for ${numberid}:`, error.message);
    
    res.status(500).json({ 
      error: 'Failed to fetch numbers from test server',
      details: error.message,
      windowPrevState: [...window],
      windowCurrState: [...window],
      numbers: [],
      avg: calculateAverage()
    });
  }
});


app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

module.exports = app;
