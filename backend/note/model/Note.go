package model

import (
	"gorm.io/gorm"
)

type Tabler interface {
	TableName() string
}

func (Note) TableName() string {
	return "note"
}

type Note struct {
	gorm.Model
	Title      string `gorm:"type:varchar(100);not null" json:"title"`
	Text       string `gorm:"type:varchar(200);not null" json:"text"`
	PriorityID uint   `gorm:"not null" json:"priority_id"`
	StateID    uint   `gorm:"not null" json:"state_id"`
}
