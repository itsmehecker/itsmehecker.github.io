const http = require("node:http");
const port = process.env.port || 80;

const server = http.createServer((req, res) => {
    fetch("https://constellation.hackclub.com/");
    if (req.url == "/api") {
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify({
            "city":"Ernakulam",
            "state":"Kerala",
            "country":"India",
            "slack_id":"U079DFNSYQ2",
            "extra":"I'm just a chill guy https://tenor.com/en-GB/view/my-new-character-chill-guy-oc-idgaf-gif-8231906169721916585"}));
    }
});

server.listen(port, () => {
    console.log("Server is running on http://localhost:" + port);
});