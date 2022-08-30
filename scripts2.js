const casos = document.getElementById('casos');
const selCategoria = document.getElementById('categoria');
const inputProyecto = document.getElementById('proyecto');

const getXML = (xml, callback) => {
    var xmlDoc;
    fetch(xml)
        .then(res => res.text())
        .then(data => {
            let parser = new DOMParser();
            xmlDoc = parser.parseFromString(data, 'text/xml');
            })
        .then(() => callback(xmlDoc))

    }

getXML('proyectos.xml', getdata)



function getdata(datos){

    const insertar = (datos) => {

        return new Promise((res, rej) => {
            
        let proyectos = datos.getElementsByTagName('PROYECTO');
        // console.log(proyectos);
        // console.log(proyectos[0].getElementsByTagName("NOMBRE")[0].textContent);

        for (let i = 0; i<proyectos.length; i++){
                casos.innerHTML += 
                `
                <div class="card" id="card">
                    <div class="frente">
                        <div class="card-image">
                            <img src="img/${proyectos[i].getElementsByTagName('IMAGEN')[0].textContent}" class="img-proyecto">
                        </div>
                        <div class="card-info">
                            <h3 class="title__proyecto">${proyectos[i].getElementsByTagName('NOMBRE')[0].textContent}</h3>
                            <div class="card-rayita"></div>
                            <p class="paragraph__info" id="value_cat">${proyectos[i].getElementsByTagName('CATEGORIA')[0].textContent}</p>
                            <p class="et-años paragraph__info">Años de cobertura</p>
                            <p class="paragraph__info">${proyectos[i].getElementsByTagName('AÑOS')[0].textContent}</p>
                        </div>
                    </div>
                    <div class="trasera">
                        <div class="icon"><i class="fas fa-info-circle"></i></div>
                        <h3 class="title__proyecto">${proyectos[i].getElementsByTagName('NOMBRE')[0].textContent}</h3>
                        <div class="info__trasera">
                            <p>${proyectos[i].getElementsByTagName('INFO')[0].textContent}</p>
                        </div>
                        <div class="link__trasera">
                            <a href="${proyectos[i].getElementsByTagName('LINK')[0].textContent}">Mas informacion...</a>
                        </div>
                    </div>
                </div>
                
                `
            }
         
        res('Todo bien')
        rej('Todo mal')
        })

    }   

    const categoria = (datos) => {

        return new Promise((res, rej) => {

            let categorias = []
            let proyectos = datos.getElementsByTagName('PROYECTO');
            for (let i = 0; i<proyectos.length; i++){
                categorias.push(proyectos[i].getElementsByTagName("CATEGORIA")[0].textContent) 
            }
            // console.log(categorias);

            const dataArr = new Set(categorias);

            // console.log([...dataArr]);

            let result = [...dataArr]

            for (let i = 0; i<result.length; i++){
                selCategoria.innerHTML += 
                `
                <option value="${result[i]}">${result[i]}</option>
                `
            }

            res('Se agrego categoria');
            rej('Error en modulo de categorias');
        })    
    }



    const voltear = ()=>{
        return new Promise((res, rej)=>{
            const card = document.querySelectorAll('#card');
            // console.log(card);
            card.forEach(voltea => voltea.addEventListener('click', ()=>{
            voltea.classList.toggle('--active');
            }))
            res('La tarjeta se voltea')
            rej('La tarjeta esta mal')
        })
    }

    const categoriaFilter = (selector) =>{
        return new Promise((res,rej)=>{
            let oldchild = [];
            document.addEventListener("change", (e) => {
            // console.log(e.target.value);
                if(e.target.value != "todos"){
                    for (let i = 0; i<oldchild.length; i++){
                        casos.appendChild(oldchild[i])
                    }
                    document.querySelectorAll(selector).forEach(el => {
                        // console.log(el.firstElementChild.lastElementChild.getElementsByTagName('p')[0].textContent);
                        if(el.textContent.toLowerCase().includes(e.target.value.toLowerCase())){
                            console.log("no se removio");
                        }else{
                            casos.removeChild(el)
                            oldchild.push(el)
                            // console.log(oldchild);
                        }
                        
                    });    
                }else{
                    for (let i = 0; i<oldchild.length; i++){
                        casos.append(oldchild[i])
                    }
                }
                const input = inputProyecto.value;
                console.log(input);
                if(input != null){
                    document.querySelectorAll(".card").forEach(el => {
                    if(el.textContent.toLowerCase().includes(input.toLowerCase())){
                        el.classList.remove("filter")
                    }else{
                        el.classList.add("filter")
                    } 
                    
                    })
                }
        });
        res('El filtro jala')
        rej('El filtro no jala :(')
    })
    }

                 
    const ejecucion = async() => {
        try{
            await insertar(datos)
            await categoria(datos)
            await voltear()
            await categoriaFilter(".card")
        }
        catch{
            console.log(err);
        }

    }

    ejecucion()

}

function categoriaFilter() {

    const input = inputProyecto.value;
    console.log(input);
    if(input != null){
        document.querySelectorAll(".card").forEach(el => {
        if(el.textContent.toLowerCase().includes(input.toLowerCase())){
            el.classList.remove("filter")
        }else{
            el.classList.add("filter")
        } 
        
        })
    }


}

