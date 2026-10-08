// PDF export. buildPDF(D, st, title) -> jsPDF document (A4, two columns).
// D = question data, st = {info, a, o} saved state. Needs js/vendor/jspdf.umd.min.js.
// Marks are drawn as vector shapes so they look the same on every device and need no special fonts.
function buildPDF(D, st, title) {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF({ unit: "mm", format: "a4" });

  const M = 10, PW = 210, BOTTOM = 284, GAP = 8, TOP2 = 12;
  const CW = (PW - 2 * M - GAP) / 2;       // column width
  const LH = 4;                            // line height
  const IND = 6.5;                         // question number indent
  const OIND = IND + 4.6;                  // option text indent
  const colX = [M, M + CW + GAP];
  const info = st.info || {}, ans = st.a || {}, typed = st.o || {};

  const gray = (v) => doc.setTextColor(v);
  const font = (style, size) => { doc.setFont("helvetica", style); doc.setFontSize(size); };
  const wrap = (txt, w, style, size) => { font(style, size); return doc.splitTextToSize(String(txt), w); };

  // ---- non-Latin text (e.g. an Arabic name): draw with the browser's own fonts, place as an image
  const latin = (t) => /^[\x20-\xFF]*$/.test(t);
  const textImg = (t, x, base, maxW, px) => {
    if (typeof document === "undefined") return false;
    try {
      const c = document.createElement("canvas"), g = c.getContext("2d"), F = "bold " + px + "px Tahoma, Arial, sans-serif";
      g.font = F; const w = Math.ceil(g.measureText(t).width) + 4, h = Math.ceil(px * 1.4);
      c.width = w; c.height = h; g.font = F; g.fillStyle = "#000"; g.textBaseline = "alphabetic"; g.fillText(t, 2, px);
      const k = 12.5; let mw = w / k, mh = h / k; if (mw > maxW) { mh *= maxW / mw; mw = maxW; }
      doc.addImage(c.toDataURL("image/png"), "PNG", x, base - (px / k) * (mh / (h / k)), mw, mh);
      return true;
    } catch (e) { return false; }
  };

  // ---- vector marks
  const tick = (x, y) => { doc.setLineWidth(0.4); doc.setDrawColor(0); doc.line(x + 0.1, y - 1.0, x + 0.9, y - 0.2); doc.line(x + 0.9, y - 0.2, x + 2.4, y - 2.3); };
  const cross = (x, y) => { doc.setLineWidth(0.4); doc.setDrawColor(0); doc.line(x + 0.2, y - 2.2, x + 2.2, y - 0.1); doc.line(x + 2.2, y - 2.2, x + 0.2, y - 0.1); };
  const radio = (cx, cy, on) => { doc.setDrawColor(0); doc.setLineWidth(0.3); if (on) { doc.setFillColor(0); doc.circle(cx, cy, 1.35, "FD"); } else doc.circle(cx, cy, 1.35, "S"); };

  // ---- text with inline ✔ / ✖ marks (used for the instruction lines)
  const atoms = (str) => {
    const out = []; let sp = false;
    str.split(/([✔✖])/).forEach((p) => {
      if (p === "✔" || p === "✖") { out.push({ g: p, sp }); sp = false; return; }
      p.split(/(\s+)/).forEach((t) => { if (!t) return; if (/^\s+$/.test(t)) sp = true; else { out.push({ w: t, sp }); sp = false; } });
    });
    return out;
  };
  const layoutAtoms = (str, w, size) => {
    font("normal", size);
    const spw = doc.getTextWidth(" "), lines = [[]]; let cur = 0;
    atoms(str).forEach((a) => {
      const aw = a.g ? 2.6 : doc.getTextWidth(a.w);
      const add = cur > 0 && a.sp ? spw : 0;
      if (a.sp && cur > 0 && cur + add + aw > w) { lines.push([]); cur = 0; }
      const x = cur + (cur > 0 && a.sp ? spw : 0);
      lines[lines.length - 1].push({ ...a, x }); cur = x + aw;
    });
    return lines;
  };

  // ---- measure + build the list of blocks (each: h, keep-with-next flag, draw(x,y))
  const items = [];
  let n = 0;
  D.forEach((s) => {
    items.push({ keep: true, h: 7.5, draw(x, y) { font("bold", 10.5); gray(0); doc.text(s.t, x, y + 5.6); } });
    const il = layoutAtoms(s.i, CW, 8.5);
    items.push({
      keep: true, h: il.length * 3.7 + 1.6, draw(x, y) {
        font("normal", 8.5); gray(70);
        il.forEach((ln, k) => { const by = y + 3 + k * 3.7; ln.forEach((a) => { if (a.g) { a.g === "✔" ? tick(x + a.x, by) : cross(x + a.x, by); } else doc.text(a.w, x + a.x, by); }); });
        gray(0);
      }
    });

    let pc = "";
    s.q.forEach((it) => {
      n++;
      const num = n, tf = typeof it === "string", qt = tf ? it : it[0], cx = tf ? "" : it[2] || "";
      const v = ans[num];

      if (cx && cx !== pc) {
        const cl = wrap(cx, CW - 5, "italic", 8.2);
        items.push({
          keep: true, h: cl.length * 3.5 + 4.5, draw(x, y) {
            doc.setFillColor(240); doc.rect(x, y, CW, cl.length * 3.5 + 3, "F");
            doc.setFillColor(90); doc.rect(x, y, 0.8, cl.length * 3.5 + 3, "F");
            font("italic", 8.2); gray(40); doc.text(cl, x + 3, y + 3.6, { lineHeightFactor: 1.2 }); gray(0);
          }
        });
      }
      pc = cx;

      const ql = wrap(qt, CW - IND, "normal", 9);
      const qh = ql.length * LH;
      let oh = 0, drawOpts;

      if (tf) {
        oh = LH + 0.8;
        drawOpts = (x, y) => {
          const labels = [["Correct", 1, tick], ["Incorrect", 0, cross]];
          let ox = x + IND;
          labels.forEach(([lab, val, glyph]) => {
            const on = v === val, by = y + 3;
            font(on ? "bold" : "normal", 9);
            const w = 3.2 + 1.4 + 2.8 + 1.3 + doc.getTextWidth(lab) + 1;
            if (on) { doc.setFillColor(232); doc.rect(ox - 0.8, y - 0.3, w + 0.8, LH + 0.4, "F"); }
            radio(ox + 1.35, by - 1.1, on);
            glyph(ox + 4.6, by);
            gray(0); font(on ? "bold" : "normal", 9);
            doc.text(lab, ox + 8.7, by);
            ox += w + 9;
          });
        };
      } else {
        const opts = it[1].map((o, j) => {
          let t = o;
          if (o.includes("answer is")) t = o.replace(".....", typed[num] && v === j ? typed[num] : "..........");
          return { j, lines: wrap(t, CW - OIND, v === j ? "bold" : "normal", 9) };
        });
        opts.forEach((o) => { o.h = o.lines.length * LH + 0.9; oh += o.h; });
        drawOpts = (x, y) => {
          let oy = y;
          opts.forEach((o) => {
            const on = v === o.j;
            if (on) { doc.setFillColor(232); doc.rect(x + IND - 1.2, oy - 0.2, CW - IND + 1.2, o.h - 0.5, "F"); }
            radio(x + IND + 1.35, oy + 3 - 1.1, on);
            font(on ? "bold" : "normal", 9); gray(0);
            o.lines.forEach((ln, k) => doc.text(ln, x + OIND, oy + 3 + k * LH));
            oy += o.h;
          });
        };
      }

      items.push({
        keep: false, h: 1.8 + qh + 0.8 + oh + 1.2, draw(x, y, first) {
          if (!first) { doc.setDrawColor(205); doc.setLineWidth(0.15); doc.line(x, y + 0.3, x + CW, y + 0.3); }
          const y0 = y + 1.8;
          font("bold", 9); gray(0); doc.text(num + ".", x, y0 + 3);
          font("normal", 9); ql.forEach((ln, k) => doc.text(ln, x + IND, y0 + 3 + k * LH));
          drawOpts(x, y0 + qh + 0.8);
        }
      });
    });
  });

  // ---- page 1 header
  font("bold", 14); gray(0);
  doc.text(title, M, 15);
  const fields = [["Name", "name"], ["ID", "id"]];
  const fw = (PW - 2 * M - 6) / 2;
  fields.forEach(([lab, key], k) => {
    const x = M + k * (fw + 6);
    font("normal", 7.5); gray(110); doc.text(lab, x, 22);
    font("bold", 10); gray(0);
    const raw = String(info[key] || "");
    if (raw && !latin(raw)) { if (!textImg(raw, x, 27.3, fw, 44)) doc.text("?", x, 27.3); }
    else doc.text(doc.splitTextToSize(raw, fw)[0] || "", x, 27.3);
    doc.setDrawColor(0); doc.setLineWidth(0.25); doc.line(x, 28.6, x + fw, 28.6);
  });
  const FIRST_TOP = 34;

  // ---- flow blocks into columns / pages
  const tops = [FIRST_TOP];           // column top per page (for the divider line)
  let page = 1, col = 0, y = FIRST_TOP, atTop = true, colTop = FIRST_TOP;
  const nextCol = () => {
    if (col === 0) { col = 1; }
    else { doc.addPage(); page++; col = 0; tops.push(TOP2); }
    colTop = tops[page - 1]; y = colTop; atTop = true;
  };
  items.forEach((it, i) => {
    let need = it.h, j = i;
    while (items[j].keep && j + 1 < items.length) { j++; need += items[j].h; }
    if (y + need > BOTTOM && !atTop) nextCol();
    it.draw(colX[col], y, atTop);
    y += it.h; atTop = false;
  });

  // ---- column dividers + footer on every page
  const total = doc.getNumberOfPages();
  for (let p = 1; p <= total; p++) {
    doc.setPage(p);
    doc.setDrawColor(200); doc.setLineWidth(0.2);
    doc.line(M + CW + GAP / 2, tops[p - 1], M + CW + GAP / 2, BOTTOM);
    font("normal", 7.5); gray(120);
    const who = [info.name, info.id].filter((v) => v && latin(String(v))).join(" · ");
    doc.text(who, M, 291);
    doc.text("Page " + p + " of " + total, PW - M, 291, { align: "right" });
  }
  return doc;
}