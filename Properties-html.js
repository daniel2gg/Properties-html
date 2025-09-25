/**
 * Project: Pro.js - Custom <pro> Property Block Parser
 * Version: 1.0.1
 * Author: Daniel2gg
 * License: MIT
 *
 * Description:
 *   Parser untuk <pro> yang auto apply properti ke elemen target
 *   + auto sembunyikan block <pro> supaya gak muncul text di layar.
 */
(function () {
  document.querySelectorAll("pro").forEach(block => {
    // SEMBUNYIKAN <pro>
    block.style.display = "none";

    // AMBIL ISI TEXT
    let content = block.textContent.trim();
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
            // eksekusi properti langsung
            eval("target." + line);
          } catch (e) {
            console.error("Error di:", line, e);
          }
        });
      });
    });
  });
})();
