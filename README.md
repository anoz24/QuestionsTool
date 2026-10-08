# Questions Tool
 
Interactive answer-sheet tool for assignments: answer MCQ and True/False questions on screen, then print the full questions with your answers marked.
 
## How it works
 
1. Open a chapter sheet from the homepage.
2. Fill in your info (name, ID, section, date) and tap your answers.
3. Press **Print** (or save as PDF). The printout has your info, every question, and your marked answers.
Answers and info are saved automatically in your own browser on that device. Nothing is sent anywhere.
 
## Project structure
 
```
index.html                  homepage listing the sheets
chapter1_answer_sheet.html  Chapter 1 page (markup only)
css/style.css               shared styles, including print styles
js/app.js                   engine: rendering, saving, progress, print
js/chapter1.js              Chapter 1 questions
```
 
## Adding a new chapter
 
1. Copy `js/chapter1.js` to `js/chapter2.js`. Replace the questions and change the storage key (`"acc1"`) to a new one such as `"acc2"`. Reusing a key makes two chapters share saved answers.
2. Copy `chapter1_answer_sheet.html` to `chapter2_answer_sheet.html` and point its script tag to `js/chapter2.js`. Update the `<title>` too.
3. In `index.html`, copy the `<a class="card">` block and change the link and text.
### Question format (in `js/chapter*.js`)
 
- A plain string is a True/False question.
- `m("Question", "Option 1", "Option 2", ...)` is a multiple-choice question.
- `g("Question", "10,000", "20,000", "30,000", CONTEXT)` is an MCQ with EGP amounts plus a "None of the above" option. The last argument is an optional shared paragraph shown once above a group of related questions.