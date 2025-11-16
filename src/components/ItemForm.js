import React, { useState } from "react";

// This component receives onAddItem as a prop from ShoppingList
function ItemForm({ onAddItem }) {
  // STATE: Track what user types in the form
  const [name, setName] = useState(""); // Item name (empty at first)
  const [category, setCategory] = useState("Produce"); // Category (default: Produce)

  // HANDLE FORM SUBMISSION
  function handleSubmit(e) {
    e.preventDefault(); // Stop the page from refreshing
    
    // STEP 1: Prepare the data to send
    const itemData = {
      name: name,
      category: category,
      isInCart: false, // New items start as NOT in cart
    };

    // STEP 2: Send data to the server (CREATE)
    fetch("http://localhost:4000/items", {
      method: "POST", // POST means "create new"
      headers: {
        "Content-Type": "application/json", // Tell server we're sending JSON
      },
      body: JSON.stringify(itemData), // Convert JavaScript object to JSON string
    })
      .then((r) => r.json()) // Get the response from server
      .then((newItem) => {
        // STEP 3: The server responds with the new item (now with an ID!)
        onAddItem(newItem); // Send it to ShoppingList to update state
      });
  }

  return (
    <form className="NewItem" onSubmit={handleSubmit}>
      <label>
        Name:
        <input
          type="text"
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)} // Update state as user types
        />
      </label>

      <label>
        Category:
        <select
          name="category"
          value={category}
          onChange={(e) => setCategory(e.target.value)} // Update state when user selects
        >
          <option value="Produce">Produce</option>
          <option value="Dairy">Dairy</option>
          <option value="Dessert">Dessert</option>
        </select>
      </label>

      <button type="submit">Add to List</button>
    </form>
  );
}

 export default ItemForm;