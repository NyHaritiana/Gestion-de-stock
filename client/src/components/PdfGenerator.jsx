import React from "react";
import { jsPDF } from "jspdf";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function PdfGenerator() {
  const generatePDF = () => {
    const doc = new jsPDF();

    doc.text("Hello World!", 10, 10);
    doc.save("document.pdf");
    notify();
  };
  const notify = () => {
    toast.error("PDF créé avec succès!", {
      position: "top-center",
      autoClose: 1500
    });
  };

  return (
    <div>
      <button className="bg-blue-500 text-white p-4" onClick={generatePDF}>
        Générer PDF
      </button>
      <ToastContainer />
    </div>
  );
}

export default PdfGenerator;
