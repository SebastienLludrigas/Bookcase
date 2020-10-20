// Toggle du formulaire au click sur le bouton Ajouter/Annuler
const monForm = document.querySelector('#ajoutForm');

const monButton = document.querySelector('#monButton');

const toggleForm = () => {
   monForm.classList.toggle('d-none');
   monForm.className === 'd-none' ? monButton.textContent = 'Ajouter' : monButton.textContent = 'Annuler'; 
   // document.querySelector('#modifLivre').className = 'd-none';
}

// Bricolage pour faire disparaitre le alert-success de suppression d'un livre au bout de 3 secondes sans avoir besoin de recharger
const hideModalDeleteInfo = () => {
   const modal = document.querySelector('#modalInfo');

   if (modal) {
      setTimeout(() => {
         modal.className = 'd-none';
      }, 3000);
   }
}

hideModalDeleteInfo();