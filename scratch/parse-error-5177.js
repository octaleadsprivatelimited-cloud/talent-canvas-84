async function run() {
  const res = await fetch("http://localhost:5177/");
  const html = await res.text();
  console.log("HTML Length:", html.length);
  const startIdx = html.indexOf("Something went wrong");
  if (startIdx !== -1) {
    console.log('Found "Something went wrong"!');
    console.log(html.substring(startIdx - 200, startIdx + 800));
  } else {
    console.log('No "Something went wrong" text found in raw HTML of 5177.');
    // Let's print occurrences of 'error' to see what matched
    let pos = 0;
    while ((pos = html.indexOf("error", pos)) !== -1) {
      console.log(`Match at ${pos}:`, html.substring(pos - 30, pos + 30));
      pos += 5;
    }
  }
}
run();
