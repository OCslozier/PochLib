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
    // Définition du nombre de résultats maximum attendus
    const startIndex = 0;
    const maxResults = 10;
  
    // Constitution de l'URL pour requêter l'API
    const apiUrl = `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(`intitle:${title}+inauthor:${author}`)}&startIndex=${startIndex}&maxResults=${maxResults}`;
  
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
  
  // Fonction pour afficher les résultats de recherche
  function displayResults(books) {
    const resultsDiv = document.getElementById('bookResults');
    resultsDiv.innerHTML = '';
  
    if (books && books.length > 0) {
      books.forEach(book => {
        // Définition des valeurs récupérées
        const id = book.id;
        const title = book.volumeInfo.title;
        const authors = book.volumeInfo.authors[0] || 'Auteur inconnu';
        const description = book.volumeInfo.description || 'Aucune description disponible';
        const thumbnailUrl = book.volumeInfo.imageLinks && book.volumeInfo.imageLinks.thumbnail || 'img/unavailable.png';
  
        // Manipulation de la chaîne de caractères "description" pour la mettre en forme et la tronquer
        const formattedDescription = formatText(description);
        shortDescription = truncateText(formattedDescription, 200);
  
        // Préparation de l'alerte de succès
        const successMessage = document.getElementById('alert');
        successMessage.setAttribute("class", "success");
        successMessage.textContent = "RESULTATS DE RECHERCHE"
  
        // Création de l'affichage de toutes les occurrences de résultat
        const articleElement = document.createElement('div');
        articleElement.classList.add('bookbox');
        articleElement.innerHTML = `
          <div>
            <i class= "fa-regular fa-bookmark listensavebook" id="${id}"></i>
          </div>
          <p class="booktitle">Titre : ${title}</p>
          <p class="bookid">Id : ${id}</p>
          <p class="bookauthor">Auteur: ${authors}</p>
          <p class="bookdescription">Description : ${shortDescription}</p>
          <div class="bookcover">     
            <img src="${thumbnailUrl}" alt="Thumbnail">
          </div>
          <p class="error" id="alert_${id}"></p>
        `;
        resultsDiv.appendChild(articleElement);
  
        // Ajout d'un auditeur d'événements au clic sur l'icône
        const iconElement = articleElement.querySelector('.listensavebook');
        iconElement.addEventListener('click', function () {
          saveBook(id, title, authors, shortDescription, thumbnailUrl);
        });
  
        // Définition de l'icône favori
        const storedBookJSON = sessionStorage.getItem("APIGB" + id);
        if (storedBookJSON) {
          const changeIcon = document.getElementById(id);
          changeIcon.setAttribute("class", "fa-solid fa-bookmark");
        }
      });
    } else {
      // Préparation de l'alerte d'alerte d'échec
      const errorMessage = document.getElementById('alert');
      errorMessage.setAttribute("class", "error");
      errorMessage.textContent = "Aucun livre trouvé";
    }
  }
  
  // Annulation de la recherche
  function cancelSearch() {
    document.addEventListener("DOMContentLoaded", function () {
      document.getElementById("cancel").onclick = function () {
        window.location.reload();
      }
    });
  }
  
  cancelSearch();
  
  // Fonction pour sauvegarder le livre en sessionStorage
  function saveBook(id, title, authors, shortDescription, thumbnailUrl) {
    // Vérifier si le livre est déjà enregistré dans sessionStorage
    const storedBookJSON = sessionStorage.getItem("APIGB" + id);
  
    if (storedBookJSON) {
      // Le livre est déjà dans sessionStorage, on affiche une alerte
      const errorStorageMessage = document.getElementById('alert_' + id);
      errorStorageMessage.textContent = "Ce livre est déjà dans votre Poch List";
  
      // On attend 5 secondes puis on retire l'alerte
      setTimeout(function () {
        errorStorageMessage.textContent = "";
      }, 5000);
    } else {
      // Création de l'objet qui représente le livre
      const bookInfo = {
        id,
        title,
        authors,
        shortDescription,
        thumbnailUrl,
      };
  
      // Je convertis l'objet en chaîne JSON
      const bookInfoJSON = JSON.stringify(bookInfo);
  
      // Stockage du livre et de ces infos en sessionStorage (clé = ("APIGB"+id), les infos en Json)
      sessionStorage.setItem("APIGB" + id, bookInfoJSON);
  
      // Je modifie l'icône favori de mon élément pour indiquer que le livre est enregistré
      const changeIcon = document.getElementById(id);
      changeIcon.setAttribute("class", "fa-solid fa-bookmark");
  
      sessionStorageDisplay();
    }
  }
  
  // Fonction pour supprimer le livre du sessionStorage
  function eraseBook() {
    document.getElementById('storageResults').addEventListener('click', function (event) {
      // En attente d'un clic sur un élément qui porte la classe css 'eraseBook'
      if (event.target.classList.contains('eraseBook')) {
        const bookId = event.target.dataset.bookid;
        // Suppression de l'élément du session storage
        sessionStorage.removeItem("APIGB" + bookId);
  
        // Modification de l'icône de l'élément s'il est présent dans les résultats de recherche et en cas de nouvelle recherche
        const changeIcon = document.getElementById(bookId);
        if (changeIcon) {
          changeIcon.setAttribute("class", "fa-regular fa-bookmark");
        }
        // Appel de la fonction pour MAJ du bloc 
        sessionStorageDisplay();
      }
    })
  }
  
  eraseBook();
  