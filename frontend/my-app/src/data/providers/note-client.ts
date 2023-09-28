export async function postNote(noteToSave: Note) {
  const res = await fetch("http://localhost:8080/note", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(noteToSave),
  });
  if (!res.ok) {
    throw new Error(res.statusText);
  }
  return res.json();
}

export async function putNote(note: NoteFull) {
  const res = await fetch(`http://localhost:8080/note/${note.ID}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(note),
  });
  if (!res.ok) {
    throw new Error(res.statusText);
  }
  return res.json();
}

export async function deleteNoteById(id: number) {
  const res = await fetch(`http://localhost:8080/note/${id}`, {
    method: "DELETE",
  });
  if (!res.ok) {
    throw new Error(res.statusText);
  }
  return res.text();
}