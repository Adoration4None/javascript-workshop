const form   = document.getElementById('calculator-form');
const result = document.getElementById('result');

form.addEventListener('submit', (event) => {
    event.preventDefault();
    calculateCalories();
})

function calculateCalories() {
    showResult();

    
}

function showError(msg) {
    const calculo = document.querySelector('#calculo');
    if (calculo) {
        calculo.remove();
    }

    const divError = document.createElement('div');
    divError.className = 'd-flex justify-content-center align-items-center h-100';
    divError.innerHTML = `<span class="alert alert-danger text-center">${msg}</span>`;

    result.appendChild(divError);

    setTimeout(() => {
        divError.remove();
        fadeResult();
    }, 5000);
}


// Animaciones
function showResult() {
    result.style.top = '100vh';
    result.style.display = 'block';
    
    let distance = 100;
    let subs = 0.3;
    let id = setInterval(() => {
        subs *= 1.1;
        result.style.top = `${distance - subs}vh`;
        if (subs > 100) {
            clearInterval(id);
        }
    }, 10)
}

function fadeResult() {
    let distance = 1;

    let id = setInterval(() => {
        distance *= 2;
        result.style.top = `${distance}vh`;
        if (distance > 100) {
            clearInterval(id);
            result.style.display = 'none';
            result.style.top = 0;
        }
    }, 10)
}