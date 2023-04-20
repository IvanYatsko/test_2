import './styles.scss';

const checkFields = {
  inputName: {
    min: 2,
    max: 25,
    required: true,
  },
  inputLastName: {
    min: 2,
    max: 25,
    required: true,
  },
  inputDate: {
    maxDate: 'today',
    required: true,
  },
  inputEmail: {
    type: 'Email',
    required: true,
  },
  inputPassword1: {
    min: 8,
    uppercase: 1,
    number: 1,
    specialCharacter: 1,
    required: true,
  },
  inputPassword2: {
    isEqual: 'inputPassword1',
    required: true,
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
      return `Must match the password ${value}`;
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

const FORM = document.querySelector('.form');

const createError = (input, key) => {
  const text = textErrors(key, checkFields[input.id][key]);
  const parent = input.parentNode;
  const errorDiv = document.createElement('div');
  errorDiv.textContent = text;

  input.classList.add('is-invalid');
  parent.append(errorDiv);
};

const validation = (form) => {
  let result = true;
  let err;

  form?.querySelectorAll('.form-control').forEach((input) => {
    const errors = Object.keys(checkFields[input.id]).find((key) => {
      switch (key) {
        case 'required':
          if (input.value) {
            err = key;
          }
          break;
        case 'min':
          if (input.value >= checkFields[input.id][key]) {
            err = key;
          }
          break;
        case 'max':
          if (input.value <= checkFields[input.id][key]) {
            err = key;
          }
          break;
        // case 'maxDate':
        //   'хз';
        //   break;
        // case 'type':
        //   'РЕГУЛЯРКУ';
        //   break;
        case 'isEqual':
          if (
            input.value !== document.getElementById(checkFields[input.id][key])
          ) {
            err = key;
          }
          break;
        // case 'uppercase':
        //   'РЕГУЛЯРКУ';
        //   break;
        // case 'number':
        //   'РЕГУЛЯРКУ';
        //   break;
        // case 'specialCharacter':
        //   'РЕГУЛЯРКУ !@#$%';
        //   break;
        default:
          return true;
      }
      return !err;
    });

    if (!errors) {
      result = false;
      createError(input, err);
    }
  });

  return result;
};

FORM.addEventListener('submit', (e) => {
  e.preventDefault();
  if (validation(e.target)) {
    alert('It is good');
  }
});
