// Fetching data using fetch and async/await
const fetchData = async () => {
  try {
    const response = await fetch('http://localhost:3000/cryptodata.json'); // Fetch data from local JSON file
    const json = await response.json();
    return json; // Return the entire JSON data from the file
  } catch (error) {
    console.error('Error fetching data:', error);
    return [];
  }
};

// Function to filter and display cryptocurrency data
const displayCryptoData = async () => {
  const jsonData = await fetchData();

  const itemsToDisplay = ["BTC", "ETH", "XRP", "LTC", "BCH"];
  const filteredData = jsonData.filter(item => itemsToDisplay.includes(item.symbol));

  const items = filteredData.map(item => {
    const percentageCls = item.percent_change_24h >= 0 ? "up" : "down";
    return `<li id='${item.symbol}'><div class='title'><span class='ico ${item.symbol.toLowerCase()}'>.</span>${item.symbol} <span class='type'>${item.name}</span></div><div class='amount'>$${item.price_usd}</div><div class='precentage ${percentageCls}'>${item.percent_change_24h}%</div></li>`;
  });

  const ulElement = document.createElement('ul');
 ulElement.classList.add('crypto');
 ulElement.innerHTML = items.join("");
  document.querySelector('div.crypto-holder').appendChild(ulElement);
};

// Event listeners with modern JavaScript
document.addEventListener('DOMContentLoaded', () => {
	
	displayCryptoData();
  const emailInput = document.querySelector('input[type="email"]');
  const passwordInput = document.querySelector('input[type="password"]');
  const submitButton = document.getElementById('btnsubmit');

  emailInput.addEventListener('keyup', () => {
    const emailValue = emailInput.value;
    const isValidEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(emailValue);
    document.getElementById('emailerr').classList.toggle('show', !isValidEmail);
  });

  passwordInput.addEventListener('keyup', () => {
    const passwordValue = passwordInput.value;
    const length = passwordValue.length >= 10 && passwordValue.length <= 15;
    const hasNumber = /\d/.test(passwordValue);
    const hasLowercase = /[a-z]/.test(passwordValue);
    const hasUppercase = /[A-Z]/.test(passwordValue);
    const hasSpecialChars = /[!@#$^&*()_+\-\[\]\\|,.\/?]/.test(passwordValue);

    document.getElementById('criterialength').classList.toggle('good', length);
    document.getElementById('criterialength').classList.toggle('bad', !length);
    document.getElementById('criterianum').classList.toggle('good', hasNumber);
    document.getElementById('criterianum').classList.toggle('bad', !hasNumber);
    document.getElementById('criterialow').classList.toggle('good', hasLowercase);
    document.getElementById('criterialow').classList.toggle('bad', !hasLowercase);
    document.getElementById('criteriaupper').classList.toggle('good', hasUppercase);
    document.getElementById('criteriaupper').classList.toggle('bad', !hasUppercase);
    document.getElementById('criteriaspecial').classList.toggle('good', hasSpecialChars);
    document.getElementById('criteriaspecial').classList.toggle('bad', !hasSpecialChars);

    submitButton.classList.toggle('disabled', !(length && hasNumber && hasLowercase && hasUppercase && hasSpecialChars));
	 submitButton.addEventListener('click', (event) => {
    event.preventDefault();
    document.querySelector('.success').classList.add('show');
  });
	
  });

 

  const imgList = document.getElementById('imgList');
  const scrollRight = document.getElementById('scroll-right');
  const scrollLeft = document.getElementById('scroll-left');
  

  scrollRight.addEventListener('click', () => {
    imgList.scrollBy(250, 0);
  });
  
  scrollLeft.addEventListener('click', () => {
    imgList.scrollBy(-250, 0);
  });
});