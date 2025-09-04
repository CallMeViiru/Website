let itemsList = [];

fetch('items.json')
  .then(res => res.json())
  .then(items => itemsList = items.map(i => i.name))
  .then(() => initTradeForm());

function initTradeForm() {
  const offerContainer = document.getElementById('offerContainer');
  const wantContainer = document.getElementById('wantContainer');

  function createItemRow(container) {
    const row = document.createElement('div');
    row.className = 'form-row';

    const select = document.createElement('select');
    itemsList.forEach(item => {
      const opt = document.createElement('option');
      opt.value = item;
      opt.textContent = item;
      select.appendChild(opt);
    });

    const amount = document.createElement('input');
    amount.type = 'number';
    amount.placeholder = 'Amount';
    amount.min = 1;

    const removeBtn = document.createElement('button');
    removeBtn.type = 'button';
    removeBtn.textContent = '❌';
    removeBtn.style.background = 'red';
    removeBtn.style.marginLeft = '10px';
    removeBtn.addEventListener('click', () => row.remove());

    row.appendChild(select);
    row.appendChild(amount);
    row.appendChild(removeBtn);
    container.appendChild(row);
  }

  document.getElementById('addOffer').addEventListener('click', () => createItemRow(offerContainer));
  document.getElementById('addWant').addEventListener('click', () => createItemRow(wantContainer));

  // Add initial row
  createItemRow(offerContainer);
  createItemRow(wantContainer);
}

const form = document.getElementById('tradeForm');
const tradeGrid = document.getElementById('tradeGrid');

form.addEventListener('submit', e => {
  e.preventDefault();

  const username = document.getElementById('username').value;

  // 24h cooldown check
  const key = 'trade-' + username;
  const lastTrade = localStorage.getItem(key);
  if (lastTrade && Date.now() - lastTrade < 86400000) {
    alert('You can only post once every 24 hours!');
    return;
  }
  localStorage.setItem(key, Date.now());

  const offerRows = Array.from(document.getElementById('offerContainer').children);
  const wantRows = Array.from(document.getElementById('wantContainer').children);

  const offers = offerRows.map(r => {
    const item = r.querySelector('select').value;
    const amount = r.querySelector('input').value || 1;
    return `${amount}x ${item}`;
  });

  const wants = wantRows.map(r => {
    const item = r.querySelector('select').value;
    const amount = r.querySelector('input').value || 1;
    return `${amount}x ${item}`;
  });

  const card = document.createElement('div');
  card.classList.add('trade-card');
  card.innerHTML = `
    <h3>${username}</h3>
    <p>Offer: ${offers.join(', ')}</p>
    <p>Want: ${wants.join(', ')}</p>
  `;
  tradeGrid.appendChild(card);
  form.reset();

  // Re-add initial rows after reset
  document.getElementById('offerContainer').innerHTML = '';
  document.getElementById('wantContainer').innerHTML = '';
  document.getElementById('addOffer').click();
  document.getElementById('addWant').click();
});