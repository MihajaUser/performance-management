import BaseSeeder from "@ioc:Adonis/Lucid/Seeder";
import Database from "@ioc:Adonis/Lucid/Database";
import User from "App/Models/User";

export default class UserSeeder extends BaseSeeder {
  public async run() {
    await User.query().delete();
    await Database.table("users").insert([
      {
        firstname: "Thomas",
        lastname: "Durand",
        email: "thomas.durand@example.com",
      },
      {
        firstname: "Camille",
        lastname: "Lefebvre",
        email: "camille.lefebvre@example.com",
      },
      {
        firstname: "Julien",
        lastname: "Moreau",
        email: "julien.moreau@example.com",
      },
      {
        firstname: "Claire",
        lastname: "Bernard",
        email: "claire.bernard@example.com",
      },
      {
        firstname: "Lucas",
        lastname: "Rousseau",
        email: "lucas.rousseau@example.com",
      },
      {
        firstname: "Sophie",
        lastname: "Dubois",
        email: "sophie.dubois@example.com",
      },
      {
        firstname: "Antoine",
        lastname: "Gauthier",
        email: "antoine.gauthier@example.com",
      },
      {
        firstname: "Élodie",
        lastname: "Lemoine",
        email: "elodie.lemoine@example.com",
      },
      {
        firstname: "Nicolas",
        lastname: "Fontaine",
        email: "nicolas.fontaine@example.com",
      },
      {
        firstname: "Manon",
        lastname: "Girard",
        email: "manon.girard@example.com",
      },
    ]);
  }
}
