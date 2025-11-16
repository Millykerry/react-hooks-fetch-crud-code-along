import React from "react";

// This component receives: item data, onUpdateItem function, onDeleteItem function
function Item({ item, onUpdateItem, onDeleteItem }) {
  
  // HANDLE "ADD TO CART" / "REMOVE FROM CART" BUTTON CLICK (UPDATE)
  function handleAddToCartClick() {
    // STEP 1: Send update request to server
    fetch(`http://localhost:4000/items/${item.id}`, {
      method: "PATCH", // PATCH means "update existing"
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        isInCart: !item.isInCart, // Toggle: if true → false, if false → true
      }),
    })
      .then((r) => r.json()) // Get updated item from server
      .then((updatedItem) => {
        // STEP 2: Send updated item to ShoppingList to update state
        onUpdateItem(updatedItem);
      });
  }

  // HANDLE "DELETE" BUTTON CLICK (DELETE)
  function handleDeleteClick() {
    // STEP 1: Send delete request to server
    fetch(`http://localhost:4000/items/${item.id}`, {
      method: "DELETE", // DELETE means "remove this"
    })
      .then((r) => r.json())
      .then(() => {
        // STEP 2: Tell ShoppingList to remove this item from state
        onDeleteItem(item);
      });
  }

  return (
    <li className={item.isInCart ? "in-cart" : ""}>
      {/* Item name */}
      <span>{item.name}</span>
      
      {/* Item category */}
      <span className="category">{item.category}</span>
      
      {/* Button to add/remove from cart */}
      <button
        className={item.isInCart ? "remove" : "add"}
        onClick={handleAddToCartClick}
      >
        {item.isInCart ? "Remove From" : "Add to"} Cart
      </button>
      
      {/* Button to delete item */}
      <button className="remove" onClick={handleDeleteClick}>
        Delete
      </button>
    </li>
  );
}

 export default Item;