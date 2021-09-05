const errorMsgZero = 'Can\'t be zero';

export const checkChanges = (target, errorElement, regEx) => {
    const { value } = target;

    if (value.split('')[0] === '0') {
        errorElement.innerHTML = errorMsgZero;
        errorElement.classList.add('error--active');
        target.value = '';
        return;
    }

    if (!regEx.test(value)) {
        errorElement.innerHTML = 'Input error';
        errorElement.classList.add('error--active');
        const newValue = value.split('');
        target.value = newValue.slice(0, newValue.length - 1).join('');
        return;
    }

    errorElement.innerHTML = '';
    errorElement.classList.remove('error--active');
}

export const checkInput = (target) => {
    const { value } = target;

    if (value.split('')[0] === '0') {
        target.value = '';
        return;
    }

    if (!/^[0-9]{1,3}$/.test(value) || parseInt(value) > 100) {
        const newValue = value.split('');
        target.value = newValue.slice(0, newValue.length - 1).join('');
        return;
    }
    
    return true;
};