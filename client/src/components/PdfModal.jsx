import React, { useState } from "react";
import { jsPDF } from "jspdf";
import { format, subMonths } from "date-fns";

function PdfModal({ onExit }) {
  const generatePDF = () => {
    const doc = new jsPDF();

    doc.text("Hello World!", 10, 10);
    doc.save("document.pdf");
    notify();
  };
  const [selected, setSelected] = useState(0);

  const handleSelect = (index) => {
    setSelected(index);
  };
  const [selectedOption, setSelectedOption] = useState("");
  const [selectedMonth, setSelectedMonth] = useState("");

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const handleMonthChange = (event) => {
    setSelectedMonth(event.target.value);
  };

  const getLastFiveMonths = () => {
    const months = [];
    for (let i = 2; i < 7; i++) {
      const monthDate = subMonths(new Date(), i);
      months.push(format(monthDate, "MMMM yyyy"));
    }
    return months;
  };

  return (
    <>
      <div
        className="relative z-10"
        aria-labelledby="modal-title"
        role="dialog"
        aria-modal="true"
      >
        <div
          className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
          aria-hidden="true"
        ></div>
        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-3xl">
              <h1 className="font-semibold text-lg px-6 pt-4">
                Rapport de gestion
              </h1>
              <div className="bg-gray-100 mt-8 shadow-lg shadow-blue-600 px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                <div className="relative flex bg-gray-200 p-2 rounded-lg w-full max-w-md">
                  <div
                    className="absolute top-0 left-0 h-full bg-blue-500 rounded-lg transition-all duration-300"
                    style={{
                      width: `${100 / 2}%`,
                      transform: `translateX(${selected * 100}%)`,
                    }}
                  ></div>

                  <label className="relative z-10 flex-1 text-center">
                    <input
                      type="radio"
                      name="nav"
                      className="sr-only peer"
                      checked={selected === 0}
                      onChange={() => handleSelect(0)}
                    />
                    <span className="block py-2 cursor-pointer peer-checked:text-white font-semibold">
                      Entrée
                    </span>
                  </label>

                  <label className="relative z-10 flex-1 text-center">
                    <input
                      type="radio"
                      name="nav"
                      className="sr-only peer"
                      checked={selected === 1}
                      onChange={() => handleSelect(1)}
                    />
                    <span className="block py-2 cursor-pointer peer-checked:text-white font-semibold">
                      Sortie
                    </span>
                  </label>
                </div>
                <div className="mt-4">
                  <form className="flex space-x-4">
                    <label
                      htmlFor="option1"
                      className="inline-flex items-center"
                    >
                      <input
                        type="radio"
                        name="option"
                        id="option1"
                        value="mois_ci"
                        onChange={handleOptionChange}
                      />
                      <span className="ml-2">Ce mois-ci</span>
                    </label>
                    <label
                      htmlFor="option2"
                      className="inline-flex items-center"
                    >
                      <input
                        type="radio"
                        name="option"
                        id="option2"
                        value="mois_precedent"
                        onChange={handleOptionChange}
                      />
                      <span className="ml-2">Mois dernier</span>
                    </label>
                    <label
                      htmlFor="option3"
                      className="inline-flex items-center"
                    >
                      <input
                        type="radio"
                        name="option"
                        id="option3"
                        value="autre_mois"
                        onChange={handleOptionChange}
                      />
                      <span className="ml-2">Autre mois avant</span>
                    </label>
                  </form>
                  {selectedOption === "autre_mois" && (
                    <div className="mt-4">
                      <label htmlFor="month" className="block mb-2">
                      </label>
                      <select
                        id="month"
                        name="month"
                        value={selectedMonth}
                        onChange={handleMonthChange}
                        className="border p-2 rounded"
                      >
                        <option value="">Sélectionnez</option>
                        {getLastFiveMonths().map((month, index) => (
                          <option key={index} value={month}>
                            {month}
                          </option>
                        ))}
                      </select>
                    </div>
                  )}
                </div>
                <div className="mt-6 flex items-center justify-end gap-x-6">
                  <button
                    type="button"
                    className="text-sm font-semibold leading-6 text-gray-900"
                    onClick={onExit}
                  >
                    retour
                  </button>
                  <button
                    className="rounded-md bg-blue-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    onClick={generatePDF}
                  >
                    generer
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default PdfModal;
