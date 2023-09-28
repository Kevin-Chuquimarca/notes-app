import Note from "@/components/note";

export default function NotesFinished({ notes }: { notes: NoteFull[] }) {
  return (
    <ul className="flex justify-center flex-wrap items-center">
      {notes.map((note: NoteFull) => (
        <li key={note.ID} className="m-5">
          <Note note={note} />
        </li>
      ))}
    </ul>
  );
}
