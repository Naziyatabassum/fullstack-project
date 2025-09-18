const API_BASE_URL = 'http://localhost:5000';  // Backend URL

async function addItem() {
  const nameInput = document.getElementById('itemName');
  const name = nameInput.value.trim();
  if (!name) {
    alert('Please enter an item name.');
    return;
  }

  try {
    const response = await fetch(`${API_BASE_URL}/api/items`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name }),
    });

    if (!response.ok) throw new Error('Failed to add item');

    await response.json();
    nameInput.value = '';
    loadItems();
  } catch (error) {
    alert(error.message);
  }
}

async function loadItems() {
  try {
    const response = await fetch(`${API_BASE_URL}/api/items`);
    const items = await response.json();
    const list = document.getElementById('itemList');
    list.innerHTML = '';

    items.forEach(item => {
      const li = document.createElement('li');
      li.textContent = item.name;
      list.appendChild(li);
    });
  } catch (error) {
    alert('Failed to load items');
  }
}

loadItems();
