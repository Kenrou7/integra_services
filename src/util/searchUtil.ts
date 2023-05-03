

//palabra.addEventListener("click", buscarCoincidencias(palabra))


//let palabra:string = "tor";
let listadoDeElementos: string[] = [
  "tornillo",
  "tuerca",
  "plaquita",
  "avellanado",
  "broca",
  "escariador",
  "fresa",
  "herramienta",
  "adaptador",
  "torreta",
  "pinza",
  "unidad",
];
export function buscarCoincidencias(palabra: any): any {
  let resultados: string[] = [];
  for (let buscar in listadoDeElementos) {
    if (listadoDeElementos[buscar].includes(palabra)) {
      resultados.push(listadoDeElementos[buscar]);
    }
  }
  return resultados;
}

//console.log(buscarCoincidencias(palabra));

