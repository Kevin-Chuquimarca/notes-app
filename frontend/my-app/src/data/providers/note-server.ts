// import "server-only"

export async function getNotes(): Promise<NoteFull[]> {
  const res = await fetch("http://localhost:8080/notes");
  if (!res.ok) {
    throw new Error(res.statusText);
  }
  return res.json();
}

export async function getNotesFinished(): Promise<NoteFull[]> {
  const res = await fetch("http://localhost:8080/notes");
  if (!res.ok) {
    throw new Error(res.statusText);
  }
  return res.json();
}
