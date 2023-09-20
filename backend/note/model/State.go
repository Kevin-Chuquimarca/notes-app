package model

func (State) TableName() string {
	return "state"
}

type State struct {
	ID    uint    `gorm:"primaryKey;autoIncrement" json:"id"`
	NAME  string `gorm:"type:varchar(30);not null" json:"name"`
	Notes []Note
}
