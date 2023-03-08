import "./style.css";

const keyEl = document.getElementById("key") as HTMLInputElement;
const colorEl = document.getElementById("color") as HTMLSelectElement;
const submitEl = document.getElementById("submit") as HTMLButtonElement;
const resultEl = document.getElementById("result") as HTMLPreElement;

const query = new URLSearchParams(window.location.search);
let key = query.get("key");
const hasKeyAsQuery = !!key;
keyEl.value = key || "";

keyEl.disabled = hasKeyAsQuery;

keyEl.addEventListener("input", () => key = keyEl.value);

const copy = async () => {
  const courseName: string[][] = [[]];
  for (let day = 1; day <= 5; day++) {
    const current: string[] = [""];
    for (let column = 1; column <= 7; column++) {
      const text = `${day}-${column}`;
      const el = document.getElementById(`${text}`) as HTMLInputElement;
      const value = el.value;
      current.push(value);
    }
    courseName.push(current);
  }
  const color = colorEl.value;
  const resp = await fetch(`${import.meta.env.VITE_API_URL}schedule_submit`, {
    method: "POST",
    body: JSON.stringify({
      key,
      color,
      course_name: courseName,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  }).then(r => r.json());
  resultEl.innerText = resp?.message || "失败力（";
};

submitEl.addEventListener("click", copy);
