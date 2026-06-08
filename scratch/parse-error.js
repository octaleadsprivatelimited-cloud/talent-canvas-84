async function run() {
  const res = await fetch("http://localhost:5173/");
  const html = await res.text();
  console.log("HTML Length:", html.length);
  const startIdx = html.indexOf("Something went wrong");
  if (startIdx !== -1) {
    console.log('Found "Something went wrong". Context around it:');
    console.log(html.substring(startIdx - 200, startIdx + 800));
  } else {
    console.log('No "Something went wrong" text found in the raw HTML.');
  }
}
run();
