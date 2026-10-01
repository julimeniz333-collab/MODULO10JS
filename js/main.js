
const contenedorAsociaciones =
    document.getElementById("contenedor-asociaciones");

const estado =
    document.getElementById("estado");

let asociaciones = [];


async function obtenerAsociaciones() {

    try {

        // Mostramos feedback mientras carga

        estado.textContent =
            "Cargando asociaciones...";


    

        const respuesta =
            await fetch("./data.json");


        

        if (!respuesta.ok) {

            throw new Error(
                "No se pudieron obtener las asociaciones."
            );

        }


        asociaciones =
            await respuesta.json();


        

        renderizarAsociaciones(asociaciones);


        Swal.fire({

            icon: "success",

            title: "Datos cargados",

            text:
                "Las asociaciones fueron cargadas correctamente.",

            timer: 1800,

            showConfirmButton: false

        });


    } catch (error) {

      

        console.error(
            "Error al cargar asociaciones:",
            error
        );


  

        estado.textContent =
            "No se pudieron cargar las asociaciones.";


   

        Swal.fire({

            icon: "error",

            title: "Error",

            text:
                "No fue posible cargar la información. Intentá nuevamente."

        });


    } finally {

        console.log(
            "La petición de asociaciones finalizó."
        );

    }

}



function renderizarAsociaciones(lista) {

    // Limpiamos el contenedor

    contenedorAsociaciones.innerHTML = "";


    // Ocultamos el mensaje de carga

    estado.textContent = "";



    lista.forEach((asociacion) => {

        // Creamos una tarjeta

        const tarjeta =
            document.createElement("article");


        tarjeta.classList.add(
            "tarjeta-asociacion"
        );


 

        tarjeta.innerHTML = `

            <h3>
                ${asociacion.nombre}
            </h3>

            <p>
                <strong>Categoría:</strong>
                ${asociacion.categoria}
            </p>

            <p>
                <strong>Localidad:</strong>
                ${asociacion.localidad}
            </p>

            <p>
                <strong>Objetivo:</strong>
                ${asociacion.objetivo}
            </p>

            <p>
                <strong>Socios:</strong>
                ${asociacion.socios}
            </p>

            <button
                class="boton-colaborar"
                data-id="${asociacion.id}"
            >
                Quiero colaborar
            </button>

        `;




        contenedorAsociaciones.appendChild(
            tarjeta
        );

    });




    agregarEventosBotones();

}

function agregarEventosBotones() {

    const botones =
        document.querySelectorAll(
            ".boton-colaborar"
        );


    botones.forEach((boton) => {

        boton.addEventListener(
            "click",
            () => {

                const id =
                    Number(boton.dataset.id);


                const asociacion =
                    asociaciones.find(
                        (item) => item.id === id
                    );


                mostrarFormularioColaboracion(
                    asociacion
                );

            }
        );

    });

}


function mostrarFormularioColaboracion(
    asociacion
) {

    Swal.fire({

        title: "Quiero colaborar",

        html: `

            <p>
                Vas a contactar a:
            </p>

            <strong>
                ${asociacion.nombre}
            </strong>

            <input
                id="nombre-colaborador"
                class="swal2-input"
                placeholder="Tu nombre"
            >

            <input
                id="email-colaborador"
                type="email"
                class="swal2-input"
                placeholder="Tu email"
            >

        `,

        showCancelButton: true,

        confirmButtonText:
            "Enviar solicitud",

        cancelButtonText:
            "Cancelar",


        preConfirm: () => {

            const nombre =
                document.getElementById(
                    "nombre-colaborador"
                ).value.trim();


            const email =
                document.getElementById(
                    "email-colaborador"
                ).value.trim();


            if (!nombre || !email) {

                Swal.showValidationMessage(
                    "Completá tu nombre y email."
                );

                return false;

            }


            return {
                nombre,
                email
            };

        }

    }).then((resultado) => {

        if (resultado.isConfirmed) {

            Swal.fire({

                icon: "success",

                title:
                    "Solicitud enviada",

                text:
                    `Gracias ${resultado.value.nombre}. 
                    Tu interés en colaborar con 
                    ${asociacion.nombre} fue registrado.`

            });

        }

    });

}


obtenerAsociaciones();