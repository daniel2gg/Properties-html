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
document.querySelectorAll("pro").forEach(block => {
  let content = block.textContent.trim(); // ganti innerText → textContent
  let rules = content.split("}");

  rules.forEach(rule => {
    if (!rule.trim()) return;

    let [selector, body] = rule.split("{");
    if (!selector || !body) return;

    selector = selector.trim();
    body = body.trim();

    document.querySelectorAll(selector).forEach(target => {
      body.split("\n").forEach(line => {
        line = line.trim();
        if (!line) return;

        try {
          eval("target." + line);
        } catch (e) {
          console.error("Error di:", line, e);
        }
      });
    });
  });
});
