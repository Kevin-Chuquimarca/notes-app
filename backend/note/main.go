package main

import (
	"net/http"

	"espe/note/db"
	"espe/note/model"
	"espe/note/routes"

	"github.com/gorilla/handlers"
	"github.com/gorilla/mux"
)

func main() {
	db.DBConnection()
	db.DB.AutoMigrate(&model.Priority{}, &model.State{}, &model.Note{})
	router := mux.NewRouter()
	apiVr := "/api/v1"
	router.HandleFunc(apiVr+"/", routes.HomeHandler).Methods("GET")
	router.HandleFunc(apiVr+"/notes", routes.GetNotesHandler).Methods("GET")
	router.HandleFunc(apiVr+"/note/{id}", routes.GetNoteHandler).Methods("GET")
	router.HandleFunc(apiVr+"/note", routes.PostNotesHandler).Methods("POST")
	router.HandleFunc(apiVr+"/note/{id}", routes.PutNoteHandler).Methods("PUT")
	router.HandleFunc(apiVr+"/note/{id}", routes.PathTextNoteHandler).Methods("PATCH")
	router.HandleFunc(apiVr+"/note/{id}", routes.DeleteNoteHandler).Methods("DELETE")
	router.HandleFunc(apiVr+"/priorities", routes.GetPrioritiesHandler).Methods("GET")

	headers := handlers.AllowedHeaders([]string{"X-Requested-With", "Content-Type", "Authorization"})
	methods := handlers.AllowedMethods([]string{"GET", "POST", "PUT", "DELETE"})
	origins := handlers.AllowedOrigins([]string{"http://localhost:3000"})
	http.ListenAndServe(":8080", handlers.CORS(headers, methods, origins)(router))
}
