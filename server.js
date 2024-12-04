const express = require('express');
const bodyParser = require('body-parser');
const createCsvWriter = require('csv-writer').createObjectCsvWriter;

const app = express();
app.use(bodyParser.json());

const csvWriter = createCsvWriter({
  path: 'responses.csv',
  header: [
    {id: 'name', title: 'Name'},
    {id: 'email', title: 'Email'},
    {id: 'message', title: 'Message'}
  ]
});

app.post('/submit', (req, res) => {
  const data = [
    {
      name: req.body.name,
      email: req.body.email,
      message: req.body.message
    }
  ];

  csvWriter.writeRecords(data)
    .then(() => {
      res.send('Data saved to CSV file');
    });
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
