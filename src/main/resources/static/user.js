window.addEventListener('load', function () {



    const spanAgregarTurno = document.getElementById("spanAgregarTurno");
    const buttonAgregarTurno = document.getElementById("buttonAgregarTurno");
    const formModificarT = document.getElementById("formModificarT");
    const buttonModificarT = document.getElementById("buttonModificarT");
    const spanModificadoT = document.getElementById("spanModificadoT");




    buttonAgregarTurno.addEventListener("click", (e)=> {
            spanAgregarTurno.classList.toggle("transition-transform");
            spanAgregarTurno.classList.toggle("rotate-90");
            formAgregarTurno.classList.toggle("transition-transform");
            formAgregarTurno.classList.toggle("hidden");
            formAgregarTurno.classList.toggle("top-0");
    })



        buttonModificarT.addEventListener("click", (e)=> {
            spanModificadoT.classList.toggle("transition-transform");
            spanModificadoT.classList.toggle("rotate-90");
            formModificarT.classList.toggle("transition-transform");
            formModificarT.classList.toggle("hidden");
            formModificarT.classList.toggle("top-0");
        })

      buttonModificarT.addEventListener("click", (e)=> {
                spanModificadoT.classList.toggle("transition-transform");
                spanModificadoT.classList.toggle("rotate-90");
                formModificarT.classList.toggle("transition-transform");
                formModificarT.classList.toggle("hidden");
                formModificarT.classList.toggle("top-0");
            })


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
                           /*                               ELIMINAR POR ID TURNO                            */
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