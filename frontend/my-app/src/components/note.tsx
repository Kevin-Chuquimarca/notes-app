import { deleteNoteById, putNote } from "@/data/providers/note-client";
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
import {
  getDateTime,
  handleNoteBG,
  handleRefresh,
} from "@/helpers/format-date";
import { NoteContext } from "@/components/notes-list";
import { useContext, useState } from "react";
import { BtnsNote } from "./btns-note";

export default function Note({ note }: { note: NoteFull }) {
  const setNotes = useContext(NoteContext);

  const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure();
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);
  const [noteState, setNoteState] = useState({
    title: note.title,
    text: note.text,
    priority_id: note.priority_id,
  });

  function handleSubmit() {
    putNote({ ...note, ...noteState }).then(() => handleRefresh(setNotes));
  }

  function handleDelete() {
    deleteNoteById(note.ID).then(() => handleRefresh(setNotes));
  }

  function setPriorityID(id: number) {
    setNoteState({ ...noteState, priority_id: id });
  }

  return (
    <>
      <div
        className={
          "flex flex-col justify-center rounded-xl p-3 w-60 mb-3 bg-slate-700"
        }
      >
        <h3
          className={
            "text-center font-bold rounded-xl " +
            handleNoteBGH3(note.priority_id)
          }
        >
          {note.title}
        </h3>
        <p className="pt-2">{note.text}</p>
        <p className="text-center pt-2">
          <b>CREATED:</b> {getDateTime(note.CreatedAt)}
        </p>
        <BtnsNote note={note} openModal={onOpen} />
      </div>
      <Modal
        backdrop={"blur"}
        isOpen={isOpen}
        onClose={onClose}
        onOpenChange={onOpenChange}
      >
        <ModalContent className="bg-slate-700">
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                <h2 className="text-center font-bold text-2xl">{note.title}</h2>
              </ModalHeader>
              <ModalBody>
                <p>
                  <b>CREATED:</b> {getDateTime(note.CreatedAt)}
                </p>
                <p>
                  <b>UPDATED:</b> {getDateTime(note.UpdatedAt)}
                </p>
                <BtnGroup
                  priorityID={noteState.priority_id}
                  setPriorityID={setPriorityID}
                />
                <Input
                  name="title"
                  className="text-slate-600"
                  label="TITLE"
                  placeholder="Enter your title"
                  defaultValue={noteState.title}
                  onValueChange={(title) => {
                    setNoteState({ ...noteState, title });
                  }}
                />
                <Textarea
                  name="text"
                  className="text-slate-600"
                  label="NOTE"
                  placeholder="Enter your note"
                  defaultValue={noteState.text}
                  onValueChange={(text) => {
                    setNoteState({ ...noteState, text });
                  }}
                />
              </ModalBody>
              <ModalFooter className="flex justify-center">
                {!showConfirmDelete ? (
                  <div className="space-x-4">
                    <button
                      className="bg-red-700 hover:bg-red-900 rounded-xl px-5 py-2"
                      onClick={onClose}
                    >
                      Close
                    </button>
                    <button
                      className="bg-yellow-700 hover:bg-yellow-900 rounded-xl px-5 py-2"
                      onClick={() => {
                        setShowConfirmDelete(!showConfirmDelete);
                      }}
                    >
                      Delete
                    </button>
                    {noteState.title.length > 0 &&
                      noteState.text.length > 0 && (
                        <button
                          className="bg-green-700 hover:bg-green-900 rounded-xl px-5 py-2"
                          onClick={() => {
                            handleSubmit();
                            onClose();
                          }}
                        >
                          Edit
                        </button>
                      )}
                  </div>
                ) : (
                  <div className="space-x-4">
                    <button
                      className="bg-yellow-700 hover:bg-yellow-900 rounded-xl px-5 py-2"
                      onClick={handleDelete}
                    >
                      Confirm
                    </button>
                    <button
                      className="bg-blue-700 hover:bg-blue-900 rounded-xl px-5 py-2"
                      onClick={() => {
                        setShowConfirmDelete(!showConfirmDelete);
                      }}
                    >
                      Cancel
                    </button>
                  </div>
                )}
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}

function handleNoteBGH3(priorityID: number): string {
  switch (priorityID) {
    case 1:
      return "bg-green-700";
    case 2:
      return "bg-yellow-700";
    case 3:
      return "bg-red-700";
    default:
      return "bg-yellow-700";
  }
}
