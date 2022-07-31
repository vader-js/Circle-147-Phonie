let input = document.querySelector(".input");
let zip = document.querySelector("#zip");
let carrier = document.querySelector("#carrier");
let p = document.querySelector("p");

// regex object for phone numbers
const pattern = {
  countryCodeRegex: /(^\+{1}\d{3})/,
  vendorPrefixesRegex: /(\d{3})/,
  regularNumRegex: /(\d{7})/,
  countryCodes: [+234, +233, +254],
  vendorPrefixes: {
    mtn: [
      "803",
      "806",
      "814",
      "810",
      "813",
      "814",
      "816",
      "703",
      "706",
      "704",
      "903",
      "906"
    ],
    etisalat: ["809", "817", "818", "908", "909"],
    glo: ["805", "807", "811", "815", "705", "905"],
    airtel: ["802", "808", "812", "708", "701", "902", "901", "907"],
  }
};

let inputPattern = new RegExp(
  pattern.countryCodeRegex.source +
  "" +
  pattern.vendorPrefixesRegex.source +
  "" +
  pattern.regularNumRegex.source
);
// console.log(inputPattern.global);

input.setAttribute("pattern", inputPattern);

input.addEventListener("keyup", (e) => {
  let inputValue = e.target.value;

  // check if the country code provided matches any of country code we have
  // and display the country's icon if it matches

  zip.src = "";
  zip.classList.remove("svg");

  pattern.countryCodes.forEach((countryCode) => {
    // console.log(inputValue.indexOf(countryCode))
    // added an if statement to check the first occurence of countryCode
    if (inputValue.indexOf(countryCode) == 1) {
      if (inputValue.match(countryCode)) {
        switch (countryCode) {
          case +234:
            zip.src = "nigeria.svg";
            zip.classList.add("svg");
            break;
          case +233:
            zip.src = "ghana.svg";
            zip.classList.add("svg");
            break;
          case +254:
            zip.src = "kenya.svg";
            zip.classList.add("svg");
            break;
          default:
            zip.src = "";
            zip.classList.remove("svg");
        }
      }
    }
  });
  // check if the vendor prefix provided matches any of vendor prefixes we have
  // and display the carrier's icon if it matches
  carrier.src = "";
  carrier.classList.remove("svg");
  Object.keys(pattern.vendorPrefixes).forEach((carriers) => {
    pattern.vendorPrefixes[carriers].forEach((vendorPrefix) => {
      if (inputValue.match(vendorPrefix)) {
        console.log(inputValue.indexOf(vendorPrefix));
        // added an if statement to check the first occurence of vendorPrefix
        if (inputValue.indexOf(vendorPrefix) == 1 || inputValue.indexOf(vendorPrefix) == 4) {
          switch (carriers) {
            case "mtn":
              carrier.src = "mtn.svg";
              carrier.classList.add("svg");
              break;
            case "etisalat":
              carrier.src = "9mobile.svg";
              carrier.classList.add("svg");
              break;
            case "airtel":
              carrier.src = "airtel.svg";
              carrier.classList.add("svg");
              break;
            case "glo":
              carrier.src = "glo.svg";
              carrier.classList.add("svg");
              break;
            default:
              carrier.src = "";
              carrier.classList.remove("svg");
          }
        }
        // console.log(vendorPrefix);

      }
    });
  });

  // console.log(inputPattern);
  if (inputValue.length == 11 || inputValue.length == 14) {
    if (inputValue.match(inputPattern)) {
    p.innerHTML = "";

    }
  } else {
    p.innerHTML = "invalid phone number";
  }
  pattern.countryCodes.forEach((countryCodeCheck) => {
    if (inputValue.indexOf(countryCodeCheck) == -1) {
      if (inputValue.length > 11) {
        p.innerHTML = "invalid phone number";
      }
    }
  });

  if (inputValue.length === 0) {
    p.innerHTML = "";
  }
})
