export async function getPriorities(): Promise<Priority[]> {
  const res = await fetch(`http://localhost:8080/priorities`);
  if (!res.ok) {
    throw new Error(res.statusText);
  }
  return res.json();
}