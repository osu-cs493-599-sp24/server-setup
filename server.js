const express = require("express")
const app = express()

const logger = require("./lib/logger")
console.log("== logger:", logger)
logger.somethingElse()

const lodgings = require("./lodgings.json")
console.log("== lodgings:", lodgings)

app.use(logger.logger)

app.use(express.json())

app.get("/", function (req, res, next) {
    console.log("== Inside GET / endpoint")
    // next()
    res.status(200).send({
        msg: "This is from the '/' endpoint."
    })
})
// app.post()
// app.patch()
// app.put()
// app.delete()

/*
 * GET /lodgings
 */
app.get("/lodgings", function (req, res, next) {
    console.log("  -- req.query:", req.query)

    let page = parseInt(req.query.page) || 1
    const numPerPage = 10
    const lastPage = Math.ceil(lodgings.length / numPerPage)
    page = page > lastPage ? lastPage : page
    page = page < 1 ? 1 : page
    console.log("  -- page:", page)

    const start = (page - 1) * numPerPage
    const end = start + numPerPage
    const lodgingsPage = lodgings.slice(start, end)

    res.status(200).send({
        lodgings: lodgingsPage,
        page: page,
        totalPages: lastPage,
        numPerPage: numPerPage,
        totalCount: lodgings.length
    })
})

/*
 * POST /lodgings
 */
app.post("/lodgings", function (req, res, next) {
    console.log("  -- req.body:", req.body)
    if (req.body && req.body.name && req.body.description && req.body.price) {
        const id = lodgings.length
        res.status(201).send({
            id: id
        })
    } else {
        res.status(400).send({
            err: "Request body needs 'name', 'description', and 'price'."
        })
    }
})

app.use("*", function (req, res, next) {
    console.log("  -- 404!")
    res.status(404).send({
        err: "Requested URL not recognized: " + req.originalUrl
    })
})

app.listen(8000, function () {
    console.log("== Server is running on port 8000")
})
