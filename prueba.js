//Ejercicio 1
/*let numeros = [2, 4, 6, 8, 10];

let numeros2 = numeros.map(num2 => (num2 * 2));

console.log(numeros2);

//Ejercicio2
let edades = [12, 18, 20, 14, 25, 30];

let edades2 = edades.filter(edad =>{
    return(
    edad >= 18
    )
})
console.log(edades2);
//Ejercicios3

let numeros = [10, -5, 8, 3, -2];
let negativos = numeros.some(num=> (num < 0))
negativos?console.log('Hay negativos'):null;

//Ejercicio4

let palabras = ["casa", "programacion", "auto", "sebastian aristizabal"];
let palabras2 = palabras.some(pala=>(pala.length > 10))
if(palabras2){
    console.log('Hay palabra con mas de diez caracteres')
    let PalabrasLargas = palabras.filter(pala2 => (pala2.length > 10))
    console.log(PalabrasLargas);
}else{
    console.log('NO hay palabra que tenga mas de diez caracteres ')
}

let numeros = [3, 7, 12, 5, 9];

let numeros2 = numeros.map(nume =>(
        nume * 2  
))
console.log(numeros2);

let numeros = [10, 25, 32, 47, 56, 61, 78];

let numeros2 = numeros.filter(num =>{
    return(
    num % 2 === 0
    )
})
console.log(numeros2)

let productos = [
    { nombre: "Camisa", precio: 20 },
    { nombre: "Pantalón", precio: 30 },
    { nombre: "Zapatos", precio: 50 },
];

let productos2 = productos.map(produc => {
    return{
        ...produc,
    precio: produc.precio * 1.21
    }
})

console.log(productos2);

*/
/*
let libros = [
    { titulo: 'El Hobbit', autor: 'J.R.R. Tolkien', paginas: 300 },
    { titulo: 'Cien años de soledad', autor: 'Gabriel García Márquez', paginas: 400 },
    { titulo: 'Harry Potter y la piedra filosofal', autor: 'J.K. Rowling', paginas: 350 }
];


let libros2 = libros.map((libro) =>{
    return(
       {titulo: libro.titulo, autor:libro.autor}
    )
})

console.log(libros2);

*/

/*const estudiantes = [
    { nombre: "Pedro", edad: 29, promedio: 7.9 },
    { nombre: "Ana", edad: 33, promedio: 8.9 },
    { nombre: "Pablo", edad: 32, promedio: 9.5 },
    { nombre: "Juan", edad: 25, promedio: 6.0 },
    { nombre: "Maria", edad: 28, promedio: 7.3 },
    { nombre: "Andres", edad: 45, promedio: 8.7 },
];

/*let Edades = 0;

for(let i = 0; i < estudiantes.length; i++){
     Edades += estudiantes[i].edad
}
console.log(Edades)
*/
/*let productos = [
    { nombre: 'Camisa', categoria: 'Ropa', precio: 20 },
    { nombre: 'Computadora', categoria: 'Electrónica', precio: 800 },
    { nombre: 'Zapatos', categoria: 'Ropa', precio: 50 },
    { nombre: 'Teléfono', categoria: 'Electrónica', precio: 300 }
];

let filter = productos.filter((producto) =>producto.categoria === 'Ropa' );
console.log(filter)

let preciosMayores = productos.filter((producto) => producto.precio > 30);
console.log(preciosMayores);
*/

/*const estudiantes = [
    { nombre: "Pedro", edad: 29, promedio: 7.9 },
    { nombre: "Ana", edad: 33, promedio: 8.9 },
    { nombre: "Pablo", edad: 32, promedio: 9.5 },
    { nombre: "Juan", edad: 25, promedio: 6.0 },
    { nombre: "Maria", edad: 28, promedio: 7.3 },
    { nombre: "Andres", edad: 45, promedio: 8.7 },
];

let Mayorpromedio = estudiantes[0];  // ✅ Cambiado a let

for (let i = 1; i < estudiantes.length; i++) {  // ✅ Empieza en 1, ya asumimos el primero
    if (estudiantes[i].promedio > Mayorpromedio.promedio) {
        Mayorpromedio = estudiantes[i];
    }
}

console.log(Mayorpromedio);
*/
//1Recorrer un array 


