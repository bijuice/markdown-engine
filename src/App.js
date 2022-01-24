import { useState } from "react";
import { htmlMarkdownEngine, latexMarkdownEngine } from "./utlities/parser";

function App() {
  const [input, setInput] = useState("");

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
          placeholder="Write your Markdown here"
          title="Markdown"
          name="markdown"
          id="markdown"
          cols="30"
          rows="10"
          onChange={(e) => setInput(e.target.value)}
          value={input}
          spellCheck={false}
          style={{ resize: "none" }}
        >
          Markdown
        </textarea>

        <textarea
          placeholder="Raw HTML Output"
          name="output"
          id="output"
          cols="30"
          rows="10"
          style={{ resize: "none" }}
          value={htmlMarkdownEngine(input)}
          spellCheck={false}
          disabled
        ></textarea>

        <textarea
          placeholder="LaTeX Output"
          name="output"
          id="output"
          cols="30"
          rows="10"
          style={{ resize: "none" }}
          value={latexMarkdownEngine(input)}
          spellCheck={false}
          disabled
        ></textarea>
      </div>

      <h1>HTML Output</h1>
      <div
        dangerouslySetInnerHTML={{ __html: htmlMarkdownEngine(input) }}
        style={{ border: "0.5px solid", padding: 20, minHeight: 500 }}
      ></div>
    </div>
  );
}

export default App;
