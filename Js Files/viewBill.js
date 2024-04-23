let obj=[];
    window.onload=function(){
      fetchbill();
}
async function fetchbill(){
      const url = `http://localhost:8080/getBill/${localStorage.getItem('BillId')}`; // Replace 'http://example.com' with the actual base URL of your API
  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  });
  const billDetails = await response.json();
  console.log(billDetails);
let transformedList = billDetails.list.map(item => {
  return {
    "itemname": item.itemname.trim(),
    "itemprice": item.itemprice.toString(),
    "itemunit": item.itemunit,
    "itemquantity": item.itemquantity.toString(),
    "totalitemamount": (item.itemprice * item.itemquantity).toString()
  };
});


 obj = {
  "bill_name": billDetails.bill_name,
  "bill_ph": billDetails.bill_ph,
  "amt_left": billDetails.amt_left,
  "bill_date": billDetails.bill_date,
  "amt_received": billDetails.amt_received,
  "bill_confirm": billDetails.bill_confirm,
  "list": transformedList
};
console.log(obj.list);
  document.getElementById('cust-name').innerHTML=obj.bill_name;
  document.getElementById('cust-ph').innerHTML=obj.bill_ph;
  document.getElementById('bill-id').innerHTML=billDetails.bill_id;
  document.getElementById('bill-date').innerHTML=billDetails.bill_date;
  document.getElementById('amt-received').innerHTML=billDetails.amt_received;
  document.getElementById('left-amount').innerHTML=billDetails.amt_left;
  document.getElementById('confirm').value=billDetails.bill_confirm;
  billBody(obj);

}

    async function saveBill() {
  const url = `http://localhost:8080/saveBill/${localStorage.getItem('BillId')}`; // Replace 'http://example.com' with the actual base URL of your API
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(obj)
  });
  window.location.href='searchBill.html';
  }

  async function deleteBill() {
  const url = `http://localhost:8080/deleteId/${localStorage.getItem('BillId')}`; // Replace this with the actual URL // 
  const response = await fetch(url, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json'
    }
  });
  window.location.href='searchBill.html';
}

function billBody(){
var tableBody = document.getElementById('item-details-body');
var totalAmount = 0;
tableBody.innerHTML = '';
console.log(obj.list);
obj.list.forEach(function(item) {
  var amount = (item.itemprice * item.itemquantity).toFixed(2); 
  totalAmount += parseFloat(amount); 
  var price = parseFloat(item.itemprice).toFixed(2);
  var row = document.createElement('tr');
  row.innerHTML = `
    <td>${item.itemname}</td>
    <td>${item.itemprice}</td>
    <td>${item.itemunit}</td>
    <td>${item.itemquantity}</td>
    <td>${amount}</td>
  `;
  tableBody.appendChild(row);
});
  document.getElementById('total-amount').innerHTML=totalAmount.toFixed(2);
}

function confirmChange(){
  obj.bill_confirm=document.getElementById('confirm').value.toUpperCase();
  console.log(obj);
}