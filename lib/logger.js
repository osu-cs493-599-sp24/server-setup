const notExported = 4

exports.logger = function logger(req, res, next) {
  console.log("== Request received")
  console.log("  -- METHOD:", req.method)
  console.log("  -- URL:", req.url)
  console.log("  -- HEADERS:", req.headers)
  next()
}

exports.somethingElse = function () {
  console.log("Something else")
}
