// ---------- Theme toggle ----------
document.addEventListener("DOMContentLoaded", () => {
  const savedTheme = localStorage.getItem("geoquiz-theme");
  if (savedTheme === "light") {
    document.body.classList.add("light");
  }

  const toggleBtn = document.getElementById("themeToggle");
  if (toggleBtn) {
    toggleBtn.addEventListener("click", () => {
      document.body.classList.toggle("light");
      const mode = document.body.classList.contains("light") ? "light" : "dark";
      localStorage.setItem("geoquiz-theme", mode);
      toggleBtn.innerHTML = mode === "light"
        ? "🌙 Dark"
        : "☀️ Light";
    });
    // init label
    toggleBtn.innerHTML = document.body.classList.contains("light")
      ? "🌙 Dark"
      : "☀️ Light";
  }

  // If this page is a quiz page (has data-mode)
  const mode = document.body.dataset.mode;
  if (mode) {
    initQuiz(mode);
  }
});

// ---------- Data: capitals ----------
const capitals = {
  "Afghanistan":"Kabul","Albania":"Tirana","Algeria":"Algiers","Andorra":"Andorra la Vella",
  "Angola":"Luanda","Antigua and Barbuda":"St. John's","Argentina":"Buenos Aires","Armenia":"Yerevan",
  "Australia":"Canberra","Austria":"Vienna","Azerbaijan":"Baku","Bahamas":"Nassau","Bahrain":"Manama",
  "Bangladesh":"Dhaka","Barbados":"Bridgetown","Belarus":"Minsk","Belgium":"Brussels","Belize":"Belmopan",
  "Benin":"Porto-Novo","Bhutan":"Thimphu","Bolivia":"Sucre","Bosnia and Herzegovina":"Sarajevo",
  "Botswana":"Gaborone","Brazil":"Brasilia","Brunei":"Bandar Seri Begawan","Bulgaria":"Sofia",
  "Burkina Faso":"Ouagadougou","Burundi":"Gitega","Cambodia":"Phnom Penh","Cameroon":"Yaounde",
  "Canada":"Ottawa","Cape Verde":"Praia","Central African Republic":"Bangui","Chad":"N'Djamena",
  "Chile":"Santiago","China":"Beijing","Colombia":"Bogota","Comoros":"Moroni","Congo":"Brazzaville",
  "Costa Rica":"San Jose","Croatia":"Zagreb","Cuba":"Havana","Cyprus":"Nicosia","Czech Republic":"Prague",
  "Denmark":"Copenhagen","Djibouti":"Djibouti","Dominica":"Roseau","Dominican Republic":"Santo Domingo",
  "Ecuador":"Quito","Egypt":"Cairo","El Salvador":"San Salvador","Equatorial Guinea":"Malabo",
  "Eritrea":"Asmara","Estonia":"Tallinn","Eswatini":"Mbabane","Ethiopia":"Addis Ababa","Fiji":"Suva",
  "Finland":"Helsinki","France":"Paris","Gabon":"Libreville","Gambia":"Banjul","Georgia":"Tbilisi",
  "Germany":"Berlin","Ghana":"Accra","Greece":"Athens","Grenada":"St. George's","Guatemala":"Guatemala City",
  "Guinea":"Conakry","Guinea-Bissau":"Bissau","Guyana":"Georgetown","Haiti":"Port-au-Prince",
  "Honduras":"Tegucigalpa","Hungary":"Budapest","Iceland":"Reykjavik","India":"New Delhi",
  "Indonesia":"Jakarta","Iran":"Tehran","Iraq":"Baghdad","Ireland":"Dublin","Israel":"Jerusalem",
  "Italy":"Rome","Jamaica":"Kingston","Japan":"Tokyo","Jordan":"Amman","Kazakhstan":"Nur-Sultan",
  "Kenya":"Nairobi","Kiribati":"Tarawa","Kuwait":"Kuwait City","Kyrgyzstan":"Bishkek","Laos":"Vientiane",
  "Latvia":"Riga","Lebanon":"Beirut","Lesotho":"Maseru","Liberia":"Monrovia","Libya":"Tripoli",
  "Liechtenstein":"Vaduz","Lithuania":"Vilnius","Luxembourg":"Luxembourg","Madagascar":"Antananarivo",
  "Malawi":"Lilongwe","Malaysia":"Kuala Lumpur","Maldives":"Male","Mali":"Bamako","Malta":"Valletta",
  "Marshall Islands":"Majuro","Mauritania":"Nouakchott","Mauritius":"Port Louis","Mexico":"Mexico City",
  "Micronesia":"Palikir","Moldova":"Chisinau","Monaco":"Monaco","Mongolia":"Ulaanbaatar",
  "Montenegro":"Podgorica","Morocco":"Rabat","Mozambique":"Maputo","Myanmar":"Naypyidaw",
  "Namibia":"Windhoek","Nauru":"Yaren","Nepal":"Kathmandu","Netherlands":"Amsterdam",
  "New Zealand":"Wellington","Nicaragua":"Managua","Niger":"Niamey","Nigeria":"Abuja",
  "North Macedonia":"Skopje","Norway":"Oslo","Oman":"Muscat","Pakistan":"Islamabad","Palau":"Ngerulmud",
  "Palestine":"Jerusalem","Panama":"Panama City","Papua New Guinea":"Port Moresby","Paraguay":"Asuncion",
  "Peru":"Lima","Philippines":"Manila","Poland":"Warsaw","Portugal":"Lisbon","Qatar":"Doha",
  "Romania":"Bucharest","Russia":"Moscow","Rwanda":"Kigali","Saint Kitts and Nevis":"Basseterre",
  "Saint Lucia":"Castries","Saint Vincent and the Grenadines":"Kingstown","Samoa":"Apia",
  "San Marino":"San Marino","Sao Tome and Principe":"Sao Tome","Saudi Arabia":"Riyadh","Senegal":"Dakar",
  "Serbia":"Belgrade","Seychelles":"Victoria","Sierra Leone":"Freetown","Singapore":"Singapore",
  "Slovakia":"Bratislava","Slovenia":"Ljubljana","Solomon Islands":"Honiara","Somalia":"Mogadishu",
  "South Africa":"Pretoria","South Sudan":"Juba","Spain":"Madrid","Sri Lanka":"Colombo",
  "Sudan":"Khartoum","Suriname":"Paramaribo","Sweden":"Stockholm","Switzerland":"Bern",
  "Syria":"Damascus","Tajikistan":"Dushanbe","Tanzania":"Dodoma","Thailand":"Bangkok","Togo":"Lome",
  "Tonga":"Nukuʻalofa","Trinidad and Tobago":"Port of Spain","Tunisia":"Tunis","Turkey":"Ankara",
  "Turkmenistan":"Ashgabat","Tuvalu":"Funafuti","Uganda":"Kampala","Ukraine":"Kyiv",
  "United Arab Emirates":"Abu Dhabi","United Kingdom":"London","United States":"Washington D.C.",
  "Uruguay":"Montevideo","Uzbekistan":"Tashkent","Vanuatu":"Port Vila","Vatican":"Vatican",
  "Venezuela":"Caracas","Vietnam":"Hanoi","Zambia":"Lusaka","Zimbabwe":"Harare"
};

