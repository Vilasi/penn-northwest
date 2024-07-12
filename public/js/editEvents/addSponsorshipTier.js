//* This file adds new sponsorship buttons to the event editing page
// It also allows the deletion of extant sponsorship tiers
const addTierButton = document.querySelector('#addSponsorshipButton');
const sponsorshipAppendingDiv = document.querySelector(
  '#sponsorshipAppendingDiv'
);

const extantTiersContainer = document.querySelector('#extantTiersContainer');
const extantTiers = document.querySelectorAll('.extantTiers');

let divId = extantTiers.length;
addTierButton.addEventListener('click', () => {
  const sponsorshipMarkupRow = `<div class="mb-3 col-lg-4"><label for="date" class="form-label">Tier Name</label><input required class="w-100 form-control" type="text" name="event[tierNames]"/></div><div class="mb-3 col-lg-4"><label for="time" class="form-label">Tier Price</label><input required class="form-control" name="event[tierPrices]" type="number" min="0" step="0.01"/></div><div class="mb-3 col-lg-3"><label for="tierTicketsIncluded" class="form-label">Tickets Included</label><input required class="form-control" name="event[tierTicketsIncluded]" type="number" min="0" step="1"/></div><div class="mb-3 col-lg-1 d-flex flex-column align-items-end justify-content-end"><button data-delete-tierId="${divId}" class="btn btn-sm btn-danger sponsorshipTierDeleteButton" type="button">X</button></div>`;
  const div = document.createElement('div');
  div.classList.add('row', 'col-lg-12');
  div.setAttribute('data-tierid', divId);
  div.innerHTML = sponsorshipMarkupRow;
  sponsorshipAppendingDiv.append(div);
  divId += 1;
});

sponsorshipAppendingDiv.addEventListener('click', (e) => {
  if (e.target.classList.contains('sponsorshipTierDeleteButton')) {
    const deletionTargetId = e.target.dataset.deleteTierid;
    for (let div of sponsorshipAppendingDiv.children) {
      if (div.dataset.tierid === deletionTargetId) {
        div.remove();
      }
    }
  }
});
extantTiersContainer.addEventListener('click', (e) => {
  if (e.target.classList.contains('sponsorshipTierDeleteButton')) {
    const deletionTargetId = e.target.dataset.deleteTierid;
    for (let div of extantTiersContainer.children) {
      if (div.dataset.tierid === deletionTargetId) {
        div.remove();
      }
    }
  }
});
