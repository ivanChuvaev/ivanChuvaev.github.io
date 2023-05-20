const name = document.querySelector('#name')
const secondName = document.querySelector('#secondName')
const email = document.querySelector('#email')

const add = document.querySelector('.add')
const clear = document.querySelector('.clear')
const users = document.querySelector('.users')

const storage = JSON.parse(localStorage.getItem('users')) || {}

/**
 * Функция добавления слушателей на кнопки удаления и изменения
 * в карточке пользователя
 * @param {HTMLDivElement} userCard - карточка пользователя
 */
function setListeners(userCard) {
    const deleteBtn = userCard.querySelector('.delete')
    const changeBtn = userCard.querySelector('.change')

    deleteBtn.addEventListener('click', () => {
        console.log(
            `%c Удаление пользователя ${deleteBtn.dataset.deleteUserEmail} `,
            'background: red; color: white',
        )
    })

    changeBtn.addEventListener('click', () => {
        console.log(
            `%c Изменение пользователя ${changeBtn.dataset.changeUserEmail} `,
            'background: green; color: white',
        )
    })
}

/**
 * Функция создания карточки пользователя
 * @param {Object} data - объект с данными пользователя
 * @param {string} data.name - имя пользователя
 * @param {string} data.secondName - фамилия пользователя
 * @param {string} data.email - email пользователя
 * @returns {string} - возвращает строку с разметкой карточки пользователя
 */
function createCard({ name, secondName, email }) {
    return `
        <div data-user=${email} class="user-outer">
            <div class="user-info">
                <p>${name}</p>
                <p>${secondName}</p>
                <p class="email">${email}</p>
            </div>
            <div class="menu">
                <button data-delete-user-email=${email} class="delete">Удалить</button>
                <button data-change-user-email=${email} class="change">Изменить</button>
            </div>
        </div>
    `
}

/**
 * Функция перерисовки карточек пользователей при загрузке страницы
 * @param {Object} storage - объект с данными пользователей
 */
function rerenderCards(storage) {
    if (!storage) {
        console.log('localStorage пустой')
        return
    }

    users.innerHTML = ''

    Object.keys(storage).forEach((email) => {
        const userData = storage[email]
        const userCard = document.createElement('div')
        userCard.className = 'user'
        userCard.innerHTML = createCard(userData)
        users.append(userCard)
        setListeners(userCard)
    })
}

/**
 * Функция добавления карточки пользователя в список пользователей и в localStorage
 * @param {Event} e - событие клика по кнопке добавления
 */
function addCard(e) {
    e.preventDefault()

    // Если поля name, secondName, email пустые или в storage есть ключ email,
    // то функция ничего не делает
    if (
        storage[email.value]
        || !email.value
        || !name.value
        || !secondName.value
    ) {
        resetInputs(name, secondName, email)
        return
    }

    const data = {
        name: name.value,
        secondName: secondName.value,
        email: email.value,
    }

    storage[email.value] = data

    const userCard = document.createElement('div')
    userCard.className = 'user'
    users.append(userCard)
    setListeners(userCard)

    // Добавление данных в localStorage
    localStorage.setItem('users', JSON.stringify(storage))
    console.log(`localStorage: ${JSON.stringify(storage)}`)
    resetInputs(name, secondName, email)
}

/**
 * Функция очистки полей ввода
 * @param {HTMLInputElement} inputs
 */
function resetInputs(...inputs) {
    inputs.forEach((input) => {
        input.value = ''
    })
}

// Функция очистки localStorage
function clearLocalStorage() {
    localStorage.removeItem('users')
    window.location.reload()
}

// Добавление слушателей на кнопки добавления и очистки
add.addEventListener('click', addCard)
clear.addEventListener('click', clearLocalStorage)

// При загрузке страницы перерисовываются карточки пользователей
window.addEventListener('load', () => {
    rerenderCards(JSON.parse(localStorage.getItem('users')))
})
