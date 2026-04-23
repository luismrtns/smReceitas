// console.log(Math.floor(Math.random() * (2000 - 1050 + 1) + 1050))
//
// const numeros = '1, 4, 8, 15, 7, 3'
// const arrayNumeros = numeros.split(', ')
// const maximo = Math.max(...arrayNumeros)
// console.log(maximo)
//
//
// const listaPrecos = ['R$ 59,99' , 'R$ 67,49', 'R$ 230  ']
// let total = 0
// function limparPreco(preco){
//     preco = +preco.toUpperCase().replace('R$', '').trim().replace(',', '.')
//     preco = +preco.toFixed(2)
//     return preco
// }
// let soma = 0
// listaPrecos.forEach(preco => {
//     soma += limparPreco(preco)
// })
// console.log(soma.toLocaleString('pt-br', {style: 'currency', currency: 'BRL'}))
// limparPreco(listaPrecos[1])

// const comidas = ['pizza', 'frango','carne','macarrão']
// console.log(comidas)
// const primeira = comidas.shift()
// const ultimo = comidas.pop()
// console.log(primeira)
// console.log(ultimo)
// console.log(comidas)
// comidas.push('arroz')
// console.log(comidas)
// comidas.unshift('peixe','batata')
// console.log(comidas)
//
// const estudantes = ['luis','samia','thiago','guel']
// estudantes.sort()
// console.log(estudantes)
// estudantes.reverse()
// console.log(estudantes)
// console.log(estudantes.includes('joana'))
// console.log(estudantes.includes('samia'))
//
// let html = `<section>
//                         <div>sobre</div>
//                         <div>produtos</div>
//                         <div>contato</div>
//                      </section>`
// html = html.split('section').join('ul').split('div').join('li')
// console.log(html)
//
// const carros = ['ford','fiat','ferrari','honda']
// const carrosClone = carros.slice()
// carros.pop()
// console.log(carros)
// console.log(carrosClone)

// const cursos =  document.querySelectorAll('.curso');
// const cursosArr = Array.from(cursos)
// const mostra = cursosArr.map((curso, index, array) => {
//     const titulo = curso.querySelector('h1').innerText
//     const p = curso.querySelector('p').innerText
//     const aulas = curso.querySelector('.aulas').innerText
//     const horas = curso.querySelector('.horas').innerText
//     return {
//         titulo,
//         p,
//         aulas,
//         horas,
//     }
// })
// console.log(mostra)
//
// const numeros = [3,7,88,105,129,333,2,1]
// const maior100 = numeros.filter(n => n > 100)
// console.log(maior100)
//
// const instrumentos = ['guitarra','violão','bateria','saxofone']
// const bateria = instrumentos.some(item => item === 'bateria')
// console.log(bateria)
//
// const compras = [
//     {
//         item: 'banana',
//         preco: 'R$ 4,99'
//     },
//     {
//         item: 'leite',
//         preco: 'R$ 7,99'
//     },
//     {
//         item: 'pilha',
//         preco: 'R$ 15,90'
//     },
//     {
//         item: 'shampoo',
//         preco: 'R$ 27,90'
//     },
// ]
// let total = 0
// compras.forEach((compra) => {
//     const precoLimpo = +compra.preco.replace('R$', '').replace(',','.')
//     total += precoLimpo
// })
// console.log(total)

// tema dark
function initDark(){
    const btn_dark = document.getElementById("btn-dark");
    const html = document.documentElement

    const temaSalvo = localStorage.getItem('theme')
    if(temaSalvo === 'dark'){
        html.classList.add('dark')
    }

    const icon = document.getElementById('icon');

    if(localStorage.getItem('theme') === 'dark'){
        html.classList.toggle('dark')
        icon.src = 'img/moon-duotone.svg'
    }

    btn_dark.addEventListener("click", ()=>{
        html.classList.toggle('dark')
        const isDark = html.classList.contains('dark')
        btn_dark.classList.toggle('bg-preto')
        icon.src = isDark ? 'img/moon-duotone.svg' : 'img/sun-duotone.svg'
        localStorage.setItem('theme', isDark ? 'dark' : 'light')
    })
}
initDark()

