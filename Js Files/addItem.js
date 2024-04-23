document.getElementById('addItemBtn').addEventListener('click', function() {
  // Get input values
  var itemName = document.getElementById('itemName').value;
  if (itemName.trim() === '') {
  // Display warning message
    alert('Item name cannot contain spaces or be empty');
    return; // Stop further execution
  }
  var purchaseCost = document.getElementById('purchaseCost').value;
  var unit = document.getElementById('unit').value;
  var supervisorySell = document.getElementById('supervisorySell').value;
  var customerSell = document.getElementById('customerSell').value;

  // Create JSON object
  var data = {
      item_name: itemName,
      purchase: purchaseCost,
      unit: unit,
      supervisor: supervisorySell,
      customer: customerSell
  };

  // Send JSON data to backend URL
  fetch('http://localhost:8080/addItem', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
  })
  .then(response => {
      if (response.ok) {
          document.getElementById('successMessage').style.display = 'block';
          setTimeout(function() {
          window.location.reload();
          }, 2000); 

      } else {
          console.error('Failed to add item');
      }
  })
  .catch(error => {
      console.error('Error:', error);
  });
});