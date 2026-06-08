const urls = [
  "http://localhost:5177/",
  "http://localhost:5177/services/executive-search",
  "http://localhost:5177/industries/technology-software",
  "http://localhost:5177/industries/Industries",
  "http://localhost:5177/industries",
];

async function check() {
  for (const url of urls) {
    try {
      const res = await fetch(url);
      console.log(`URL: ${url}`);
      console.log(`Status: ${res.status} ${res.statusText}`);
      const text = await res.text();
      console.log(`Length: ${text.length}`);
      if (text.includes("Something went wrong") || text.includes("error") || res.status >= 400) {
        console.log(`Contains error/went wrong screen or server error!`);
        if (text.includes("Something went wrong")) {
          console.log(`Found "Something went wrong" in HTML!`);
        }
      }
      console.log("-----------------------------------");
    } catch (e) {
      console.error(`Failed to fetch ${url}:`, e.message);
    }
  }
}

check();
