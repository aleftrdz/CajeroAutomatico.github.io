//Declarando el almacenamiento de los usuarios y su información
let cuentas = [
    { nombre: "Ale", clave: "0023"},
    { nombre: "Hae", clave: "0606"},
    { nombre: "Mark", clave: "9982"}
]
let usuarioLogueado = " ";
const formLogin = document.getElementById("form");

document.addEventListener('DOMContentLoaded', function() {
    
    const formLogin = document.getElementById("form");

    formLogin.addEventListener('submit', function(event) {

        event.preventDefault();

        const nombre = document.getElementById("inputUsuarioHtml").value;
        
        const clave = document.getElementById("inputPasswordHtml").value;

        let coincide = false;

     //Errores
     function mostrarErrores(tipo){
        let error = document.getElementById(`error${tipo}`)
        error.classList.remove('escondido')
        error.classList.add('error')
        setTimeout(()=>{
            error.classList.remove('error')
            error.classList.add('escondido')
        }, 4000)   
    }
        
        // Validación usuario/clave
        for (let index = 0; index < cuentas.length; index++) {

            if (cuentas[index].nombre === '' && cuentas[index].clave === ''){
                coincide = false
                mostrarErrores('Datos')
            }
            else if(cuentas[index].nombre !== nombre){
                coincide = false
                mostrarErrores('Usuario')
                
            }
            else if(cuentas[index].clave !== clave){
                coincide = false
                mostrarErrores('Password')
            }
            else if (cuentas[index].nombre === nombre && cuentas[index].clave === clave){
                coincide = true;
                usuarioLogueado = cuentas[index].nombre;
                localStorage.setItem("loginCorrecto", usuarioLogueado);
                break;
            }
            
        }

        if (coincide == true){
            ingresoBanco();
        } 
        
    });
});


function ingresoBanco(){
    window.location.assign("cajero.html")
    console.log("Entramos")
}