type Quote = {
  q: string;
  a: string;
};

const fallBackQuotes: Quote[] = [
  {
    q: "Quality means doing it right when no one is looking.",
    a: "Henry Ford",
  },
  {
    q: "Success is not final, failure is not fatal: it is the courage to continue that counts.",
    a: "Winston Churchill",
  },
  {
    q: "Discipline is choosing between what you want now and what you want most.",
    a: "Abraham Lincoln",
  },
  {
    q: "Do not wait to strike till the iron is hot; but make it hot by striking.",
    a: "William Butler Yeats",
  },
  {
    q: "A journey of a thousand miles begins with a single step.",
    a: "Lao Tzu",
  },
  {
    q: "The only limit to our realization of tomorrow is our doubts of today.",
    a: "Franklin D. Roosevelt",
  },
  {
    q: "You miss 100% of the shots you don't take.",
    a: "Wayne Gretzky",
  },
  {
    q: "Fall seven times, stand up eight.",
    a: "Japanese Proverb",
  },
  {
    q: "Believe you can and you're halfway there.",
    a: "Theodore Roosevelt",
  },
  {
    q: "Hard work beats talent when talent doesn't work hard.",
    a: "Tim Notke",
  },
];

const getRandomFallback = (): Quote => {
  return fallBackQuotes[Math.floor(Math.random() * fallBackQuotes.length)];
};

const Quote = async () => {
  let quote: Quote;

  try {
    const response = await fetch("https://zenquotes.io/api/random", {
      signal: AbortSignal.timeout(5000),
    });

    if (response.ok) {
      const data = await response.json();
      if (data && data[0] && data[0].q && data[0].a) {
        quote = {
          q: data[0].q,
          a: data[0].a,
        };
      } else {
        quote = getRandomFallback();
      }
    } else {
      quote = getRandomFallback();
    }
  } catch (error) {
    console.warn("Failed to fetch quote:", error);
    quote = getRandomFallback();
  }

  return (
    <footer className="flex items-center border-t border-white/20 p-6 bg-glass-week w-full justify-center">
        <p className="text-sm md:text-base italic text-white leading-relaxed">
          {quote.q}
        </p>
        <span className="text-sm md:text-base text-cyan-400 font-medium ml-4 shrink-0">
          — {quote.a}
        </span>
    </footer>
  );
};

export default Quote;
