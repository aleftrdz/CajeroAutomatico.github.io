//info de los usuarios
let cuentas = [
    {nombre: 'Ale', saldo: 200},
    {nombre: 'Hae', saldo: 290},
    {nombre: 'Mark', saldo: 67}
]


let quienIngresa = localStorage.getItem('loginCorrecto');
console.log("in: " + quienIngresa);

let indexQuienEntro = cuentas.findIndex(function(cuenta){
    return cuenta.nombre === quienIngresa;
});
console.log("index: " + indexQuienEntro);


document.addEventListener("DOMContentLoaded", function() {
    const botonConsulta = document.getElementById("consulta");
    const botonRetiro = document.getElementById("retiro");
    const botonDeposito = document.getElementById("deposito");
    const botonSalir = document.getElementById("cerrarSesion");
    // Esconder el formulario al ingresar, será visible de nuevo cuando los botones retirar/ingresar dinero se presionen
    const retiroDeposito = document.getElementById("retiroDeposito");
    retiroDeposito.style.display = "none";

    botonConsulta.addEventListener("click", function() {
        console.log("Boton consultar presionado");
        consultarSaldo();
    });

    botonRetiro.addEventListener("click", function() {
        console.log("Boton Retirar presionado");
        retiro();
    });

    botonDeposito.addEventListener("click", function() {
        console.log("Boton ingresar dinero presionado");
        deposito();
    });

    botonSalir.addEventListener("click", function() {
        window.location.assign("index.html")
    });
});
//consulta de saldo: 
function consultarSaldo(){
    const textoAviso = document.getElementById("textoCambiable");
    const MenuPrincipal = document.getElementById("MenuP");
    //El formulario no es útil al momento de realizar una consulta, por ello se "esconde"
    const retiroDeposito = document.getElementById("retiroDeposito");
    retiroDeposito.style.display = "none";
    MenuPrincipal.style.display = "none";
    //Mostrar información del saldo de la cuenta
    textoAviso.innerHTML = "Tu saldo es: " + cuentas[indexQuienEntro].saldo;
    textoAviso.style.color = "blue";
    console.log("Consulta saldo completa");
}
//Retirar: 
function retiro(){
    
    const textoAviso = document.getElementById("textoCambiable");
    const textoAviso2 = document.getElementById("textoCambiable2");
    const MenuPrincipal = document.getElementById("MenuP");
    MenuPrincipal.style.display = "none";
    textoAviso.innerHTML = "Ingrese el monto del retiro";
    textoAviso2.innerHTML = "*La cuenta debe tener un saldo mínimo de $10 después del retiro";
    
    //Recibe valor de la transacción y se muestra
    const retiroDeposito = document.getElementById("retiroDeposito");
    retiroDeposito.style.display = "flex";

    retiroDeposito.addEventListener("submit", function(event){
        event.preventDefault();
        const valorTransaccion = document.getElementById("montoTransaccion").value;
        console.log("Su retiro fue de $: " + valorTransaccion);

        const cantidad = parseInt(valorTransaccion);

        //Validar la regla de menos de 10
        if ((cuentas[indexQuienEntro].saldo - cantidad) >= 10){

            cuentas[indexQuienEntro].saldo -= cantidad;
            console.log("El saldo actual es: $" + cuentas[indexQuienEntro].saldo);
            
            //Informar el valor retirado y nuevo saldo
            textoAviso2.innerHTML = "Se retiraron: $ " + cantidad + " y el saldo actual es de  $" + cuentas[indexQuienEntro].saldo;
            textoAviso2.style.color = "black";
        } else {
            textoAviso2.innerHTML = "No se tiene el saldo suficiente para retirar esa cantidad, inténtalo nuevamente";
            textoAviso2.style.color = "red";
        }
    });
}
//Ingresar:
function deposito(){
    //Inicio de transacción
    const textoAviso = document.getElementById("textoCambiable");
    const textoAviso2 = document.getElementById("textoCambiable2");
    const MenuPrincipal = document.getElementById("MenuP");
    MenuPrincipal.style.display = "none";
    textoAviso.innerHTML = "Ingrese el monto a depositar";
    textoAviso2.innerHTML = "*El saldo máximo de la cuenta es de $990";
   

    // Recibe valor de la transacción y se muestra
    const retiroDeposito = document.getElementById("retiroDeposito");
    retiroDeposito.style.display = "flex";

    retiroDeposito.addEventListener("submit", function(event){
        event.preventDefault();
        const valorTransaccion = document.getElementById("montoTransaccion").value;
        console.log("Se depósito fue de: $ " + valorTransaccion);

        const cantidad = parseInt(valorTransaccion);

        //Validar la regla de menos de 990
        if ((cuentas[indexQuienEntro].saldo + cantidad) <= 990) {

            cuentas[indexQuienEntro].saldo += cantidad;
            console.log("El saldo actual es: $" + cuentas[indexQuienEntro].saldo);
            //Informar el valor retirado y nuevo saldo
            textoAviso2.innerHTML = "Se depositaron $" + cantidad + ", y el saldo actual es de  $" + cuentas[indexQuienEntro].saldo;
            textoAviso2.style.color = "black";
        } else {
            textoAviso2.innerHTML = "El límite de $990 fue excedido, consulta el saldo y deposita una cantidad adecuada";
            textoAviso2.style.color = "red";
        }
    });
}