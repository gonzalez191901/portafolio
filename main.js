const grid = new Muuri('.grid', {
  layout: {
    //fillGaps: true,
    //horizontal: true,
    //alignRight: true,
    //alignBottom: true,
    rounding: false
  }
});



window.addEventListener('load', () => {
  grid.refreshItems().layout();
  document.getElementById('grid').classList.add("imagenes-cargadas");

  /*agregamos los listener para filtrar con galerias*/
  const enlaces = document.querySelectorAll('#categorias a');

  enlaces.forEach( (elemento) => {
    elemento.addEventListener('click', (evento) => {
      evento.preventDefault();

      enlaces.forEach( (enlace) => {
        enlace.classList.remove('activo');
      });
      evento.target.classList.add('activo');

      const categoria = evento.target.innerHTML.toLowerCase();
      categoria === 'todos' ? grid.filter('[data-categoria]') : grid.filter('[data-categoria="'+categoria+'"]');
    });
  });

  //buscar por la barra de busqueda
  document.querySelector('#barra-busqueda').addEventListener('input', (evento) => {
    const busqueda = evento.target.value;

    grid.filter( (item) => item.getElement().dataset.etiquetas.includes(busqueda));
  });

  const overlay = document.getElementById('overlay');

  document.querySelectorAll('.grid .item img').forEach((elemento) => {


    elemento.addEventListener('click',() => {

      


      const ruta = elemento.getAttribute('src');
      const descripcion = elemento.parentNode.parentNode.dataset.descripcion;
      overlay.classList.add('activo');
      document.querySelector('#overlay img').src = ruta;
      document.querySelector('#overlay .descripcion').innerHTML = descripcion;

      

      valor_tamaños();


    });
  });


  //evento del boton cerrar

  document.querySelector('#btn-cerrar-popup').addEventListener('click',() => {
    overlay.classList.remove('activo');
  });

  // evento del overlay
  overlay.addEventListener('click',(evento) => {
    //overlay.classList.remove('activo');
    evento.target.id === 'overlay' ? overlay.classList.remove('activo') : '';
  });
});

function valor_tamaños(){
  

  var pantalla = $(window).height();

  var contenedor = $("#contenedor-img").innerHeight();

  if (contenedor > pantalla) {
    
    var total = pantalla - 50;

    //alert(contenedor+" / "+total);
    $("#contenedor-img-img").css("max-height", total+"px");
  }
  /*
  var alto_pantalla = screen.height;

  var alto = 60 * alto_pantalla;

  var alto_deseado = alto / 100;

  var obj = document.getElementById('contenedor-img');
      var alto_img = obj.offsetHeight;

  if (alto_img > alto_deseado) {
    document.getElementById("contenedor-img-img").style.height = alto_deseado+"px";
  }
  */
  
}