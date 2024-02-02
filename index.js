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
const listaTitulo = document.querySelector(".insider")
const año = document.querySelector("#año")
const autor = document.querySelector("#autor")
const ordenar = document.querySelector("#sorteado")
const gustar = document.querySelector("#gustar")
const odiar = document.querySelector("#odiar")
const caja = document.querySelector(".caja")
const atroden = document.querySelector(".atroden")
const titulos = []
let url_base = "https://rickandmortyapi.com/api"
let endpoint1 = "/character?name=rick&status=alive"
let endpoint2 = "/character?name=morty&status=alive&location=earth"



let kilowat = ""
let year = 0
let author = ""

class trelew {
    constructor (nombre, año, autor) {
        this.nombre = nombre
        this.año = año
        this.autor = autor
    }
}


SAGASDIV.style.display = "none"
 caja.style.display = "none"

const isLog = JSON.parse(localStorage.getItem("isLog"))
const previamente = JSON.parse(localStorage.getItem("listaGuardar"))

if (isLog !== null && isLog.usuario) {
    contencion.innerHTML = `<h2>Welcome again ${isLog.usuario}!</h2>`
    SAGASDIV.style.display = "flex"
    caja.style.display = "flex"
    if (previamente !== null) {
        titulos.push(...previamente)
        listaTitulo.innerHTML = "";
        previamente.forEach((entrada) => {
            let porAñadir = document.createElement("p");
            porAñadir.innerText = `El libro: ${entrada.nombre} del autor: ${entrada.autor} publicado en el año: ${entrada.año}`;
            listaTitulo.appendChild(porAñadir);
        });
    }
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
        Swal.fire({
            title: "Error",
            text: "Usuario o contraseña incorrecto",   
            icon: "error"
          });
        
    } else {
        contencion.innerHTML = `<h2>Welcome again ${isReal.usuario}!</h2>`
        localStorage.setItem  ("isLog", JSON.stringify({usuario: usuarioALoguear.usuario}))
        SAGASDIV.style.display = "flex"
        Swal.fire({
            title: "Login exitoso!",
            text: "Puede entrar",   
            icon: "success"
          });
    }
})

agregarTitulos.addEventListener("change", (event) => {
    if (event.target.value != null) {
    kilowat = event.target.value
    }
})

año.addEventListener("change", (event) => {
    year = event.target.value
    
})

autor.addEventListener("change", (event) => {
    if (event.target.value != null) {
    author = event.target.value
    }
})



añadir.addEventListener("click", ()=> {

    if (kilowat === "" || author === "") {
        kilowat = ""
        author = ""
        Swal.fire({
            title: "Error",
            text: "Complete los campos de titulo y autor",   
            icon: "error"
          });
         
    }
    else{
     Toastify({

         text: "Datos cargados!",
         duration: 1750,
         close: true
        }).showToast();

        caja.style.display = "flex"
        titulos.push(new trelew(kilowat, year, author))
        listaTitulo.innerHTML = ""
        titulos.forEach((entrada) => {
        let porAñadir = document.createElement("p")
        porAñadir.innerText = `El libro:${entrada.nombre} del autor: ${entrada.autor} publicado en el año: ${entrada.año} `
        listaTitulo.appendChild(porAñadir)
    })
    localStorage.setItem("listaGuardar", JSON.stringify(titulos))
    }
})

ordenar.addEventListener("click", ()=> {
    titulos.sort((a,b)=> {
        if (a.año > b.año) {
            return 1
        }
        if (a.año < b.año) {
            return -1
        }
        return 0

    })
    listaTitulo.innerHTML = ""
    titulos.forEach((entrada) => {
        let porAñadir = document.createElement("p")
        porAñadir.innerText = `El libro:${entrada.nombre} del autor: ${entrada.autor} publicado en el año: ${entrada.año} `
    listaTitulo.appendChild(porAñadir)
    })

})
odiar.addEventListener("click", () => {
    atroden.innerHTML = ""
    fetch(url_base + endpoint1)
    .then((respuesta)=> {
        return respuesta.json()
    })
    .then((data) => {
        console.log(data.results)
        data.results.forEach((roco) => {
            const div = document.createElement("div")
            const p = document.createElement("p")
            const img = document.createElement("img")
            img.src = roco.image
            img.width = 200
            p.innerHTML = roco.name
            div.style.border = "2px solid black"
            div.style.padding = "10px"
            div.appendChild(p)
            div.appendChild(img)
            atroden.style.flexDirection = "row"
            atroden.style.flexWrap = "wrap"
            atroden.appendChild(div)
        })
    })
    .catch((error)=> {
        atroden.innerHTML = ""
        atroden.innerHTML = `<h2>Sucedio un error al cargar las listas</h2>`
    })
})

gustar.addEventListener("click", ()=> {
    atroden.innerHTML = ""
    fetch(url_base + endpoint2)
    .then((respuesta) => {
        return respuesta.json()
    })
    .then((data) => {
        console.log(data.results)
        data.results.forEach((mauricio) => {
            const diva = document.createElement("div")
            const pa = document.createElement("p")
            const imga = document.createElement("img")
            imga.src = mauricio.image
            imga.width = 200
            pa.innerHTML = mauricio.name
            diva.style.border = "2px solid black"
            diva.style.padding = "10px"
            diva.appendChild(pa)
            diva.appendChild(imga)
            atroden.style.flexDirection = "row"
            atroden.style.flexWrap = "wrap"
            atroden.appendChild(diva)
        })
    })
    .catch((error) => {
        atroden.innerHTML = ""
        atroden.innerHTML = `<h2>Sucedio un error al cargar las listas</h2>`
    })
})
