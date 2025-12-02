import React, { useState, useEffect } from "react";
import axios from "axios";

function BirdsList({ onBack }) {
  const [birds, setBirds] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBirds = async () => {
      try {
        const ebirdResp = await axios.get(
          "https://api.ebird.org/v2/data/obs/GT/recent",
          { headers: { "X-eBirdApiToken": "n2983g5m6k20" } }
        );

        const birdsData = ebirdResp.data.slice(0, 10);

        const fetchBirdData = async (b) => {
          try {
            const qidResp = await axios.get(
              `https://www.wikidata.org/w/api.php?action=wbsearchentities&search=${encodeURIComponent(
                b.sciName
              )}&language=en&format=json&origin=*`
            );
            const qid = qidResp.data.search[0]?.id;

            let family = "";
            let order = "";

            if (qid) {
              const wdResp = await axios.get(
                `https://www.wikidata.org/wiki/Special:EntityData/${qid}.json`
              );
              const entity = wdResp.data.entities[qid];
              const claims = entity.claims;

              const getLabel = (prop) => {
                const qidProp = claims[prop] ? claims[prop][0].mainsnak.datavalue.value.id : "";
                if (!qidProp) return "";
                return entity.labels?.es?.value || "";
              };

              family = getLabel("P171");
              order = getLabel("P105");
            }

            let wikiResp;
            try {
              wikiResp = await axios.get(
                `https://es.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(b.sciName)}`
              );
            } catch {
              wikiResp = await axios.get(
                `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(b.sciName)}`
              );
            }

            return {
              comName: b.comName,
              sciName: b.sciName,
              locName: b.locName,
              obsDt: b.obsDt,
              family,
              order,
              image: wikiResp.data.thumbnail?.source || null,
              description: wikiResp.data.extract || "",
            };
          } catch (err) {
            console.error("Error fetching bird:", b.sciName, err);
            return null;
          }
        };

        const birdsFullData = await Promise.all(
          birdsData.map((b) => fetchBirdData(b))
        );

        setBirds(birdsFullData.filter(Boolean));
        setLoading(false);
      } catch (err) {
        console.error(err);
        setLoading(false);
      }
    };

    fetchBirds();
  }, []);

  if (loading) return <p style={{ textAlign: "center" }}>Cargando aves...</p>;

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "20px",
        fontFamily: "Arial",
        backgroundColor: "#f5f5f5",
        minHeight: "100vh",
      }}
    >
      <button
        onClick={onBack}
        style={{
          marginBottom: "20px",
          background: "#888",
          color: "white",
          padding: "10px 15px",
          border: "none",
          borderRadius: "8px",
          cursor: "pointer",
        }}
      >
        Volver
      </button>
      <h2 style={{ marginBottom: "20px" }}>Aves observadas en Guatemala</h2>
      {birds.map((b, i) => (
        <div
          key={i}
          style={{
            border: "1px solid #ccc",
            borderRadius: "12px",
            marginBottom: "15px",
            padding: "15px",
            backgroundColor: "white",
            maxWidth: "350px",
            width: "90%", // ancho adaptable al móvil
            boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
          }}
        >
          <p><b>Nombre común:</b> {b.comName}</p>
          <p><b>Nombre científico:</b> {b.sciName}</p>
          <p><b>Ubicación:</b> {b.locName}</p>
          <p><b>Fecha observa:</b> {b.obsDt}</p>
          <p><b>Familia:</b> {b.family}</p>
          <p><b>Orden:</b> {b.order}</p>
          {b.image && (
            <img
              src={b.image}
              alt={b.comName}
              style={{
                maxWidth: "100%",
                borderRadius: "8px",
                marginTop: "10px",
              }}
            />
          )}
          <p style={{ marginTop: "10px" }}>{b.description}</p>
        </div>
      ))}
    </div>
  );
}

export default BirdsList;

