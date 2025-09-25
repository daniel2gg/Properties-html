# 🌐 Pro.js  

[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)  
[![JSDelivr](https://data.jsdelivr.com/v1/package/gh/daniel2gg/pro-block/badge)](https://www.jsdelivr.com/package/gh/daniel2gg/pro-block)  

> ✨ A lightweight custom `<pro>` property block parser for HTML.  
> Define element properties directly in markup, similar to CSS — but applied as JavaScript.  

---

## 📖 Features
- 🔹 Use `<pro>` blocks in your HTML to set element properties.  
- 🔹 Supports `id`, `class`, and `tag` selectors.  
- 🔹 Apply multiple rules in a single `<pro>`.  
- 🔹 Zero dependencies, just vanilla JS.  
- 🔹 Works with GitHub + jsDelivr for CDN hosting.  

---

## 🚀 Example Usage  

**index.html**
```html
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>Pro.js Demo</title>
</head>
<body>
  <button id="hi"></button>
  <button class="test"></button>
  <p class="hello"></p>

  <pro>
  #hi {
    innerText = "Klik saya!";
    style.backgroundColor = "lightblue";
    onclick = () => alert("Halo dari #hi!");
  }

  .test {
    innerText = "Tombol Class";
    style.backgroundColor = "lightgreen";
  }

  .hello {
    innerText = "Paragraf otomatis!";
    style.color = "red";
  }
  </pro>

  <script src="https://cdn.jsdelivr.net/gh/daniel2gg/pro-block@main/pro.js"></script>
</body>
</html>
