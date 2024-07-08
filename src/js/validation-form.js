
const inputs = document.querySelectorAll('.form-control');
const selects = document.querySelectorAll('.form-select');
const selectedGroup = selects[0]

const buttonSend = document.getElementById('button-send')

const fields = {
    name  : false,
    email : false,
    phone : false,
    organization : false,
    position : false,
    selected_group : false,
    observation : false,
    is_observation : false,
    is_completed_fields : false,
}

const expression = {
	name: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letras y espacios, pueden llevar acentos.
	organization: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letras y espacios, pueden llevar acentos.
	position: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letras y espacios, pueden llevar acentos.
	email: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
	phone: /^\d{6,20}$/, // 6 a 20 numeros.
	observation: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letras y espacios, pueden llevar acentos.
}


const validarSelectGroup = (e) => {
    const value = e.target.value;
    const validateValue = [
    'Investor', 
    'Mills',
    'Brand',
    'Horeca',
    'Other'];
    const isValid = validateValue.includes(value)
    if(isValid){
        fields['selected_group'] = true;
        e.target.className = 'mt-1.5 w-full form-select rounded-lg bg-white border-gray-300 text-primary sm:text-sm px-5 py-2.5 border border-lime-500'
    } else {
        fields['selected_group'] = false;
        e.target.className = 'mt-1.5 w-full form-select rounded-lg bg-white border-gray-300 text-primary sm:text-sm px-5 py-2.5 border border-red '
    }
    if(value === 'Other'){
        fields.is_observation = true;
        document.getElementById('wrapper-input-observation').classList.remove('c-form__observation-none');
        document.getElementById('wrapper-input-observation').classList.add('c-form__observation-block');
    } else {
        fields.is_observation = false;
        document.getElementById('wrapper-input-observation').classList.add('c-form__observation-none');
        document.getElementById('wrapper-input-observation').classList.remove('c-form__observation-block');
    }
}

const validarFormulario = (e) => {
    switch(e.target.name){
        case "name":
            validarCampo(expression.name, e.target, e.target.name)
        break;
        case "organization":
            validarCampo(expression.organization, e.target, e.target.name)
        break;
        case "position":
            validarCampo(expression.position, e.target, e.target.name)
        break;
        case "email":
            validarCampo(expression.email, e.target, e.target.name)
        break;
        case "phone":
            validarCampo(expression.phone, e.target, e.target.name)
        break;
        case "observation":
            validarCampo(expression.observation, e.target, e.target.name)
        break;
    }
}

const validarCampo = (expresion, input, field) => {
    console.log(expresion.test(input.value))
    if(expresion.test(input.value)){
        document.getElementById(`input-${field}`).classList.remove('form-control');
        document.getElementById(`input-${field}`).classList.remove('border-red');
        document.getElementById(`input-${field}`).classList.add('form-control');
        document.getElementById(`input-${field}`).classList.add('border-lime-500');
        document.getElementById(`help-${field}`).classList.remove('text-red');
        document.getElementById(`help-${field}`).classList.add('text-gray-600');
        fields[field] = true;

    } else {
        document.getElementById(`input-${field}`).classList.remove('form-control');
        document.getElementById(`input-${field}`).classList.remove('border-lime-500');
        document.getElementById(`input-${field}`).classList.add('form-control');
        document.getElementById(`input-${field}`).classList.add('border-red');
        document.getElementById(`help-${field}`).classList.remove('text-gray-600');
        document.getElementById(`help-${field}`).classList.add('text-red');
        fields[field] = false;
        // document.getElementById(`input-${field}`).classList.add('form-control is-invalid');
        // document.getElementById(`input-${field}`).classList.remove('form-control is-valid');
        // document.getElementById(`wrapper-${field}`).classList.add('c-form-page__wrapper-form-incorrect');
        // document.getElementById(`wrapper-${field}`).classList.add('c-form-page__wrapper-form-correct');
        // document.querySelector(`#wrapper-${field} i`).classList.add('fa-times-circle');
        // document.querySelector(`#wrapper-${field} i`).classList.remove('fa-check-circle');
        // document.querySelector(`#wrapper-${field} .c-form-page__input-error`).classList.add('c-form-page__input-error-active');
    }
}

const validateButton = () => {
    if(fields.name && fields.email && fields.phone && fields.selected_group && fields.position && fields.organization && !fields.is_observation){
        buttonSend.removeAttribute("disabled");
        buttonSend.style.backgroundColor = '#C0FB76';
    } else {
        if(fields.is_observation && fields.observation){
            buttonSend.removeAttribute("disabled");
            buttonSend.style.backgroundColor = '#C0FB76';
        } else {
            buttonSend.setAttribute("disabled", "");
            buttonSend.style.backgroundColor = '#ffffff';
        }
    }
}


inputs.forEach((input)=>{
    input.addEventListener('keyup', validarFormulario);
    input.addEventListener('blur', validarFormulario);
    input.addEventListener('blur', validateButton);
    input.addEventListener('keyup', validateButton);
});

selectedGroup.addEventListener('blur', validarSelectGroup);
selectedGroup.addEventListener('change', validarSelectGroup);
selectedGroup.addEventListener('blur', validateButton);
selectedGroup.addEventListener('change', validateButton);
