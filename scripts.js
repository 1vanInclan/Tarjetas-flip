const selCategoria = d3.select('#categoria');
const proyecto = d3.select('#proyecto');
const casos = d3.select('#casos');

// const card = document.getElementById('.card');




let allData = []
let categorias = []

d3.csv('proyectos.csv').then((data) => {
    allData = data

    console.log(allData)

    categorias = new Set(d3.map(data, (d) => d.categoria))
    console.log(categorias)
    categorias.forEach((c) => {
        console.log(c)
        selCategoria.append('option').attr('value', c).text(c)
    })
    render(data)
})

function render(data) {
    casos.text('')
    data.forEach((d) => {
         casos.append('div').attr('class', 'card').attr('id', 'card')
            .html (`
    <div class="frente">
      <div class="card-image">
        <img src="img/${d.imagen}" class="img-proyecto" />
      </div>
      <div class="card-info">
        <h3 class="title__proyecto">${d.proyecto}</h3>
        <div class="card-rayita"></div>
        <p class="paragraph__info">${d.categoria}</p>
        <p class="et-años paragraph__info">Años de cobertura</p>
        <p class="paragraph__info">${d.años}</p>
      </div>
    </div>
      <div class="trasera">
        <div class="icon"><i class="fas fa-info-circle"></i></div>
        <h3 class="title__proyecto">${d.proyecto}</h3>
        <div class="info__trasera">
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Consectetur facere odio, cum deleniti fuga reprehenderit nam sint, eaque voluptatibus aperiam inventore minima sapiente in quas expedita illum rem? Dolorem, quae.</p>
      </div>
      <div class="link__trasera">
        <a href="${d.link}">Mas informacion...</a>
      </div>
    </div>
    `)
  }
  )
  
  const cartita = d3.selectAll(".card").nodes()
  // console.log(cartita);

  cartita.forEach(voltea => voltea.addEventListener('click', ()=>{
    voltea.classList.toggle('--active');
  }))
}



function filtro() {
    const categoria = selCategoria.node().value
    console.log(categoria)

    let data = allData

    if (categoria != 'todos') {
        data = d3.filter(allData, (d) => d.categoria == categoria)
    }
    const proj = proyecto.node().value
    console.log(proj)
    if (proj != null) {
        data = d3.filter(data, (d) =>
            d.proyecto.toLowerCase().includes(proj.toLowerCase())
        )
    }
    render(data)
}















