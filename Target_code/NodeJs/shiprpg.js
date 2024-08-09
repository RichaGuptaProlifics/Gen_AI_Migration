/*
 * COBOL code from 'Ship.rpg.txt' is converted into Node.js code here.
 * Node.js is a JavaScript runtime built on Chrome's V8 JavaScript engine.
 * It allows for the development of server-side applications using JavaScript.
 * File creation time: 2024-08-01 11:35:42
 */

/*
 * Explanation:
/* Part 1 from Ship.rpg.txt */
**File Name:** Ship.js

**Functionality:**
This Node.js code is a conversion of a COBOL program that processes a ship file and generates SFL (Sequential File Layout) data records. It reads data from the input file 'Ship.rpg.txt', which contains COBOL commands and operands, and performs operations based on those commands.

**Structure:**
The code is structured using a `readline` interface to read the input file line by line, parse the commands and operands, and execute the appropriate operations. The main logic is implemented in a `switch` statement that handles different commands.

**Best Practices and Design Patterns:**

* **Command-based Processing:** The code uses a command-based approach, where each line of the input file represents a command and its operands. This allows for easy parsing and execution of the commands.
* **Separation of Concerns:** The code separates the main processing logic from the COBOL subroutine implementations, making the code more maintainable.
* **File Handling:** The code uses Node.js's `fs` module for file reading and writing, providing a platform-independent way to handle file operations.
* **Error Handling:** The code does not handle errors explicitly, but it's recommended to add error handling mechanisms to ensure graceful failure and provide meaningful error messages.

**Specific Functionalities:**

* **Opening and Closing Files:** The code opens the ship file for reading and closes it when finished processing.
* **Parsing Commands and Operands:** It uses the `split()` method to parse the line into commands and operands, allowing for easy identification and execution of the commands.
* **COBOL Subroutine Implementations:** The code implements COBOL subroutine equivalents in JavaScript, such as `clearsr`, `loadsr`, `writeSflctl`, and `addRec`.
* **Do While Loop:** The code implements a `doWhile` loop using a while loop and a jump to the end label, which is a common pattern in COBOL.

**Example Usage:**
To use this code, you would need to:

1. Create an input file named 'Ship.rpg.txt' with the COBOL commands and operands.
2. Run the Node.js script using the following command: `node Ship.js`.
3. The output will be written to the console.

/* Part 2 from Ship.rpg.txt */
**File Name:** Ship.js

**Functionality:**

This Node.js code handles the addition of a new ship record. It reads the existing record count from a file, increments it, and writes the new record along with the updated record count to the file. The code is converted from COBOL code in 'Ship.rpg.txt'.

**Structure:**

The code consists of a single exported function, `addRecord`, which serves as the entry point for adding a new ship record.

**Validation:**

The code first validates the input fields (Shipid, ShipDesc, and ShipDate) to ensure they are not empty or invalid. If any of the fields are missing or invalid, an error message is returned.

**Data Access:**

The code reads and writes to a file named 'clntrec.dat' to manage the ship records. The file is assumed to contain the record count as the first line and the ship records as subsequent lines.

**Record Count Increment:**

The code reads the existing record count from the file and increments it by one to determine the record number for the new record.

**New Record Creation:**

A new record is created as a JavaScript object with the provided Shipid, ShipDesc, and ShipDate fields.

**File Operations:**

The code performs the following file operations:

1. Writes the updated record count to the file.
2. Appends the new record to the file as a JSON string.

**Error Handling:**

The code handles file read/write errors by logging them to the console and returning an error message to the user.

**Best Practices and Design Patterns:**

* **Error Handling:** The code uses `try-catch` blocks to handle errors during file operations.
* **Data Validation:** Input validation is performed to prevent invalid data from being added to the file.
* **File Access:** The code uses the `fs` module for file operations, which is a standard Node.js module for file system management.
*/

