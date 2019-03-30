package main

import (
   "fmt"
   "github.com/gin-contrib/cors"                        // Why do we need this package?
   "github.com/gin-gonic/gin"
   "github.com/jinzhu/gorm"
   _ "github.com/jinzhu/gorm/dialects/sqlite"           // If you want to use mysql or any other db, replace this line
)

var db *gorm.DB                                         // declaring the db globally
var err error

type Person struct {
   ID uint `json:"id"`
   Username string `json:"Username"`
   Password string `json:"Password"`
   Email string `json:"Email"`
}

type Questions struct {
   ID uint `json:"id"`
   Type uint `json:"type"`
   Question string `json:"question"`
   Image string `json:"image"`
   Audio string `json:"audio"`
   Genre string `json:"genre"`
   Option_1 string `json:"option_1"`
   Option_2 string `json:"option_2"`
   Option_3 string `json:"option_3"`
   Option_4 string `json:"option_4"`
   Val_1 uint `json:"val_1"`
   Val_2 uint `json:"val_2"`
   Val_3 uint `json:"val_3"`
   Val_4 uint `json:"val_4"`
   Quiz_no uint `json:"quiz_no"`
}
type Games struct {
    ID uint `json:"id"`
    Genre string `json:"genre"`
    Quiz_no uint `json:"quiz_no"`
    User_id uint `json:"user_id"`
    Score int `json:"score"`
}

func main() {
   db, err = gorm.Open("sqlite3", "./gorm.db")
   if err != nil {
      fmt.Println(err)
   }
   defer db.Close()

   db.AutoMigrate(&Person{})
   db.AutoMigrate(&Questions{})
   db.AutoMigrate(&Games{})
   r := gin.Default()
   r.GET("/people/", GetPeople)                             // Creating routes for each functionality
   r.GET("/people/:id", GetPerson)
   r.POST("/people", CreatePerson)
   r.POST("/question",CreateQuestion)
   r.POST("/games/:id",CreateGame)
   r.GET("/question/",ViewQuestions)
   r.GET("/games/",ViewGames)
   r.GET("/getquestion/:id", GetQuestion)
   r.PUT("/updtquestion/:id", UpdateQuestion)
   r.DELETE("/people/:id", DeletePerson)
   r.DELETE("/question/:id", DeleteQuestion)
   r.DELETE("/quiz/:genre/:quiz_no",DeleteQuiz)
   r.GET("/question/choices",ViewQuestions)
   r.GET("/games/leaderboard",ViewLeaderboard)
   r.Use((cors.Default()))
   r.Run(":8080")                                           // Run on port 8080
}


func DeletePerson(c *gin.Context) {
   id := c.Params.ByName("id")
   var person Person
   d := db.Where("id = ?", id).Delete(&person)
   fmt.Println(d)
   c.Header("access-control-allow-origin", "*")
   c.JSON(200, gin.H{"id #" + id: "deleted"})
}

func DeleteQuestion(c *gin.Context) {
    id := c.Params.ByName("id")
   var question Questions
   d := db.Where("id = ?", id).Delete(&question)
   fmt.Println(d)
   c.Header("access-control-allow-origin", "*")
   c.JSON(200, gin.H{"id #" + id: "deleted"})
}

func DeleteQuiz(c *gin.Context) {
    genre := c.Params.ByName("genre")
    quiz_no := c.Params.ByName("quiz_no")
   var question Questions
   d := db.Where("quiz_no = ? AND genre = ?", quiz_no,genre).Delete(&question)
   fmt.Println(d)
   c.Header("access-control-allow-origin", "*")
   c.JSON(200, gin.H{"id #" + quiz_no: "deleted"})
}
func UpdateQuestion(c *gin.Context) {
   var question Questions
   id := c.Params.ByName("id")
   if err := db.Where("id = ?", id).First(&question).Error; err != nil {
      c.AbortWithStatus(404)
      fmt.Println(err)
   }
   c.BindJSON(&question)
   db.Save(&question)
   c.Header("access-control-allow-origin", "*") // Why am I doing this? Find out. Try running with this line commented
   c.JSON(200, question)
}

func CreatePerson(c *gin.Context) {
   var person Person
   c.BindJSON(&person)
   var row Person
   var row2 Person
   db.Where("Username =  ?",person.Username).Find(&row)
   db.Where("Email = ?",person.Email).Find(&row2)
   if (row == Person{} && row2 == Person{}) {
      db.Create(&person)
      c.Header("access-control-allow-origin", "*") // Why am I doing this? Find out. Try running with this line commented
      c.JSON(200, person)
   } else if(row2 == Person{}){
      c.Header("access-control-allow-origin", "*") // Why am I doing this? Find out. Try running with this line commented
      c.JSON(400, person)
   } else {
      c.Header("access-control-allow-origin", "*") // Why am I doing this? Find out. Try running with this line commented
      c.JSON(500, person)
   }
}

func CreateQuestion(c *gin.Context) {
   var question Questions
   c.BindJSON(&question)
   db.Create(&question)
   c.Header("access-control-allow-origin", "*") 
   c.JSON(200, question)
}
func CreateGame(c *gin.Context) {
    var game Games
    c.BindJSON(&game)
    fmt.Println(game)
    fmt.Println("Heloo")
    db.Create(&game)
    c.Header("access-control-allow-origin", "*") 
    c.JSON(200, game)
}
func GetPerson(c *gin.Context) {
   id := c.Params.ByName("id")
   var person Person
   if err := db.Where("id = ?", id).First(&person).Error; err != nil {
      c.AbortWithStatus(404)
      fmt.Println(err)
   } else {
      c.Header("access-control-allow-origin", "*") // Why am I doing this? Find out. Try running with this line commented
      c.JSON(200, person)
   }
}
func GetQuestion(c *gin.Context) {
    id := c.Params.ByName("id")
   var question Questions
   if err := db.Where("id = ?", id).First(&question).Error; err != nil {
      c.AbortWithStatus(404)
      fmt.Println(err)
   } else {
      c.Header("access-control-allow-origin", "*") // Why am I doing this? Find out. Try running with this line commented
      c.JSON(200, question)
   }
}
func GetPeople(c *gin.Context) {
   var people []Person
   if err := db.Find(&people).Error; err != nil {
      c.AbortWithStatus(404)
      fmt.Println(err)
   } else {
      c.Header("access-control-allow-origin", "*") // Why am I doing this? Find out. Try running with this line commented
      fmt.Println(people)
      c.JSON(200, people)
   }
}

func ViewQuestions(c *gin.Context) {
    var question []Questions
    if err := db.Find(&question).Error; err != nil {
       c.AbortWithStatus(404)
       fmt.Println(err)
    } else {
       c.Header("access-control-allow-origin", "*") // Why am I doing this? Find out. Try running with this line commented
       c.JSON(200, question)
    }
 }

 func ViewGames(c *gin.Context) {
    var game []Games
    if err := db.Find(&game).Error; err != nil {
       c.AbortWithStatus(404)
       fmt.Println(err)
    } else {
       c.Header("access-control-allow-origin", "*") // Why am I doing this? Find out. Try running with this line commented
       fmt.Println(game)
       c.JSON(200, game)
    }
 }

 func ViewLeaderboard(c *gin.Context) {
    var game []Games
    if err := db.Order("score desc").Find(&game).Error; err != nil {
       c.AbortWithStatus(404)
       fmt.Println(err)
    } else {
       c.Header("access-control-allow-origin", "*") // Why am I doing this? Find out. Try running with this line commented
       fmt.Println(game)
       c.JSON(200, game)
    } 
 }