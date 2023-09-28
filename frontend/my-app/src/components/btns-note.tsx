"use client";

import { putNote } from "@/data/providers/note-client";
import { handleRefresh } from "@/helpers/format-date";
import { NoteContext } from "@/components/notes-list";
import { useContext } from "react";
import check from "../../public/check.svg";
import cancel from "../../public/cancel.svg";
import eye from "../../public/eye.svg";
import Image from "next/image";

export function BtnsNote({ note, openModal }: { note: NoteFull, openModal: ()=>void }) {
  const setNotes = useContext(NoteContext);

  return (
    <div className="flex justify-center mt-4 space-x-4">
      <button
      className="bg-gray-500 hover:bg-gray-700 rounded-lg p-0.5"
        onClick={() => {
          putNote({ ...note, state_id: note.state_id === 1 ? 2 : 1 }).then(() =>
            handleRefresh(setNotes)
          );
        }}
      >
        {note.state_id === 1 ? (
          <Image src={check} alt="check note" width={30} height={30} />
        ) : (
          <Image src={cancel} alt="cancel note" width={30} height={30} />
        )}
      </button>
      <button className="bg-gray-500 hover:bg-gray-700 rounded-lg p-0.5" onClick={openModal}>
        <Image src={eye} alt="view more" width={30} height={30} />
      </button>
    </div>
  );
}
