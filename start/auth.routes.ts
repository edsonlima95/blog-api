import Route from '@ioc:Adonis/Core/Route'


Route.post("/sign-in","AuthController.signIn")
Route.post("/sign-up","AuthController.signUp")

Route.get("/check-token","AuthController.checkToken")