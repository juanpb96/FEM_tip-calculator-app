import { checkChanges, checkInput } from './js/utils.js';

const regEx = /^[0-9]*(\.{1})?([0-9]{1,2})?$/;
const btnActiveClass = 'btn--active';
let tipValue = 0;

/* Reset button */
const resetBtn = document.getElementById('reset');
resetBtn.addEventListener('click', (e) => { 
    bill.value = '';
    customTip.value = '';
    numberPeople.value = '';
    tipValue = 0;
    tipAmount.innerHTML = '$0.00';
    total.innerHTML = '$0.00';
    resetBtn.setAttribute('disabled', 'true');
    setInactiveButtons();
});

/* Tip Calculator */ 
const getNumberWithDecimals = (num) => (Math.floor(100 * num)/100).toFixed(2);

const checkCalc = () => {
    if (bill.value && tipValue && numberPeople.value) {
        calcTipValue();
        resetBtn.removeAttribute('disabled');
    }
}

const tipAmount = document.getElementById('tip-amount');
const total = document.getElementById('total');
const calcTipValue = () => {
    const valuePerPerson = parseFloat(bill.value) / parseInt(numberPeople.value); 
    const tipPerPerson = valuePerPerson * (tipValue / 100);
    tipAmount.innerHTML = `$${getNumberWithDecimals(tipPerPerson)}`;
    total.innerHTML = `$${getNumberWithDecimals(valuePerPerson + tipPerPerson)}`;
}

/* Bill */
const bill = document.getElementById('bill');
bill.value = '';
const errorBill = document.getElementById('error-bill');

bill.addEventListener('input', ({target}) => {
    checkChanges(target, errorBill, regEx);
    checkCalc();
});

/* Tip buttons */
const tipButtons = document.getElementById('tip-buttons');

const setInactiveButtons = () => {
    Object.entries(tipButtons.children).forEach(el => {
        if (el[1].tagName === 'BUTTON' && el[1].value !== tipValue) {
            el[1].classList.remove(btnActiveClass);
        }
    });
};

tipButtons.addEventListener('click', (e) => {
    if ( e.target && e.target.tagName === 'BUTTON' ) {
        tipValue = parseInt(e.target.value);
        customTip.value = '';
        setInactiveButtons();
        checkCalc();
        e.target.classList.toggle(btnActiveClass);
    }
});

/* Custom tip */
const customTip = document.getElementById('custom-tip');
customTip.value = '';
customTip.addEventListener('input', (e) => {
    if (checkInput(e.target)) {
        tipValue = parseInt(e.target.value);
        setInactiveButtons();
        checkCalc();
        e.preventDefault();
    } 
});


/* Number of people */
const numberPeople = document.getElementById('number-people');
numberPeople.value = '';
const errorPeople = document.getElementById('error-number-people');

numberPeople.addEventListener('input', ({target}) => {
    checkChanges(target, errorPeople, /^[0-9]+$/);
    checkCalc();
});