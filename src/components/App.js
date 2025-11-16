// Step 1: Import the tools we need from React
// useState: helps us remember and update information
// useEffect: helps us do something automatically when the page loads
import { useState, useEffect } from 'react';

// Step 2: Create the App component (this is our main box of content)
function App() {
  
  // Step 3: Create a "memory slot" to store the dog image URL
  // At first, it's null (empty) because we haven't gotten the image yet
  const [dogImage, setDogImage] = useState(null);
  
  // Step 4: Use useEffect to automatically fetch data when the page loads
  useEffect(() => {
    // This function asks the internet for a random dog picture
    fetch('https://dog.ceo/api/breeds/image/random')
      .then(response => response.json()) // Convert the response to readable data
      .then(data => {
        // When we get the data, save the image URL to our "memory slot"
        setDogImage(data.message);
      });
  }, []); // The empty [] means "do this only once when the page first loads"
  
  // Step 5: Decide what to show on the screen
  // If we don't have the image yet (dogImage is null), show "Loading..."
  if (!dogImage) {
    return <p>Loading...</p>;
  }
  
  // If we DO have the image, show it!
  return (
    <img 
      src={dogImage} 
      alt="A Random Dog"
    />
  );
}

// Step 6: Export the component so other files can use it



 export default App;