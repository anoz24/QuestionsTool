// Generic answer-sheet engine. Needs window.SHEET = {key, data} from a chapter file.
let st = { info: {}, a: {}, o: {} };
try { Object.assign(st, JSON.parse(localStorage.getItem(window.SHEET.key) || "{}")) } catch (e) { }
const save = () => { try { localStorage.setItem(window.SHEET.key, JSON.stringify(st)) } catch (e) { } };
let n = 0, h = "";
D.forEach(s => {
    h += `<h2>${s.t}</h2><p class="ins">${s.i}</p>`; let pc = "";
    s.q.forEach(it => {
        n++; const tf = typeof it == "string", t = tf ? it : it[0], cx = tf ? "" : it[2] || "";
        if (cx && cx !== pc) h += `<div class="ctx">${cx}</div>`; pc = cx;
        let b;
        if (tf) b = `<div class="tf"><button data-i="${n}" data-v="1">✔</button><button data-i="${n}" data-v="0">✖</button></div>`;
        else b = it[1].map((o, j) => `<div class="o" data-i="${n}" data-v="${j}"><span class="m"></span><span>${o.includes("answer is") ? o.replace(".....", `<input class="fill" data-o="${n}">`) : o}</span></div>`).join("");
        h += `<div class="q" id="q${n}"><div class="qt"><b>${n}.</b> ${t}</div>${b}</div>`
    })
});
const app = document.getElementById("app"); app.innerHTML = h;
function paint() {
    let d = 0;
    for (let i = 1; i <= n; i++) {
        const q = document.getElementById("q" + i), v = st.a[i]; if (v !== undefined) d++;
        q.classList.toggle("done", v !== undefined);
        q.querySelectorAll("[data-v]").forEach(e => e.classList.toggle("sel", v !== undefined && +e.dataset.v === v));
        const f = q.querySelector(".fill"); if (f && document.activeElement !== f) f.value = st.o[i] || ""
    }
    document.getElementById("pt").textContent = d + " / " + n + " answered";
    document.getElementById("pf").style.width = (d / n * 100) + "%"
}
document.querySelectorAll("[data-f]").forEach(e => { e.value = st.info[e.dataset.f] || ""; e.oninput = () => { st.info[e.dataset.f] = e.value; save() } });
app.addEventListener("click", ev => {
    const e = ev.target.closest("[data-v]"); if (!e) return;
    const i = e.dataset.i, v = +e.dataset.v;
    if (ev.target.tagName == "INPUT") st.a[i] = v; else if (st.a[i] === v) delete st.a[i]; else st.a[i] = v;
    save(); paint()
});
app.addEventListener("input", ev => {
    const f = ev.target.closest("[data-o]"); if (!f) return;
    const i = f.dataset.o; st.o[i] = f.value; st.a[i] = 4; save(); paint()
});
document.getElementById("nx").onclick = () => {
    const q = [...app.querySelectorAll(".q")].find(x => !x.classList.contains("done"));
    if (q) q.scrollIntoView({ behavior: "smooth" }); else alert("All questions answered!")
};
document.getElementById("cl").onclick = () => { if (confirm("Clear all answers? (Your info stays)")) { st.a = {}; st.o = {}; save(); paint() } };
document.getElementById("pr").onclick = () => {
    const left = document.querySelectorAll(".q:not(.done)").length;
    if (!left || confirm(left + " question(s) unanswered. Print anyway?")) window.print()
};
paint();
