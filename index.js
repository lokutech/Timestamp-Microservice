const express = require('express')
const app = express()
const path = require('path')

// Static folder
app.use(express.static(path.join(__dirname, 'public')))

// Api date empty string
app.get('/api/timestamp', (req, res) => {
  res.json({ unix: Date.now(), utc: Date() });
})

// Api date string
app.get('/api/timestamp/:date_string', (req, res) => {
  if (/^[0-9]*$/.test(req.params.date_string)) {
    let utc = new Date(Number(req.params.date_string)).toUTCString()
    res.send({ 'unix' : Number(req.params.date_string), 'utc': utc})
  } else {
    if (new Date(req.params.date_string).getTime()) {
      let utc = new Date(req.params.date_string).toUTCString()
      let unix = new Date(req.params.date_string).getTime()
      res.send({ 'unix' : unix, 'utc': utc})
    }
    res.send({"error" : "Invalid Date" })
  }
})

const PORT = process.env.PORT || 5000

app.listen(PORT, () => console.log(`Server started on port ${PORT}`))
