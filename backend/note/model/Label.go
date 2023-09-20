package model

func (Label) TableName() string {
	return "label"
}

type Label struct {
	ID   int    `gorm:"primaryKey;autoIncrement" json:"id"`
	NAME string `gorm:"type:varchar(30);not null" json:"name"`
}
