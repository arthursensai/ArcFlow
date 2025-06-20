const express = require('express');
const router = express.Router();
const requireAuth = require('../middlewares/requireAuth');

const backup_quotes = [
  { q: "Discipline is choosing between what you want now and what you want most.", a: "Abraham Lincoln" },
  { q: "Success is not final, failure is not fatal: it is the courage to continue that counts.", a: "Winston Churchill" },
  { q: "You don’t have to be extreme, just consistent.", a: "Unknown" },
  { q: "Do something today that your future self will thank you for.", a: "Sean Patrick Flanery" },
  { q: "We are what we repeatedly do. Excellence, then, is not an act, but a habit.", a: "Will Durant" },
  { q: "Little by little, a little becomes a lot.", a: "Tanzanian Proverb" },
  { q: "Don’t wish it were easier; wish you were better.", a: "Jim Rohn" },
  { q: "You won’t always be motivated, so you must learn to be disciplined.", a: "Unknown" },
  { q: "A journey of a thousand miles begins with a single step.", a: "Lao Tzu" },
  { q: "Consistency is more important than perfection.", a: "Unknown" }
];

const quote_get = (req, res) => {
    axios.get('https://zenquotes.io/api/random').then((response) => {
        return res.status(200).json({ quote: response.data[0].q, author: response.data[0].a });
      }).catch((err) => {
        const randomQuote = backup_quotes[Math.floor(Math.random() * backup_quotes.length)];
        return res.status(200).json({ quote: randomQuote.q, author: randomQuote.a });
      })
};

router.get("/", requireAuth, quote_get);

module.exports = router;