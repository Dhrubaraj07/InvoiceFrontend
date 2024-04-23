window.onload = function () {
  defaultPage();
};
document.getElementById('search-bill').addEventListener('keyup', function () {
  var searchTerm = this.value;
  var temp = encodeURIComponent(searchTerm);
  if (temp.length == 0) {
    defaultPage();
    return;
  }
  fetch('http://localhost:8080/searchBills?str=' + temp)
    .then(response => response.json())
    .then(data => {
      var searchResults = document.getElementById('billInfo');
      searchResults.innerHTML = ''; // Clear previous search results
      console.log(data);
      data.forEach(item => {
        console.log(item);
        if(item===null) {
          return;
        }
        var row = document.createElement('tr');

        row.innerHTML = `
        <td style="text-align: center;">${item.bill_id}</td>
<td style="text-align: center;">${item.bill_date}</td>
<td style="text-align: center;">${item.bill_name}</td>
<td style="text-align: center;">${item.bill_ph}</td>
<td style="text-align: center; background-color: ${item.bill_confirm === 'DUE' ? '#FFCCCB' : 'lightgreen'};">
<strong style="color: black;">${item.bill_confirm}</strong>
</td>
<td style="text-align: center;">
<button class="btn btn-primary btn-sm view-btn">View</button>
</td>
  
            `;
        searchResults.appendChild(row);
      });
      var editButtons = document.querySelectorAll('.view-btn');
      editButtons.forEach(button => {
        button.addEventListener('click', function () {
          var currentItem = data.find(item => {
            return item.bill_id=== this.parentNode.parentNode.cells[0].textContent;
          });
          localStorage.setItem('BillId',currentItem.bill_id);
          window.location.href='ViewBill.html';
        });
      });
    })
});
function defaultPage() {

fetch('http://localhost:8080/getAllBills')
.then(response => response.json())
.then(data => {
var searchResults = document.getElementById('billInfo');
      searchResults.innerHTML = ''; // Clear previous search results
      console.log(data);
      data.forEach(item => {
        var row = document.createElement('tr');

        row.innerHTML = `
        <td style="text-align: center;">${item.bill_id}</td>
<td style="text-align: center;">${item.bill_date}</td>
<td style="text-align: center;">${item.bill_name}</td>
<td style="text-align: center;">${item.bill_ph}</td>
<td style="text-align: center; background-color: ${item.bill_confirm === 'DUE' ? '#FFCCCB' : 'lightgreen'};">
<strong style="color: black;">${item.bill_confirm}</strong>
</td>
<td style="text-align: center;">
<button class="btn btn-primary btn-sm edit-btn" data-flag="0">View</button>
</td>
 
            `;
        searchResults.appendChild(row);
      });
      var editButtons = document.querySelectorAll('.edit-btn');
      editButtons.forEach(button => {
        button.addEventListener('click', function () {
          var currentItem = data.find(item => {
            return item.bill_id== this.parentNode.parentNode.cells[0].textContent;
          });
          console.log(currentItem);
          localStorage.setItem('BillId',currentItem.bill_id);
          window.location.href='viewBill.html';
        });
      });
    })
    .catch(error => {
      console.error('Error:', error);
    });
}