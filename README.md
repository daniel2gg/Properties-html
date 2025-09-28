# 🌐 Properties-html  

[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)  
[![JSDelivr](https://data.jsdelivr.com/v1/package/gh/daniel2gg/Properties-html/badge)](https://www.jsdelivr.com/package/gh/daniel2gg/Properties-html)  

> ✨ A lightweight custom `<pro>` property block parser for HTML.  
> Define element properties directly in markup, similar to CSS — but applied as JavaScript.  

---

## 📖 Features
- 🔹 Use `<style type="prop>` blocks in your HTML to set element properties.  
- 🔹 Supports `id`, `class`, and `tag` selectors.  
- 🔹 Apply multiple rules in a single `<style type="prop">`.  
- 🔹 Zero dependencies, just vanilla JS.  
- 🔹 Works with GitHub + jsDelivr for CDN hosting.  

---

## 🚀 Example Usage  

**index.html**
```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>Properties-html Demo</title>
  <script src="https://cdn.jsdelivr.net/gh/daniel2gg/Properties-html@main/Properties-html.js"></script>
</head>
<body>
  <button id="hi"></button>
  <button class="test"></button>
  <p class="hello"></p>

  <style type="prop">
  #hi(
    innerText = "Klik saya!";
    style.backgroundColor = "lightblue";
    onclick = () => alert("Halo dari #hi!");
  )

  .test(
    innerText = "Tombol Class";
    style.backgroundColor = "lightgreen";
  )

  .hello (
    innerText = "Paragraf otomatis!";
    style.color = "red";
  )
  </style>


</body>
  </html>
---

## 📦 Installation  

Add the following script tag to your HTML file:  

```html
<script src="https://cdn.jsdelivr.net/gh/daniel2gg/Properties-html@main/Properties-html.js"></script>
```

Or, if you prefer a fixed release/tag for stability:  

```html
<script src="https://cdn.jsdelivr.net/gh/daniel2gg/Properties-html@v1.0.0/Properties-html.js"></script>
```

---

## 🛠 Development  

Clone this repository and edit locally:  

```bash
git clone https://github.com/daniel2gg/Properties-html.git
cd Properties-html
```

---

## 📄 License  

This project is licensed under the **MIT License** – see the [LICENSE](LICENSE) file for details.  

---

✨ Made with ❤️ by 
**Daniel2gg**
