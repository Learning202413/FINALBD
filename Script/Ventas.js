let salesData = [];
let editingRowId = null; // Almacena la ID de la fila en edición

function addNewSale() {
  const newSale = {
    id: salesData.length + 1, // Asignamos un ID dinámico
    orderPriority: 'Alta',
    discount: 10,
    unitPrice: 150,
    shippingCost: 20,
    customerId: 'C123',
    customerName: 'Juan Pérez',
    shippingMode: 'Aéreo',
    customerSegment: 'VIP',
    productCategory: 'Electrónica',
    productSubCategory: 'Laptops',
    productContainer: 'Caja',
    productName: 'Laptop HP',
    productBaseMargin: 50,
    country: 'Perú',
    region: 'Lima',
    state: 'Lima',
    city: 'Miraflores',
    postalCode: '15073',
    orderDate: '2024-12-14',
    shippingDate: '2024-12-16',
    profit: 30,
    newQuantityOrdered: 5,
    sales: 750,
  };

  salesData.push(newSale);
  renderTable();
}

function renderTable() {
  const tableBody = document.getElementById('sales-body');
  tableBody.innerHTML = ''; // Limpiamos el cuerpo de la tabla

  salesData.forEach((sale) => {
    const row = document.createElement('tr');
    row.setAttribute('data-id', sale.id); // Añadir un atributo con el id para identificar la fila
    row.innerHTML = `
      <td contenteditable="true">${sale.id}</td>
      <td contenteditable="true">${sale.orderPriority}</td>
      <td contenteditable="true">${sale.discount}%</td>
      <td contenteditable="true">$${sale.unitPrice}</td>
      <td contenteditable="true">$${sale.shippingCost}</td>
      <td contenteditable="true">${sale.customerId}</td>
      <td contenteditable="true">${sale.customerName}</td>
      <td contenteditable="true">${sale.shippingMode}</td>
      <td contenteditable="true">${sale.customerSegment}</td>
      <td contenteditable="true">${sale.productCategory}</td>
      <td contenteditable="true">${sale.productSubCategory}</td>
      <td contenteditable="true">${sale.productContainer}</td>
      <td contenteditable="true">${sale.productName}</td>
      <td contenteditable="true">${sale.productBaseMargin}</td>
      <td contenteditable="true">${sale.country}</td>
      <td contenteditable="true">${sale.region}</td>
      <td contenteditable="true">${sale.state}</td>
      <td contenteditable="true">${sale.city}</td>
      <td contenteditable="true">${sale.postalCode}</td>
      <td contenteditable="true">${sale.orderDate}</td>
      <td contenteditable="true">${sale.shippingDate}</td>
      <td contenteditable="true">$${sale.profit}</td>
      <td contenteditable="true">${sale.newQuantityOrdered}</td>
      <td contenteditable="true">$${sale.sales}</td>
      <td>
        <div class="action-btns">
          <button class="edit-btn" onclick="editSale(${sale.id})">Editar</button>
          <button class="delete-btn" onclick="deleteSale(${sale.id})">Eliminar</button>
          <button class="save-btn" style="display:none;" onclick="saveSale(${sale.id})">Guardar</button>
          <button class="cancel-btn" style="display:none;" onclick="cancelEdit(${sale.id})">Cancelar</button>
        </div>
      </td>
    `;
    tableBody.appendChild(row);
  });
}

function editSale(id) {
  if (editingRowId !== null) {
    // Si ya hay una fila siendo editada, no permitimos editar otra
    alert("Ya estás editando una fila. Guarda o cancela los cambios antes de editar otra.");
    return;
  }

  const row = document.querySelector(`tr[data-id='${id}']`);
  const cells = row.getElementsByTagName('td');

  // Hacer las celdas editables
  for (let cell of cells) {
    cell.setAttribute('contenteditable', 'true');
  }

  // Ocultar el botón Editar y mostrar Guardar y Cancelar
  row.querySelector('.edit-btn').style.display = 'none';
  row.querySelector('.delete-btn').style.display = 'none';
  row.querySelector('.save-btn').style.display = 'inline-block';
  row.querySelector('.cancel-btn').style.display = 'inline-block';

  // Deshabilitar edición de las demás filas
  disableOtherRows(id);

  // Guardar la fila en edición
  editingRowId = id;
}

function disableOtherRows(id) {
  const rows = document.querySelectorAll('tr');
  rows.forEach(row => {
    if (row.getAttribute('data-id') !== String(id)) {
      const cells = row.getElementsByTagName('td');
      for (let cell of cells) {
        cell.setAttribute('contenteditable', 'false');
      }
      row.querySelector('.edit-btn').disabled = true;
      row.querySelector('.delete-btn').disabled = true;
    }
  });
}

function saveSale(id) {
  const row = document.querySelector(`tr[data-id='${id}']`);
  const cells = row.getElementsByTagName('td');

  // Obtener los valores editados
  const updatedSale = {
    id: id,
    orderPriority: cells[1].innerText,
    discount: parseFloat(cells[2].innerText),
    unitPrice: parseFloat(cells[3].innerText.replace('$', '')),
    shippingCost: parseFloat(cells[4].innerText.replace('$', '')),
    customerId: cells[5].innerText,
    customerName: cells[6].innerText,
    shippingMode: cells[7].innerText,
    customerSegment: cells[8].innerText,
    productCategory: cells[9].innerText,
    productSubCategory: cells[10].innerText,
    productContainer: cells[11].innerText,
    productName: cells[12].innerText,
    productBaseMargin: parseFloat(cells[13].innerText),
    country: cells[14].innerText,
    region: cells[15].innerText,
    state: cells[16].innerText,
    city: cells[17].innerText,
    postalCode: cells[18].innerText,
    orderDate: cells[19].innerText,
    shippingDate: cells[20].innerText,
    profit: parseFloat(cells[21].innerText.replace('$', '')),
    newQuantityOrdered: parseInt(cells[22].innerText),
    sales: parseFloat(cells[23].innerText.replace('$', '')),
  };

  // Actualizar los datos en el array salesData
  salesData = salesData.map(sale => (sale.id === id ? updatedSale : sale));

  // Volver a renderizar la tabla
  renderTable();
  editingRowId = null; // Restablecer el estado de edición
}

function cancelEdit(id) {
  renderTable(); // Simplemente re-renderizamos la tabla, descartando los cambios
  editingRowId = null;
}

function deleteSale(id) {
  salesData = salesData.filter(sale => sale.id !== id);
  renderTable();
}

