/* =========================================

   CONCRETE BASE PROJECT PLANNER

   Reusable JS Logic

========================================= */

document.addEventListener("DOMContentLoaded", function () {

  const button = document.getElementById("cbp-calculate");

  const results = document.getElementById("cbp-results");

  if (!button || !results) return;

  const structureAdvice = {

    shed: "Check the shed manufacturer's foundation requirements before finalising the base.",

    cabin: "Garden rooms and log cabins may have specific loading and foundation requirements set by the supplier.",

    garage: "Garage and workshop floors may need a slab designed for vehicle loads or heavy equipment.",

    commercial: "Commercial and industrial structures require a foundation design based on actual structural loads and ground conditions.",

    other: "Confirm the intended structure's weight, loading and foundation requirements."

  };

  const groundAdvice = {

    level: "Even on level ground, suitable excavation, sub-base preparation and drainage still need consideration.",

    uneven: "Uneven or sloping ground may require additional excavation, levelling or suitable edge support.",

    soft: "Soft or uncertain ground needs assessment before the foundation construction can be specified."

  };

  const accessAdvice = {

    clear: "Clear side access may make excavation and concrete delivery more straightforward.",

    narrow: "Narrow access, steps or obstacles can affect how excavation materials are removed and concrete is delivered.",

    house: "Access through the property requires careful planning to protect internal surfaces and move materials safely.",

    open: "Open site access may allow machinery, larger deliveries and more efficient material movement."

  };

  button.addEventListener("click", function () {

    const lengthInput = document.getElementById("cbp-length").value;

    const widthInput = document.getElementById("cbp-width").value;

    const length = Number(lengthInput);

    const width = Number(widthInput);

    const ground = document.getElementById("cbp-ground").value;

    const structure = document.getElementById("cbp-structure").value;

    const access = document.getElementById("cbp-access").value;

    results.hidden = false;

    if (

      lengthInput.trim() === "" ||

      widthInput.trim() === "" ||

      !Number.isFinite(length) ||

      !Number.isFinite(width) ||

      length <= 0 ||

      width <= 0 ||

      length > 100 ||

      width > 100

    ) {

      results.textContent =

        "Please enter valid length and width measurements between 0 and 100 metres.";

      return;

    }

    // Geometric calculations

    const area = length * width;

    // Illustrative volume range at 100mm and 150mm

    const volume100 = area * 0.10;

    const volume150 = area * 0.15;

    results.innerHTML = `

      <h3>Your Project Overview</h3>

      <p class="cbp-result-intro">

        Based on your ${length}m × ${width}m concrete base.

      </p>

      <div class="cbp-stats">

        <div class="cbp-stat">

          <span class="cbp-stat-label">Base Area</span>

          <strong class="cbp-stat-value">

            ${area.toFixed(2)} m²

          </strong>

        </div>

        <div class="cbp-stat">

          <span class="cbp-stat-label">

            Illustrative Concrete Volume

          </span>

          <strong class="cbp-stat-value">

            ${volume100.toFixed(2)}–${volume150.toFixed(2)} m³

          </strong>

        </div>

      </div>

      <h4 class="cbp-advice-title">

        What This Means For Your Project

      </h4>

      <ul class="cbp-advice-list">

        <li>${structureAdvice[structure]}</li>

        <li>${groundAdvice[ground]}</li>

        <li>${accessAdvice[access]}</li>

      </ul>

      <p class="cbp-disclaimer">

        Concrete volume is an illustrative calculation using

        100–150mm slab thicknesses, not a recommended design.

        Actual thickness, reinforcement and construction method

        depend on loading requirements, ground conditions and

        site assessment.

      </p>

    `;

    results.scrollIntoView({

      behavior: "smooth",

      block: "nearest"

    });

  });

});
