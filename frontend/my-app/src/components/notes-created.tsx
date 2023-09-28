import Note from "@/components/note";
import NewNote from "@/components/new-note";

export default function NotesCreated({ notes }: { notes: NoteFull[] }) {
  return (
    <ul className="flex justify-center flex-wrap items-center">
      {notes.map((note: NoteFull) => (
        <li key={note.ID} className="flex flex-col m-5">
          <Note note={note} />
        </li>
      ))}
      <li className="flex justify-center items-center gap-3">
        <NewNote />
      </li>
    </ul>
  );
}
