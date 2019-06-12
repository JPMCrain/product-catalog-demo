document.getElementById("inputButton").addEventListener('click',() => {
	processSearch(document.getElementById('input').value, 'byId');
 });

document.getElementById("inputTypeButton").addEventListener('click',() => {
	processSearch(document.getElementById('inputType').value, 'byType');
});

document.getElementById("inputPriceButton").addEventListener('click',() => {
	processSearch(document.getElementById('inputPrice').value, 'byPrice');
});
 
 api.searchAllProducts().then((value) => {
		 updateTable('allTable',value);
 });
 
 function processSearch(value, type) {
  if (type === 'byId') {
    api.searchProductById(value).then((val) => {
        return Promise.all([api.searchProductsByPrice(val.price, 50), api.searchProductsByType(val.type), val]);
      }).then((val) => {
        var similarArray = getIntersection(val[0], val[1], val[2].id);
        updateExaminedText(val[2]);
        updateTable('similarTable', similarArray);
      }).catch((val) => {
        alert(val);
      });
  } else if (type === 'byType') {
    api.searchProductsByType(value)
      .then((valueArray) => {
				updateExaminedText(valueArray[0])
        updateTable('similarTable', valueArray);
      })
      .catch(err => {
        alert(err);
      });
  } else if (type === 'byPrice') {
    api.searchProductsByPrice(value, 50)
      .then((valueArray) => {
				updateExaminedText(valueArray[0])
        updateTable('similarTable', valueArray);
      })
      .catch(err => {
        alert(err);
      });
  } else return;
}
 
 function getIntersection(arrA, arrB, searchedId){
		 let samePrice = arrA;
		 let sameType = arrB;
		 let similarArray = [];
		 samePrice.forEach((obj1) => {
		 sameType.forEach((obj2) => {
				 if(obj1.id == obj2.id && obj1.id != searchedId)
				 similarArray.push(obj1);     
				 });
		 });
 
		 return similarArray;
 }
 
 function updateExaminedText(product){
	 let outputString = `Product Id: ${product.id}`;
	 outputString += `<br> Price: ${product.price}`;
	 outputString += `<br> Type: ${product.type}`;
	 
	 document.getElementById("productText").innerHTML = outputString;
 }
 
 function createTableHeader(tableId){
		 let tableHeaderRow = document.createElement('tr');
		 let th1 = document.createElement('th');
		 let th2 = document.createElement('th');
		 let th3 = document.createElement('th');
		 let th4 = document.createElement('th');
 
		 th1.appendChild(document.createTextNode("ProductId"));
		 th2.appendChild(document.createTextNode("Type"));
		 th3.appendChild(document.createTextNode("Price"));
		 th4.appendChild(document.createTextNode("Examine"));
		 
		 tableHeaderRow.appendChild(th1);
		 tableHeaderRow.appendChild(th2);
		 tableHeaderRow.appendChild(th3);
		 tableHeaderRow.appendChild(th4);
		 
		 document.getElementById(tableId).appendChild(tableHeaderRow);
 }
 
 function updateTable(tableId,productArray){
		 let tableBody = document.getElementById(tableId);
		 //reset table
		 while (tableBody.hasChildNodes()) {   
		   tableBody.removeChild(tableBody.firstChild);
		 }
		 //create table header
		 createTableHeader(tableId);
 
		 //populate table rows
		 for (let i = 0; i < productArray.length; i++) {
				 let tr = document.createElement('TR');
				 let td1 = document.createElement('TD');
				 let td2 = document.createElement('TD');
				 let td3 = document.createElement('TD');
				 let td4 = document.createElement('button');
 
				 td4.addEventListener('click', function(){
						 processSearch(this.parentNode.firstChild.innerHTML);
				 });
 
				 td1.appendChild(document.createTextNode(productArray[i].id));
				 td2.appendChild(document.createTextNode(productArray[i].type));
				 td3.appendChild(document.createTextNode(productArray[i].price));
				 td4.appendChild(document.createTextNode("Examine"));
 
				 tr.appendChild(td1);
				 tr.appendChild(td2);
				 tr.appendChild(td3);
				 tr.appendChild(td4);
 
				 tableBody.appendChild(tr);
		 }  
 }