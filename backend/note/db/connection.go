package db

import (
	"log"

	"gorm.io/driver/mysql"
	"gorm.io/gorm"
)

var DSN = "root:password@tcp(127.0.0.1:3306)/note_db?parseTime=true"
var DB *gorm.DB

func DBConnection() {
	var err error
	DB, err = gorm.Open(mysql.Open(DSN), &gorm.Config{})
	if err != nil {
		log.Fatal(err)
	} else {
		log.Println("DB " + DB.Name() + " connected success")
	}
}
