// Fonction d'affichage du bouton d'ajout de livre
function displayAddButton() {
    let hideButton = `
        <div id="hideButton" class="button-container">
            <button class="button-green" id="addBouton">Ajouter un livre</button>
        </div>
    `;
    let h2Element = document.querySelector('.h2');
    h2Element.insertAdjacentHTML('afterend', hideButton);
}

// Fonction d'affichage du formulaire de recherche
function displayForm() {
    let form = `
        <div id="search" class="hide">
            <form id="searchForm">
                <label for="title">Titre du livre:</label>
                <input type="text" id="title" placeholder="Ex. : Le rouge et le noir">
                <br>
                <label for="author">Auteur:</label>
                <input type="text" id="author" placeholder="Ex. :  Stendhal">
                <br>
                <div class="button-container_2">
                    <button class="button-green" id="submit" type="button">Rechercher</button>
                    <button class="button-red" id="cancel" type="button">Annuler</button>
                </div>
            </form>
        </div>
    `;

    let formElement = document.getElementById('hideButton');
    formElement.insertAdjacentHTML('afterend', form);
}

// Fonction d'affichage du séparateur personnalisé + logo
function newSeparator() {
    let newSeparator = `
        <div id="separator" class="separator-container">
            <div class="line left-line"></div>
            <div class="center-content">
                <img src="img/logo_min.png" alt="Logo">
            </div>
            <div class="line right-line"></div>
        </div>    
    `
    let sepElement = document.querySelector('html div#myBooks hr');
    sepElement.insertAdjacentHTML('afterend', newSeparator);
    sepElement.remove()
}

// Fonction pour afficher le formualire au clic sur le bouton ajout de livre
function hideAndDisplay() {
    let hideButton = document.getElementById("addBouton");
    hideButton.addEventListener("click", function () {
        let hideForm = document.getElementById("search");
        hideForm.setAttribute("class", "form");
        hideButton.setAttribute("class", "hide");
    });
}

displayAddButton();
displayForm();
newSeparator()
hideAndDisplay();
sessionStorageDisplay();

// Recherche et affichage des éléments présents dans sessionStorage
function sessionStorageDisplay() { 
    if (sessionStorage.length > 0) {
        
        let hrElementStorageResult = document.getElementById("pochlist");
        let hrStorageDiv = document.getElementById("hrStorageResults");
        let h2ElementStorageResult = document.getElementById("hrStorageResults");
        let storageDiv = document.getElementById("storageResults");

        if (!hrStorageDiv) {
            hrElementStorageResult = document.getElementById("pochlist");
            let hrStorageDiv = document.createElement("hr");
            hrStorageDiv.id = "hrStorageResults";
            hrStorageDiv.className = "hide"
            hrElementStorageResult.parentNode.insertBefore(hrStorageDiv, hrElementStorageResult.nextSibling);
        }

        if (storageDiv) {
            storageDiv.innerHTML = '';
        } else {
            h2ElementStorageResult = document.getElementById("hrStorageResults");
            storageDiv = document.createElement("div");
            storageDiv.className = "bookResults";
            storageDiv.id = "storageResults";
            h2ElementStorageResult.parentNode.insertBefore(storageDiv, h2ElementStorageResult.nextSibling);
        }

        for (let i = 0; i < sessionStorage.length; i++) {
            const key = sessionStorage.key(i);

            // J'exclue les clés qui ne commencent pas par "APIGB"
            if (key.startsWith("APIGB")) {
                const storedValue = sessionStorage.getItem(key);

                try {
                    const decodedValue = JSON.parse(storedValue);
                    const displayStorage = document.getElementById("storageResults");
                    const storageElement = document.createElement('div');
                    storageElement.classList.add('bookbox');
                    storageElement.innerHTML = `
                        <div>
                            <i class="fa-solid fa-trash eraseBook" id="eraseBook_${decodedValue.id}" data-bookid="${decodedValue.id}"></i>
                        </div>
                        <p class="booktitle">Titre : ${decodedValue.title}</p>
                        <p class="bookid">Id : ${decodedValue.id}</p>
                        <p class="bookauthor">Auteur: ${decodedValue.authors}</p>
                        <p class="bookdescription">Description : ${decodedValue.shortDescription}</p>
                        <div class="bookcover">     
                            <img src="${decodedValue.thumbnailUrl}" alt="Thumbnail">
                        </div>
                    `;
                    displayStorage.appendChild(storageElement);
                } catch (error) {
                    console.error(`Erreur lors du décodage JSON pour la clé ${key}: ${error.message}`);
                }
            }
        }
    } else {
        console.log("Le sessionStorage est vide.");
    }
}
