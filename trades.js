// Items JSON will populate selects
fetch('items.json')
  .then(res => res.json())
  .then(items => {
    const offerSelect = document.getElementById('offerItems');
    const wantSelect = document.getElementById('wantItems');
    items.forEach(item => {
      const option1 = document.createElement('option');
      option1.value = item.name;
      option1.textContent = item.name;
      offerSelect.appendChild(option1);

      const option2 = document.createElement('option');
      option2.value = item.name;
      option2.textContent = item.name;
      wantSelect.appendChild(option2);
    });
  });

const form = document.getElementById('tradeForm');
const tradeGrid = document.getElementById('tradeGrid');

form.addEventListener('submit', e => {
  e.preventDefault();

  const username = document.getElementById('username').value;
  const payment = document.getElementById('payment').value;
  const offerItems = Array.from(document.getElementById('offerItems').selectedOptions).map(opt => opt.value);
  const wantItems = Array.from(document.getElementById('wantItems').selectedOptions).map(opt => opt.value);

  // 24h cooldown check using localStorage
  const key = 'trade-' + username;
  const lastTrade = localStorage.getItem(key);
  if (lastTrade && Date.now() - lastTrade < 86400000) {
    alert('You can only post once every 24 hours!');
    return;
  }
  localStorage.setItem(key, Date.now());

  const card = document.createElement('div');
  card.classList.add('trade-card');
  card.innerHTML = `
    <h3>${username}</h3>
    <p>Payment: ${payment}</p>
    <p>Offer: ${offerItems.join(', ') || 'None'}</p>
    <p>Want: ${wantItems.join(', ') || 'Diamonds'}</p>
  `;
  tradeGrid.appendChild(card);
  form.reset();
});