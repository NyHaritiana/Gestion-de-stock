import * as XLSX from 'xlsx';
import { FaFileExcel } from 'react-icons/fa';
import { toast } from 'react-toastify';

const ExportToExcel = ({data}) => {
  const handleExport = () => {
    if (!data || data.length === 0) {
      toast.error("Aucune donnée disponible pour l'exportation");
      return;
    }

    const worksheet = XLSX.utils.json_to_sheet(data.map(item => ({
      id_sortie: item.id_sortie,
      ref_article: item.ref_article ? item.ref_article.trim() : "N/A",  // Fallback if undefined
      nom_recepteur: item.nom_recepteur ? item.nom_recepteur.trim() : "N/A",  // Fallback if undefined
      quantite: item.quantite ?? 0,  // Fallback if quantite is undefined or null
      date_sortie: item.date_sortie || "N/A",  // Fallback if date_sortie is undefined
    })));
  
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');
    XLSX.writeFile(workbook, 'stocks.xlsx');
    toast.success("Excel généré avec succès !");
  };

  return (
    <FaFileExcel
      onClick={handleExport}
      style={{ fontSize: '48px', cursor: 'pointer', color: 'green' }}
      title="Exporter vers Excel"
    />
  );
};

export default ExportToExcel;
