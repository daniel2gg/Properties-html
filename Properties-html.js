/**
 * Project: Pro.js - Custom <pro> Property Block Parser
 * Version: 1.0.1
 * Author: Daniel2gg
 * License: MIT
 *
 *!
 * prop.js — style[type="prop"] parser
 * 
 * Auto-applies on load
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

  function applyBlock(selectorText, content) {
    const selectors = selectorText.split(',').map(s => s.trim()).filter(Boolean);
    if (!selectors.length) return;
    const propParts = splitProps(content);
    selectors.forEach(sel => {
      const elements = document.querySelectorAll(sel);
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
          if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) val = val.slice(1, -1);
          try { el[key] = val; } catch (e) {}
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

  // Automatically run on load
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', applyPropStyles);
  } else {
    applyPropStyles();
  }

  global.Prop = { applyPropStyles };

})(typeof window !== 'undefined' ? window : this);
