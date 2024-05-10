const signForm1=document.getElementById('signForm');
signForm1.addEventListener('submit',signUser);

async function signUser(event){
    event.preventDefault();
    if(signForm1.elements['login'].value==="Admin" && signForm1.elements['password'].value==="Admin2024"){
        window.location.href='admin.html';
    }else{
        var userSign={
            login:signForm1.elements['login'].value,
            password:signForm1.elements['password'].value
        }
        let JsonSign=JSON.stringify(userSign);
        try{
            let response = await fetch('http://localhost:8081/person/signUser',
            {
                method:'POST',
                headers:{
                    'Content-Type': 'application/json'
                },
                body:JsonSign
            });
            if(response.ok){
                window.location.href='index.html';

            }else{
                alert("хана");
            }
        }catch(error){
            console.error('Ошибка при отправке формы:', error);
        }
    }
}