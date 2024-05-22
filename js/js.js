const amountInput = document.querySelector(".text");
const peopleInput = document.querySelector(".people-input");
const tipAmount = document.querySelector(".tip-amount");
const totalAmount = document.querySelector(".total-amount");
const buttons = document.querySelectorAll(".select-btn");
const customInput = document.querySelector(".select-input");
const error = document.querySelector(".error");

let percent = "";

document.addEventListener("DOMContentLoaded", () => {
  peopleInput.addEventListener("input", () => {
    const numberPeopleValue = peopleInput.value.trim();
    const correctForm = /^[1-9][0-9]*$/;

    if (numberPeopleValue === "" || !correctForm.test(numberPeopleValue)) {
      error.classList.add("active");
    } else {
      error.classList.remove("active");
    }
  });

  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      buttons.forEach((btn) => btn.classList.remove("active-btn"));
      button.classList.add("active-btn");

      if (button.tagName === "INPUT") {
        percent = parseFloat(button.value.trim());
      } else {
        percent = parseFloat(button.textContent.trim().replace("%", ""));
      }

      calculateAmounts();
    });
  });

  customInput.addEventListener("input", () => {
    buttons.forEach((btn) => btn.classList.remove("active-btn"));
    customInput.classList.add("active-btn");

    percent = parseFloat(customInput.value.trim());
    calculateAmounts();
  });

  const calculateAmounts = () => {
    const amountValue = parseFloat(amountInput.value.trim());
    const peopleValue = parseInt(peopleInput.value.trim());

    if (
      !isNaN(amountValue) &&
      !isNaN(peopleValue) &&
      !isNaN(percent) &&
      peopleValue > 0
    ) {
      const tip = (amountValue * (percent / 100)) / peopleValue;
      const total = amountValue / peopleValue + tip;

      tipAmount.textContent = `$${tip.toFixed(2)}`;
      totalAmount.textContent = `$${total.toFixed(2)}`;
    }
  };

  amountInput.addEventListener("input", calculateAmounts);
  peopleInput.addEventListener("input", calculateAmounts);
});
