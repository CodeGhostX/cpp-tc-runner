const express = require("express");
const app = express();
const cors = require("cors");
const fs = require('fs');
const path = require("path");
const { exec } = require("child_process");
const PORT = 3000;

app.use(cors());


// Serve static files like CSS, JS, Monaco Editor
app.use(express.static(path.join(__dirname, 'public')));

// Body parser for JSON input
app.use(express.json());

// Set up EJS as templating engine
app.set('view engine', 'ejs');

// Route to render the Monaco editor page
app.get('/', (req, res) => {
  res.render('index');  // Serve the index.ejs template
});

app.post("/run", (req, res) => {
  const { code, input } = req.body;
  fs.writeFileSync("main.cpp", code);
  fs.writeFileSync("input.txt", input);
  exec('g++ main.cpp -o main && ./main < input.txt', (err, stdout, stderr) => {
    if (err || stderr) {
      return res.json({ error: stderr || err.message });
    }
    res.json({ output: stdout });
  });
});

app.listen(PORT, ()=>{
  console.log(`Server is running on port ${PORT}`);
})
