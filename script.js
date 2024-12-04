let currentStep = 0;
const steps = document.querySelectorAll('.step');
const indicators = document.querySelectorAll('.step-indicator');
const errorElement = document.getElementById('error');
const confirmationElement = document.getElementById('confirmation');

function showStep(step) {
    steps.forEach((el, index) => {
        if (index < step) {
            el.classList.remove('active', 'hidden-right');
            el.classList.add('hidden-left');
        } else if (index > step) {
            el.classList.remove('active', 'hidden-left');
            el.classList.add('hidden-right');
        } else {
            el.classList.remove('hidden-left', 'hidden-right');
            el.classList.add('active');
        }

        indicators[index]?.classList.toggle('active', index <= step);
    });
}

function nextStep() {
    const currentInputs = steps[currentStep].querySelectorAll('input[required], select[required], textarea[required]');
    for (const input of currentInputs) {
        if (!input.checkValidity()) {
            errorElement.textContent = 'Veuillez remplir tous les champs requis avant de continuer.';
            return;
        }
    }
    errorElement.textContent = '';
    if (currentStep < steps.length - 1) {
        currentStep++;
        showStep(currentStep);
    }
}

function prevStep() {
    if (currentStep > 0) {
        currentStep--;
        showStep(currentStep);
        errorElement.textContent = '';
    }
}

function updateBudgetValue(value) {
    document.getElementById('budgetValue').innerText = value;
}

document.getElementById('surveyForm').addEventListener('submit', function (e) {
    e.preventDefault(); // Empêche le rechargement de la page

    const form = e.target;
    const formData = new FormData(form);

    fetch(form.action, {
        method: form.method,
        body: formData,
    })
    .then(response => response.text())
    .then(result => {
        console.log(result); // Affiche la réponse complète du serveur
        if (result.trim() === "success") {
            confirmationElement.textContent = 'Merci ! Votre formulaire a été soumis avec succès.';
            confirmationElement.style.color = 'green';
            form.reset(); // Réinitialise le formulaire après envoi
            currentStep = 0;
            showStep(currentStep); // Retour à la première étape
        } else {
            errorElement.textContent = 'Une erreur est survenue. Veuillez réessayer.';
        }
    })
    .catch(error => {
        console.error('Erreur:', error); // Affiche les erreurs dans la console
        errorElement.textContent = 'Impossible de soumettre le formulaire. Vérifiez votre connexion.';
    });
});