/*const estudiantes = [
    { nombre: "Pedro", edad: 29, promedio: 7.9 },
    { nombre: "Ana", edad: 33, promedio: 8.9 },
    { nombre: "Pablo", edad: 32, promedio: 9.5 },
    { nombre: "Juan", edad: 25, promedio: 6.0 },
    { nombre: "Maria", edad: 28, promedio: 7.3 },
    { nombre: "Andres", edad: 45, promedio: 8.7 },
];

let promedioMayor = estudiantes[0];

estudiantes.forEach(estudiante => {
    if(estudiante.promedio  > promedioMayor.promedio){
        promedioMayor = estudiante;
    }
})

console.log(promedioMayor);
*/
/*const NewArray = ["manzanas","bananos","uvas","fresas"];

NewArray.forEach(data => {
    console.log(data);
})
//2
const numeros = [1, 2, 3, 4, 5];

const NewNumeros = numeros.map((num) => {
    return(
    num * 2);
})
//sumar elementos de un array
const Numeros = [3, 6, 9, 12, 15]
let suma = 0;
Numeros.forEach(num =>{
    suma += num;
})

console.log(suma);

const Numeros = [5, 8, 12, 19, 25, 30];


const filtro = Numeros.filter((num) => (num > 10));
console.log(filtro);

const Numeros = [5, 8, 12, 19, 25, 30];
const Numeros2 = [5,6,9,10,25,30,45,8];

const filtro = Numeros.filter(num => Numeros2.includes(num));

console.log(filtro);
*/
/*
const colores = ["rojo", "azul", "verde", "amarillo"];

colores.forEach(color => {
    if(color === "verde"){
        console.log("existe verde") 
    }else{
        console.log("No existe el color verde");
    }
})

for(let i = 0; i < colores.length; i++){
    if(colores[i] === "verde"){
        console.log("existe");
        break;
    }
}
const productos = [
    { nombre: "Laptop", categoria: "Tecnología", precio: 1200 },
    { nombre: "Mouse", categoria: "Tecnología", precio: 50 },
    { nombre: "Silla", categoria: "Muebles", precio: 300 },
    { nombre: "Mesa", categoria: "Muebles", precio: 450 },
    { nombre: "Teclado", categoria: "Tecnología", precio: 100 },
    { nombre: "Sofá", categoria: "Muebles", precio: 700 }
  ];

  const categorias = [];
  const productoMascaro = productos[0];

  productos.forEach((producto) => {
    const categoria = producto.categoria;   
    if(!categorias){
        categorias[categoria] = {}
    }

  });

  console.log(categorias);


 

  const usuarios = [
    { nombre: 'Ana', edad: 25, activo: true },
    { nombre: 'Carlos', edad: 30, activo: false },
    { nombre: 'María', edad: 28, activo: true },
    { nombre: 'Luis', edad: 22, activo: false },
    { nombre: 'Sofía', edad: 35, activo: true }
  ];

  const usuariosActivos = usuarios.filter((usua) =>(usua.activo == true ));
  console.log(usuariosActivos);

  */

