"use strict";

// Sélection des éléments
const metric = document.getElementById("metric");
const imperial = document.getElementById("imperial");
const button = document.querySelector(".bmi-calculator__cta");
const resultBMI = document.querySelector(".bmi-calculator__result");
const valueBMI = document.querySelector(".bmi-calculator__result-value");
const formGroupOne = document.querySelector(".bmi-calculator__form-group-1");
const formGroupTwo = document.querySelector(".bmi-calculator__form-group-2");
const imperialClass = document.querySelector(".imperial");
const buttonMetricImperial = document.querySelector(
  ".bmi-calculator__form-group-metric-imperial"
);
const infosBMI = document.querySelector(".bmi-calculator__infos");

// Éléments pour le calcul métrique
const metricHeightCm = document.getElementById("height-cm");
const metricWeightKg = document.getElementById("weight-kg");

// Éléments pour le calcul impérial
const metricHeightFt = document.getElementById("height-ft");
const metricHeightIn = document.getElementById("height-in");
const metricWeightSt = document.getElementById("weight-st");
const metricWeightLbs = document.getElementById("weight-lbs");

// Fonction de calcul IMC métrique
const calculateMetricIMC = function (height, weight) {
  const heightInMeters = height / 100;
  return weight / heightInMeters ** 2;
};

// Fonction de calcul IMC impérial
const calculateImperialIMC = function (feet, inches, stone, pounds) {
  const meter = feet * 0.3048 + inches * 0.0254;
  const kg = stone * 6.35029 + pounds * 0.453592;
  return kg / meter ** 2;
};

// Basculer entre les systèmes métrique et impérial
metric.addEventListener("click", function () {
  formGroupOne.classList.remove("hidden");
  formGroupTwo.classList.add("hidden");
  imperialClass.classList.remove("imperial-active");
  // Réinitialiser les champs de saisie
  metricHeightCm.value = "";
  metricWeightKg.value = "";
});

imperial.addEventListener("click", function () {
  formGroupOne.classList.add("hidden");
  formGroupTwo.classList.remove("hidden");
  imperialClass.classList.add("imperial-active");
  // Réinitialiser les champs de saisie
  metricHeightFt.value = "";
  metricHeightIn.value = "";
  metricWeightSt.value = "";
  metricWeightLbs.value = "";
});

// poids idéal
function calculateHealthyWeightRange(heightInMeters) {
  const lowerBoundIMC = 18.5;
  const upperBoundIMC = 24.9;

  let minHealthyWeight = lowerBoundIMC * heightInMeters ** 2;
  let maxHealthyWeight = upperBoundIMC * heightInMeters ** 2;

  return { minHealthyWeight, maxHealthyWeight };
}

// Calcul et affichage de l'IMC
button.addEventListener("click", function () {
  let imc;
  let heightInMeters;

  if (!formGroupOne.classList.contains("hidden")) {
    const heightValue = parseFloat(metricHeightCm.value);
    const weightValue = parseFloat(metricWeightKg.value);
    heightInMeters = heightValue / 100; // Convertissez la hauteur en mètres pour le calcul
    imc = calculateMetricIMC(heightValue, weightValue);
  } else {
    const heightFtValue = parseFloat(metricHeightFt.value);
    const heightInValue = parseFloat(metricHeightIn.value);
    heightInMeters = heightFtValue * 0.3048 + heightInValue * 0.0254; // Convertissez la hauteur en mètres pour le calcul
    const weightStValue = parseFloat(metricWeightSt.value);
    const weightLbsValue = parseFloat(metricWeightLbs.value);
    imc = calculateImperialIMC(
      heightFtValue,
      heightInValue,
      weightStValue,
      weightLbsValue
    );
  }

  if (!isNaN(imc)) {
    const { minHealthyWeight, maxHealthyWeight } =
      calculateHealthyWeightRange(heightInMeters);
    button.classList.add("hidden");
    resultBMI.classList.remove("hidden");
    valueBMI.textContent = imc.toFixed(2);
    infosBMI.textContent = `Your BMI suggests you're ${
      imc > 18.5 && imc < 24.9 ? "healthy weight" : "not healthy weight."
    } Your ideal weight is between ${minHealthyWeight.toFixed(
      2
    )}kgs - ${maxHealthyWeight.toFixed(2)}kgs`;

    // Optionnel : Réinitialiser tous les champs de saisie après l'affichage du résultat
    metricHeightCm.value = "";
    metricWeightKg.value = "";
    metricHeightFt.value = "";
    metricHeightIn.value = "";
    metricWeightSt.value = "";
    metricWeightLbs.value = "";
  } else {
    alert("Veuillez entrer des valeurs valides pour la hauteur et le poids.");
  }
});
