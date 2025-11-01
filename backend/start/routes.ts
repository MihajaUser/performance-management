/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer'
|
*/

import Route from "@ioc:Adonis/Core/Route";

Route.group(() => {
  Route.get("/", "EmployeesController.index");
  Route.get("/:id", "EmployeesController.show");
  Route.get(
    "/:id/evaluations/received",
    "EmployeesController.evaluationsReceived"
  );
  Route.get("/:id/evaluations/given", "EmployeesController.evaluationsGiven");
}).prefix("/employees");

Route.group(() => {
  Route.get("/", "EvaluationsController.index");
  Route.get("/:id", "EvaluationsController.show");
  Route.post("/", "EvaluationsController.store");
  Route.put("/:id", "EvaluationsController.update");
  Route.delete("/:id", "EvaluationsController.destroy");
}).prefix("/evaluations");
