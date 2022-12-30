import Route from '@ioc:Adonis/Core/Route'


Route.get("/users/show-image/:image", "UsersController.showImage")

Route.group(()=>{
  
    Route.patch("/users/image/:id", "UsersController.image")
    Route.resource("users", "UsersController").except(['create','edit','store'])

})