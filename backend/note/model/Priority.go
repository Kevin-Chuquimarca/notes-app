package model

func (Priority) TableName() string {
	return "priority"
}

type Priority struct {
	ID    uint    `gorm:"primaryKey;autoIncrement" json:"id"`
	NAME  string `gorm:"type:varchar(30);not null" json:"name"`
	Notes []Note
}
