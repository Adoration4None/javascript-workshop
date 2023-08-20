const form = document.getElementById("calculator-form");
const result = document.getElementById("result");

form.addEventListener("submit", (event) => {
    event.preventDefault();
    calculateCalories();
});

function verifyAge(age) {
    if (age.value >= 15 && !Number.isNaN(age)) {
        if (age.value >= 15 && age.value <= 29) {
            return "El paciente pertenece al grupo poblacional juvenil.";
        } else if (age.value >= 30 && age.value <= 59) {
            return "El paciente pertenece al grupo poblacional adulto.";
        } else {
            return "El paciente pertenece al grupo poblacional de adultos mayores.";
        }
    } else {
        showError("La edad ingresada no es permitida");
    }
}

function calculateCalories() {
    // Inputs
    const name = document.querySelector("#name");
    let documentType = document.querySelector("#document-type");
    const documentNumber = document.querySelector("#document-num");
    const age = document.querySelector("#age");
    const weight = document.querySelector("#weight");
    const height = document.querySelector("#height");
    const activity = document.querySelector("#activity");
    const gender = document.querySelector('input[name="gender"]:checked');

    if (
        !allFieldsFilled([
            name,
            documentType,
            documentNumber,
            age,
            weight,
            height,
            activity,
            gender,
        ])
    ) {
        showError("Por favor, asegúrese de llenar todos los campos");
        return null;
    }

    // Constant values needed to do the math
    const bmr = {
        age: 5,
        weight: 10,
        height: 6.25,
        gender: gender.value === "M" ? 5 : -161,
    };

    let myMessage = verifyAge(age);

    // Output
    const calories =
        activity.value *
        (bmr.weight * weight.value +
            bmr.height * height.value -
            bmr.age * age.value +
            bmr.gender);

    documentType = convertDocumentType(documentType.value);

    showResult(name, documentType, documentNumber, calories, myMessage);

    name.value = null;
    documentType.value = null;
    documentNumber.value = null;
    age.value = null;
    weight.value = null;
    height.value = null;
    activity.value = null;
    gender.value = null;

    return calories;
}

function allFieldsFilled(fields) {
    for (let field of fields) {
        if (
            field.value == null ||
            field.value == undefined ||
            field.value == ""
        ) {
            return false;
        }
    }

    return true;
}

function convertDocumentType(option) {
    const type = {
        0: "Cédula de ciudadanía",
        1: "Cédula de extranjería",
        2: "Tarjeta de identidad",
        3: "Pasaporte",
    };

    return type[option];
}

function showError(msg) {
    const calculo = document.querySelector("#calculo");
    if (calculo) {
        calculo.remove();
    }

    const divError = document.createElement("div");
    divError.className =
        "d-flex justify-content-center align-items-center h-100";
    divError.innerHTML = `<span class="alert alert-danger text-center">${msg}</span>`;

    result.appendChild(divError);

    setTimeout(() => {
        divError.remove();
        fadeResult();
    }, 5000);
}

// Animaciones
function showResult(name, documentType, documentNumber, calories, msg) {
    result.style.top = "100vh";
    result.style.display = "block";

    let distance = 100;
    let subs = 0.3;
    let id = setInterval(() => {
        subs *= 1.1;
        result.style.top = `${distance - subs}vh`;
        if (subs > 100) {
            clearInterval(id);
        }
    }, 10);

    result.innerHTML = `
        <div class="card-body d-flex flex-column justify-content-center align-items-center h-100">
            <h5 class="card-title h2">Resultados</h5>
            <div class="mb-3 w-100">
                <p>
                    El paciente ${name.value} identificado con ${documentType} NO. ${documentNumber.value}, requiere un total de ${calories} kcal para el sostenimiento de su TBM
                </p>
                <br> <br>
                ${msg}
            </div>
        </div>
    `;
}

function fadeResult() {
    let distance = 1;

    let id = setInterval(() => {
        distance *= 2;
        result.style.top = `${distance}vh`;
        if (distance > 100) {
            clearInterval(id);
            result.style.display = "none";
            result.style.top = 0;
        }
    }, 10);
}
