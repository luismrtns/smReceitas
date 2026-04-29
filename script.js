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

// Inicializa o modo escuro com base na preferência salva do usuário
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

    // Adiciona um ouvinte de evento para o botão de modo escuro, alternando o tema
    btn_dark.addEventListener("click", ()=>{
        html.classList.toggle('dark')
        const isDark = html.classList.contains('dark')
        btn_dark.classList.toggle('bg-preto')
        icon.src = isDark ? 'img/moon-duotone.svg' : 'img/sun-duotone.svg'
        localStorage.setItem('theme', isDark ? 'dark' : 'light')
    })
}
initDark()

let idEdicao = null

// Inicializa a funcionalidade de adicionar novos campos de entrada para ingredientes e preparo
function initAddInput(idLista, idBotao, placeholder){
    const lista = document.getElementById(idLista)
    const btn_input = document.getElementById(idBotao)

    // Estiliza os campos de entrada com base em seu conteúdo
    function estilizarInput(){
        const inputs = lista.querySelectorAll('input')
        // Itera sobre os campos de entrada para aplicar estilos
        inputs.forEach(input => {
            if(input.value.trim() !== ''){
                input.classList.remove('bg-marrom/50', 'border-marrom', 'text-preto')
                input.classList.add('bg-transparent', 'border-transparent', 'text-marrom')
            }
        })
    }

    // Adiciona um novo ingrediente ou etapa de preparo
    function addIngredient(){
        estilizarInput()

        const li = document.createElement('li')
        li.className = 'flex items-center gap-2 relative group'

        const lista_num = document.createElement('span')
        lista_num.className = 'numero-item text-fundo-branco bg-marrom dark:bg-laranja-primary dark:text-marrom py-2 px-3.5 rounded-full font-semibold text-sm select-none mt-4'

        const input = document.createElement('input')
        input.type = 'text'
        input.placeholder = placeholder
        input.className = 'mt-4 w-full bg-fundo-branco dark:bg-fundo-branco/10 dark:text-fundo-branco border border-marrom/60 dark:border-fundo-branco/20 rounded-full px-4 py-2 focus:outline-none focus:border-laranja-primary transition-colors'

        lista.appendChild(li)
        atualizarNumero(lista)

        // Manipula o evento de foco do campo de entrada
        input.addEventListener('focus', () => {
            input.classList.remove('input-preenchido', 'text-marrom', 'text-fundo-branco')
            input.classList.add('bg-fundo-branco', 'border-marrom', 'text-preto')
        })

        // Manipula o evento de desfoque do campo de entrada
        input.addEventListener('blur', () => {
            if(input.value.trim() !== ''){
                input.classList.add('input-preenchido')
                const isDark = document.documentElement.classList.contains('dark')
                input.classList.add(isDark ? 'text-fundo-branco' : 'text-marrom')
            }
        })

        const btn_remover = document.createElement('button')
        btn_remover.type = 'button'
        btn_remover.className = 'btn-remover mt-4 text-marrom dark:text-fundo-branco hover:bg-[#CC3F3A] hover:text-fundo-branco p-2 rounded-full cursor-pointer transition-colors'
        btn_remover.innerHTML = '<svg class="w-5 h-5 pointer-events-none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>'

        li.appendChild(lista_num)
        li.appendChild(input)
        li.appendChild(btn_remover)

        lista.appendChild(li)
        atualizarNumero(lista)
        input.focus()
    }

    // Atualiza os números dos itens da lista
    function atualizarNumero(lista){
        const itens = lista.querySelectorAll('li')
        // Itera sobre os itens da lista para atualizar seus números
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
        // Adiciona um ouvinte de evento para o botão, que chama addIngredient quando clicado
        btn_input.addEventListener('click', addIngredient);
        addIngredient();
    }

    // Manipula a remoção de um item da lista
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

function resetarBotao(id){
    const btn = document.getElementById(id)
    const clone = btn.cloneNode(true)
    btn.parentNode.replaceChild(clone, btn)
}

// Mostra o modal de nova receita
document.getElementById('nova-receita').addEventListener('click', () => {
    idEdicao = null
    document.getElementById('nome-receita').value = ''
    document.getElementById('emoji').value = ''
    document.getElementById('tempo-receita').value = ''
    document.getElementById('qtd-pessoas').value = ''
    document.getElementById('lista-ingredientes').innerHTML = ''
    document.getElementById('lista-preparo').innerHTML = ''

    const tituloModal = document.querySelector('#form-modal h2')
    if(tituloModal) tituloModal.textContent = 'Nova receita'
    document.querySelector('#btn-salvar').textContent = 'Salvar'
    resetarBotao('btn-input')
    resetarBotao('btn-preparo')
    initAddInput('lista-ingredientes', 'btn-input', 'Ex: 200g de arroz')
    initAddInput('lista-preparo', 'btn-preparo', 'Ex: Misture os ingredientes...')
    document.getElementById('form-modal').classList.remove('hidden')
})

// Esconde o modal de nova receita
document.getElementById('btn-cancelar').addEventListener('click', () => {
    document.getElementById('form-modal').classList.add('hidden')
})

// Esconde o modal se o clique for fora do formulário
document.getElementById('form-modal').addEventListener('click', (event) =>{
    if(event.target === document.getElementById('form-modal')){
        document.getElementById('form-modal').classList.add('hidden')
    }
})
// Esconde o modal se o clique for fora do formulário
document.getElementById('form-detalhes').addEventListener('click', (event) => {
    if(event.target === document.getElementById('form-detalhes')){
        document.getElementById('form-detalhes').classList.add('hidden')
    }
})

// Salva a nova receita
function salvarReceita(event){
    event.preventDefault()

    const nome = document.getElementById('nome-receita').value;
    const emoji = document.getElementById('emoji').value;
    const tipo = document.getElementById('tipo-receita').value;
    const tempo = document.getElementById('tempo-receita').value;
    const pessoas = document.getElementById('qtd-pessoas').value;

    // se o nome da receita tiver vazio, vai dar um aviso e não vai salvar
    if(nome.trim() === ''){
        document.getElementById('erro-nome').classList.remove('hidden')
        return
    }else{
        document.getElementById('erro-nome').classList.add('hidden')
    }

    const ingredientes = []
    document.querySelectorAll('#lista-ingredientes input').forEach((input) => {
        if(input.value.trim() !== ''){
            ingredientes.push(input.value.trim())
        }
    })

    const preparo = []
    document.querySelectorAll('#lista-preparo input').forEach((input) => {
        if(input.value.trim() !== ''){
            preparo.push(input.value.trim())
        }
    })

    const receita = {
        id: idEdicao ? idEdicao : Date.now(),
        nome,
        emoji,
        tipo,
        tempo,
        pessoas,
        ingredientes,
        preparo
    }

    const receitas = JSON.parse(localStorage.getItem('receitas')) || []

    if(idEdicao){
        const index = receitas.findIndex(r => r.id === idEdicao)
        if(index !== -1){
            receitas[index] = receita
        }
        idEdicao = null // vai limpar a memória depois de usar
    }else{
        receitas.push(receita)
    }
    // salva no banco de dados e atualiza a tela
    localStorage.setItem('receitas', JSON.stringify(receitas))
    renderizarReceitas()

    document.getElementById('form-modal').classList.add('hidden');
    document.getElementById('nome-receita').value = '';
    document.getElementById('emoji').value = '';
    document.getElementById('tempo-receita').value = '';
    document.getElementById('qtd-pessoas').value = '';
    document.getElementById('lista-ingredientes').innerHTML = '';
    document.getElementById('lista-preparo').innerHTML = '';

    resetarBotao('btn-input')
    resetarBotao('btn-preparo')

    initAddInput('lista-ingredientes', 'btn-input', 'Ex: 200g de arroz');
    initAddInput('lista-preparo', 'btn-preparo', 'Ex: Misture os ingredientes...');
}

// Renderiza as receitas salvas na página
function renderizarReceitas(filtro = 'todos'){
    const receitas = JSON.parse(localStorage.getItem('receitas')) || []
    const section = document.querySelector('section')
    section.innerHTML = ''

    const receitasFiltradas = receitas.filter(receita => {
        if(filtro === 'todos') return true
        return receita.tipo === filtro
    })

    // Itera sobre as receitas para criar um card para cada uma
    receitasFiltradas.forEach(receita => {
        const iconeSalgado = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#222" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="rounded-full bg-laranja-primary p-1 lucide lucide-soup-icon lucide-soup"><path d="M12 21a9 9 0 0 0 9-9H3a9 9 0 0 0 9 9Z"/><path d="M7 21h10"/><path d="M19.5 12 22 6"/><path d="M16.25 3c.27.1.8.53.75 1.36-.06.83-.93 1.2-1 2.02-.05.78.34 1.24.73 1.62"/><path d="M11.25 3c.27.1.8.53.74 1.36-.05.83-.93 1.2-.98 2.02-.06.78.33 1.24.72 1.62"/><path d="M6.25 3c.27.1.8.53.75 1.36-.06.83-.93 1.2-1 2.02-.05.78.34 1.24.74 1.62"/></svg>`;
        const iconeDoce = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#faf6ed" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="rounded-full bg-marrom p-1 lucide lucide-dessert-icon lucide-dessert"><path d="M10.162 3.167A10 10 0 0 0 2 13a2 2 0 0 0 4 0v-1a2 2 0 0 1 4 0v4a2 2 0 0 0 4 0v-4a2 2 0 0 1 4 0v1a2 2 0 0 0 4-.006 10 10 0 0 0-8.161-9.826"/><path d="M20.804 14.869a9 9 0 0 1-17.608 0"/><circle cx="12" cy="4" r="2"/></svg>`;
        const iconeTipo = receita.tipo === 'salgado' ? iconeSalgado : iconeDoce

        const card = document.createElement('div')
        card.dataset.id = receita.id
        card.className = 'card max-h-52 md:hover:max-h-96 bg-white dark:bg-white/5 dark:backdrop-blur-lg dark:border dark:border-white/20 shadow-xl overflow-hidden p-4 rounded-xl w-full border-2 border-preto/10 transition-all duration-200 hover:scale-105 hover:shadow-lg hover:border-laranja-primary cursor-pointer'
        card.innerHTML = `
                <!--menu mobile-->
                <div class="relative flex justify-end md:hidden">

                    <button class="btn-opcoes-mobile p-1 absolute hover:text-laranja-primary cursor-pointer">
                        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" class="fill-preto dark:fill-fundo-branco hover:fill-laranja-primary" viewBox="0 0 256 256">
                            <path d="M128,72a16,16,0,1,0-16-16A16,16,0,0,0,128,72Zm0,40a16,16,0,1,0,16,16A16,16,0,0,0,128,112Zm0,72a16,16,0,1,0,16,16A16,16,0,0,0,128,184Z"></path>
                        </svg>
                    </button>

                    <div class="menu-dropdown hidden absolute right-0 top-10 bg-white dark:bg-marrom border border-gray-200 dark:border-white/10 rounded-xl shadow-lg p-2 z-20 min-w-35">
                        <button class="btn-editar flex items-center gap-2 px-4 py-2 text-sm w-full rounded-lg hover:bg-fundo-branco dark:hover:bg-white/10 transition-colors">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" class="dark:fill-fundo-branco" viewBox="0 0 256 256"><path d="M229.66,58.34l-32-32a8,8,0,0,0-11.32,0l-96,96A8,8,0,0,0,88,128v32a8,8,0,0,0,8,8h32a8,8,0,0,0,5.66-2.34l96-96A8,8,0,0,0,229.66,58.34ZM124.69,152H104V131.31l64-64L188.69,88ZM200,76.69,179.31,56,192,43.31,212.69,64ZM224,128v80a16,16,0,0,1-16,16H48a16,16,0,0,1-16-16V48A16,16,0,0,1,48,32h80a8,8,0,0,1,0,16H48V208H208V128a8,8,0,0,1,16,0Z"></path>
                            </svg> Editar
                        </button>
                        <button data-id="${receita.id}" class="btn-apagar flex items-center gap-2 px-4 py-2 text-sm w-full text-[#CC3F3A] rounded-lg hover:bg-red-50 dark:hover:bg-[#CC3F3A]/20 transition-colors">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" class="fill-[#CC3F3A]" viewBox="0 0 256 256"><path d="M216,48H176V40a24,24,0,0,0-24-24H104A24,24,0,0,0,80,40v8H40a8,8,0,0,0,0,16h8V208a16,16,0,0,0,16,16H192a16,16,0,0,0,16-16V64h8a8,8,0,0,0,0-16ZM96,40a8,8,0,0,1,8-8h48a8,8,0,0,1,8,8v8H96Zm96,168H64V64H192ZM112,104v64a8,8,0,0,1-16,0V104a8,8,0,0,1,16,0Zm48,0v64a8,8,0,0,1-16,0V104a8,8,0,0,1,16,0Z"></path>
                            </svg> Excluir
                        </button>
                    </div>
                </div>
                <!--informações do card-->
                <div class="bg-fundo-branco dark:bg-fundo-branco/10 rounded-xl h-25 flex items-center justify-center text-5xl">${receita.emoji}</div>

                <div class="flex items-center mt-4 gap-2">
                    <h2 class="text-2xl font-fran font-bold">${receita.nome}</h2>
                    ${iconeTipo}
                </div>

                <div class="flex gap-4 py-2">

                    <span class="text-sm flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" class="fill-preto dark:fill-fundo-branco" viewBox="0 0 256 256">
                        <path d="M128,40a96,96,0,1,0,96,96A96.11,96.11,0,0,0,128,40Zm0,176a80,80,0,1,1,80-80A80.09,80.09,0,0,1,128,216ZM173.66,90.34a8,8,0,0,1,0,11.32l-40,40a8,8,0,0,1-11.32-11.32l40-40A8,8,0,0,1,173.66,90.34ZM96,16a8,8,0,0,1,8-8h48a8,8,0,0,1,0,16H104A8,8,0,0,1,96,16Z"></path>
                        </svg> ${receita.tempo} min
                    </span>

                    <span class="text-sm flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" class="fill-preto dark:fill-fundo-branco" viewBox="0 0 256 256">
                            <path d="M230.92,212c-15.23-26.33-38.7-45.21-66.09-54.16a72,72,0,1,0-73.66,0C63.78,166.78,40.31,185.66,25.08,212a8,8,0,1,0,13.85,8c18.84-32.56,52.14-52,89.07-52s70.23,19.44,89.07,52a8,8,0,1,0,13.85-8ZM72,96a56,56,0,1,1,56,56A56.06,56.06,0,0,1,72,96Z"></path>
                        </svg>
                        ${receita.pessoas} pessoa(s)
                    </span>

                    <span class="text-sm flex items-center gap-1">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" class="fill-preto dark:fill-fundo-branco" viewBox="0 0 256 256">
                        <path d="M224,128a8,8,0,0,1-8,8H104a8,8,0,0,1,0-16H216A8,8,0,0,1,224,128ZM104,72H216a8,8,0,0,0,0-16H104a8,8,0,0,0,0,16ZM216,184H104a8,8,0,0,0,0,16H216a8,8,0,0,0,0-16ZM43.58,55.16,48,52.94V104a8,8,0,0,0,16,0V40a8,8,0,0,0-11.58-7.16l-16,8a8,8,0,0,0,7.16,14.32ZM79.77,156.72a23.73,23.73,0,0,0-9.6-15.95,24.86,24.86,0,0,0-34.11,4.7,23.63,23.63,0,0,0-3.57,6.46,8,8,0,1,0,15,5.47,7.84,7.84,0,0,1,1.18-2.13,8.76,8.76,0,0,1,12-1.59A7.91,7.91,0,0,1,63.93,159a7.64,7.64,0,0,1-1.57,5.78,1,1,0,0,0-.08.11L33.59,203.21A8,8,0,0,0,40,216H72a8,8,0,0,0,0-16H56l19.08-25.53A23.47,23.47,0,0,0,79.77,156.72Z"></path>
                    </svg>
                        ${receita.ingredientes.length} ingrediente(s)
                    </span>

                </div>

                <!--botões desktop-->
                <div class="hidden md:flex gap-2 justify-center mt-4">
                    <button class="btn-editar bg-laranja-primary dark:bg-laranja-primary/30 dark:hover:bg-laranja-primary/70 dark:backdrop-blur-lg dark:border dark:border-white/20 p-2 rounded-full transition-all duration-300 cursor-pointer"><img src="img/note-pencil.svg" height="25" width="25" alt=""></button>
                    <button data-id="${receita.id}" class="btn-apagar bg-[#CC3F3A] dark:bg-[#CC3F3A]/20 dark:hover:bg-[#CC3F3A]/70 dark:backdrop-blur-md dark:border dark:border-red-500/30 p-2 rounded-full transition-all duration-300 cursor-pointer"><img src="img/trash.svg" height="25" width="25" alt=""></button>
                </div>`
        section.appendChild(card)
    })
    const qtd = receitasFiltradas.length
    document.querySelector('.qtd-receitas').textContent = qtd === 1 ? '1 receita' : `${qtd} receitas`
}
renderizarReceitas()

// Função para filtrar as receitas por tipo
function initFiltro() {
    const btnTodos = document.getElementById('btn-todos');
    const btnSalgados = document.getElementById('btn-salgados');
    const btnDoces = document.getElementById('btn-doces');

    const estiloAtivo = ['bg-laranja-primary', 'text-fundo-branco', 'dark:bg-laranja-primary', 'dark:text-preto'];

    const estiloInativo = ['bg-transparent', 'text-preto/70', 'dark:text-fundo-branco/70'];

    //Função para limpar os estilos dos botões
    function limparCoresBotoes() {
        btnTodos.classList.remove(...estiloAtivo);
        btnSalgados.classList.remove(...estiloAtivo);
        btnDoces.classList.remove(...estiloAtivo);

        btnTodos.classList.add(...estiloInativo);
        btnSalgados.classList.add(...estiloInativo);
        btnDoces.classList.add(...estiloInativo);
    }

    // Função que pinta apenas o botão que foi clicado
    function ativarBotao(btnClicado) {
        limparCoresBotoes();

        btnClicado.classList.remove(...estiloInativo);
        btnClicado.classList.add(...estiloAtivo);
    }

    if (btnTodos && btnSalgados && btnDoces) {
        btnTodos.addEventListener('click', () => {
            renderizarReceitas('todos');
            ativarBotao(btnTodos);
        });

        btnSalgados.addEventListener('click', () => {
            renderizarReceitas('salgado');
            ativarBotao(btnSalgados);
        });

        btnDoces.addEventListener('click', () => {
            renderizarReceitas('doce');
            ativarBotao(btnDoces);
        });

        ativarBotao(btnTodos);
    }
}
initFiltro()

// Manipula cliques na seção de receitas para abrir detalhes, excluir ou editar.
document.querySelector('section').addEventListener('click', (event) => {
    const target = event.target;
    const card = target.closest('.card');

    // Se o clique não foi dentro de um card, não faz nada.
    if (!card) return;

    const id = +card.dataset.id;
    const btnApagar = target.closest('.btn-apagar');
    const btnEditar = target.closest('.btn-editar');
    const btnMobile = target.closest('.btn-opcoes-mobile');
    const menuDropdown = target.closest('.menu-dropdown');

    // Se o botão de opções mobile for clicado
    if (btnMobile) {
        event.stopPropagation();
        const menu = btnMobile.nextElementSibling;
        // Fecha outros menus abertos
        document.querySelectorAll('.menu-dropdown').forEach((m) => {
            if (m !== menu) m.classList.add('hidden');
        });
        menu.classList.toggle('hidden');
        return;
    }

    // Se o botão de apagar for clicado
    if (btnApagar) {
        if (confirm('Tem certeza que deseja excluir esta receita?')) {

            card.style.transition = 'all 0.3s ease';
            card.style.opacity = '0';
            card.style.transform = 'scale(0.8)';

            setTimeout(() => {
                let receitas = JSON.parse(localStorage.getItem('receitas')) || [];
                receitas = receitas.filter(receita => receita.id !== id);
                localStorage.setItem('receitas', JSON.stringify(receitas));

                renderizarReceitas();
            }, 300);
        }
        return;
    }

    // Se o botão de editar for clicado (funcionalidade a ser implementada)
    if (btnEditar) {
        event.stopPropagation()
        initAbrirEdicao(id)
        return;
    }

    // Se o clique for no card (mas não nos botões ou no menu dropdown), abre os detalhes
    if (card && !menuDropdown) {
        initAbrirDetalhes(id);
    }
});

// Fecha o menu dropdown se o clique for fora dele
document.addEventListener('click', (event) => {
    const isClickInsideMenu = event.target.closest('.menu-dropdown');
    const isClickOnMobileButton = event.target.closest('.btn-opcoes-mobile');

    if (!isClickInsideMenu && !isClickOnMobileButton) {
        document.querySelectorAll('.menu-dropdown').forEach((menu) => {
            menu.classList.add('hidden');
        });
    }
});

// Abre o modal de detalhes da receita
function initAbrirDetalhes(id){
    const receitas = JSON.parse(localStorage.getItem('receitas')) || []
    const receita = receitas.find(r => r.id === id)
    const iconeSalgado = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#222" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="rounded-full bg-laranja-primary p-1 lucide lucide-soup-icon lucide-soup"><path d="M12 21a9 9 0 0 0 9-9H3a9 9 0 0 0 9 9Z"/><path d="M7 21h10"/><path d="M19.5 12 22 6"/><path d="M16.25 3c.27.1.8.53.75 1.36-.06.83-.93 1.2-1 2.02-.05.78.34 1.24.73 1.62"/><path d="M11.25 3c.27.1.8.53.74 1.36-.05.83-.93 1.2-.98 2.02-.06.78.33 1.24.72 1.62"/><path d="M6.25 3c.27.1.8.53.75 1.36-.06.83-.93 1.2-1 2.02-.05.78.34 1.24.74 1.62"/></svg>`;
    const iconeDoce = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#faf6ed" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="rounded-full bg-marrom p-1 lucide lucide-dessert-icon lucide-dessert"><path d="M10.162 3.167A10 10 0 0 0 2 13a2 2 0 0 0 4 0v-1a2 2 0 0 1 4 0v4a2 2 0 0 0 4 0v-4a2 2 0 0 1 4 0v1a2 2 0 0 0 4-.006 10 10 0 0 0-8.161-9.826"/><path d="M20.804 14.869a9 9 0 0 1-17.608 0"/><circle cx="12" cy="4" r="2"/></svg>`;
    const iconeTipo = receita.tipo === 'salgado' ? iconeSalgado : iconeDoce
    // Preenche o modal com os detalhes da receita
    document.getElementById('conteudo-detalhes').innerHTML = `
        <div class="text-4xl mb-5">${receita.emoji}</div>
        <div class="flex items-center mt-4 gap-2">
            <h3 class="text-3xl font-fran font-bold">${receita.nome}</h3>
            ${iconeTipo}
        </div>
        
        <div class="flex gap-4 mt-2">
            <div class="flex gap-1 items-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" class="fill-preto dark:fill-fundo-branco" viewBox="0 0 256 256">
                    <path d="M128,40a96,96,0,1,0,96,96A96.11,96.11,0,0,0,128,40Zm0,176a80,80,0,1,1,80-80A80.09,80.09,0,0,1,128,216ZM173.66,90.34a8,8,0,0,1,0,11.32l-40,40a8,8,0,0,1-11.32-11.32l40-40A8,8,0,0,1,173.66,90.34ZM96,16a8,8,0,0,1,8-8h48a8,8,0,0,1,0,16H104A8,8,0,0,1,96,16Z"></path>
                </svg>
                <span class="text-sm">${receita.tempo} min</span>
            </div>
            <div class="flex gap-1 items-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" class="fill-preto dark:fill-fundo-branco" viewBox="0 0 256 256">
                    <path d="M230.92,212c-15.23-26.33-38.7-45.21-66.09-54.16a72,72,0,1,0-73.66,0C63.78,166.78,40.31,185.66,25.08,212a8,8,0,1,0,13.85,8c18.84-32.56,52.14-52,89.07-52s70.23,19.44,89.07,52a8,8,0,1,0,13.85-8ZM72,96a56,56,0,1,1,56,56A56.06,56.06,0,0,1,72,96Z"></path>
                </svg>
                <span class="text-sm">${receita.pessoas} pessoa(s)</span>
            </div>
        </div>
        
        <h2 class="text-xl font-semibold mt-4 font-fran">Ingredientes</h2>
        <ul class="mt-4 flex flex-col gap-2">
            ${receita.ingredientes.map((ingrediente, i) => (
               `<li class="flex gap-3 items-center">
                    <span class="numero-item text-fundo-branco bg-marrom border-2 border-laranja-primary dark:border-fundo-branco dark:bg-laranja-primary dark:text-marrom py-2 px-3.5 rounded-full font-semibold text-sm select-none">
                        ${i + 1}
                    </span>
                    ${ingrediente}
                </li>`
            )).join('')}
        </ul>
        
        <h2 class="text-xl font-semibold mt-4 font-fran">Modo de preparo</h2>
        <ul class="mt-4 flex flex-col gap-2">
            ${receita.preparo.map((etapa, i) => (
                `<li class="flex gap-3 items-center">
                    <span class="numero-item text-marrom dark:text-laranja-primary bg-transparent border-2 border-marrom dark:border-laranja-primary py-2 px-3.5 rounded-full font-semibold text-sm select-none">
                        ${i + 1}
                    </span>
                    <p class="text-sm">${etapa}</p>
                 </li>`
            )).join('')}
        </ul>
        
        <div class="mt-8 flex gap-4 justify-end">
            <button id="btn-cancelar-detalhes" class="border-2 border-marrom/70 text-preto/70 hover:border-marrom hover:text-fundo-branco hover:bg-marrom dark:border-fundo-branco/40 dark:text-fundo-branco px-6 py-2 rounded-full cursor-pointer transition-all duration-300">Sair</button>
        </div>
    `
    document.getElementById('form-detalhes').classList.remove('hidden')

    document.getElementById('btn-cancelar-detalhes').addEventListener('click', () => {
        document.getElementById('form-detalhes').classList.add('hidden');
    });
}

document.getElementById('form-detalhes').addEventListener('click', (event) => {
    if (event.target === document.getElementById('form-detalhes')) {
        document.getElementById('form-detalhes').classList.add('hidden');
    }
});

function initAbrirEdicao(id){
    const receitas = JSON.parse(localStorage.getItem('receitas')) || []
    const receita = receitas.find(r => r.id === id)

    if(!receita) return

    idEdicao = id

    document.getElementById('nome-receita').value = receita.nome
    document.getElementById('emoji').value = receita.emoji
    document.getElementById('tipo-receita').value = receita.tipo
    document.getElementById('tempo-receita').value = receita.tempo
    document.getElementById('qtd-pessoas').value = receita.pessoas

    const listaIngredientes = document.getElementById('lista-ingredientes')
    listaIngredientes.innerHTML = ''
    receita.ingredientes.forEach((ingrediente) => {
        initInputComValor('lista-ingredientes', 'btn-input', ingrediente)
    })

    const listaPreparo = document.getElementById('lista-preparo')
    listaPreparo.innerHTML = ''
    receita.preparo.forEach((etapa) => {
        initInputComValor('lista-preparo', 'btn-preparo', etapa)
    })
    const tituloModal = document.querySelector('#form-modal h2')
    if(tituloModal) tituloModal.textContent = 'Editar receita'
    document.querySelector('#btn-salvar').textContent = 'Salvar alterações'

    document.getElementById('form-modal').classList.remove('hidden')
}

function initInputComValor(idLista, placeholder, valor){
    const lista = document.getElementById(idLista)
    const li = document.createElement('li')
    li.className = 'flex items-center gap-2 relative group'
    li.innerHTML = `
                <span class="numero-item text-fundo-branco bg-marrom dark:bg-laranja-primary dark:text-marrom py-2 px-3.5 rounded-full font-semibold text-sm select-none mt-4"></span>
        <input type="text" value="${valor}" placeholder="${placeholder}" 
               class="mt-4 w-full bg-fundo-branco dark:bg-fundo-branco/10 dark:text-fundo-branco border border-marrom/60 dark:border-fundo-branco/20 rounded-full px-4 py-2 focus:outline-none focus:border-laranja-primary transition-colors input-preenchido">
        <button type="button" class="btn-remover mt-4 text-marrom dark:text-fundo-branco hover:bg-[#CC3F3A] hover:text-fundo-branco p-2 rounded-full cursor-pointer transition-colors">
            <svg class="w-5 h-5 pointer-events-none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
        </button>
    `
    lista.appendChild(li)

    const itens = lista.querySelectorAll('li')
    itens.forEach((item, index) => {
        item.querySelector('.numero-item').textContent = `${index + 1}`
    })
}