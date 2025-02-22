const cardNumInput = document.querySelector("#cardNum");
const cvvInput = document.querySelector("#cvv");
const visaIcon = document.querySelector("#visaIcon");
const mastercardIcon = document.querySelector("#mastercardIcon");

// Function to detect card type based on the card number
function detectCardType(cardNumber) {
  // Visa: Starts with 4, length 16
  if (cardNumber.startsWith("4") && cardNumber.length === 16) {
    visaIcon.style.display = "inline-block";
    mastercardIcon.style.display = "none";
  }
  // Mastercard: Starts with 5 or 2, length between 13 and 19
  else if ((cardNumber.startsWith("5") || cardNumber.startsWith("2")) && cardNumber.length >= 13 && cardNumber.length <= 19) {
    mastercardIcon.style.display = "inline-block";
    visaIcon.style.display = "none";
  } else {
    visaIcon.style.display = "none";
    mastercardIcon.style.display = "none";
  }
}

// Card Number Input Validation and Icon Toggle
cardNumInput.addEventListener("input", function (e) {
  // Remove non-numeric characters
  e.target.value = e.target.value.replace(/\D/g, "").slice(0, 19);

  // Detect the card type after the input
  detectCardType(e.target.value);
});

// CVV Input Validation (Only 3 digits allowed)
cvvInput.addEventListener("input", function (e) {
  e.target.value = e.target.value.replace(/\D/g, "").slice(0, 3); // Allow only digits and limit to 3 digits
});

// Handle Paste Events for Card Number and CVV
[cardNumInput, cvvInput].forEach((input) => {
  input.addEventListener("paste", function (e) {
    e.preventDefault(); // Prevent default paste behavior
    let pastedData = (e.clipboardData || window.clipboardData).getData("text").replace(/\D/g, ""); // Clean pasted data

    if (input === cardNumInput) {
      input.value = pastedData.slice(0, 19); // Limit to 19 characters
      // Detect the card type after pasting
      detectCardType(input.value);
    } else if (input === cvvInput) {
      input.value = pastedData.slice(0, 3); // Limit to 3 characters
    }
  });
});
