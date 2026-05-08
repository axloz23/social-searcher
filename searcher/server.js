const express = require('express');
const path = require('path');
const app = express();
const PORT = 3000;

// This line tells Express: "Anything inside the 'public' folder 
// should be served at the root URL (/)".
app.use(express.static(path.join(__dirname, 'public')));

app.use(express.urlencoded({ extended: true }));

app.post('/search', (req, res) => {
    const query = encodeURIComponent(req.body.q);
    const engine = req.body.engine;

    const routes = {
        google: `https://www.google.com/search?q=${query}`,
        bing: `https://www.bing.com/search?q=${query}`,
        duckduckgo: `https://duckduckgo.com/?q=${query}`,
        yahoo: `https://search.yahoo.com/search?p=${query}`
    };

    const target = routes[engine] || routes.google;
    res.redirect(target);
});

app.listen(PORT, () => {
    console.log(`Searcher running at http://localhost:${PORT}`);
});