/* -------------------------------------------------------------------------- */
/*                        // LOGICA DE MENU DESPLEGABLE                       */
/* -------------------------------------------------------------------------- */
window.addEventListener('load', function () {
    const formAgregar = document.getElementById("formAgregar");
    const spanAgregar = document.getElementById("spanAgregar");
    const buttonAgregar = document.getElementById("buttonAgregar");
    const buttonModificar = document.getElementById("buttonModificar");
    const spanModificado = document.getElementById("spanModificado");
    const formModificar = document.getElementById("formModificar");

    const formAgregarOdontologo = document.getElementById("formAgregarOdontologo");
    const spanAgregarOdontologo = document.getElementById("spanAgregarOdontologo");
    const buttonAgregarOdontologo = document.getElementById("buttonAgregarOdontologo");
    const formModificarO = document.getElementById("formModificarO");
    const buttonModificarO = document.getElementById("buttonModificarO");
    const spanModificadoO = document.getElementById("spanModificadoO");

    const spanAgregarTurno = document.getElementById("spanAgregarTurno");
    const buttonAgregarTurno = document.getElementById("buttonAgregarTurno");
    const formModificarT = document.getElementById("formModificarT");
    const buttonModificarT = document.getElementById("buttonModificarT");
    const spanModificadoT = document.getElementById("spanModificadoT");


    buttonAgregar.addEventListener("click", (e)=> {
            spanAgregar.classList.toggle("transition-transform");
            spanAgregar.classList.toggle("rotate-90");
            formAgregar.classList.toggle("transition-transform");
            formAgregar.classList.toggle("hidden");
            formAgregar.classList.toggle("top-0");
    })

    buttonAgregarOdontologo.addEventListener("click", (e)=> {
            spanAgregarOdontologo.classList.toggle("transition-transform");
            spanAgregarOdontologo.classList.toggle("rotate-90");
            formAgregarOdontologo.classList.toggle("transition-transform");
            formAgregarOdontologo.classList.toggle("hidden");
            formAgregarOdontologo.classList.toggle("top-0");
    })

    buttonAgregarTurno.addEventListener("click", (e)=> {
            spanAgregarTurno.classList.toggle("transition-transform");
            spanAgregarTurno.classList.toggle("rotate-90");
            formAgregarTurno.classList.toggle("transition-transform");
            formAgregarTurno.classList.toggle("hidden");
            formAgregarTurno.classList.toggle("top-0");
    })

    buttonModificar.addEventListener("click", (e)=> {
            spanModificado.classList.toggle("transition-transform");
            spanModificado.classList.toggle("rotate-90");
            formModificar.classList.toggle("transition-transform");
            formModificar.classList.toggle("hidden");
            formModificar.classList.toggle("top-0");
        })

        buttonModificarO.addEventListener("click", (e)=> {
            spanModificadoO.classList.toggle("transition-transform");
            spanModificadoO.classList.toggle("rotate-90");
            formModificarO.classList.toggle("transition-transform");
            formModificarO.classList.toggle("hidden");
            formModificarO.classList.toggle("top-0");
        })

        buttonModificarT.addEventListener("click", (e)=> {
            spanModificadoT.classList.toggle("transition-transform");
            spanModificadoT.classList.toggle("rotate-90");
            formModificarT.classList.toggle("transition-transform");
            formModificarT.classList.toggle("hidden");
            formModificarT.classList.toggle("top-0");
        })





    /*********************** LOGICA DE PACIENTE **********************************/

    /* -------------------------------------------------------------------------- */
    /*                           CREAR UN NUEVO USUARIO                           */
    /* -------------------------------------------------------------------------- */

    const paciente = document.getElementById("paciente");
    const apellido = document.getElementById("apellido");
    const dni = document.getElementById("documento");
    const calle = document.getElementById("calle");
    const altura = document.getElementById("altura");
    const localidad = document.getElementById("localidad");


    formAgregar.addEventListener("submit", (event) => {
        event.preventDefault();

        let payLoad = {
            nombre: paciente.value,
            apellido: apellido.value,
            dni: dni.value,
            domicilio: {
                calle: calle.value,
                altura: altura.value,
                localidad: localidad.value
            }
        };

        let settings = {
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify(payLoad)
        };

        fetch("http://localhost:8080/pacientes/registrar", settings)
        .then(response => {
            return response.json();
        })
        .then(data => {
            console.log(data);
        })
        .catch(error => {
            return error;
        })

        Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Usuario agregado',
            showConfirmButton: false,
            timer: 1500
        })

    });


    /* -------------------------------------------------------------------------- */
    /*                              MOSTRAR USUARIOS                              */
    /* -------------------------------------------------------------------------- */

    const contenedor = document.getElementById("contenedor-items");
    const templateItems = document.getElementById("items").content;
    const templateNoItems = document.getElementById("no-items").content;
    const buttonMostrarPaciente = document.getElementById("botonMostrarPaciente");
    const fragment = document.createDocumentFragment();

    buttonMostrarPaciente.addEventListener("click", (e)=> {
        getPacientes();
    });


    // Funcion que contiene el metodo get para traer todos los Pacientes
    function getPacientes(){
        let settings = {
            method: "GET",
            headers: {
                "Content-type": "application/json"
            }
        };

        fetch("http://localhost:8080/pacientes/listarPacientes", settings)
        .then(response => {
            return response.json();
        })
        .then(data => {
            imprimirPacientes(data);
        })
        .catch(error => {
            return error;
        })
    };

    // Funcion que contiene la logica de imprimir en el html las tarjetas de Pacientes que trae la peticion get
    function imprimirPacientes(data){
        contenedor.innerHTML = "";

        let timerInterval
        Swal.fire({
            title: 'Cargando Pacientes',
            html: 'tiempo restante <b></b>',
            timer: 1000,
            timerProgressBar: true,
            didOpen: () => {
                Swal.showLoading()
                const b = Swal.getHtmlContainer().querySelector('b')
                timerInterval = setInterval(() => {
                b.textContent = Swal.getTimerLeft()
                }, 100)
            },
            willClose: () => {
                clearInterval(timerInterval)
            }
            }).then((result) => {
            /* Read more about handling dismissals below */
            if (result.dismiss === Swal.DismissReason.timer) {
                console.log('I was closed by the timer')
            }
        })

        setTimeout(()=> {
            if(data.length === 0){
                templateNoItems.querySelector("p").textContent;
                let clone = templateNoItems.cloneNode(true);
                fragment.appendChild(clone);
            }else{
                    data.forEach(paciente => {
                    console.log(paciente);
                    templateItems.getElementById("id").innerHTML = `<p id="id" class="text-center text-yellow-400"><span class="text-start text-pink-100">ID </span>${paciente.id}</p>`
                    templateItems.getElementById("nombrePaciente").innerHTML = `<p id="nombrePaciente" class="text-center text-yellow-400"><span class="text-pink-100">NOMBRE </span>${paciente.nombre}</p>`
                    templateItems.getElementById("apellidoPaciente").innerHTML = `<p id="apellidoPaciente" class="text-center text-yellow-400"><span class="text-pink-100">APELLIDO </span>${paciente.apellido}</p>`
                    templateItems.querySelector(".btn").dataset.id = paciente.id;
                    let clone = templateItems.cloneNode(true);
                    fragment.appendChild(clone);
                });
            }
            contenedor.appendChild(fragment);
        },1000);

    }
         /* -------------------------------------------------------------------------- */
         /*                               ELIMINAR POR ID                              */
         /* -------------------------------------------------------------------------- */



        function deletePaciente(){
            contenedor.addEventListener("click", (e) => {
                e.stopImmediatePropagation();

                if(e.target.classList.contains("btn")){
                    let idPaciente = e.target.dataset.id;

                    Swal.fire({
                        title: 'Estas Seguro?',
                        text: "No podras revertir estos cambios",
                        icon: 'warning',
                        showCancelButton: true,
                        confirmButtonColor: '#3085d6',
                        cancelButtonColor: '#d33',
                        confirmButtonText: 'Si, Eliminar!'
                    }).then((result) => {
                        if (result.isConfirmed) {

                            let settings = {
                                method: "DELETE",
                                headers: {
                                    "Content-type": "application/json"
                                }
                            };
                            fetch(`http://localhost:8080/pacientes/${idPaciente}`, settings)
                            .then(response => {
                                getPacientes();
                                return response.json();
                            })
                            .catch(error => {
                                return error;
                            })

                            Swal.fire(
                            'Deleted!',
                            'Your file has been deleted.',
                            'success'
                            )
                        }
                    })

                }
            });
        }

        deletePaciente();

        /* -------------------------------------------------------------------------- */
        /*                               MODIFICAR PACIENTE                             */
        /* -------------------------------------------------------------------------- */

    const pacienteModificado = document.getElementById("pacienteModificado");
    const apellidoModificado = document.getElementById("apellidoModificado");
    const dniModificado = document.getElementById("documentoModificado");
    const calleModificado = document.getElementById("calleModificado");
    const alturaModificado = document.getElementById("alturaModificado");
    const localidadModificado = document.getElementById("localidadModificado");
    const idModificado=document.getElementById("idModificado");


    formModificar.addEventListener("submit", (event) => {
        event.preventDefault();

        let payLoad = {
            id: idModificado.value,
            nombre: pacienteModificado.value,
            apellido: apellidoModificado.value,
            dni: dniModificado.value,
            domicilio: {
                calle: calleModificado.value,
                altura: alturaModificado.value,
                localidad: localidadModificado.value
            }
        };

        let settings = {
            method: "PUT",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify(payLoad)
        };

        fetch("http://localhost:8080/pacientes/modificar", settings)
        .then(response => {
            return response.json();
        })
        .then(data => {
            console.log(data);
        })
        .catch(error => {
            return error;
        })

        Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Paciente Modificado',
            showConfirmButton: false,
            timer: 1500
        })

    });



