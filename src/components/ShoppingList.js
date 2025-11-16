// PART 1: Import everything we need
import React, { useEffect, useState } from "react";
import ItemForm from "./ItemForm";
import Filter from "./Filter";
import Item from "./Item";

function ShoppingList() {
  // STATE: Two pieces of memory we're tracking
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [items, setItems] = useState([]); // Empty at first, will fill from server

  // PART 2: FETCH ITEMS WHEN APP LOADS (READ)
  // This runs automatically when the component first appears
  useEffect(() => {
    fetch("http://localhost:4000/items") // Ask the server for all items
      .then((r) => r.json()) // Convert response to JavaScript
      .then((items) => setItems(items)); // Save items to state
  }, []); // Empty [] means "only run once when component loads"

  // PART 3: ADD NEW ITEM (CREATE)
  // This function gets called when someone submits the form
  function handleAddItem(newItem) {
    // Add the new item to the end of our existing items
    setItems([...items, newItem]); 
    // The ... (spread operator) means "take all existing items"
    // Then we add newItem at the end
  }

  // PART 4: UPDATE ITEM (for "Add to Cart" button)
  // This function gets called when someone clicks "Add to Cart"
  function handleUpdateItem(updatedItem) {
    // We need to replace the old version of this item with the new version
    const updatedItems = items.map((item) => {
      // Go through each item in our list
      if (item.id === updatedItem.id) {
        // If this is the item that changed...
        return updatedItem; // Replace it with the updated version
      } else {
        return item; // Keep the item as-is
      }
    });
    setItems(updatedItems); // Save the new list
  }

  // PART 5: DELETE ITEM
  // This function gets called when someone clicks "Delete"
  function handleDeleteItem(deletedItem) {
    // Remove the deleted item from our list
    const updatedItems = items.filter((item) => item.id !== deletedItem.id);
    // filter keeps only items where the condition is true
    // We keep items whose ID does NOT match the deleted item's ID
    setItems(updatedItems); // Save the new list
  }

  // FILTER ITEMS BY CATEGORY
  // This is already done for you - it filters items based on category dropdown
  function handleCategoryChange(category) {
    setSelectedCategory(category);
  }

  // Decide which items to show based on selected category
  const itemsToDisplay = items.filter((item) => {
    if (selectedCategory === "All") return true; // Show all items
    return item.category === selectedCategory; // Show only matching category
  });

  // RENDER THE UI
  return (
    <div className="ShoppingList">
      {/* Form to add new items - we pass handleAddItem as a prop */}
      <ItemForm onAddItem={handleAddItem} />
      
      {/* Dropdown to filter by category */}
      <Filter
        category={selectedCategory}
        onCategoryChange={handleCategoryChange}
      />
      
      {/* List of all items */}
      <ul className="Items">
        {itemsToDisplay.map((item) => (
          <Item
            key={item.id}
            item={item}
            onUpdateItem={handleUpdateItem} // Pass down update function
            onDeleteItem={handleDeleteItem} // Pass down delete function
          />
        ))}
      </ul>
    </div>
  );
}
 
 export default ShoppingList;