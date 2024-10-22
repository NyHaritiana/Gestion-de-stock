import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";  
import { FaFilePdf } from 'react-icons/fa';
import { toast } from "react-toastify"; 

const ExportToPdf = ({data}) => {
  const generatePDF = () => {
    if (!data || data.length === 0) {
      toast.error("Aucune donnée disponible pour l'exportation");
      return;
    }
  
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text("Rapport de gestion", 14, 22);
  
    const tableData = data.map((item, index) => [
      index + 1,
      item.ref_article ? item.ref_article.trim() : "N/A",
      item.nom_recepteur ? item.nom_recepteur.trim() : "N/A", 
      item.quantite ?? 0, 
    ]);
  
    doc.autoTable({
      head: [["#", "Référence", "Désignation", "Quantité"]],
      body: tableData,
      startY: 30,
    });
  
    doc.save("rapport_de_gestion.pdf");
    toast.success("PDF généré avec succès !");
  };

  return (
    <FaFilePdf
      onClick={generatePDF}
      style={{ fontSize: '48px', cursor: 'pointer', color: 'red' }}
      title="Exporter vers Pdf"
    />
  );
};

export default ExportToPdf;
