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
 * Repository: https://github.com/your-username/pro-block
 */
 
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
});        if (inSingle && ch === "'") inSingle = false;
        else if (inDouble && ch === '"') inDouble = false;
        else if (inBack && ch === '`') inBack = false;
        continue;
      }
      if (inSingle || inDouble || inBack) continue;
      if (ch === '{') depth++;
      else if (ch === '}') depth = Math.max(0, depth - 1);
      else if (ch === '(') paren++;
      else if (ch === ')') paren = Math.max(0, paren - 1);
      else if (ch === ';' && depth === 0 && paren === 0) {
        out.push(cur.trim());
        cur = '';
      }
    }
    if (cur.trim()) out.push(cur.trim());
    return out;
  }

  // Apply one <pro> / <pro-block> content to DOM targets
  function applyBlock(block) {
    const content = (block.textContent || '').trim();
    if (!content) return;
    // split rules by '}' (simple) but handle extra '{' tokens by re-join
    const rawRules = content.split('}').map(s => s.trim()).filter(Boolean);
    rawRules.forEach(rule => {
      const idx = rule.indexOf('{');
      if (idx === -1) return;
      const selectorText = rule.slice(0, idx).trim();
      const bodyText = rule.slice(idx + 1).trim();
      if (!selectorText || !bodyText) return;
      // support multiple selectors separated by comma
      const selectors = selectorText.split(',').map(s => s.trim()).filter(Boolean);
      selectors.forEach(sel => {
        try {
          const nodeList = document.querySelectorAll(sel);
          if (!nodeList || nodeList.length === 0) return;
          nodeList.forEach(target => {
            const stmts = splitTopLevelStatements(bodyText);
            stmts.forEach(statement => {
              if (!statement) return;
              // ensure no trailing semicolon double
              const stmt = statement.replace(/;+\s*$/, '');
              try {
                // prefix with "target." so users can write `innerText = "..."` or `style.color = "red"`
                // e.g. it executes: target.innerText = "..."
                // Note: this is a pragmatic approach; complex statements that declare new var/const
                // at top-level should be avoided inside pro blocks.
                // Use eval (intentionally) — caller must ensure content is safe.
                eval('target.' + stmt);
              } catch (err) {
                console.error('Properties-html: eval error on statement:', stmt, err, { selector: sel, target });
              }
            });
          });
        } catch (e) {
          console.error('Properties-html: selector error:', sel, e);
        }
      });
    });
  }

  // Custom element class
  class ProBlock extends HTMLElement {
    connectedCallback() {
      try { applyBlock(this); } catch (e) { console.error('Properties-html: applyBlock failed', e); }
    }
  }

  // Define custom element (name must contain a hyphen)
  try {
    if (window.customElements && !customElements.get('pro-block')) {
      customElements.define('pro-block', ProBlock);
    }
  } catch (e) {
    console.warn('Properties-html: customElements.define failed', e);
  }

  // Upgrade legacy <pro> tags by replacing them with <pro-block>
  function upgradeLegacyPro() {
    document.querySelectorAll('pro').forEach(old => {
      try {
        const nb = document.createElement('pro-block');
        // preserve whitespace text content exactly as is
        nb.innerHTML = old.innerHTML;
        old.replaceWith(nb);
        // connectedCallback will run and parse
      } catch (e) {
        console.error('Properties-html: upgradeLegacyPro error', e);
      }
    });
  }

  // Run on ready
  function init() {
    upgradeLegacyPro();
    // Also apply to any static <pro-block> elements that were present before definition
    document.querySelectorAll('pro-block').forEach(b => {
      try { applyBlock(b); } catch (e) {}
    });
    // ensure default display so it behaves like a block container
    try {
      const s = document.createElement('style');
      s.textContent = 'pro, pro-block { display:block; }';
      (document.head || document.documentElement).appendChild(s);
    } catch (e) {}
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  // small note: avoid loading <pro> content from untrusted sources (eval risk)
})();    selector = selector.trim();
    body = body.trim();

    
    document.querySelectorAll(selector).forEach(target => {
      body.split("\n").forEach(line => {
        line = line.trim();
        if (!line) return;

        try {
          
          eval("target." + line);
        } catch (e) {
          console.error("Error in:", line, e);
        }
      });
    });
  });
});
