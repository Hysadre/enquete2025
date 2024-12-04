<?php
// Configurez l'adresse email de destination
$to = "abayoassi@gmail.com";

// Récupérez les données obligatoires
$serviceType = htmlspecialchars($_POST['serviceType']);
$frequency = htmlspecialchars($_POST['frequency']);
$budget = htmlspecialchars($_POST['budget']);
$ecoProducts = htmlspecialchars($_POST['ecoProducts']);
$comments = htmlspecialchars($_POST['comments']);

// Récupérez les données facultatives
$firstName = htmlspecialchars($_POST['firstName'] ?? '');
$lastName = htmlspecialchars($_POST['lastName'] ?? '');
$email = htmlspecialchars($_POST['email'] ?? '');
$contact = htmlspecialchars($_POST['contact'] ?? '');

// Sujet de l'email
$subject = "Réponses au questionnaire de nettoyage écologique";

// Corps de l'email
$message = "
    Vous avez reçu une nouvelle réponse au questionnaire interactif :
    
    - Type de service : $serviceType
    - Fréquence : $frequency
    - Budget : $budget CFA
    - Produits écologiques : $ecoProducts
    - Commentaires : $comments
";

if (!empty($firstName) || !empty($lastName) || !empty($email) || !empty($contact)) {
    $message .= "\n\nInformations personnelles facultatives :";
    $message .= "\n- Prénom : $firstName";
    $message .= "\n- Nom : $lastName";
    $message .= "\n- Email : $email";
    $message .= "\n- Contact : $contact";
}

// Entêtes de l'email
$headers = "From: no-reply@yourdomain.com\r\n";
$headers .= "Reply-To: no-reply@yourdomain.com\r\n";
$headers .= "Content-Type: text/plain; charset=UTF-8\r\n";

// Envoyez l'email
if (mail($to, $subject, $message, $headers)) {
    echo "success";
} else {
    echo "error";
}
?>
