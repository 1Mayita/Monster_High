let primera=null
let segunda=null
let bloqueo=false
let pares=0
let totalPares=0

let tiempo=0
let intervalo

const imagenes=[

"img/draculaura.png",
"img/clawdeen.png",
"img/frankie.png",
"img/lagoona.png",
"img/cleo.png",
"img/ghoulia.png",
"img/abeey.png",
"img/spectra.png"

]

function mostrar(id){

document.querySelectorAll(".pagina").forEach(p=>{
p.style.display="none"
})

document.getElementById(id).style.display="block"

}

function iniciarJuego(nivel){

let cantidad

if(nivel==="facil"){
cantidad=4
tiempo=30
}

if(nivel==="medio"){
cantidad=6
tiempo=120
}

if(nivel==="dificil"){
cantidad=8
tiempo=180
}

let seleccion=imagenes.slice(0,cantidad)

let cartas=[...seleccion,...seleccion]

cartas.sort(()=>Math.random()-0.5)

totalPares=cantidad
pares=0

const tablero=document.getElementById("tablero")

tablero.innerHTML=""

cartas.forEach(img=>{

let carta=document.createElement("div")

carta.classList.add("carta")

carta.innerHTML=`<img src="${img}">`

carta.dataset.imagen=img

carta.addEventListener("click",voltear)

tablero.appendChild(carta)

})

iniciarTiempo()

mostrar("juego")

}

function iniciarTiempo(){

clearInterval(intervalo)

intervalo=setInterval(()=>{

tiempo--

document.getElementById("tiempo").innerText="Tiempo: "+tiempo

if(tiempo<=0){

clearInterval(intervalo)

document.getElementById("mensajeFinal").innerText="Se acabó el tiempo"

mostrar("resultado")

}

},1000)

}

function voltear(){

if(bloqueo) return
if(this===primera) return

this.classList.add("volteada")

if(!primera){

primera=this
return

}

segunda=this

verificar()

}

function verificar(){

if(primera.dataset.imagen===segunda.dataset.imagen){

pares++

reset()

if(pares===totalPares){

clearInterval(intervalo)

document.getElementById("mensajeFinal").innerText="¡Ganaste!"

mostrar("resultado")

}

}else{

bloqueo=true

setTimeout(()=>{

primera.classList.remove("volteada")
segunda.classList.remove("volteada")

reset()

},800)

}

}

function reset(){

primera=null
segunda=null
bloqueo=false

}

function verResultado(){

if(pares!==totalPares){

alert("Primero debes terminar el juego")

}else{

mostrar("resultado")

}

}