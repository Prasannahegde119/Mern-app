import React from "react";
import { useCart } from "../Contexts/CartContext";
import jsPDF from "jspdf";
import "jspdf-autotable";
import { useNavigate } from "react-router-dom";

const InvoiceGenerator = () => {
  const { cartProducts, totalPrice } = useCart();

  const navigate = useNavigate();

  const generatePDF = () => {
    // Create a new PDF document
    const doc = new jsPDF();

    // Set the document title
    doc.setFontSize(20);
    doc.text("Invoice", 10, 10);

    // Set up the table headers
    const headers = [["Title", "Price", "Quantity", "Total"]];

    // Set up the data rows
    const data = cartProducts.map((product) => [
      product.title,
      `$${product.price}`,
      product.quantity,
      `$${product.price * product.quantity}`,
      // alert("invoice downloaded"),
      navigate("/"),
    ]);

    // AutoTable plugin to create a table
    doc.autoTable({
      head: headers,
      body: data,
      startY: 20,
    });

    // Add total price
    const totalPriceYPos = doc.autoTable.previous.finalY + 10;
    doc.text(`Total Price: $${totalPrice}`, 10, totalPriceYPos);

    // Add current date and time
    const currentDate = new Date().toLocaleDateString();
    const currentTime = new Date().toLocaleTimeString();
    const dateTimeText = `Date: ${currentDate}, Time: ${currentTime}`;
    const dateTimeYPos = doc.internal.pageSize.height - 10; // Position from bottom of page
    doc.text(dateTimeText, 10, dateTimeYPos);

    // Save the PDF
    doc.save("invoice.pdf");
  };

  return (
    <div>
      <h2>Invoice Generator</h2>
      <button onClick={generatePDF}>Generate Invoice</button>
    </div>
  );
};

export default InvoiceGenerator;
