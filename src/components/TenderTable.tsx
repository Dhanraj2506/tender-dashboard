import React, { useEffect, useState } from "react";
import axios from "axios";
import { Tender } from "../types/Tender";

const TenderTable: React.FC = () => {
  const [tenders, setTenders] = useState<Tender[]>([]);
  const [selectedTender, setSelectedTender] = useState<any | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [detailLoading, setDetailLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchTenders = async () => {
      setLoading(true);
      try {
        const response = await axios.get<{ data: Tender[] }>(
          "https://tenders.guru/api/es/tenders"
        );
        setTenders(response?.data?.data);
      } catch (error) {
        console.error("Error fetching tenders:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTenders();
  }, []);

  const fetchTenderDetails = async (tenderId: number) => {
    setDetailLoading(true);
    try {
      const response = await axios.get<{ data: Tender }>(
        `https://tenders.guru/api/es/tenders/${tenderId}`
      );
      setSelectedTender(response.data);
    } catch (error) {
      console.error("Error fetching tender details:", error);
    } finally {
      setDetailLoading(false);
    }
  };

  const handleRowClick = (tender: Tender) => {
    fetchTenderDetails(tender?.id);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Selected Spain Tender</h1>

      <div
        style={{
          marginTop: "30px",
          padding: "20px",
          border: "1px solid #ccc",
          borderRadius: "8px",
        }}
      >
        {detailLoading ? (
          <p>Loading details...</p>
        ) : selectedTender ? (
          <>
            <h2>{selectedTender.title}</h2>
            <p>
              <strong>Publication Date:</strong> {selectedTender.date || "N/A"}
            </p>
            <p>
              <strong>Deadline:</strong> {selectedTender.deadline_date || "N/A"}
            </p>
            <p>
              <strong>Category:</strong> {selectedTender.category || "N/A"}
            </p>
            <p>
              <strong>Contract Type:</strong>{" "}
              {selectedTender.type?.name || "N/A"}
            </p>
            <p>
              <strong>Awarded Supplier:</strong>{" "}
              {selectedTender.awarded?.[0]?.suppliers_name || "N/A"}
            </p>
            <p>
              <strong>Contract Value (€):</strong>{" "}
              {selectedTender.awarded?.[0]?.value || "N/A"}
            </p>
            <p>
              <strong>Number of Offers:</strong>{" "}
              {selectedTender.awarded?.[0]?.offers_count || "N/A"}
            </p>
            <p>
              <strong>Official Tender Source:</strong>{" "}
              {selectedTender.src_url ? (
                <a
                  href={selectedTender.src_url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View Full Details
                </a>
              ) : (
                "N/A"
              )}
            </p>
            <p>
              <strong>Official Document:</strong>{" "}
              {selectedTender.notices?.generaldocument?.[0]?.doc_url ? (
                <a
                  href={selectedTender.notices.generaldocument[0].doc_url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Download Document
                </a>
              ) : (
                "N/A"
              )}
            </p>
          </>
        ) : (
          <p style={{ textAlign: "center", marginTop: "50px" }}>
            No tender selected. Please click a tender row to see details.
          </p>
        )}
      </div>

      <h1>Spain Tenders Dashboard</h1>

      {loading ? (
        <p>Loading tenders...</p>
      ) : (
        <>
          <div
            style={{ maxHeight: "400px", overflowY: "auto", marginTop: "20px" }}
          >
  <table
    border={1}
    cellPadding={10}
    cellSpacing={0}
    style={{
      width: "100%",
      minWidth: "600px",
      cursor: "pointer",
      borderCollapse: "collapse",
      backgroundColor: "#282c34", 
      color: "#f5f5f5"
    }}
  >
    <thead style={{ backgroundColor: "#f5f5f5", color: "#282c34" }}>
      <tr>
        <th style={{ position: "sticky", top: 0, background: "#f5f5f5" }}>ID</th>
        <th style={{ position: "sticky", top: 0, background: "#f5f5f5" }}>Title</th>
        <th style={{ position: "sticky", top: 0, background: "#f5f5f5" }}>Category</th>
        <th style={{ position: "sticky", top: 0, background: "#f5f5f5" }}>Publication Date</th>
        <th style={{ position: "sticky", top: 0, background: "#f5f5f5" }}>Deadline</th>
      </tr>
    </thead>

    <tbody>
      {tenders.length > 0 ? (
        tenders.map((tender) => (
          <tr key={tender.id} onClick={() => handleRowClick(tender)}>
            <td>{tender.id || "N/A"}</td>
            <td>{tender.title || "N/A"}</td>
            <td>{tender.category || "N/A"}</td>
            <td>{tender.date || "N/A"}</td>
            <td>{tender.deadline_date || "N/A"}</td>
          </tr>
        ))
      ) : (
        <tr>
          <td colSpan={5} style={{ textAlign: "center", padding: "10px" }}>
            No data found
          </td>
        </tr>
      )}
    </tbody>
  </table>

          </div>
        </>
      )}
    </div>
  );
};

export default TenderTable;
