const SERVICE = "http://localhost:3000/api/data/1234567890?api-key=c4game"

export async function loadState() {
  try {
    return await fetch("http://localhost:3000/api/data/1234567890?api-key=c4game").then((r) => r.json())
  } catch {
    alert("Load not possible, can't connect to server")
  }
}

export function loadStateFromLocalStorage() {
  return JSON.parse(localStorage.getItem("state"))
}

export function saveState(state) {
  try {
    fetch("http://localhost:3000/api/data/1234567890?api-key=c4game", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(state),
    });
  } catch {
    alert("Save not possible, can't connect to server")
  }
}

export function saveStateToLocalStorage(state) {
  localStorage.setItem("state", JSON.stringify(state));
}
