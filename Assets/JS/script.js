/* fetch para hacer la lista */
var lista = document.querySelector("#lista");
fetch('https://digimon-api.vercel.app/api/digimon')
    .then(response => response.json())
    .then(datos => {
        tabla(datos)
    });
function tabla(datos) {
    for (let temp of datos) {
        lista.innerHTML += `
<tr>
<th scope="row">${temp.name}</ th>
<td><img src="${temp.img}" class="img-thumbnail digimg" alt="${temp.name}"></td>
<td>${temp.level}</td>
</tr>
`
    }
}

/* Función de búsqueda */
//Capturamos el elemento form
let form = document.getElementById("search");
//asignamos un evento `submit` al elemento form
form.addEventListener('submit', function (event) {
    event.preventDefault();

    if (validarForm()) {
        var digimon = document.getElementById('digiSearch').value;
        getData2(digimon);

    }
    else {
        alert('Búsqueda inválida')
    }

})

// Función que valida todos los campos del formulario
//retorna true o false
function validarForm() {
    //capturamos datos del formulario 
    var digimon = document.getElementById('digiSearch').value;
    let formValido = true;

    if (digimon == "") {
        formValido = false;
    }

    return formValido;
}


async function getData2(digimon) {
    try {
        var promise = await fetch(`https://digimon-api.vercel.app/api/digimon/name/${digimon}`);
        var resultado = await promise.json();
        console.log(resultado)
        document.getElementById('listaDigimon').style.display = 'none';
        document.getElementById('digiCard').style.display = 'block';
        console.log(document.getElementById('listaDigimon'));
        htmlInjection(resultado, 'digiCard');
    } catch (error) {
        console.log(error)
        document.getElementById('digiCard').style.display = 'none';
        document.getElementById('listaDigimon').style.display = 'block';
        alert ("Digimon no encontrado")
    }
}

/*
    Inyectar datos al html
*/
function htmlInjection(data, idElemento) {
    var elemento = document.getElementById(idElemento);
    console.log(elemento);
    const { name, img, level } = data[0]; //desestructuracion de objeto

    var info = `
    <div class="card" style="width: 18rem">
    <img src="${img}" class="card-img-top" alt="${name}" />
    <div class="card-body">
      <h5 class="card-title">${name}</h5>
    </div>
    <ul class="list-group list-group-flush">
      <li class="list-group-item"><b>Level: </b>${level}</li>
      <li class="list-group-item"><a id="return" href="#" class="btn btn-primary">Go back to list</a></li>
    </ul>
  </div>
    `
    elemento.innerHTML = info;
    var back = document.getElementById("return");
    console.log(back);
    back.addEventListener("click", function () {
        document.getElementById('digiCard').style.display = 'none';
        document.getElementById('listaDigimon').style.display = 'block';
    })
}