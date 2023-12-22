function displayTitle() {
    let titleNew = `<img src="img/logo_min.png" alt="Logo">Poch'Lib<img src="img/logo_min.png" alt="Logo">`;
    let h1Element = document.querySelector('.title');
    h1Element.innerHTML = '';
    h1Element.innerHTML = titleNew;
}

function displayAddButton() {
    let hideButton = `
        <div id="hideButton" class="button-container">
            <button class="button-green" id="addBouton">Ajouter un livre</button>
        </div>
    `;
    let h2Element = document.querySelector('.h2');
    h2Element.insertAdjacentHTML('afterend', hideButton);
}

function displayForm() {
    let form = `
        <div id="search" class="search">
            <form id="searchForm">
                <label for="title">Titre du livre:</label>
                <input type="text" id="title" placeholder="Ex. : Le rouge et le noir">
                <br>
                <label for="author">Auteur:</label>
                <input type="text" id="author" placeholder="Ex. :  Stendhal">
                <br>
                <div class="button-container_2" id="bouton3">
                    <button class="button-green" id="submit" type="button">Rechercher</button>
                    <button class="button-red" id="cancel" type="button">Annuler</button>
                </div>
            </form>
        </div>
    `;

    let formElement = document.getElementById('hideButton');
    formElement.insertAdjacentHTML('afterend', form);
}

displayTitle();
displayAddButton();
displayForm();