//for:
/*const totals = [1,2,3,4,5];
const suma = 0;
for(let i = 0; i < totals.length; i++){
    suma += totals[i];
}
console.log(suma);


//reduce:
const totals = [1,2,3,4,5];
const respuesta = totals.reduce((sum, item ) =>{
    return(
        //sum + item
        console.log(item)
    )
},0);
console.log(respuesta);

*/
/*const colores = ['rojo', 'azul', 'rojo', 'verde', 'azul', 'rojo'];

const respuesta = colores.reduce((acu, item) => {
    if (acu[item]) {
        acu[item] += 1;
    } else {
        acu[item] = 1;
    }
    return acu;  // 🔹 Debes devolver el acumulador en cada iteración
}, {});  // 🔹 Inicializamos con un objeto vacío

console.log(respuesta);

const numeros = [1,3,2,3];
const acumulador = {};
numeros.forEach((element) => {
    if(acumulador[element]){
        acumulador[element] += 1;
    }else{
        acumulador[element] = 1;
    }
    return acumulador;
});

console.log(acumulador);


const edades = [18, 22, 30, 27, 25];
const respuesta = edades.reduce((acu,item)=> {
    acu += item;
    return acu;
},0)
const promedio = respuesta / edades.length;

console.log(promedio);



const usuarios = [
    { nombre: 'Laura', edad: 24 },
    { nombre: 'Pedro', edad: 31 },
    { nombre: 'Marta', edad: 29 }
  ];

const edades = [];
usuarios.forEach(element => {
    edades.push(element.edad);
});
console.log(edades);

const usuarios = [
    { nombre: 'Laura', edad: 24 },
    { nombre: 'Pedro', edad: 31 },
    { nombre: 'Marta', edad: 29 }
];

const edades = usuarios.reduce((acu, item) => {
    acu.push(item.edad);
    return acu;
}, []);
console.log(edades);

const numeros = [45, 3, 67, 12, 8, 99];
let numeroMenor = numeros[0];
numeros.forEach((item) => {
    if(item < numeroMenor){
        numeroMenor = item
        return numeroMenor;
    } 
})

console.log(numeroMenor);

const usuarios = [
    { nombre: 'Ana', edad: 25 },
    { nombre: 'Carlos', edad: 30 },
    { nombre: 'María', edad: 28 },
    { nombre: 'Luis', edad: 35 },
    { nombre: 'Sofía', edad: 40 }
  ];

const respuesta = usuarios.reduce((acu, item) =>{
    if(item.edad < 30){
       acu['menores30'].push(item)
    }else{
        acu.mayores30.push(item)
    }
    return acu
},{menores30: [], mayores30: [] })

console.log(respuesta);

const carrito = [
    { producto: 'Camiseta', cantidad: 2, precio: 20 },
    { producto: 'Pantalón', cantidad: 1, precio: 50 },
    { producto: 'Zapatos', cantidad: 1, precio: 80 }
  ];
const respuesta = carrito.reduce((acu,item) =>{
    return acu + (item.cantidad * item.precio);
},0);

console.log(respuesta);


const estudiantes = [
    { nombre: "Juan", edad: 20, calificaciones: [80, 90, 75] },
    { nombre: "María", edad: 22, calificaciones: [95, 85, 92] }, 
    { nombre: "Carlos", edad: 21, calificaciones: [70, 88, 80] },
    { nombre: "Ana", edad: 23, calificaciones: [100, 90, 95] } 
  ];

  estudiantes.push({nombre:'sebastian',edad:28, calificaciones:[90, 56,89]});

  const estudiantesConPromedio = estudiantes.map(estudiante => {
    const suma = estudiante.calificaciones.reduce((aac,nota) => {
        return aac +=nota;
    },0);
    const promedio = suma / estudiante.calificaciones.length;
    return {...estudiante, promedio}
  });
  
  console.log(estudiantesConPromedio);
  


const numeros = [2,4,6,7,8];
const total = numeros.reduce((acc,num) => {
    return acc + num;
},0);

console.log(total);

//Crear un objeto de forma dinamica
// un objeto tiene esta estructura object[clave] = valor
const usuarios = {
    nombre:"sebastian",
    edad:28
};
const clave = "trabajo";
const valor= "programador";

if(!usuarios[clave]){
    usuarios[clave] = valor
}else{
    console.log()
}
console.log(usuarios)



const array = [
    {nombre:"sebastian", edad:28},
    {nombre:"juan", edad:29},
    {nombre:"carolina", edad:27},
]
const newArray = [...array,{nombre:"matias", edad:28}];
console.log(newArray);

let Objeto = {};

function probando(clave,valor) {
    Objeto[clave] = valor;
}



probando("Nombre","sebastian");
probando("edad",28);
probando("apellido","aristizabal");
console.log(Objeto);

*/

/*Async Await 
*/

/*
const saludo =  async () => {
    console.log("Hola sebastian");
}

const respuesta = saludo();
console.log(respuesta);

const saludo = new Promise((resolve, reject) => {
   const id=  setInterval(() => {
        console.log('Hola Buenos dias');
        clearInterval(id);
        resolve('se termino de saludar');
    },1000)  
}); 

saludo.then((mensaje) => {
    console.log(mensaje);
});

const PrepararIngredientes = (callback) => {
setTimeout(() =>{
    console.log("Preparando ingredientes");
    callback();
},2000);

}

const cocinar = (callback) => {
    setTimeout(() => {
        console.log("cocinando ingredientes");
        callback()
    },3000);
}

const servir = () => {
    console.log("la cena esta servida");
}
PrepararIngredientes(() => {
    cocinar(() => {
        servir();
    })
});


const pasarDatos = (nom,apellido, edad, callback) => {
    console.log("pasando datos");
    callback(nom,apellido,edad);
}

const recibiendoDatos = (nom, apellido, edad, callback) =>{
    console.log(`el nomnbre es ${nom} y el apellido es ${apellido} y la edad es ${edad}`);
    callback(edad);
}

const duplicarEdad = (Edad) => {
    console.log(`la edad duplicada es de ${Edad * 2}`);
}

pasarDatos("sebastian", "aristizabal",28, (nom,apellido,edad) => {
    recibiendoDatos(nom,apellido,edad, (edad) => {
        duplicarEdad(edad);
    })
})*/

