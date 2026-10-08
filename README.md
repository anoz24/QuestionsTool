# Assignment Sheets

Interactive answer-sheet tool for assignments: answer MCQ and True/False questions on screen, then download a PDF with the full questions and your answers marked.

**Live site:** `https://<your-username>.github.io/<repo-name>/` *(replace with your link)*

## How it works

1. Open a chapter sheet from the homepage.
2. Fill in your info (name, ID, section, date) and tap your answers.
3. Press **Download PDF**. The file has your info, every question, and your marked answers in a two-column A4 layout. If your name, ID or any answers are missing, it asks before downloading.

Answers and info are saved automatically in your own browser on that device. Nothing is sent anywhere.

## Project structure

```
index.html                  homepage listing the sheets
chapter1_answer_sheet.html  Chapter 1 page (markup only)
css/style.css               shared styles (also used if someone prints with Ctrl+P)
js/app.js                   engine: rendering, saving, progress, dialogs, download button
js/pdf.js                   builds the PDF (layout of the downloaded file)
js/vendor/jspdf.umd.min.js  jsPDF library (MIT licence), bundled so no internet is needed
js/chapter1.js              Chapter 1 questions
```

## Adding a new chapter

1. Copy `js/chapter1.js` to `js/chapter2.js`. Replace the questions and change the storage key (`"acc1"`) to a new one such as `"sheet2"`. Reusing a key makes two chapters share saved answers.
2. Set `title` (shown at the top of the PDF) and `file` (start of the PDF file name) in `window.SHEET` at the bottom of the file.
3. Copy `chapter1_answer_sheet.html` to `chapter2_answer_sheet.html` and point its script tag to `js/chapter2.js`. Update the `<title>` too.
4. In `index.html`, copy the `<a class="card">` block and change the link and text.

### Question format (in `js/chapter*.js`)

- A plain string is a True/False question.
- `m("Question", "Option 1", "Option 2", ...)` is a multiple-choice question.
- `g("Question", "10,000", "20,000", "30,000", CONTEXT)` is an MCQ with EGP amounts plus a "None of the above" option. The last argument is an optional shared paragraph shown once above a group of related questions.

## Hosting

Static files only, no build step. The PDF is created in the visitor's browser, so nothing is uploaded. Works on GitHub Pages (**Settings → Pages**, main branch, root folder), Netlify, Cloudflare Pages, or by opening `index.html` locally.