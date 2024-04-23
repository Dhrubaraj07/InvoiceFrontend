window.onload = function () {
  defaultPage();
};
// localStorage.clear();
document.getElementById('searchInput').addEventListener('keyup', function () {
  var searchTerm = this.value;
  var temp = encodeURIComponent(searchTerm);
  if (temp.length == 0) {
    defaultPage();
    return;
  }
  fetch('http://localhost:8080/searchItems/' + temp)
    .then(response => response.json())
    .then(data => {
      var searchResults = document.getElementById('searchResults');
      searchResults.innerHTML = ''; // Clear previous search results

      data.forEach(item => {
        var row = document.createElement('tr');

        row.innerHTML = `
                <td>${item.item_name}</td>
                <td style="text-align: center;">${item.purchase}</td>
                <td>${item.unit}</td>
                <td style="background-color: yellow;text-align: center;"><strong style="color: black;">${item.customer}</td>
                <td style="text-align: center;">${item.supervisor}</td>
                <td>
                  <button class="btn btn-danger btn-sm edit-btn" data-flag="0" >BILL</button></td> 
                               
                <td>
                  <button class="btn btn-primary btn-sm edit-btn" data-flag="1">Edit</button>
                </td>
            `;
        searchResults.appendChild(row);
      });
      var editButtons = document.querySelectorAll('.edit-btn');
      editButtons.forEach(button => {
        button.addEventListener('click', function () {
          var currentItem = data.find(item => {
            console.log('Item Name:', item.item_name);
            console.log('Parent node:', this.parentNode.parentNode.cells[0].textContent);
            return item.item_name === this.parentNode.parentNode.cells[0].textContent;
          });
          console.log(currentItem);
          var flag = parseInt(this.getAttribute('data-flag'));
          if (flag === 1) editItem(JSON.stringify(currentItem));
          else billItem(JSON.stringify(currentItem));
        });
      });
    })
    .catch(error => {
      console.error('Error:', error);
    });
});


// Function to redirect to editItem.html with item details
function editItem(currentItem) {
  // Store the item object in localStorage
  localStorage.setItem('editElement',currentItem);

  // Redirect to the editItem.html page
  window.location.href = 'editItem.html';
}

function billItem(currentItem) {
  Item = JSON.parse(currentItem);
  // Step 1: Retrieve existing data from local storage
  var existingData = localStorage.getItem("objectsKey");
  // Step 2: Parse the retrieved data into an array, or initialize an empty array if no data exists
  var objects = existingData ? JSON.parse(existingData) : [];
  // Step 3: Add a new object to the array
  var temp = objects.find(obj => obj.item_id === Item.item_id);
  if (temp) {
    alert('Already added to Bill.');
    return;
  }
  var newObject = { item_id: Item.item_id, item_name: Item.item_name, price: Item.customer, unit: Item.unit, quantity: 1 };
  objects.push(newObject);

  // Step 4: Serialize the updated array back into a string
  var serializedObjects = JSON.stringify(objects);

  // Step 5: Store the updated string back into local storage under the same key
  localStorage.setItem("objectsKey", serializedObjects);
  alert('ADDED !!!');
}

function defaultPage() {

  fetch('http://localhost:8080/default')
    .then(response => response.json())
    .then(data => {
      var searchResults = document.getElementById('searchResults');
      searchResults.innerHTML = ''; // Clear previous search results

      data.forEach(item => {
        var row = document.createElement('tr');

        row.innerHTML = `
                <td>${item.item_name}</td>
                <td>${item.purchase}</td>
                <td>${item.unit}</td>
                <td style="background-color: yellow;"><strong style="color: black;">${item.customer}</td>
                <td>${item.supervisor}</td>
                <td>
                  <button class="btn btn-danger btn-sm edit-btn" data-flag="0" >BILL</button></td> 
                               
                <td>
                  <button class="btn btn-primary btn-sm edit-btn" data-flag="1">Edit</button>
                </td>
            `;
        searchResults.appendChild(row);
      });
      var editButtons = document.querySelectorAll('.edit-btn');
      editButtons.forEach(button => {
        button.addEventListener('click', function () {
          var currentItem = data.find(item => {
            console.log('Item Name:', item.item_name);
            console.log('Parent node:', this.parentNode.parentNode.cells[0].textContent);
            return item.item_name === this.parentNode.parentNode.cells[0].textContent;
          });
          console.log(currentItem);
          var flag = parseInt(this.getAttribute('data-flag'));
          if (flag === 1) editItem(JSON.stringify(currentItem));
          else billItem(JSON.stringify(currentItem));
        });
      });
    });
}