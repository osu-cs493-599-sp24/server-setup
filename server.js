const express = require("express")
const app = express()

app.get("/", function (req, res, next) {
    console.log("== Inside GET / endpoint")
    next()
})
// app.post()
// app.patch()
// app.put()
// app.delete()

app.listen(8000, function () {
    console.log("== Server is running on port 8000")
})
