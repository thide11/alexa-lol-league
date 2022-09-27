export default function(req, res, next) {
  const redirects = [
    {
      from: "/alexa-login", 
      to: "/"
    }
  ]
  // console.log(req.url);
  const redirect = redirects.find((r) => r.from === req.url.split("?")[0])
  console.log("Teste:" + req.url)
  if (redirect) {
    console.log("Query : " + req.query)
    console.log("Url : " + req.url)
    const urlRedictWithGetParameters = redirect.to + "?" + Object.keys(req.query).map((key => `${key}=${req.query[key]}`)).join("&");
    // console.log("Url : " + req.url)
    console.log("Url final")
    console.log(urlRedictWithGetParameters)
    res.writeHead(301, { Location: urlRedictWithGetParameters })
    res.end()
  } else {
    next()
  }
}