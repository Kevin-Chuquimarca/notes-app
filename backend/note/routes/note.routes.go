package routes

import (
	"encoding/json"
	"espe/note/db"
	"espe/note/model"
	"net/http"

	"github.com/gorilla/mux"
)

func HomeHandler(w http.ResponseWriter, r *http.Request) {
	w.Write([]byte("Hello world from GO!"))
}

func GetNotesHandler(w http.ResponseWriter, r *http.Request) {
	var notes []model.Note
	db.DB.Find(&notes)
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(&notes)
}

func GetNoteHandler(w http.ResponseWriter, r *http.Request) {
	params := mux.Vars(r)
	var note model.Note
	db.DB.First(&note, params["id"])
	if note.ID == 0 {
		w.WriteHeader(http.StatusNotFound)
		w.Write([]byte("User not found"))
	} else {
		w.Header().Set("Content-Type", "application/json")
		json.NewEncoder(w).Encode(&note)
	}
}

func PostNotesHandler(w http.ResponseWriter, r *http.Request) {
	var note model.Note
	json.NewDecoder(r.Body).Decode(&note)

	createdUser := db.DB.Create(&note)
	err := createdUser.Error
	if err != nil {
		w.WriteHeader(http.StatusBadRequest)
		w.Write([]byte(err.Error()))
	} else {
		w.Header().Set("Content-Type", "application/json")
		json.NewEncoder(w).Encode(&note)
	}
}

func PutNoteHandler(w http.ResponseWriter, r *http.Request) {
	params := mux.Vars(r)
	var note model.Note
	db.DB.First(&note, params["id"])
	if note.ID == 0 {
		w.WriteHeader(http.StatusNotFound)
		w.Write([]byte("User not found"))
	} else {
		var newNote model.Note
		json.NewDecoder(r.Body).Decode(&newNote)
		newNote.ID = note.ID
		updatedUser := db.DB.Model(&note).Updates(newNote)
		err := updatedUser.Error
		if err != nil {
			w.WriteHeader(http.StatusBadRequest)
			w.Write([]byte(err.Error()))
		} else {
			w.Header().Set("Content-Type", "application/json")
			json.NewEncoder(w).Encode(&note)
		}

	}
}

type NoteText struct {
	Text string `json:"text"`
}

func PathTextNoteHandler(w http.ResponseWriter, r *http.Request) {
	params := mux.Vars(r)
	var note model.Note
	db.DB.First(&note, params["id"])
	if note.ID == 0 {
		w.WriteHeader(http.StatusNotFound)
		w.Write([]byte("User not found"))
	} else {
		var newNoteText NoteText
		json.NewDecoder(r.Body).Decode(&newNoteText)
		updatedUser := db.DB.Model(&note).Update("text", newNoteText.Text)
		err := updatedUser.Error
		if err != nil {
			w.WriteHeader(http.StatusBadRequest)
			w.Write([]byte(err.Error()))
		} else {
			w.Header().Set("Content-Type", "application/json")
			json.NewEncoder(w).Encode(&note)
		}
	}
}

func DeleteNoteHandler(w http.ResponseWriter, r *http.Request) {
	var user model.Note
	params := mux.Vars(r)
	db.DB.First(&user, params["id"])
	if user.ID == 0 {
		w.WriteHeader(http.StatusNotFound)
		w.Write([]byte("User not found"))
	} else {
		db.DB.Delete(&user)
		// db.DB.Unscoped().Delete(&user) // Delete permanently
		w.WriteHeader(http.StatusOK)
		w.Write([]byte("User deleted"))
	}
}
