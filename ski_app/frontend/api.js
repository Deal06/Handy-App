const API_URL = "http://192.168.1.42:8000"; // deine PC-IP

export async function getFilteredTrick(settings) {
  try {
    const res = await fetch(`${API_URL}/tricks/filter/get_trick`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(settings),
    });
    const data = await res.json();
    return data.trick; // {name, unnaty, inverted, rotations}
  } catch (err) {
    console.log("Fehler beim Laden des Tricks:", err);
    return null;
  }
}

// Bestehende Funktionen bleiben unverändert
export async function getTricks() {
  try {
    const res = await fetch(`${API_URL}/tricks`);
    return await res.json();
  } catch (err) {
    console.log("Fehler beim Laden der Tricks:", err);
    return [];
  }
}

export async function addTrick(name) {
  try {
    const res = await fetch(`${API_URL}/tricks`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, done: false }),
    });
    return await res.json();
  } catch (err) {
    console.log("Fehler beim Hinzufügen:", err);
    return null;
  }
}

export async function toggleTrick(index) {
  try {
    const res = await fetch(`${API_URL}/tricks/${index}`, { method: "PUT" });
    return await res.json();
  } catch (err) {
    console.log("Fehler beim Umschalten:", err);
    return null;
  }
}
