const registratonForm=document.getElementById('signForm');
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
            window.location.href='sign.html';
        }else{
            alert("хана");
        }
    }catch(error){
        console.error('Ошибка при отправке формы:', error);
    }
}