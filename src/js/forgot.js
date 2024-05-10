const forgotForm=document.getElementById('forgotForm');
forgotForm.addEventListener('submit',findAccount);
var notFoundElement = document.getElementById('notFound');
var greyElement=document.getElementById('gray');
var changeElement=document.getElementById('changeForm');
const changeForm=document.getElementById('formOfChange');
changeForm.addEventListener('submit',ResetPassword);

function show(state){
    greyElement.style.display=state;
    changeElement.style.display=state;
}

async function findAccount(event){
    event.preventDefault();
    var findPerson={
        login:forgotForm.elements['login'].value,
        firstPasswd:forgotForm.elements['firstpasswd'].value
    }
    let JsonFindPerson=JSON.stringify(findPerson);
    try{
        let response = await fetch('http://localhost:8081/person/findAcc',
        {
            method:'POST',
            headers:{
                'Content-Type': 'application/json'
            },
            body:JsonFindPerson
        });
        if(response.ok){
            notFoundElement.style.display="none";
            show('block');
            changeForm.elements['resetLogin'].value=forgotForm.elements['login'].value;
        }
        else if(response.status===404){
            notFoundElement.style.display="block";
            forgotForm.reset();
        }else{
            alert("хана");
        }
    }catch(error){
        console.error('Ошибка при отправке формы:', error);
    }
}

async function ResetPassword(event){
    event.preventDefault();
    var PersonData={
        login:changeForm.elements['resetLogin'].value,
        password:changeForm.elements['resetPassword'].value
    }
    let JsonPersonDataChange=JSON.stringify(PersonData);
    try{
        let response = await fetch('http://localhost:8081/person/resetPassword',
        {
            method:'POST',
            headers:{
                'Content-Type': 'application/json'
            },
            body:JsonPersonDataChange
        });
        if(response.ok){
            show('none');
            alert("Данные успешно обнавлены");
            window.location.href='sign.html';
        }
        else if(response.status===404){
            forgotForm.reset();
        }else{
            alert("хана");
        }
    }catch(error){
        console.error('Ошибка при отправке формы:', error);
    }
}

