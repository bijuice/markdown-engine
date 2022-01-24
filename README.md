# React Markdown Engine

You can try out this web app using this link : https://markdown-engine-arehmtulla.herokuapp.com/

## Description:

This is a Markdown parser built using React that converts markdown into html and LaTeX. It also visualizes the html output.

Packages/Technologies:
- React
- Regex

#### Folder Structure
- App.js : main file
- utilities/parser.js : does all parsing

This app uses Regex to detect written markdown and then uses the built-in replace() function to replace the markdown with html or LaTeX. It uses a regexValues object to store all possible regex values then uses two different functions to return html or LaTeX. It parses the entirety of the Markdown spec but does not parse extended markdown.

## System Limitations

This system cannot parse extended Markdown

## Possible Improvements

- Implement Extended Markdown
- Add the possibility of downloading the output in the respective format.

## Installation Instructions

```
git clone https://github.com/bijuice/markdown-engine.git
cd ./markdown-engine/
npm install
```

## Usage

Run server:
```
cd ./markdown-engine/
npm run start
```
Navigate to localhost.