// ---------- Continents ----------
const continentLists = {
  world: Object.keys(capitals),

  europe: [
    "Albania","Andorra","Armenia","Austria","Azerbaijan","Belarus","Belgium","Bosnia and Herzegovina",
    "Bulgaria","Croatia","Cyprus","Czech Republic","Denmark","Estonia","Finland","France","Georgia",
    "Germany","Greece","Hungary","Iceland","Ireland","Italy","Kazakhstan","Kosovo", // if you want you can add
    "Latvia","Liechtenstein","Lithuania","Luxembourg","Malta","Moldova","Monaco","Montenegro","Netherlands",
    "North Macedonia","Norway","Poland","Portugal","Romania","Russia","San Marino","Serbia","Slovakia",
    "Slovenia","Spain","Sweden","Switzerland","Ukraine","United Kingdom","Vatican"
  ].filter(c => capitals[c]),

  asia: [
    "Afghanistan","Armenia","Azerbaijan","Bahrain","Bangladesh","Bhutan","Brunei","Cambodia","China",
    "Cyprus","Georgia","India","Indonesia","Iran","Iraq","Israel","Japan","Jordan","Kazakhstan","Kuwait",
    "Kyrgyzstan","Laos","Lebanon","Malaysia","Maldives","Mongolia","Myanmar","Nepal","North Korea",
    "Oman","Pakistan","Palestine","Philippines","Qatar","Russia","Saudi Arabia","Singapore","South Korea",
    "Sri Lanka","Syria","Taiwan","Tajikistan","Thailand","Timor-Leste","Turkey","Turkmenistan","United Arab Emirates",
    "Uzbekistan","Vietnam","Yemen"
  ].filter(c => capitals[c]),

  africa: [
    "Algeria","Angola","Benin","Botswana","Burkina Faso","Burundi","Cabo Verde","Cameroon","Central African Republic",
    "Chad","Comoros","Congo","Djibouti","Egypt","Equatorial Guinea","Eritrea","Eswatini","Ethiopia","Gabon","Gambia",
    "Ghana","Guinea","Guinea-Bissau","Ivory Coast","Kenya","Lesotho","Liberia","Libya","Madagascar","Malawi","Mali",
    "Mauritania","Mauritius","Morocco","Mozambique","Namibia","Niger","Nigeria","Rwanda","Sao Tome and Principe",
    "Senegal","Seychelles","Sierra Leone","Somalia","South Africa","South Sudan","Sudan","Tanzania","Togo","Tunisia",
    "Uganda","Zambia","Zimbabwe"
  ].filter(c => capitals[c]),

  "north-america": [
    "Antigua and Barbuda","Bahamas","Barbados","Belize","Canada","Costa Rica","Cuba","Dominica","Dominican Republic",
    "El Salvador","Grenada","Guatemala","Haiti","Honduras","Jamaica","Mexico","Nicaragua","Panama",
    "Saint Kitts and Nevis","Saint Lucia","Saint Vincent and the Grenadines","Trinidad and Tobago","United States"
  ].filter(c => capitals[c]),

  "south-america": [
    "Argentina","Bolivia","Brazil","Chile","Colombia","Ecuador","Guyana","Paraguay","Peru","Suriname","Uruguay","Venezuela"
  ].filter(c => capitals[c]),

  oceania: [
    "Australia","Fiji","Kiribati","Marshall Islands","Micronesia","Nauru","New Zealand","Palau","Papua New Guinea",
    "Samoa","Solomon Islands","Tonga","Tuvalu","Vanuatu"
  ].filter(c => capitals[c])
};

