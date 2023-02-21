import { TEMPLATE } from "./template";
import "./style.css";

const idEl = document.getElementById("id") as HTMLInputElement;
const submitEl = document.getElementById("submit") as HTMLButtonElement;
const resultEl = document.getElementById("result") as HTMLPreElement;

const copy = async () => {
  let tmpl = TEMPLATE;
  for (let day = 1; day <= 5; day++) {
    for (let column = 1; column <= 7; column++) {
      const text = `${day}-${column}`;
      const el = document.getElementById(`${text}`) as HTMLInputElement;
      const value = el.value;
      tmpl = tmpl.replace(`$${text}`, value);
    }
  }
  const id = idEl.value;
  const idIsNumber = !Number.isNaN(Number(id));
  if (id.length !== 4) {
    resultEl.innerText = "订单号为四位数字";
    return;
  }
  if (!idIsNumber) {
    resultEl.innerText = "订单号必须为数字";
    return;
  }
  const res = await fetch(`${import.meta.env.VITE_API_URL}${id}`, {
    method: "POST",
    body: JSON.stringify({
      txt: tmpl,
    }),
    mode: "no-cors",
  }).then(r => r.text());
  resultEl.innerText = res || "成功";
};

submitEl.addEventListener("click", copy);
