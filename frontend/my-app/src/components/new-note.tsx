import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Textarea,
  Input,
} from "@nextui-org/react";
import BtnGroup from "@/components/btn-group";
import { postNote } from "@/data/providers/note-client";
import { NoteContext } from "@/components/notes-list";
import { handleRefresh } from "@/helpers/format-date";
import { useContext, useState } from "react";

export default function NewNote() {
  const setNotes = useContext(NoteContext);

  const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure();
  const [note, setNote] = useState<Note>({
    title: "",
    text: "",
    priority_id: 1,
    state_id: 1,
  });

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    postNote(note).then(() => handleRefresh(setNotes));
  }

  function setPriorityID(priority_id: number) {
    setNote({ ...note, priority_id });
  }

  return (
    <>
      <button
        className="w-60 h-40 m-3 bg-slate-700 text-cyan-50 hover:bg-slate-800 rounded-3xl"
        onClick={() => onOpen()}
      >
        <b>New Note</b>
      </button>
      <Modal
        backdrop={"blur"}
        isOpen={isOpen}
        onClose={onClose}
        onOpenChange={onOpenChange}
      >
        <ModalContent className="bg-slate-700">
          {(onClose) => (
            <form
              onSubmit={(e) => {
                handleSubmit(e);
              }}
            >
              <ModalHeader>NEW NOTE</ModalHeader>
              <ModalBody>
                <BtnGroup
                  priorityID={note.priority_id}
                  setPriorityID={setPriorityID}
                />
                <Input
                  name="title"
                  className="text-slate-600"
                  label="TITLE"
                  placeholder="Enter your title"
                  defaultValue={""}
                  onValueChange={(title) => {
                    setNote({ ...note, title });
                  }}
                />
                <Textarea
                  name="text"
                  className="text-slate-600"
                  label="NOTE"
                  placeholder="Enter your note"
                  defaultValue={""}
                  onValueChange={(text) => {
                    setNote({ ...note, text });
                  }}
                />
              </ModalBody>
              <ModalFooter className="flex justify-center">
                <button
                  className="bg-red-700 hover:bg-red-900 rounded-xl px-5 py-2"
                  onClick={(e) => {
                    e.preventDefault();
                    onClose();
                  }}
                >
                  Close
                </button>
                {note.title.length > 0 && note.text.length > 0 && (
                  <button
                    className="bg-blue-700 hover:bg-blue-900 rounded-xl px-5 py-2"
                    onClick={onClose}
                  >
                    Save
                  </button>
                )}
              </ModalFooter>
            </form>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
