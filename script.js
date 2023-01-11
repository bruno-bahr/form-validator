let Validator = {
    handleSubmit: (event) => {
        event.preventDefault();
    }
}

let form = document.querySelector('.validator');
form.addEventListener('submit', Validator.handleSubmit);