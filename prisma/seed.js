import { PrismaClient } from "@prisma/client";
import { isSet } from "util/types";
const prisma = new PrismaClient();


const main = async() => {

  /*
    const DemoUsers = [
        {name:'juan', 
        email:'juan@hotmail.com'
        }
    ];

    for(const user of DemoUsers){
        await prisma.user.create({data:user});

    }
    console.log('usuario creados con exito!!');
    */
   /*
    await prisma.user.deleteMany(); //eliminamos todos los registros de la base de datos
  */
  const user = {
    name:'sebastian',
    email:'aristizabalsebastian35@gmail.com',
    password:'123',
    role:'ADMIN'
  }
  const NewUser = await prisma.user.create({data:user});
  if(NewUser){
    console.log(`Usuario creado con exito!!`);
  }

}

main()
  .catch(e => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });