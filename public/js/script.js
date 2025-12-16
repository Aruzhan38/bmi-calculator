document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector("form");
    const weightInput = document.querySelector('input[name="weight"]');
    const heightInput = document.querySelector('input[name="height"]');

    form.addEventListener("submit", (event) => {
        const weight = parseFloat(weightInput.value);
        const height = parseFloat(heightInput.value);

        if (
            isNaN(weight) || isNaN(height) || weight <= 0 || height <= 0
        ) {
            event.preventDefault();
            alert("Please enter positive numbers for weight and height.");
        }
    });
});
