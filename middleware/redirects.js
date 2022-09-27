export default function(req, res, next) {
  const redirects = [
    {
      from: "/alexa-login", 
      to: "/"
    }
  ]
  const redirect = redirects.find((r) => r.from === req.url.split("?")[0])
  if (redirect) {
    const urlRedictWithGetParameters = redirect.to + "?" + Object.keys(req.query).map((key => `${key}=${req.query[key]}`)).join("&");
    res.writeHead(301, { Location: urlRedictWithGetParameters })
    res.end()
  } else {
    next()
  }
}