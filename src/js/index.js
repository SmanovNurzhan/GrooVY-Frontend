const formVac=document.getElementById('formVac');
formVac.addEventListener('submit',registerEmployee);

async function registerEmployee(event){
    event.preventDefault();
    var person={
        email:formVac.elements['email'].value
    }
    let JsonPerson=JSON.stringify(person);
    try{
        let response = await fetch('http://localhost:8081/empl/addEmployee',
        {
            method:'POST',
            headers:{
                'Content-Type': 'application/json'
            },
            body:JsonPerson
        });
        if(response.ok){
            alert("well");
            formVac.reset();
        }else{
            alert("хана");
        }
    }catch(error){
        console.error('Ошибка при отправке формы:', error);
    }
}


