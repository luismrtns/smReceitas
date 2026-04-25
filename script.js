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

function initToggleMenu(){
    document.addEventListener('DOMContentLoaded', () => {
        const btnMobile = document.querySelectorAll('.btn-opcoes-mobile')

        btnMobile.forEach((botao) => {
            botao.addEventListener('click', (event) => {
                event.stopPropagation()

                const menu= botao.nextElementSibling
                // fecha todos os menus que não são o botão clicado
                document.querySelectorAll('.menu-dropdown').forEach((m) => {
                    if(m !== menu){
                        m.classList.add('hidden')
                    }
                })
                menu.classList.toggle('hidden')
            })
        })

        // fecha o menu ao clicar fora
        document.addEventListener('click', () => {
            document.querySelectorAll('.menu-dropdown').forEach((menu) => {
                menu.classList.add('hidden')
            })
        })

        document.querySelectorAll('.menu-dropdown').forEach((menu) => {
            menu.addEventListener('click', (event) => {
                event.stopPropagation()
            })
        })
    })
}
initToggleMenu()

function initAddInput(idLista, idBotao, placeholder){
    const lista = document.getElementById(idLista)
    const btn_input = document.getElementById(idBotao)

    function estilizarInput(){
        const inputs = document.querySelectorAll('input')
        inputs.forEach(input => {
            if(input.value.trim() !== ''){
                input.classList.remove('bg-marrom/50', 'border-marrom', 'text-preto')
                input.classList.add('bg-transparent', 'border-transparent', 'text-marrom')
            }
        })
    }

    function addIngredient(){
        estilizarInput()

        const li = document.createElement('li')
        li.className = 'flex items-center gap-2 relative group'

        const lista_num = document.createElement('span')
        lista_num.className = 'numero-item text-fundo-branco bg-marrom py-2 px-3.5 rounded-full font-semibold text-sm select-none mt-4'

        const input = document.createElement('input')
        input.type = 'text'
        input.placeholder = placeholder
        input.className = 'mt-4 w-full bg-fundo-branco border border-marrom/60 rounded-full px-4 py-2 focus:outline-none focus:border-laranja-primary transition-colors'

        lista.appendChild(li)
        atualizarNumero(lista)

        input.addEventListener('focus', () => {
            input.classList.remove('bg-transparent', 'border-transparent', 'text-marrom')
            input.classList.add('bg-fundo-branco', 'border-marrom', 'text-preto')
        })

        input.addEventListener('blur', () => {
            if(input.value.trim() !== ''){
                input.classList.remove('bg-marrom/50', 'border-marrom', 'text-preto')
                input.classList.add('bg-transparent', 'border-transparent', 'text-marrom')
            }
        })

        const btn_remover = document.createElement('button')
        btn_remover.type = 'button'
        btn_remover.className = 'btn-remover mt-4 text-marrom hover:bg-[#CC3F3A] hover:text-fundo-branco p-2 rounded-full cursor-pointer transition-colors'
        btn_remover.innerHTML = '<svg class="w-5 h-5 pointer-events-none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>'

        li.appendChild(lista_num)
        li.appendChild(input)
        li.appendChild(btn_remover)

        lista.appendChild(li)
        atualizarNumero(lista)
        input.focus()
    }

    function atualizarNumero(lista){
        const itens = lista.querySelectorAll('li')
        itens.forEach((item, index) => {
            const span_numero = item.querySelector('.numero-item')
            if(span_numero){
                span_numero.textContent = index + 1
            }else{
                console.warn('Este <li> não tem a classe.numero-item', item);
            }
        })
    }

    if (btn_input) {
        btn_input.addEventListener('click', addIngredient);
        addIngredient();
    }

    lista.addEventListener('click', (event) => {
        const btnRemover = event.target.closest('.btn-remover');
        if (btnRemover) {
            btnRemover.closest('li').remove();
            atualizarNumero(lista);
        }
    });
}
initAddInput('lista-ingredientes', 'btn-input', 'Ex: 200g de arroz')
initAddInput('lista-preparo', 'btn-preparo', 'Ex: Misture os ingredientes...')