// Part 1 from Ship.rpg.txt
```javascript
// Ship.js

// Import necessary modules
const fs = require('fs');
const readline = require('readline');

// Create a readline interface for reading from the input file
const rl = readline.createInterface({
  input: fs.createReadStream('Ship.rpg.txt'),
  crlfDelay: Infinity
});

// Initialize variables
let shipId = 0;
let shipDesc = '';
let shipDate = '';
let sflctl = '';
let rrn = 0;
let shippf = '';

// Process each line from the input file
rl.on('line', (line) => {
  // Parse the line based on the COBOL code structure
  const parts = line.split(' ');
  const command = parts[0];
  const operands = parts.slice(1);

  // Execute the appropriate command
  switch (command) {
    case 'Fshippf':
      // Open the ship file for reading
      shippf = fs.openSync(operands[0], 'r');
      break;
    case 'fshipdspf1':
      // Write the SFL control record
      sflctl = operands[0];
      writeSflctl();
      break;
    case 'F':
      // Read the ship file and write the SFL data records
      loadSr();
      break;
    case 'drrn§':
      // Set the RRN for the current SFL data record
      rrn = parseInt(operands[0]);
      break;
    case '/free':
      // Start of a free format section
      break;
    case '/end-free':
      // End of a free format section
      break;
    case 'exsr':
      // Execute a subroutine
      switch (operands[0]) {
        case 'clearsr':
          clearSr();
          break;
        case 'loadsr':
          loadSr();
          break;
        case '$addRec':
          addRec();
          break;
      }
      break;
    case 'write':
      // Write a record to the output file
      fs.writeSync(1, operands[0]);
      break;
    case 'DoW':
      // Start of a Do While loop
      doWhile(operands[0], operands[1]);
      break;
    case 'EndDo':
      // End of a Do While loop
      break;
    case 'if':
      // Start of an if statement
      if (operands[0] === operands[1]) {
        // Execute the if block
      }
      break;
    case 'endif':
      // End of an if statement
      break;
  }
});

// Close the ship file when finished processing
rl.on('close', () => {
  fs.closeSync(shippf);
});

// Functions to implement the COBOL subroutines

function clearSr() {
  shipId = 0;
  shipDesc = '';
  shipDate = '';
}

function loadSr() {
  const buffer = Buffer.alloc(80);
  fs.readSync(shippf, buffer, 0, 80, null);
  const line = buffer.toString();
  shipId = parseInt(line.substring(0, 6));
  shipDesc = line.substring(6, 26).trim();
  shipDate = line.substring(26, 34).trim();
}

function writeSflctl() {
  const buffer = Buffer.alloc(80);
  buffer.write(sflctl, 0, sflctl.length);
  fs.writeSync(1, buffer);
}

function doWhile(condition, endLabel) {
  while (condition) {
    // Execute the loop body
  }
  // Jump to the end label
}

function addRec() {
  const buffer = Buffer.alloc(80);
  buffer.write(shipId.toString().padStart(6, '0'), 0, 6);
  buffer.write(shipDesc.padEnd(20, ' '), 6, 20);
  buffer.write(shipDate.padEnd(8, ' '), 26, 8);
  buffer.write(rrn.toString().padStart(4, '0'), 76, 4);
  fs.writeSync(1, buffer);
}
```

// Part 2 from Ship.rpg.txt
```javascript
// Ship.js
// This Node.js code is converted from the COBOL code in 'Ship.rpg.txt'.
// It handles the addition of a new ship record.

const fs = require("fs");
const path = require("path");

const dataPath = path.join(__dirname, "data", "clntrec.dat");

exports.addRecord = (req, res) => {
  const { Shipid, ShipDesc, ShipDate } = req.body;

  // Validate the input
  if (!Shipid) {
    res.status(400).json({ WErrMsg: "Invalid ShipId" });
    return;
  } else if (!ShipDesc) {
    res.status(400).json({ WErrMsg: "Blank Desc" });
    return;
  } else if (!ShipDate) {
    res.status(400).json({ WErrMsg: "Blank date" });
    return;
  }

  // Read the current record count
  fs.readFile(dataPath, (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).json({ WErrMsg: "Internal server error" });
      return;
    }

    let rrn = parseInt(data.toString());

    // Increment the record count
    rrn++;

    // Create a new record
    const newRecord = {
      Shipid,
      ShipDesc,
      ShipDate,
    };

    // Write the new record to the file
    fs.writeFile(dataPath, JSON.stringify(rrn), (err) => {
      if (err) {
        console.error(err);
        res.status(500).json({ WErrMsg: "Internal server error" });
        return;
      }
    });

    // Write the new record to the file
    fs.appendFile(dataPath, JSON.stringify(newRecord), (err) => {
      if (err) {
        console.error(err);
        res.status(500).json({ WErrMsg: "Internal server error" });
        return;
      }

      // Return a success message
      res.status(200).json({ WErrMsg: "Successful" });
    });
  });
};
```