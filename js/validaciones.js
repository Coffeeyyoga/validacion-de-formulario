export function valida(input){
    const tipoDeInput = input.dataset.tipo;
    if(validadores[tipoDeInput]){
        validadores[tipoDeInput](input)
    }

if (input.validity.valid){
    input.parentElement.classList.remove("input-container--invalid");
    input.parentElement.querySelector(".input-message-error").innerHTML = " "
    }else{
        input.parentElement.classList.add("input-container--invalid")
        input.parentElement.querySelector(".input-message-error").innerHTML = mostarMensajeDeError(tipoDeInput, input)

    }

}

const tiposDeErrores = [
    "valueMissing",
    "typeMismatch",
    "patterMismatch",
    "customError"
]


const mensajesDeError = {
    nombre: {
        valueMissing: "El campo nombre puede estar vacío"
    },

    email: {
        valueMissing: "El campo email no puede estar vacío",
        typeMismatch: "El correo no es válido"
    },

    password: {
        valueMissing: "El campo contraseña no puede estar vacío",
        patterMismatch: "Al menos 6 caracteres, mínimo 12, debe contener una letra minúscula, una letra mayúscula, un número y no puede caracteres especiales."
    },

    nacimiento: {
        valueMissing: "El campo nacimiento no puede estar vacío",
        customError:  mensaje = "Debes tener al menosn 18 años de edad."

    },
    numero: {
        valueMissing: "Este campo no puede estar vacio",
        patterMismatch: "El formato requerido es XXXXXXXXXX 10 números",
    },

    direccion: {
        valueMissing: "Este campo no puede estar vacio",
        patterMismatch: "El formato requerido es XXXXXXXXXX 10 números",
    },

    ciuddad: {
        valueMissing: "Este campo no puede estar vacio",
        patterMismatch: "La ciudad debe contener entre 10 y 40 caracteres",
    },

    estado: {
        valueMissing: "Este campo no puede estar vacio",
        patterMismatch: "El estado debe contener entre 10 y 40 caracteres",
    },
};

const validadores = {
    nacimiento: (input) => validarNacimiento(input),
};

function mostarMensajeDeError(tipoDeInput, input){
    let mensaje = ""
    tiposDeErrores.forEach( error =>{
        if(input.validity[error]){
            console.log(tipoDeInput, error);
            console.log(input.validity[error]);
            console.log(mensajesDeError[tipoDeInput][error]);
            mensaje = mensajesDeError[tipoDeInput][error];
        }
    })
    return mensaje
}


function validarNacimiento(input){
    const fechaCliente = new Date(input.value);
    let mensaje = "";
    if(!mayorDeEdad(fechaCliente)){
        mensaje = "Debes tener al menosn 18 años de edad."
    };

    input.setCustomValidity(mensaje);
}

function mayorDeEdad(fecha){
    const fechaActual = new Date();
    const diferenciaFechas = new Date(
        fecha.getUTCFullYear() + 18,
        fecha.getUTCMonth(),
        fecha.getUTCFullDate());

    return diferenciaFechas <= fechaActual;
}