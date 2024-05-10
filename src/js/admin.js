const registratonForm=document.getElementById('registrationAdmin');
registratonForm.addEventListener('submit',registerUser);

async function registerUser(event){
    event.preventDefault();
    var person={
        username:registratonForm.elements['username'].value,
        surname:registratonForm.elements['surname'].value,
        login:registratonForm.elements['login'].value,
        firstPasswd:registratonForm.elements['password'].value,
        password:registratonForm.elements['password'].value
    }
    let JsonPerson=JSON.stringify(person);
    try{
        let response = await fetch('http://localhost:8081/person/add',
        {
            method:'POST',
            headers:{
                'Content-Type': 'application/json'
            },
            body:JsonPerson
        });
        if(response.ok){
            alert("Пользователь успешно зарегистрирован.");
            registratonForm.reset();
        }else{
            alert("хана");
        }
    }catch(error){
        console.error('Ошибка при отправке формы:', error);
    }
}


async function fetchAndDisplayUsers() {
    try {
        const response = await fetch('http://localhost:8081/person/getUsers');
        if (!response.ok) {
            throw new Error('Ошибка при получении списка пользователей');
        }
        const users = await response.json();

        const userListDiv = document.getElementById('user-list');
        userListDiv.innerHTML = '';

        users.forEach(user => {
            const userDiv = document.createElement('div');
            userDiv.innerHTML = `
                <p>Имя: ${user.username}</p>
                <p>Фамилия: ${user.surname}</p>
                <p>Логин: ${user.login}</p>
                <p>Пароль: ${user.password}</p>
            `;
            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Удалить';
            deleteButton.addEventListener('click', () => deleteUser(user.id));

            userDiv.appendChild(deleteButton);
            userListDiv.appendChild(userDiv);
        });
    } catch (error) {
        console.error('Произошла ошибка:', error);
    }
}
fetchAndDisplayUsers();


async function deleteUser(userId) {
    try {
        const response = await fetch(`http://localhost:8081/person/${userId}`, {
            method: 'DELETE'
        });

        if (!response.ok) {
            throw new Error('Ошибка при удалении пользователя');
        }

        // После успешного удаления пользователя, обновляем список пользователей
        fetchAndDisplayUsers();
    } catch (error) {
        console.error('Произошла ошибка при удалении пользователя:', error);
    }
}
