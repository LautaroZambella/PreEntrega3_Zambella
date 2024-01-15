////Login, con posibilidad de agregar titulos favoritos


const BASEUSUARIOS = [
    {
        usuario: "Lionel",
        contraseña: "Messi"
    },
    {
        usuario: "Julian",
        contraseña: "Alvarez"
    },
    {
        usuario: "brandon",
        contraseña: "sanderson"
    }
]

const inputUsuario = document.querySelector("#usuario")
const inputContraseña = document.querySelector("#password")
const botonIniciar = document.querySelector("#btn-iniciar")
const contencion = document.querySelector("#contenedor")
const clerear = document.querySelector("#clerear")
const SAGASDIV = document.querySelector("#SAGASID")
const agregarTitulos = document.querySelector("#titulo")
const añadir = document.querySelector("#añadir")
const listaTitulo = document.querySelector("#listaTitulo")

const titulos = []


SAGASDIV.style.display = "none"

const isLog = JSON.parse(localStorage.getItem("isLog"))
const titulosGuardados = JSON.parse(localStorage.getItem("titulosGuardados"))
console.log(titulosGuardados)
if (isLog !== null && isLog.usuario) {
    contencion.innerHTML = `<h2>Welcome again ${isLog.usuario}!</h2> `
    SAGASDIV.style.display = "flex"
    titulos.push(...titulosGuardados)
}

const usuarioALoguear = {
    usuario: "",
    password: "",
}


clerear.addEventListener("click", ()=> {
    localStorage.clear()
    location.href ="./index.html"
})


inputUsuario.addEventListener("input", (event) => {
    usuarioALoguear.usuario = event.target.value
})

inputContraseña.addEventListener("input", (event) => {
    usuarioALoguear.password = event.target.value
})




botonIniciar.addEventListener("click", ()=> {
    
    const isReal = BASEUSUARIOS.find((baseusuario)=>{
        return baseusuario.usuario === usuarioALoguear.usuario && baseusuario.contraseña === usuarioALoguear.password
    })

    if (isReal == undefined) {
        contencion.innerHTML = `<h2>Usuario o contraseña incorrecto</h2>`
        SAGASDIV.style.display = "none"
        
    } else {
        contencion.innerHTML = `<h2>Welcome again ${isReal.usuario}!</h2>`
        localStorage.setItem  ("isLog", JSON.stringify({usuario: usuarioALoguear.usuario}))
        SAGASDIV.style.display = "flex"
    }
})

agregarTitulos.addEventListener("change", (event) => {
    titulos.push(event.target.value)
    console.log(titulos)
    event.target.value = ""
})

añadir.addEventListener("click", ()=> {
    listaTitulo.innerHTML =""
    titulos.forEach((titulo) => {
        let porAñadir = document.createElement("li")
        porAñadir.textContent = `${titulo}`
        listaTitulo.appendChild(porAñadir);
        console.log(listaTitulo)
        
    })
    localStorage.setItem("titulosGuardados", JSON.stringify(titulos));
})

