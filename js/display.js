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
        <div id="search" class="hide">
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

function newSeparator() {
    let newSeparator = `
    <div id="separator" class="separator-container">
		<div class="line left-line"></div>
		<div class="center-content">
		  <img src="img/logo_min.png" alt="Image centrée">
		</div>
		<div class="line right-line"></div>
	  </div>    
    `
    let sepElement = document.querySelector('html div#myBooks hr');
    sepElement.insertAdjacentHTML('afterend', newSeparator);
    sepElement.remove()

}

function HideAndDisplay() {
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
HideAndDisplay();