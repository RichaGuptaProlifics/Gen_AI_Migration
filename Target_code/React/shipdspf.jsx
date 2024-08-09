/*
 * COBOL code from 'Ship.dspf.txt' is converted into React code here.
 * React is a JavaScript library for building user interfaces, maintained by Facebook.
 * It allows for the creation of single-page applications with a component-based architecture.
 * React code is used to build dynamic web applications.
 * File creation time: 2024-08-01 11:33:37
 */

/*
 * Explanation:
/* Part 1 from Ship.dspf.txt */
### Ship.js

The `Ship.js` component in React is a converted version of the COBOL code found in `Ship.dspf.txt`. It manages the state and rendering of a dynamic table of shipment data, and provides a form for adding new shipments:

- **State Management**:
   - The component uses the `useState` hook to manage the state of the shipment data (`shipData`) and the visibility of the add form (`showAddForm`).

- **Data Management**:
   - The shipment data is stored in an array (`shipData`) and updated using the `setShipData` state setter.
   - The `handleAddShipment` function handles form submission, creating a new shipment object and adding it to the `shipData` array.

- **Table Rendering**:
   - The table displays the shipment data with each row representing a shipment.
   - Each column displays the shipment ID, description, and date.

- **Form Handling**:
   - The add form is displayed when the `showAddForm` state is `true`.
   - The form allows users to enter shipment details and submit them to create a new shipment.
   - The `handleAddShipment` function handles form submission and updates the `shipData` state.

- **Layout and Styling**:
   - The component uses CSS classes (`container`, `table-container`, `add-form`) to style the UI.

- **Best Practices and Design Patterns**:
   - **Controlled Components**: The form inputs are controlled by the component state, ensuring data consistency.
   - **Data Binding**: The shipment data is bound to the table rows, allowing for dynamic updates.
   - **Separation of Concerns**: The component focuses on managing the state and rendering, while the `handleAddShipment` function handles form submission logic.

/* Part 2 from Ship.dspf.txt */
**File Name:** Ship.jsx

**Functionality:**

This React component represents a form for adding new ship records. It allows users to enter a ship ID, ship date, and ship description. When the "Add" button is clicked, it sends the form data to the backend to create a new ship record. If successful, it displays a success message. If there is an error, it displays an error message. The "Cancel" button clears the form and resets the error message.

**Structure:**

The Ship component uses React's functional component syntax and the `useState` and `useEffect` hooks for state management. It has a main `render` function that returns the JSX markup for the form.

**State:**

The component uses the `useState` hook to manage the following state variables:

* `errorMessage`: Stores any error messages encountered during data fetching or form submission.
* `shipID`: Stores the entered ship ID.
* `shipDate`: Stores the entered ship date.
* `shipDesc`: Stores the entered ship description.

**Effects:**

The component uses the `useEffect` hook with an empty dependency array to fetch initial data from the backend when the component is first mounted. This data is used to populate the form fields.

**Event Handlers:**

The component includes event handlers for the "Add" and "Cancel" buttons:

* `handleAdd`: Handles the form submission and sends the form data to the backend to create a new ship record.
* `handleCancel`: Clears the form fields and resets the error message.

**Best Practices and Design Patterns:**

* **State Management with Hooks:** The component uses React hooks for state management, which is a recommended approach for managing state in functional components.
* **Error Handling:** The component handles errors by setting the `errorMessage` state variable and displaying the error message to the user.
* **Data Fetching with Promises:** The component uses the `fetch` API and promises to fetch data from the backend. This is a common approach for asynchronous data fetching in React.
* **Controlled Form Inputs:** The form inputs are controlled by the component's state, which allows for easy updating and validation.
*/

// Part 1 from Ship.dspf.txt
### Ship.js
```javascript
import React, { useState } from "react";
import "./Ship.css";

const Ship = () => {
  const [shipData, setShipData] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);

  const handleAddShipment = (e) => {
    e.preventDefault();
    const newShipment = {
      shipId: e.target.shipId.value,
      shipDesc: e.target.shipDesc.value,
      shipDate: e.target.shipDate.value,
    };
    setShipData([...shipData, newShipment]);
    setShowAddForm(false);
  };

  return (
    <div className="container">
      <h1>Sample subfile for shipment</h1>
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Ship Id</th>
              <th>Ship Desc</th>
              <th>Ship Date</th>
            </tr>
          </thead>
          <tbody>
            {shipData.map((shipment) => (
              <tr key={shipment.shipId}>
                <td>{shipment.shipId}</td>
                <td>{shipment.shipDesc}</td>
                <td>{shipment.shipDate}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="footer">
        <button>F3 = Exit</button>
        <button>F4 = Delivery</button>
        <button onClick={() => setShowAddForm(true)}>Add</button>
        
      </div>
      {showAddForm && (
        <form className="add-form" onSubmit={handleAddShipment}>
          <h2>New Shipment</h2>
          <label htmlFor="shipId">Shipment Id:</label>
          <input type="text" id="shipId" />
          <br />
          <label htmlFor="shipDesc">Shipment Desc:</label>
          <input type="text" id="shipDesc" />
          <br />
          <label htmlFor="shipDate">Shipment Date:</label>
          <input type="date" id="shipDate" />
          <br />
          <button type="submit">Save</button>
          <button type="button" onClick={() => setShowAddForm(false)}>
            Cancel
          </button>
        </form>
      )}
    </div>
  );
};

export default Ship;
```

// Part 2 from Ship.dspf.txt
```javascript
// Ship.jsx
import React, { useState, useEffect } from 'react';

const Ship = () => {
  const [errorMessage, setErrorMessage] = useState('');
  const [shipID, setShipID] = useState('');
  const [shipDate, setShipDate] = useState('');
  const [shipDesc, setShipDesc] = useState('');

  useEffect(() => {
    // Fetch initial data from the backend
    fetch('/api/ship')
      .then(res => res.json())
      .then(data => {
        setShipID(data.shipID);
        setShipDate(data.shipDate);
        setShipDesc(data.shipDesc);
      })
      .catch(error => {
        setErrorMessage('Error fetching data: ' + error.message);
      });
  }, []);

  const handleAdd = () => {
    // Add the new ship to the backend
    fetch('/api/ship', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        shipID: shipID,
        shipDate: shipDate,
        shipDesc: shipDesc
      })
    })
      .then(res => res.json())
      .then(data => {
        // Display a success message
        setErrorMessage('Ship added successfully');
      })
      .catch(error => {
        // Display an error message
        setErrorMessage('Error adding ship: ' + error.message);
      });
  };

  const handleCancel = () => {
    // Clear the form and reset the error message
    setShipID('');
    setShipDate('');
    setShipDesc('');
    setErrorMessage('');
  };

  return (
    <div>
      <h1>Deliveries</h1>

      <form>
        <label htmlFor="shipID">Ship ID:</label>
        <input type="text" id="shipID" value={shipID} onChange={e => setShipID(e.target.value)} />

        <label htmlFor="shipDate">Ship Date:</label>
        <input type="date" id="shipDate" value={shipDate} onChange={e => setShipDate(e.target.value)} />

        <label htmlFor="shipDesc">Ship Description:</label>
        <input type="text" id="shipDesc" value={shipDesc} onChange={e => setShipDesc(e.target.value)} />

        <button type="button" onClick={handleAdd}>Add</button>
        <button type="button" onClick={handleCancel}>Cancel</button>
      </form>

      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
    </div>
  );
};

export default Ship;
```