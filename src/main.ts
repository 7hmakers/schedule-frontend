import "./style.css";

const idEl = document.getElementById("id") as HTMLInputElement;
const imageEl = document.getElementById("image") as HTMLInputElement;
const colorEl = document.getElementById("color") as HTMLSelectElement;
const submitEl = document.getElementById("submit") as HTMLButtonElement;
const resultEl = document.getElementById("result") as HTMLPreElement;

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

  const orderId = idEl.value;
  const idIsNumber = !Number.isNaN(Number(orderId));
  const formData = new FormData();
  const image = imageEl.files?.[0];
  if (image) {
    formData.append("file", image);
  }
  if (orderId.length !== 4) {
    resultEl.innerText = "订单号为四位数字";
    return;
  }
  if (!idIsNumber) {
    resultEl.innerText = "订单号必须为数字";
    return;
  }
  const imageResp = await fetch("http://192.168.123.135:8000/upload_image", {
    method: "POST",
    body: formData,
  }).then(r => r.json());
  const photoFilename = imageResp.filename;
  const color = colorEl.value;
  const resp = await fetch(`${import.meta.env.VITE_API_URL}schedule_submit`, {
    method: "POST",
    body: JSON.stringify({
      order_id: orderId,
      color,
      course_name: courseName,
      photo_filename: photoFilename,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  }).then(r => r.json());
  resultEl.innerText = resp?.message || "失败力（";
};

submitEl.addEventListener("click", copy);
