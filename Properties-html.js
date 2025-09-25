/**
 * Project: Pro.js - Custom <pro> Property Block Parser
 * Version: 1.0.0
 * Author: Daniel2gg
 * License: MIT
 * Copyright (c) 2025 Daniel2gg
 *
 * Description:
 * This script enables the use of <pro> blocks in HTML, allowing developers
 * to define element properties (similar to CSS) using a custom syntax.
 * Each rule inside <pro> is parsed and applied as a JavaScript property
 * directly to the selected DOM elements.
 *
 * Example Usage:
 * <pro>
 * #myButton {
 *   innerText = "Click me!";
 *   style.backgroundColor = "lightblue";
 *   onclick = () => alert("Button clicked!");
 * }
 * </pro>
 *
 * Repository: https://github.com/daniel2gg/properties-html
 */
//so that <pro> does not appear as a custom paragraph
 document.querySelectorAll("pro").forEach(el => {
  el.style.display = "block";
});
// So that <pro> is considered a block element (not a paragraph)
customElements.define("pro", class extends HTMLElement {});
// Parser <pro>
document.querySelectorAll("pro").forEach(block => {
  let content = block.innerText.trim();
  let rules = content.split("}");

  rules.forEach(rule => {
    if (!rule.trim()) return;

    let [selector, body] = rule.split("{");
    if (!selector || !body) return;

    selector = selector.trim();
    body = body.trim();

    // Bisa banyak elemen sesuai selector
    document.querySelectorAll(selector).forEach(target => {
      body.split("\n").forEach(line => {
        line = line.trim();
        if (!line) return;

        try {
          // langsung eksekusi sebagai properti element
          eval("target." + line);
        } catch (e) {
          console.error("Error di:", line, e);
        }
      });
    });
  });
});
