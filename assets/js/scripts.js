let usuario ={
    id:234,
    nombre:'Max',
    ciudad:'Osorno',
    edad:54
};

/*
const VERDE = 'verde';
const AMARILLO = 'amarillo';
const ROJO = 'rojo';
const manzana = 'rojo';
*/
const VERDE = Symbol('verde');
const AMARILLO = Symbol('amarillo');
const ROJO = Symbol('rojo');
const manzana = Symbol('rojo');

function probarSimbolos(){
    const idSimbolo = Symbol('id');
    usuario[idSimbolo] = 111883;
    console.log(usuario);
    console.log('_______________');
    console.log(Object.getOwnPropertySymbols(usuario));
}

function semaforo(color){
    switch(color){
        case ROJO:
            return 'Frena el Auto';
            break;
        case AMARILLO:
            return 'Reduce la Velocidad';
            break;
        case VERDE:
            return 'Adelante';
            break;
        default:
            return 'Eso no es un color';
            break;
    }
}
function probarSemaforo(){
    console.log('funciona probar semaforo');

    let resultado = semaforo(ROJO);
    console.log(resultado);
    resultado = semaforo(manzana);
    console.log(resultado);
}

var manejador = {
    get(target, key){
        return key in target ? target[key] : 'No existe la propiedad en el objeto target';
    }
};

function probarProxy(){
    var objetoProxy = new Proxy({},manejador);
    objetoProxy.propiedad1 = 1;
    objetoProxy.propiedad2 = 'hola';

    console.log(objetoProxy.propiedad1);
    console.log(objetoProxy.propiedad2);
    console.log(objetoProxy.propiedad3);

}

var validador ={
    set: function(objeto,propiedad,valor){
        if(propiedad === 'edad'){
            if(typeof valor !== 'number' || Number.isNaN(valor)){
                    console.log('El valor de la propiedad edad debe ser un número');
                    return false;
            }
            else{

                if(valor<0){
                    console.log('El valor de la propiedad edad debe ser un número positivo');
                    return false;
                }
                else{
                    objeto[propiedad] = valor;
                    return true;
                }

            }

        }
        else{
            console.log('La propiedad no se llama edad');
            return false;

        }

    }
};

function probarProxyCreacion(){
    let persona = new Proxy({}, validador);

    persona.nombre = 'pepito';
    console.log(persona);
    persona.edad = 'joven';
    console.log(persona);
    persona.edad = -36;
    console.log(persona);
    alert('verifique los objetos en consola');
    persona.edad = 62;
    console.log(persona.edad);
    console.log(persona);
}

function probarReflect(){
    const perrito = {
        nombre: 'Chippy',
        color: 'Cafe',
        collar: function(){
            console.log(`Mi nombre es ${this.nombre}`);
        }
    };

    console.log(perrito);
    console.log(Reflect.has(perrito,'color'));
    console.log(Reflect.has(perrito,'edad'));
    console.log(Reflect.ownKeys(perrito));
    console.log(Reflect.set(perrito,'raza', 'pastor alemán'));
    console.log(perrito);
}

function asignarEventos(){
    let elBoton = document.getElementById('btnSimbolos');
    elBoton.addEventListener('click', probarSimbolos);

    let elBotonSemaforo = document.getElementById('btnSemaforo');
    elBotonSemaforo.addEventListener('click', probarSemaforo);

    let elBotonProxy = document.getElementById('btnProxy');
    elBotonProxy.addEventListener('click', probarProxy);

    let elBotonProxyCreacion = document.getElementById('btnProxyCreacion');
    elBotonProxyCreacion.addEventListener('click', probarProxyCreacion);

    let elBotonReflect = document.getElementById('btnReflect');
    elBotonReflect.addEventListener('click', probarReflect)
}