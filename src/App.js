import { useState } from "react";

function App() {
  const [input, setInput] = useState("");

  console.log(input);

  //this function parses an input and returns html
  const markdownEngine = (input) => {
    //heading tags
    const h1 = /^# (.*$)/gim;
    const h2 = /^## (.*$)/gim;
    const h3 = /^### (.*$)/gim;
    const h4 = /^#### (.*$)/gim;
    const h5 = /^##### (.*$)/gim;
    const h6 = /^###### (.*$)/gim;

    const headings = input
      .replace(h1, `<h1>$1</h1>`)
      .replace(h2, `<h2>$1</h2>`)
      .replace(h3, `<h3>$1</h3>`)
      .replace(h4, `<h4>$1</h4>`)
      .replace(h5, `<h5>$1</h5>`)
      .replace(h6, `<h6>$1</h6>`);

    //text formating
    const italic = /\*(.*)\*/gim;
    const bold = /\*\*(.*)\*\*/gim;
    const strikethrough = /~~(.*)~~/gim;

    const formating = headings
      .replace(bold, `<b>$1</b>`)
      .replace(italic, `<i>$1</i>`)
      .replace(strikethrough, `<strike>$1</strike>`);

    //images
    const imageValues = /!\[(.*)\]\((.*)"(.*)"\)/gim;
    const images = formating.replace(imageValues, `<img src=$2 alt="$1"> $3`);

    //links
    const linkValues = /\[(.*)\]\((.*)\)/gim;
    const links = images.replace(linkValues, `<a href=$2>$1</a>`);

    const htmlOutput = links;

    return htmlOutput;
  };

  return (
    <div className="App" style={{ margin: 50 }}>
      <h1>Markdown Engine</h1>

      <div
        style={{
          display: "grid",
          gridAutoFlow: "column",
          gridColumnGap: 50,
        }}
      >
        <textarea
          name="markdown"
          id="markdown"
          cols="30"
          rows="10"
          onChange={(e) => setInput(e.target.value)}
          value={input}
        ></textarea>
        <textarea
          name="output"
          id="output"
          cols="30"
          rows="10"
          style={{ paddingLeft: 30 }}
          value={markdownEngine(input)}
        ></textarea>
      </div>

      <h1>HTML Output</h1>
      <div dangerouslySetInnerHTML={{ __html: markdownEngine(input) }}></div>
    </div>
  );
}

export default App;
