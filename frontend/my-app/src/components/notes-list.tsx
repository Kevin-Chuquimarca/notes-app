"use client";

import NotesCreated from "@/components/notes-created";
import NotesFinished from "@/components/notes-finished";
import { SetNote, handleRefresh } from "@/helpers/format-date";
import { useState, useEffect, createContext } from "react";

export const NoteContext = createContext<SetNote>(() => {});

export function NotesList() {
  const [notes, setNotes] = useState<NoteFull[]>([]);

  useEffect(() => {
    handleRefresh(setNotes);
  }, []);

  return (
    <NoteContext.Provider value={setNotes}>
      <div className="flex">
        <div>
          <h2 className="text-center font-bold text-2xl my-5">NOTES CREATED</h2>
          <NotesCreated notes={notes.filter((n) => n.state_id === 1)} />
        </div>
        <div>
          <h2 className="text-center font-bold text-2xl my-5">
            NOTES FINISHED
          </h2>
          <NotesFinished notes={notes.filter((n) => n.state_id === 2)} />
        </div>
      </div>
    </NoteContext.Provider>
  );
}
