import './styles.scss';

const EMAIL_REGEXP = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu;
const checkFields = {
  inputName: {
    required: true,
    min: 2,
    max: 25,
  },
  inputLastName: {
    required: true,
    min: 2,
    max: 25,
  },
  inputDate: {
    required: true,
    maxDate: 'today',
  },
  inputEmail: {
    required: true,
    type: 'Email',
  },
  inputPassword1: {
    required: true,
    min: 8,
    uppercase: 1,
    number: 1,
    specialCharacter: 1,
  },
  inputPassword2: {
    required: true,
    isEqual: 'inputPassword1',
  },
};

const textErrors = (key, value) => {
  switch (key) {
    case 'min':
      return `Minimum number of characters ${value}`;
    case 'max':
      return `Maximum number of characters ${value}`;
    case 'required':
      return 'Required field';
    case 'maxDate':
      return `Maximum date is ${value}`;
    case 'type':
      return `Invalid ${value}`;
    case 'isEqual':
      return 'Must match the password field';
    case 'uppercase':
      return `Minimum ${value} character in upper case`;
    case 'number':
      return `Minimum ${value} digit`;
    case 'specialCharacter':
      return `Minimum ${value} special character from those listed !@#$%`;
    default:
      return '';
  }
};

const FORM = document.getElementById('form');

const createError = (input, key) => {
  const text = textErrors(key, checkFields[input.id][key]);
  const parent = input.parentNode;
  const errorDiv = document.createElement('div');
  errorDiv.classList.add(input.id);
  errorDiv.textContent = text;

  input.classList.add('is-invalid');
  parent.append(errorDiv);
};

const clearError = (input) => {
  const parent = input.parentNode;
  if (parent.lastChild.classList?.contains(input.id)) {
    parent.removeChild(parent.lastChild);
    input.classList.remove('is-invalid');
  }
};

const dateVerification = (date) => {
  const current = new Date();
  const chosen = new Date(date);
  if (chosen > current) {
    return true;
  }
  return undefined;
};

const validation = (form) => {
  let result = true;

  form?.querySelectorAll('.form-control').forEach((input) => {
    clearError(input);

    const errors = Object.keys(checkFields[input.id]).find((key) => {
      switch (key) {
        case 'required':
          if (!input.value) {
            return true;
          }
          break;
        case 'min':
          if (input.value.length < checkFields[input.id][key]) {
            return true;
          }
          break;
        case 'max':
          if (input.value.length > checkFields[input.id][key]) {
            return true;
          }
          break;
        case 'maxDate':
          if (dateVerification(input.value)) {
            return true;
          }
          break;
        case 'type':
          if (!EMAIL_REGEXP.test(input.value)) {
            return true;
          }
          break;
        case 'isEqual':
          if (input.value !== document.getElementById('inputPassword1').value) {
            return true;
          }
          break;
        case 'uppercase':
          if (input.value === input.value.toLowerCase()) {
            return true;
          }
          break;
        case 'number':
          if (!input.value.match(/[0-9]/)) {
            return true;
          }
          break;
        case 'specialCharacter':
          if (!input.value.match(/[!@#$%]/)) {
            return true;
          }
          break;
        default:
          return false;
      }
      return false;
    });

    if (errors) {
      result = false;
      createError(input, errors);
    }
  });

  return result;
};

FORM.addEventListener('submit', async (e) => {
  e.preventDefault();
  if (validation(e.target)) {
    const data = new FormData(FORM);
    console.log(Object.fromEntries(data.entries()));
    const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
      method: 'POST',
      body: data,
    });
    const result = await response.json();
  }
});