// ---------- Quiz logic ----------
let quizState = {
  countries: [],
  correctCount: 0,
  time: 20 * 60,
  timerInterval: null,
  finished: false
};

function initQuiz(mode) {
  const list = continentLists[mode] || continentLists.world;
  quizState.countries = list.slice().sort((a, b) => a.localeCompare(b));
  quizState.correctCount = 0;
  quizState.time = 20 * 60;
  quizState.finished = false;

  const totalSpan = document.getElementById("totalCount");
  if (totalSpan) totalSpan.textContent = quizState.countries.length.toString();

  buildTable();
  updateCounter();
  initTimer();
  wireButtons();
}

function buildTable() {
  const tbody = document.getElementById("quizBody");
  if (!tbody) return;
  tbody.innerHTML = "";

  quizState.countries.forEach(country => {
    const tr = document.createElement("tr");
    const tdCountry = document.createElement("td");
    const tdInput = document.createElement("td");

    tdCountry.textContent = country;

    const input = document.createElement("input");
    input.type = "text";
    input.id = "input-" + country.replace(/\s+/g, "_");
    input.autocomplete = "off";

    input.addEventListener("input", () => checkInput(country, input));

    tdInput.appendChild(input);
    tr.appendChild(tdCountry);
    tr.appendChild(tdInput);
    tbody.appendChild(tr);
  });
}

