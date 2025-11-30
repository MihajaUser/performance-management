// import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
// import { AuthContract } from '@ioc:Adonis/Addons/Auth'

// export default class PrivilegeMiddleware {
//   public async handle(
//     { auth, response }: AuthContract,
//     next: () => Promise<void>,
//     requiredPrivileges: string[]
//   ) {
//     await auth.use("jwt").authenticate();

//     const user = auth.user;

//     if (!user) {
//       return response.unauthorized({ message: "Non authentifié" });
//     }

//     const directPrivileges = (await user.related("userPrivileges").query()).map(
//       (p) => p.name
//     );

//     if (directPrivileges.some((p) => requiredPrivileges.includes(p))) {
//       return next();
//     }

//     const roles = await user.related("userRoles").query();

//     let rolePrivileges: string[] = [];

//     for (const role of roles) {
//       const attachedPrivileges = await role
//         .related("privileges")
//         .query()
//         .select("name");

//       rolePrivileges.push(...attachedPrivileges.map((p) => p.name));
//     }

//     if (rolePrivileges.some((p) => requiredPrivileges.includes(p))) {
//       return next();
//     }

//     return response.forbidden({
//       message: "Accès refusé : privilège insuffisant",
//     });
//   }
// }
