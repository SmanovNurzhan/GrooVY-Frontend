const form1=document.getElementById('form1');
form1.addEventListener('submit',reservation);
async function reservation(event){
    event.preventDefault();
    const city = document.getElementById('selectCity');
    const selectedOption = city.options[city.selectedIndex].value;
        var userReserv={
            phone:form1.elements['telNumber'].value,
            option:selectedOption,
            numberSeats:form1.elements['numberOfPlace'].value,
            name:form1.elements['nameOfCustomer'].value
        }
        let JsonReserv=JSON.stringify(userReserv);
        try{
            let response = await fetch('http://localhost:8081/reservations/addReserv',
            {
                method:'POST',
                headers:{
                    'Content-Type': 'application/json'
                },
                body:JsonReserv
            });
            if(response.ok){
                form1.reset();
                alert("Well");
            }else{
                alert("хана");
            }
        }catch(error){
            console.error('Ошибка при отправке формы:', error);
        }
}