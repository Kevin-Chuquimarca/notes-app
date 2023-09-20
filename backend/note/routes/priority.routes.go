package routes

import (
	"encoding/json"
	"espe/note/db"
	"espe/note/model"
	"net/http"
)

func GetPrioritiesHandler(w http.ResponseWriter, r *http.Request) {
	var priorities []model.Priority
	db.DB.Find(&priorities)
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(&priorities)
}