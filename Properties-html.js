/**
 * Project: Pro.js - Custom <style type="prop"> Parser
 * Version: 1.0.1
 * Author: Daniel2gg
 * License: MIT
 *
 * Features:
 * - Multiple selector assignment in one block
 * - Index-based selector [n] (body, script, style counted)
 * - Auto-applies on load
 */
(function (global) {
  'use strict';

  function removeComments(text) {
    return text.replace(/\/\*[\s\S]*?\*\//g, '');
  }

  function extractBlocks(text) {
    const blocks = [];
    let i = 0, len = text.length;
    while (i < len) {
      while (i < len && /\s/.test(text[i])) i++;
      if (i >= len) break;
      let selStart = i;
      while (i < len && text[i] !== '(') i++;
      if (i >= len) break;
      const selectorText = text.slice(selStart, i).trim();
      i++;
      let depth = 1;
      let inDouble = false, inSingle = false, inTag = false;
      let contentStart = i;
      for (; i < len; i++) {
        const ch = text[i], prev = text[i - 1];
        if (ch === '"' && prev !== '\\' && !inSingle && !inTag) inDouble = !inDouble;
        else if (ch === "'" && prev !== '\\' && !inDouble && !inTag) inSingle = !inSingle;
        else if (!inDouble && !inSingle) {
          if (ch === '<') inTag = true;
          else if (ch === '>') inTag = false;
          else if (!inTag) {
            if (ch === '(') depth++;
            else if (ch === ')') {
              depth--;
              if (depth === 0) {
                const content = text.slice(contentStart, i);
                i++;
                while (i < len && /\s/.test(text[i])) i++;
                if (text[i] === ',') { i++; while (i < len && /\s/.test(text[i])) i++; }
                blocks.push({ selectorText, content });
                break;
              }
            }
          }
        }
      }
    }
    return blocks;
  }

  function splitProps(content) {
    const parts = [];
    let buf = '', inDouble = false, inSingle = false, inTag = false;
    for (let i = 0; i < content.length; i++) {
      const ch = content[i], prev = content[i - 1];
      if (ch === '"' && prev !== '\\' && !inSingle && !inTag) inDouble = !inDouble;
      else if (ch === "'" && prev !== '\\' && !inDouble && !inTag) inSingle = !inSingle;
      else if (!inDouble && !inSingle) {
        if (ch === '<') inTag = true;
        else if (ch === '>') inTag = false;
        else if (!inTag && ch === ',') {
          parts.push(buf); buf = ''; continue;
        }
      }
      buf += ch;
    }
    if (buf.trim() !== '') parts.push(buf);
    return parts.map(p => p.trim()).filter(Boolean);
  }

  function appendHTMLLiteral(parent, htmlString) {
    const tmp = document.createElement('div');
    tmp.innerHTML = htmlString;
    while (tmp.firstChild) parent.appendChild(tmp.firstChild);
  }

  function getElementsByIndex(index) {
    // Hitung semua elemen dalam body (body, script, style, input, dll)
    const all = [document.body, ...document.body.querySelectorAll('*')];
    return all[index] ? [all[index]] : [];
  }

  function applyBlock(selectorText, content) {
    const selectors = selectorText.split(',').map(s => s.trim()).filter(Boolean);
    if (!selectors.length) return;

    selectors.forEach(sel => {
      let elements = [];

      // Index-based selector [n]
      const indexMatch = sel.match(/^\[(\d+)\]$/);
      if (indexMatch) {
        const idx = parseInt(indexMatch[1], 10);
        elements = getElementsByIndex(idx);
      } else {
        try {
          elements = document.querySelectorAll(sel);
        } catch {
          elements = [];
        }
      }

      if (!elements.length) return;

      // Sub-selector support (backtick) sederhana
      if (/=\s*`/.test(content)) {
        const subs = splitProps(content);
        subs.forEach(sub => {
          const eqIndex = sub.indexOf('=');
          if (eqIndex === -1) return;
          const subSel = sub.slice(0, eqIndex).trim();
          let subContent = sub.slice(eqIndex + 1).trim();
          if (subContent.startsWith('`') && subContent.endsWith('`')) {
            subContent = subContent.slice(1, -1);
          }
          applyBlock(subSel, subContent);
        });
        return;
      }

      // Normal property assignment
      const propParts = splitProps(content);
      elements.forEach(el => {
        propParts.forEach(part => {
          if (!part) return;
          const startsWithLT = part[0] === '<';
          const endsWithGT = part[part.length - 1] === '>';
          if (startsWithLT && endsWithGT) {
            appendHTMLLiteral(el, part);
            return;
          }
          const eqIndex = part.indexOf('=');
          if (eqIndex === -1) return;
          const key = part.slice(0, eqIndex).trim();
          let val = part.slice(eqIndex + 1).trim();
          if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
            val = val.slice(1, -1);
          }
          try { el[key] = val; } catch {}
        });
      });
    });
  }

  function applyPropStyles() {
    const styleTags = document.querySelectorAll('style[type="prop"]');
    styleTags.forEach(styleTag => {
      let text = styleTag.textContent || '';
      text = removeComments(text);
      const blocks = extractBlocks(text);
      blocks.forEach(b => applyBlock(b.selectorText, b.content));
    });
  }

  // Auto-run on load
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', applyPropStyles);
  } else {
    applyPropStyles();
  }

  global.Prop = { applyPropStyles };

})(typeof window !== 'undefined' ? window : this);