function updateCounter() {
  const counterEl = document.getElementById("counter");
  if (counterEl) {
    counterEl.textContent = `Correct answers: ${quizState.correctCount} / ${quizState.countries.length}`;
  }
}

function checkInput(country, inputEl) {
  if (quizState.finished) return;
  const userInput = inputEl.value.trim().toLowerCase();
  const correct = (capitals[country] || "").toLowerCase();

  if (!correct) return;

  if (userInput === correct) {
    if (!inputEl.disabled) {
      quizState.correctCount++;
    }
    inputEl.classList.remove("incorrect");
    inputEl.classList.add("correct");
    inputEl.value = capitals[country];
    inputEl.disabled = true;
    updateCounter();
  } else if (userInput.length > 0) {
    inputEl.classList.add("incorrect");
    inputEl.classList.remove("correct");
  } else {
    inputEl.classList.remove("incorrect");
    inputEl.classList.remove("correct");
  }
}

function initTimer() {
  const timerEl = document.getElementById("timer");
  if (!timerEl) return;

  if (quizState.timerInterval) {
    clearInterval(quizState.timerInterval);
  }

  quizState.timerInterval = setInterval(() => {
    quizState.time--;
    if (quizState.time < 0) {
      clearInterval(quizState.timerInterval);
      quizState.timerInterval = null;
      if (!quizState.finished) {
        finishQuiz(false);
      }
      return;
    }
    const minutes = Math.floor(quizState.time / 60);
    const seconds = quizState.time % 60;
    timerEl.textContent = `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
  }, 1000);
}

function wireButtons() {
  const giveUpBtn = document.getElementById("btnGiveUp");
  const resetBtn = document.getElementById("btnReset");

  if (giveUpBtn) {
    giveUpBtn.onclick = () => {
      if (!quizState.finished) finishQuiz(true);
    };
  }

  if (resetBtn) {
    resetBtn.onclick = () => {
      resetQuiz();
    };
  }
}

function finishQuiz(gaveUp) {
  quizState.finished = true;
  if (quizState.timerInterval) {
    clearInterval(quizState.timerInterval);
    quizState.timerInterval = null;
  }

  quizState.correctCount = 0;
  quizState.countries.forEach(country => {
    const inputId = "input-" + country.replace(/\s+/g, "_");
    const inputEl = document.getElementById(inputId);
    const correct = capitals[country];

    if (!inputEl) return;

    if (inputEl.value.trim().toLowerCase() === (correct || "").toLowerCase()) {
      quizState.correctCount++;
    }

    inputEl.value = correct || "";
    inputEl.disabled = true;
    inputEl.classList.remove("incorrect");
    inputEl.classList.add("correct");
  });

  updateCounter();

  const scoreEl = document.getElementById("score");
  if (scoreEl) {
    if (gaveUp) {
      scoreEl.textContent = `You gave up. All correct answers are now shown. Final score: ${quizState.correctCount} / ${quizState.countries.length}`;
    } else {
      scoreEl.textContent = `Time's up! You scored ${quizState.correctCount} / ${quizState.countries.length}.`;
    }
  }
}

function resetQuiz() {
  quizState.finished = false;
  quizState.correctCount = 0;
  quizState.time = 20 * 60;

  const scoreEl = document.getElementById("score");
  if (scoreEl) scoreEl.textContent = "";

  quizState.countries.forEach(country => {
    const inputId = "input-" + country.replace(/\s+/g, "_");
    const inputEl = document.getElementById(inputId);
    if (inputEl) {
      inputEl.value = "";
      inputEl.disabled = false;
      inputEl.classList.remove("correct");
      inputEl.classList.remove("incorrect");
    }
  });

  updateCounter();
  initTimer();
}
