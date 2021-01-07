const express = require('express')
const app = express()
const path = require('path')

// Static folder
app.use(express.static(path.join(__dirname, 'public')))

// Api date empty string
app.get('/api/timestamp', (req, res) => {
  console.log('debug1')
  res.json({ unix: Date.now(), utc: Date() })
})

// Api date string
app.get('/api/timestamp/:date_string', (req, res) => {
  // 1451001600 UNIX
  if (/^[0-9]*$/.test(req.params.date_string)) {
    let unix = Number(req.params.date_string)
    let utc = new Date(Number(req.params.date_string)*1000).toUTCString()
    res.send({ unix, utc })
  } 
  // "Fri, 25 Dec 2015 00:00:00 GMT" UTC
  else if (new Date(req.params.date_string).getTime()) {
    let unix = new Date(req.params.date_string).getTime()
    unix = Number(String(unix).slice(0,10))
    let utc = new Date(req.params.date_string).toUTCString()
    res.send({ unix, utc })
  } else {
    res.send({ error: 'Invalid Date' })
  }
})
1451001600000
const PORT = process.env.PORT || 5000

app.listen(PORT, () => console.log(`Server started on port ${PORT}`))

// Ending the process
process.on('SIGINT', function () {
  console.log('\nGracefully shutting down from SIGINT (Ctrl-C)')
  process.exit()
})
