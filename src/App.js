import { useState } from "react";

//groups all regex values into single object for reusability
const regexValues = {
  //heading values
  h1: /^# (.*$)/gim,
  h2: /^## (.*$)/gim,
  h3: /^### (.*$)/gim,
  h4: /^#### (.*$)/gim,
  h5: /^##### (.*$)/gim,
  h6: /^###### (.*$)/gim,

  //ordered list items
  firstOrderedItem: /(\d+\. .*\n\d)/gim,
  orderedListItem: /\d+\. (.*)/gim,
  lastOrderedItem: /(\d+\. .*\n)\n/gim,

  //unordered list
  firstUnorderedItem: /([*|\-|+] .*\n[*|\-|+])/gim,
  lastUnorderedItem: /([*|\-|+] .*\n)\n/gim,
  unorderedListItem: /[*|\-|+] (.*)/gim,

  //text formating
  italic: /\*(.*)\*/gi,
  bold: /\*\*(.*)\*\*/gi,
  strikethrough: /~~(.*)~~/gi,

  //images
  imageValues: /!\[(.*)\]\((.*)"(.*)"\)/gim,

  //links
  linkValues: /\[(.*)\]\((.*)\)/gim,

  //code block
  codeBlock: /^```((.|\n)*)```/gim,

  //code variables
  variable: /(^\w\s=.*)/gim,

  //inline code
  inlineCode: /`(.*)`/gim,

  // horizontal rule
  horizontalRule: /(^(\*|-|_){3,})/gim,

  // carriage return
  carriageReturn: /\n/gim,

  //block quote
  blockquote: /^> (.*)/gim,

  //paragraph
};

function App() {
  const [input, setInput] = useState("");

  //this function parses an input and returns html
  const htmlMarkdownEngine = (input) => {
    //headings
    input = input
      .replace(regexValues.h1, `<h1>$1</h1> \n`)
      .replace(regexValues.h2, `<h2>$1</h2> \n`)
      .replace(regexValues.h3, `<h3>$1</h3> \n`)
      .replace(regexValues.h4, `<h4>$1</h4> \n`)
      .replace(regexValues.h5, `<h5>$1</h5> \n`)
      .replace(regexValues.h6, `<h6>$1</h6> \n`);

    //handles first ordered list item. Looks for a digit followed by return followed by another digit and adds <ol> tag before
    input = input.replace(regexValues.firstOrderedItem, `<ol>\n$1`);
    //handles last ordered list item. Looks for two return characters and prepends </ol> tag after
    input = input.replace(regexValues.lastOrderedItem, `$1</ol>\n`);
    //handles single ordered list item
    input = input.replace(regexValues.orderedListItem, `  <li>$1</li>`);

    //unordered list items
    input = input.replace(regexValues.firstUnorderedItem, `<ul>\n$1`);
    input = input.replace(regexValues.lastUnorderedItem, `$1</ul>\n`);
    input = input.replace(regexValues.unorderedListItem, `  <li>$1</li>`);

    //text formating
    input = input
      .replace(regexValues.bold, `<b>$1</b> \n`)
      .replace(regexValues.italic, `<i>$1</i> \n`)
      .replace(regexValues.strikethrough, `<strike>$1</strike> \n`);

    //images: captures value within square bracket as $1 for alt, value in parentheses as $2 for src and $3 for title
    input = input.replace(
      regexValues.imageValues,
      `<img src=$2 alt="$1"> $3 \n`
    );

    //links: captures value in square bracket as $1 for link text and value in parentheses for the href
    input = input.replace(regexValues.linkValues, `<a href=$2>$1</a> \n`);

    //code variables
    input = input.replace(regexValues.variable, `<var>$1</var>`);

    // //inline code
    // input = input.replace(regexValues.inlineCode, `<code>$1</code>`);

    //code block
    input = input.replace(
      regexValues.codeBlock,
      `<pre>\n  <code>\n$1\n</code>\n</pre>`
    );

    //horizontal rule
    input = input.replace(regexValues.horizontalRule, `<hr>`);

    //blockquote
    input = input.replace(
      regexValues.blockquote,
      `<blockquote>$1</blockquote>`
    );

    // // carriage return
    // input = input.replace(regexValues.carriageReturn, `\n<br>\n`);

    const htmlOutput = input;

    return htmlOutput;
  };

  const latexMarkdownEngine = (input) => {
    //headings
    input = input
      .replace(regexValues.h1, `\\title{$1} \n`)
      .replace(regexValues.h2, `\\author{$1} \n`)
      .replace(regexValues.h3, `\\date{$1} \n`)
      .replace(regexValues.h4, `\\maketitle \n\n$1 \n`);

    //handles single ordered list item
    input = input.replace(regexValues.firstOrderedItem, `begin{enumerate}\n$1`);
    input = input.replace(regexValues.lastOrderedItem, `$1end{enumerate}\n`);
    input = input.replace(regexValues.orderedListItem, `  \\item $1`);

    //unordered list item
    input = input.replace(
      regexValues.firstUnorderedItem,
      `begin{enumerate}\n$1`
    );
    input = input.replace(regexValues.lastUnorderedItem, `$1end{enumerate}\n`);
    input = input.replace(regexValues.unorderedListItem, `  \\item $1`);

    //text formating
    input = input
      .replace(regexValues.bold, `textbf{$1} \n`)
      .replace(regexValues.italic, `<i>$1</i> \n`)
      .replace(regexValues.strikethrough, `<strike>$1</strike> \n`);

    //images: captures value within square bracket as $1 for alt, value in parentheses as $2 for src and $3 for title
    input = input.replace(
      regexValues.imageValues,
      `<img src=$2 alt="$1"> $3 \n`
    );

    //links: captures value in square bracket as $1 for link text and value in parentheses for the href
    input = input.replace(regexValues.linkValues, ` \n`);

    const latexOutput = input;

    return latexOutput;
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