/*
Ejercicio: Simular una compra online usando Promesas
Tenés que simular una compra en una tienda online. Las funciones deben ser asincrónicas usando Promesas y deben seguir este flujo:

Verificar si el producto está en stock.

Procesar el pago.

Generar la factura.


const VerificaStock = (producto) => {
    console.log("Verificando producto en estok");
return new Promise((resolve, reject) =>{
    setTimeout(() =>{
        if(producto === "computador"){
            console.log("Producto disponible");
            resolve(producto);
        }else{
            reject("El producto no eta disponible");
        }
    },2000)
})
}

const pago = (producto) => {
    return new Promise((resolve,reject) => {
        console.log("Procesando pago del producto");
        setTimeout(() => {
            resolve(`Pago aprobado producto ${producto}`);
        },3000);
    });
}

VerificaStock("computador").then((producto) => {
     return  pago(producto);  
}).then((mensaje) => {
    console.log(mensaje);
})
.catch(() => {
    console.log("Error en ejecutar la venta");
})

const VerificarLogin = (usuario, contraseña) => {
    return new Promise((resolve,reject) => {
        if(usuario != null && contraseña != null &&usuario === "sebastian"){
            console.log("Verificando credenciales");
            setTimeout(() => {
                resolve("Exito verificando credenciales");
            },3000);
        }else{
            reject("No se pudo verificar el usuario");
        }
    });
}
const Redireccionar = ()  => {
    return new Promise((resolve) => {   
        console.log("Redireccionando");
        setTimeout(() => {
            resolve("Bienvenido a la vista login");
        },3000)
    });
}



VerificarLogin("sebastia", 123).then((mensaje) => {
    console.log(mensaje);
    return Redireccionar()
}).then((redirecion) => {
    console.log(redirecion);
})
.catch(()=> {
    console.log("ocurrio un error");
})


const esperarSegundos = () => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve("Se resolvio la promesa correctamente"); 
        },2000)
    })
}

esperarSegundos().then((msg) => {
    console.log(msg);
})
*/
/*
const buscarUsuario = (usuario, productos) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log("Verificando usuario");
            if (usuario === "sebastian") {
                console.log(`Bienvenido ${usuario}`);
                resolve(productos);
            } else {
                reject("NO se pudo verificar este usuario");
            }
        }, 2000)
    })
}

const obtenerProductos = (productosObtenidos) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            const precios = productosObtenidos.map((prod) => (prod.precio))
            resolve(precios);
        },1000)
    })
}

const obtenerTotal = (precios) => {
   const total = precios.reduce((valor,acc) => {
        return valor + acc;
   },0);
   console.log(`el valor total es ${total}`);
}

buscarUsuario("juan", [{ producto: "lavadora", precio: 20000 },
{ producto: "planchas", precio: 30000 }]
).then((productos) => {
    return obtenerProductos(productos);
}).then((preciosPro) => {
    obtenerTotal(preciosPro);
}).catch((msj) => {
    console.error(msj);
})


const productos = [
    { nombre: 'Mouse', precio: 25 },
    { nombre: 'Teclado', precio: 45 },
    { nombre: 'Monitor', precio: 200 },
    { nombre: 'USB', precio: 10 }
  ];

const masCostoso = productos.filter((prod) => {
    if(prod.precio > 20){
        return prod;
    }
})

const nombreMayusculas = () => {
    const Mayusculas = productos.map((pro) => {
        return pro.nombre.toUpperCase();
    })
    console.log(Mayusculas);
}

nombreMayusculas();
*/

const usuarios = [];
const perfiles = [];

const crearUsuarios =(datos) => {
 return new Promise((resolve, reject) => {
    if(datos.nombre != null && datos.edad != null){
        setTimeout(() => {
            console.log("Creando el usuario");
            usuarios.push(datos);
            resolve(usuarios);
        }, 2000);
    } else{
        reject("Error al crear el usuario");
    }
 })
}

async function Usuarios() {
    const Users = await crearUsuarios({nombre:"jsebastian", edad:28})
    console.log(Users);
};

Usuarios();
