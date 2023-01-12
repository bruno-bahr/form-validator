let Validator = {
    handleSubmit: (event) => {
        event.preventDefault();

        let send = true;
        let inputs = form.querySelectorAll('input');

        Validator.clearErrors();

        for (let i=0; inputs.length>i;i++){
            let input = inputs[i];
            let check = Validator.checkInput(input);
            if (check !== true) {
                send = false;
                Validator.showError(input, check);
            }
        }
  
        if (send){
            form.submit();
        }
    },
    checkInput:(input) => {
        let rules = input.getAttribute('data-rules') 
        if (rules !== null) {
            rules = rules.split('|');
            for (k in rules){
                let rDetails = rules[k].split('=');
                switch(rDetails[0]) {
                    case 'required':
                        if (input.value == '') {
                            return 'Favor preencher este campo!';
                        }
                    break;
                    case 'min':
                        if (input.value.length < rDetails[1]) {
                            return `Campo deve ter pelo menos ${rDetails[1]} caracteres`
                        }
                    break;
                    case 'password':
                        if(input.value.length < rDetails[1]){
                            return `Senha deve ter pelo menos ${rDetails[1]} caracteres`
                        }
                    break;
                }
            }
        }
        return true;
    },
    showError:(input, error) => {
        input.style.borderColor = '#FF0000';
        let errorElement = document.createElement('div');
        errorElement.classList.add('error');
        errorElement.innerHTML = error;

        input.parentElement.insertBefore(errorElement, input.Sibling);
    },

    clearErrors:() => {
        let inputs = document.querySelectorAll('input');
        for (let i=0; inputs.length>i; i++) {
            inputs[i].style = ''
        }

        let errors = document.querySelectorAll('.error');
        for(let i=0; errors.length>i; i++) {
            errors[i].remove();
        }
    }
};

let form = document.querySelector('.validator');
form.addEventListener('submit', Validator.handleSubmit);