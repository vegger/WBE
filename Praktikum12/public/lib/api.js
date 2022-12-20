const SERVICE = "http://localhost:3000/api/data/1234567890?api-key=c4game"

export async function loadState() {
  let res = await fetch(
    "http://localhost:3000/api/data/1234567890?api-key=c4game"
  ).then((r) => r.json())
  return res;
}

export function loadStateFromLocalStorage() {
  return JSON.parse(localStorage.getItem("state"))
}

export function saveState(state) {
  fetch("http://localhost:3000/api/data/1234567890?api-key=c4game", {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(state),
  });
}

export function saveStateToLocalStorage(state) {
  localStorage.setItem("state", JSON.stringify(state));
}
