function formSubmit() {
    // Attente d'un événement de soumission de formulaire
    let submitBouton = document.getElementById("submit");
    submitBouton.addEventListener("click", function () {
        // Récupération des données et définition des variables
        let author = document.getElementById("author");
        author = author.value;
        let title = document.getElementById("title");
        title = title.value;

        let divResult = document.getElementById("results");

        if (divResult) {
            // Réinitialisation des alertes précédentes
            const errorMessage = document.getElementById('alert');
            errorMessage.textContent = "";
        } else {
            // Préparer la div des résultats
            let divResults = document.querySelector("#myBooks #content");
            let results = document.createElement("div");
            results.className = "results";
            results.id = "results";
            results.innerHTML = `<p class="error" id="alert"></p>`;
            divResults.parentNode.insertBefore(results, divResults);

            let h2Element2 = document.querySelector("#myBooks #results #alert");
            let cardDiv = document.createElement("div");
            cardDiv.className = "bookResults";
            cardDiv.id = "bookResults";
            cardDiv.innerHTML = ``;
            h2Element2.parentNode.insertBefore(cardDiv, h2Element2.nextSibling);
        }

        // Validation de saisie
        let errorMessage = document.getElementById('alert');

        if (!title || !author) {
            errorMessage.setAttribute("class", "error");
            errorMessage.textContent = "Merci de renseigner un titre et un auteur";
        } else {
            errorMessage.textContent = "";
            console.log(title);
            console.log(author);
            searchAPI(title, author);
        }
    });
}

formSubmit();

function searchAPI(title, author) {
    // Définition du nombre de résultats maximum attendu
    const startIndex = 0;
    const maxResults = 20;

    // Constitution de l'URL pour requêter l'API
    const apiKey = 'AIzaSyAl3MDo2LvIg5jHu-PTchhELZKbnXhPlnU';
    const apiUrl = `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(`intitle:${title}+inauthor:${author}`)}&startIndex=${startIndex}&maxResults=${maxResults}&key=${apiKey}`;

    // Requête réseau
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            console.log(data.items);
            displayResults(data.items);
        })
        .catch(error => {
            console.error('Erreur lors de la recherche:', error);
        });
}

// Fonction pour tronquer une chaîne de caractères
function truncateText(text, maxLength) {
    if (text.length > maxLength) {
        return text.substring(0, maxLength) + '...';
    }
    return text;
}

// Fonction pour convertir une chaîne de caractères en minuscule + 1 majuscule (au début et après un point)
function formatText(inputText) {
    let lowercaseText = inputText.toLowerCase();
    let formattedText = lowercaseText.charAt(0).toUpperCase() + lowercaseText.slice(1);
    formattedText = formattedText.replace(/\. (\w)/g, (match, p1) => `. ${p1.toUpperCase()}`);
    return formattedText;
}





