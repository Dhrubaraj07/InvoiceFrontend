window.onload = function () {
  itemsList();
  func();
  AmountPaid();
}
var total = 0;
function itemsList() {
  var itemsTableBody = document.getElementById("item-details-body");
  itemsTableBody.innerHTML = ""; // Clear existing content

  var localStorageData = localStorage.getItem("objectsKey");

  if (localStorageData) {
    var items = JSON.parse(localStorageData);
    items.forEach(function (item) {
      var row = document.createElement("tr");
      row.innerHTML = `
      <td class="item-id">${item.item_id}</td>
      <td>  <textarea class="item-name" onKeyUp="updateTotal(this)" 
      style="width: 90%; height: auto; border-radius: 5px; border-width: 1px;">
${item.item_name}
</textarea></td>
    <td><input type="number" class="item-price" value="${item.price}" onKeyUp="updateTotal(this)" style=" width: 90%;border-radius:5px; border-width:1px;"></td>
    <td>${item.unit}</td>
    <td><input type="number" class="item-quantity" value="${item.quantity}" onKeyUp="updateTotal(this)" style="border-radius:6px;border-width:1px;width: 80%"></td>

    <td class="item-total" >${(parseFloat(item.price * item.quantity)).toFixed(2)}</td>
    <td>
      <button type="button" class="btn btn-link delete-item ">
        <i class="bi bi-trash "></i>
      </button>
    </td>
  `;
      itemsTableBody.appendChild(row);
    });
    var editButtons = document.querySelectorAll(".delete-item");
    var data = JSON.parse(localStorage.getItem('objectsKey'));
    editButtons.forEach(button => {
      button.addEventListener('click', function () {
        console.log('clicked');
        var index = data.findIndex(item => {
          return item.item_id === this.parentNode.parentNode.cells[0].textContent;
        });
        data.splice(index, 1);

        // Update local storage with the modified 'data' array
        localStorage.setItem('objectsKey', JSON.stringify(data));

        // Optional: Remove the row from the table
        this.parentNode.parentNode.remove();
        func();
      });
    });

  } else {
    console.log("No data found in localStorage.");
  }
}
function updateTotal(input) {
  var row = input.parentNode.parentNode; 
  var price = parseFloat(row.querySelector(".item-price").value);
  var quantity = parseFloat(row.querySelector(".item-quantity").value);
  var itemName=row.querySelector(".item-name").value;
  var itemId=row.querySelector(".item-id").innerHTML;
  updateQuantity(quantity,itemName,price,itemId);
  var total = price * quantity;
  if (isNaN(total)) total = 0;
  row.querySelector(".item-total").textContent = total.toFixed(2); // Update total in the row
  func();
}
function func() {
  var itemTotalElements = document.getElementsByClassName('item-total');
  var totalAmount = 0;

  for (var i = 0; i < itemTotalElements.length; i++) {
    totalAmount += parseFloat(itemTotalElements[i].textContent);
  }
  document.getElementById('total-amount').textContent = totalAmount.toFixed(2);
  total = totalAmount;
  AmountPaid();
}
function AmountPaid() {
  var amountLeft = document.getElementById('amt-received').value;
  console.log(amountLeft);
  console.log(total);
  document.getElementById('left-amount').textContent = (total - amountLeft).toFixed(2);
}

function print() {
  // localStorage.createElement('invoice',)
  // localStorage.removeItem('objectsKey');
  // window.location.reload();
}

function confirm(input) {
  document.getElementById('confirmation').textContent = input.innerText;
}

function updateQuantity(quan,itName,pr,itemId){
  let items = JSON.parse(localStorage.getItem('objectsKey'));
  var index = items.findIndex(item => {return item.item_id==itemId});
  items[index].quantity = quan;
  items[index].price=pr;
  items[index].item_name=itName;
  localStorage.setItem('objectsKey', JSON.stringify(items));
}

function genInvoice(){
  var bill_details={
    custName:document.querySelector('.cust-name').value,
    custPh:document.querySelector('.cust-ph').value,
    confirm:document.getElementById('confirmation').innerHTML,
    amtRec:parseFloat(document.getElementById('amt-received').value).toFixed(2),
    amtLeft:document.getElementById('left-amount').innerHTML,
    billId:0,
    billDate:0
  };
  console.log(bill_details);
  localStorage.setItem('billDetails',JSON.stringify(bill_details));
  window.location.href(invoice.html);
  window.location.reload();
}

function clearLS(){
  localStorage.removeItem('billDetails');
localStorage.removeItem('objectsKey');
  window.location.reload();
}