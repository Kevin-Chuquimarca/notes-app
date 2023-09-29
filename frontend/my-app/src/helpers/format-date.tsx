import { getNotes } from "@/data/providers/note-server";
import { SetStateAction } from "react";

export function getDateTime(dateTimeFormat: string): string {
  const dateTime = new Date(dateTimeFormat);
  const date = dateTime.toLocaleDateString();
  const time = dateTime.toLocaleTimeString();
  return `${date} ${time}`;
}

export type SetNote = (value: SetStateAction<NoteFull[]>) => void;

export const handleRefresh = async (setNotes: SetNote) => {
  const notesCreated = await getNotes();
  setNotes(notesCreated);
};

export function handleNoteBG(priorityID: number): string {
  switch (priorityID) {
    case 1:
      return "bg-green-700 hover:bg-green-900";
    case 2:
      return "bg-yellow-700 hover:bg-yellow-900";
    case 3:
      return "bg-red-700 hover:bg-red-900";
    default:
      return "bg-gray-700 hover:bg-gray-900";
  }
}


