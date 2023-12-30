# Poch'Lib

Poch'Lib est une application qui permet à l'utilisateur de rechercher des sélections de livres. Elle permet aussi de garder en mémoire les livres désirés afin de pouvoir les retirer en librairie “La Plume enchantée” plus tard. 

## Prérequis applicatifs

- Installer Git Bash ou un autre terminal de commande pour cloner le projet Git.
- Installer Visual Studio Code pour visualiser ou modifier les fichiers du projet
- Installer l'extension Live Server pour Visual Studio Code pour exécuter l'application
- Installer l'extension Live Sass Compiler pour compiler en live les modifications de style

## Mode opératoire d'installation

- Exécuter Git Bash et cloner le projet git
- Url du projet à cloner : https://github.com/OCslozier/pochlist.git
- Ouvrir le projet cloné dans Visual Studio Code

## Démarrage de l'application

1. Sélectionner le fichier index.html et l'ouvrir avec Live Server (en cliquant droit) ou bien cliquer sur "Go Live" en bas à droite de l'écran
2. L'application se lance
3. Cliquer sur le bouton "Ajouter un livre" pour afficher le formulaire de recherche
4. Saisir un titre et un auteur et lancer la recherche en cliquant sur le bouton "Rechercher"
5. Si votre requête aboutie, une liste de 10 livres maximum s'affiche à l'écran
6. Le clic sur l'icône "favori" enregistre le livre et modifie l'icône favori
7. Vous retrouvez le livre enregistré en bas de page
8. Sur le livre enregistré, au clic sur l'icône "corbeille" le livre est supprimé de de votre Poch'Liste
9. Le bouton "annuler" reinitialise la page sans supprimer vos livres mémorisés

## Règles d'exception

1. Ne pas saisir d'information dans le formulaire de recherche avant de l'exécuter provoque l'affichage d'une alerte
2. Saisir des informations introuvables (dans GoogleBook) dans le formulaire de recherche lors de son exécution provoque l'affichage d'une autre alerte
3. Tenter d'enregistrer deux fois le même livre dans la Poch'liste provoque l'affichage d'une alerte temporaire
4. Un livre déjà en mémoire et recherché une seconde fois apparaitra comme déjà enregistré sur la page qui retourne les résultats de recherche (icône "favori")

## Développeur

Sébastien Lozier pour OpenClassRoom (Projet N°6)