/*************************** LOGICA DE ODONTOLOGO *********************************/

    /* -------------------------------------------------------------------------- */
     /*                           CREAR UN NUEVO ODONTOLOGO                        */
     /* -------------------------------------------------------------------------- */

    const odontologo = document.getElementById("odontologo");
    const apellidoOdontologo = document.getElementById("apellidoOdontologo");
    const matricula = document.getElementById("matriculaOdontologo");


    formAgregarOdontologo.addEventListener("submit", (event) => {
        event.preventDefault();

        let payLoad = {
            nombre: odontologo.value,
            apellido: apellidoOdontologo.value,
            matricula: matricula.value
        };

        let settings = {
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify(payLoad)
        };

        fetch("http://localhost:8080/odontologos/registrar", settings)
        .then(response => {
            return response.json();
        })
        .then(data => {
            console.log(data);
        })
        .catch(error => {
            return error;
        })

        Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Usuario agregado',
            showConfirmButton: false,
            timer: 1500
        })

        contenedor.innerHTML = "";
        formAgregarOdontologo.reset();
    });


      /* -------------------------------------------------------------------------- */
         /*                              MOSTRAR ODONTOLOGO                             */
         /* -------------------------------------------------------------------------- */

        const contenedoroOdondtologo = document.getElementById("contenedor-items-ondotologos");
        const templateItemsOdontologo = document.getElementById("items-odontologos").content;
        const templateNoItemsOdontologo = document.getElementById("no-items-odontologo").content;
        const buttonMostrarOdontologo = document.getElementById("botonMostrarOdontologo");
        const fragmentOdontologo = document.createDocumentFragment();

        buttonMostrarOdontologo.addEventListener("click", (e)=> {
            getOdontologo();
        });


         // Funcion que contiene el metodo get para traer todos los Pacientes
        function getOdontologo(){
            let settings = {
                method: "GET",
                headers: {
                    "Content-type": "application/json"
                }
            };

            fetch("http://localhost:8080/odontologos/listarOdontologos", settings)
            .then(response => {
                return response.json();
            })
            .then(data => {
                imprimirOdontologo(data);
            })
            .catch(error => {
                return error;
            })
        };

         // Funcion que contiene la logica de imprimir en el html las tarjetas de Pacientes que trae la peticion get
        function imprimirOdontologo(data){
            contenedoroOdondtologo.innerHTML = "";

            let timerInterval
            Swal.fire({
                title: 'Cargando Odontologos',
                html: 'tiempo restante <b></b>',
                timer: 100,
                timerProgressBar: true,
                didOpen: () => {
                    Swal.showLoading()
                    const b = Swal.getHtmlContainer().querySelector('b')
                    timerInterval = setInterval(() => {
                    b.textContent = Swal.getTimerLeft()
                    }, 100)
                },
                willClose: () => {
                    clearInterval(timerInterval)
                }
                }).then((result) => {
                 /* Read more about handling dismissals below */
                if (result.dismiss === Swal.DismissReason.timer) {
                    console.log('I was closed by the timer')
                }
            })

            setTimeout(()=> {
                if(data.length === 0){
                    templateNoItemsOdontologo.querySelector("p").textContent;
                    let clone = templateNoItemsOdontologo.cloneNode(true);
                    fragmentOdontologo.appendChild(clone);
                }else{
                        data.forEach(odontologo => {
                        console.log(odontologo);
                        templateItemsOdontologo.getElementById("id-Odontologo").innerHTML = `<p id="id-Odontologo" class="text-center text-yellow-400"><span class="text-start text-pink-100">ID </span>${odontologo.id}</p>`
                        templateItemsOdontologo.getElementById("nombreOdontologo").innerHTML = `<p id="nombreOdontologo" class="text-center text-yellow-400"><span class="text-pink-100">NOMBRE </span>${odontologo.nombre}</p>`
                        templateItemsOdontologo.getElementById("apellidoOdontologos").innerHTML = `<p id="apellidoOdontologos" class="text-center text-yellow-400"><span class="text-pink-100">APELLIDO </span>${odontologo.apellido}</p>`
     //                    templateItems.getElementById("localidad").innerHTML = `<p id="localidad" class="text-center text-yellow-400"><span class="text-pink-100">LOCALIDAD </span>${paciente.domicilio.localidad}</p>`
                        templateItemsOdontologo.querySelector(".btn").dataset.id = odontologo.id;
                        let clone = templateItemsOdontologo.cloneNode(true);
                        fragmentOdontologo.appendChild(clone);
                    });
                }
                contenedoroOdondtologo.appendChild(fragmentOdontologo);
            },1000);

        }

         /* -------------------------------------------------------------------------- */
                  /*                               ELIMINAR POR ID ODONTOLOGO                             */
                  /* -------------------------------------------------------------------------- */



                function deleteOdontologo(){
                    contenedoroOdondtologo.addEventListener("click", (e) => {
                        e.stopImmediatePropagation();

                        if(e.target.classList.contains("btn")){
                            let idOdontologo = e.target.dataset.id;

                            Swal.fire({
                                title: 'Estas Seguro?',
                                text: "No podras revertir estos cambios",
                                icon: 'warning',
                                showCancelButton: true,
                                confirmButtonColor: '#3085d6',
                                cancelButtonColor: '#d33',
                                confirmButtonText: 'Si, Eliminar!'
                            }).then((result) => {
                                if (result.isConfirmed) {

                                let settings = {
                                        method: "DELETE",
                                        headers: {
                                            "Content-type": "application/json"
                                        }
                                    };

                                    fetch(`http://localhost:8080/odontologos/${idOdontologo}`, settings)
                                    .then(response => {
                                        getOdontologo();
                                        return response.json();
                                    })
                                    .catch(error => {
                                        return error;
                                    })

                                    Swal.fire(
                                    'Deleted!',
                                    'Your file has been deleted.',
                                    'success'
                                    )
                                }
                            })

                        }
                    });
                }
                deleteOdontologo();



   /* -------------------------------------------------------------------------- */
          /*                               MODIFICAR ODONTOLOGO                             */
          /* -------------------------------------------------------------------------- */

    const  nombreModificadoO = document.getElementById("nombreModificadoO");
    const apellidoModificadoO = document.getElementById("apellidoModificadoO");
    const matriculaO = document.getElementById("matriculaModificado");
    const idOdontologModificado= document.getElementById("idModificadoOdontologo")



    formModificarO.addEventListener("submit", (event) => {
        event.preventDefault();


                let payLoad = {
                    id: idOdontologModificado.value,
                    nombre: nombreModificadoO.value,
                    apellido: apellidoModificadoO.value,
                    matricula: matriculaO.value
                };

        let settings = {
            method: "PUT",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify(payLoad)
        };

        fetch("http://localhost:8080/odontologos/modificar", settings)
        .then(response => {
            return response.json();
        })
        .then(data => {
            console.log(data);
        })
        .catch(error => {
            return error;
        })

        Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Odontologo Modificado',
            showConfirmButton: false,
            timer: 1500
        })
    });



         /*************************** LOGICA DE TURNOS *********************************/

             /* -------------------------------------------------------------------------- */
              /*                           CREAR UN NUEVO TURNO                        */
              /* -------------------------------------------------------------------------- */

            const idPaciente = document.getElementById("idPaciente");
            const idOdontologo = document.getElementById("idOd");
            const fechaHora = document.getElementById("fechaHora");
            const formAgregarTurno = document.getElementById("formAgregarTurno");

            formAgregarTurno.addEventListener("submit", event => {
                event.preventDefault();

                let payLoad = {
                    paciente: {id: idPaciente.value},
                    odontologo: {id: idOdontologo.value},
                    fechaHora: fechaHora.value
                };

                let settings = {
                    method: "POST",
                    headers: {
                        "Content-type": "application/json"
                    },
                    body: JSON.stringify(payLoad)
                };

                fetch("http://localhost:8080/turnos/registrar", settings)
                .then(response => {
                    return response.json();
                })
                .then(data => {
                    console.log(data);
                })
                .catch(error => {
                    return error;
                })

                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'Turno agregado',
                    showConfirmButton: false,
                    timer: 1500
                })

                contenedor.innerHTML = "";
                formAgregarTurno.reset();
            });



               /* -------------------------------------------------------------------------- */
                  /*                              MOSTRAR TURNOS                             */
                  /* -------------------------------------------------------------------------- */

                const contenedorTurnos = document.getElementById("contenedor-items-turnos");
                const templateItemsTurno = document.getElementById("items-turnos").content;
                const templateNoItemsTurnos = document.getElementById("no-items-turnos").content;
                const buttonMostrarTurnos = document.getElementById("botonMostrarTurnos");
                const fragmentTurno = document.createDocumentFragment();

                buttonMostrarTurnos.addEventListener("click", (e)=> {
                    getTurno();
                });


                  // Funcion que contiene el metodo get para traer todos los Pacientes
                function getTurno(){
                    let settings = {
                        method: "GET",
                        headers: {
                            "Content-type": "application/json"
                        }
                    };

                    fetch("http://localhost:8080/turnos/listarTurno", settings)
                    .then(response => {
                        return response.json();
                    })
                    .then(data => {
                        imprimirTurnos(data);
                    })
                    .catch(error => {
                        return error;
                    })
                };

                  // Funcion que contiene la logica de imprimir en el html las tarjetas de Pacientes que trae la peticion get
                function imprimirTurnos(data){
                    contenedorTurnos.innerHTML = "";
                    let timerInterval
                    Swal.fire({
                        title: 'Cargando Turnos',
                        html: 'tiempo restante <b></b>',
                        timer: 1000,
                        timerProgressBar: true,
                        didOpen: () => {
                            Swal.showLoading()
                            const b = Swal.getHtmlContainer().querySelector('b')
                            timerInterval = setInterval(() => {
                            b.textContent = Swal.getTimerLeft()
                            }, 1000)
                        },
                        willClose: () => {
                            clearInterval(timerInterval)
                        }
                        }).then((result) => {
                          /* Read more about handling dismissals below */
                        if (result.dismiss === Swal.DismissReason.timer) {
                            console.log('I was closed by the timer')
                        }
                    })

                    setTimeout(()=> {
                        if(data.length === 0){
                            templateNoItemsTurnos.querySelector("p").textContent;
                            let clone = templateNoItemsTurnos.cloneNode(true);
                            fragmentTurno.appendChild(clone);
                        }else{
                                data.forEach(turno => {
                                console.log(turno);
                                templateItemsTurno.getElementById("id-turno").innerHTML = `<p id="id-turno" class="text-center text-yellow-400"><span class="text-start text-pink-100">ID </span>${turno.id}</p>`
                                templateItemsTurno.getElementById("paciente-turno").innerHTML = `<p id="paciente-turno" class="text-center text-yellow-400"><span class="text-pink-100">ID PACIENTE </span>${turno.paciente.id}</p>`
                                templateItemsTurno.getElementById("odontologo-turno").innerHTML = `<p id="odontologo-turno" class="text-center text-yellow-400"><span class="text-pink-100">ID ODONTOLOGO </span>${turno.odontologo.id}</p>`
                                templateItemsTurno.getElementById("fecha-hora-turno").innerHTML = `<p id="fecha-hora-turno" class="text-center text-yellow-400"><span class="text-pink-100">FECHA Y HORA </span>${turno.fechaHora}</p>`
                                templateItemsTurno.querySelector(".btn").dataset.id = turno.id;
                                let clone = templateItemsTurno.cloneNode(true);
                                fragmentTurno.appendChild(clone);
                            });
                        }
                        contenedorTurnos.appendChild(fragmentTurno);
                    },1000);

                }



                  /* -------------------------------------------------------------------------- */
                           /*                               ELIMINAR POR ID ODONTOLOGO                             */
                           /* -------------------------------------------------------------------------- */



                           function deleteTurno(){
                               contenedorTurnos.addEventListener("click", (e) => {
                                   e.stopImmediatePropagation();

                                   if(e.target.classList.contains("btn")){
                                       let idTurno = e.target.dataset.id;
                                       console.log(e.target);

                                       Swal.fire({
                                           title: 'Estas Seguro?',
                                           text: "No podras revertir estos cambios",
                                           icon: 'warning',
                                           showCancelButton: true,
                                           confirmButtonColor: '#3085d6',
                                           cancelButtonColor: '#d33',
                                           confirmButtonText: 'Si, Eliminar!'
                                       }).then((result) => {
                                           if (result.isConfirmed) {

                                               let settings = {
                                                   method: "DELETE",
                                                   headers: {
                                                       "Content-type": "application/json"
                                                   }
                                               };

                                               fetch(`http://localhost:8080/turnos/${idTurno}`, settings)
                                               .then(response => {
                                                   getTurno();
                                                   return response.json();
                                               })
                                               .catch(error => {
                                                   return error;
                                               })

                                               Swal.fire(
                                               'Deleted!',
                                               'Your file has been deleted.',
                                               'success'
                                               )
                                           }
                                       })

                                   }
                               });
                               }
                           deleteTurno();



            /* -------------------------------------------------------------------------- */
                   /*                               MODIFICAR TURNO                             */
                   /* -------------------------------------------------------------------------- */

              const idturnomod = document.getElementById("idTurno");
              const idPacienteMod = document.getElementById("idPacienteMod");
              const idOdontologoMod = document.getElementById("idOdontologoMod");
              const fechaHoraMod = document.getElementById("fechaHoraMod")


              formModificarT.addEventListener("submit", (event) => {
                  event.preventDefault();

                          let payLoad = {
                              id: idturnomod.value,
                              paciente: {id: idPacienteMod.value},
                              odontologo: {id: idOdontologoMod.value},
                              fechaHora: fechaHoraMod.value
                          };

                  let settings = {
                      method: "PUT",
                      headers: {
                          "Content-type": "application/json"
                      },
                      body: JSON.stringify(payLoad)
                  };

                  fetch("http://localhost:8080/turnos/modificar", settings)
                  .then(response => {
                      return response.json();
                  })
                  .then(data => {
                      console.log(data);
                  })
                  .catch(error => {
                      return error;
                  })

                  Swal.fire({
                      position: 'center',
                      icon: 'success',
                      title: 'Odontologo Modificado',
                      showConfirmButton: false,
                      timer: 1500
                  })


            });
});
