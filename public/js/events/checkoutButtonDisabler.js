//* This file disables the checkout button until the user has selected at least one ticket or sponsorship tier at paid checkout
const checkoutForms = document.querySelectorAll('.checkoutForm');
const sponsorshipTierSelects = document.querySelectorAll(
  '.sponsorhipTierSelects'
);
const ticketNumberInputs = document.querySelectorAll('.ticketNumberInputs');
const checkoutButtons = document.querySelectorAll('.paidEventCheckoutButtons');

// This disables/enables the checkout button based on the sponsorship tier select
for (let select of sponsorshipTierSelects) {
  select.addEventListener('input', (e) => {
    console.log(e);
    console.log(e.target.dataset);
    const selectId = e.target.dataset.selectId;

    const matchingButton = [...checkoutButtons].find(
      (button) => button.dataset.checkoutButtonId === selectId
    );

    const matchingTicketInput = [...ticketNumberInputs].find(
      (input) => input.dataset.ticketInputId === selectId
    );

    if (e.target.value === 'none' && matchingTicketInput.value === '0') {
      matchingButton.setAttribute('disabled', 'disabled');
    }
    if (e.target.value !== 'none' || matchingTicketInput.value !== '0') {
      matchingButton.removeAttribute('disabled');
    }
  });
}

// This disables/enables the checkout button based on the ticket input
// It also disables all checkouts at start, except for those which do not have a sponsorship tier (As the user cannot select less than one ticket on those).
for (let input of ticketNumberInputs) {
  const inputStartingValue = input.value;
  const inputId = input.dataset.ticketInputId;

  if (inputStartingValue === '0') {
    const matchingButton = [...checkoutButtons].find(
      (button) => button.dataset.checkoutButtonId === inputId
    );

    matchingButton.setAttribute('disabled', 'disabled');
  }

  input.addEventListener('input', (e) => {
    const inputId = e.target.dataset.ticketInputId;
    const matchingButton = [...checkoutButtons].find(
      (button) => button.dataset.checkoutButtonId === inputId
    );
    const matchingSelectInput = [...sponsorshipTierSelects].find(
      (select) => select.dataset.selectId === inputId
    );

    if (e.target.value === '0' && matchingSelectInput.value === 'none') {
      matchingButton.setAttribute('disabled', 'disabled');
    }
    if (e.target.value !== '0' || matchingSelectInput.value !== 'none') {
      matchingButton.removeAttribute('disabled');
    }
  });
}
