var items = JSON.parse(localStorage.getItem('objectsKey'));
console.log(items);
// Get the table body element
var tableBody = document.getElementById('item-details-body');

// Initialize total amount variable
var totalAmount = 0;

// Clear the table body first
tableBody.innerHTML = '';

// Iterate over each item and add it to the table
items.forEach(function(item) {
  // Calculate amount for each item
  var amount = (item.price * item.quantity).toFixed(2); // Format amount with two decimal places
  totalAmount += parseFloat(amount); // Update total amount
    // Format price with two decimal places
  var price = parseFloat(item.price).toFixed(2);
  // Create table row
  var row = document.createElement('tr');

  // Populate row with item data
  row.innerHTML = `
    <td>${item.item_name}</td>
    <td>${price}</td>
    <td>${item.unit}</td>
    <td>${item.quantity}</td>
    <td>${amount}</td>
  `;

  // Append row to table body
  tableBody.appendChild(row);
});

// Update total amount in the HTML
document.getElementById('total-amount').textContent = totalAmount.toFixed(2);
let billDetails=JSON.parse(localStorage.getItem('billDetails'));
console.log(billDetails);
function pdf(){
    window.print();
    saveBill()
  }
  window.onload=function(){
    console.log(billDetails);
    document.getElementById('cust-name').innerText=billDetails.custName;
    document.getElementById('cust-ph').innerText=billDetails.custPh;
    document.getElementById('amt-received').innerText=parseFloat(billDetails.amtRec).toFixed(2);
    document.getElementById('confirm').value=billDetails.confirm.toUpperCase();
    document.getElementById('left-amount').innerText=billDetails.amtLeft;

    var currentDate = new Date().toISOString().split('T')[0];
    var formattedDate = currentDate.split('-').reverse().join('/');
    document.getElementById('bill-date').textContent = formattedDate;
    billDetails.billDate=formattedDate;
    localStorage.setItem('billDetails',JSON.stringify(billDetails));
    if(billDetails.billId===0){
      fetchBillId();
      
    }
    else{

    }
    document.getElementById('bill-id').textContent = billDetails.billId;
  }

  function clearLS(){
    deleteBillId();
    
  }

  async function fetchBillId() {
  const url = 'http://localhost:8080/getId'; // Replace this with the actual URL
    const response = await fetch(url);
    const billId = await response.text();
    billDetails.billId=billId;
    localStorage.setItem('billDetails',JSON.stringify(billDetails));
    document.getElementById('bill-id').textContent = billDetails.billId;
}

async function saveBill() {
  let LCobj = JSON.parse(localStorage.getItem('objectsKey'));
  let transformedList = LCobj.map(item => {
    return {
        "itemname": item.item_name.trim(),
        "itemprice": item.price.toString(),
        "itemunit": item.unit,
        "itemquantity": item.quantity.toString(),
        "totalitemamount": (item.price * item.quantity).toString()
    };
});

  let idd=parseInt(billDetails.billId);
  let obj={
    "bill_name":billDetails.custName,
    "bill_ph":billDetails.custPh,
    "amt_left":billDetails.amtLeft,
    "bill_date":billDetails.billDate,
    "amt_received":billDetails.amtRec,
    "bill_confirm":billDetails.confirm,
    "list": transformedList
  }


  const url = `http://localhost:8080/saveBill/${idd}`; // Replace 'http://example.com' with the actual base URL of your API
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(obj)
  });
  if (!response.ok) {
      throw new Error('Failed to save bill');
    }
    console.log('Bill Saved');
    
  }

  async function deleteBillId() {
  const url = `http://localhost:8080/deleteId/${billDetails.billId}`; // Replace this with the actual URL // 
  const response = await fetch(url, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json'
    }
  });
    localStorage.removeItem('billDetails');
    localStorage.removeItem('objectsKey');
    window.location.reload();
}