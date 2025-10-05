// src/components/StatusCard/StatusCard.jsx
import "../PanelCard/PanelCard.jsx";
import "./StatusCard.css";
import React from "react";
import Card from "../../../components/Card/Card.jsx";

export default function StatusCard({ title = "Status: ", text }) {
  return (
    <Card className="status-card home-card">
      <strong className="card-title">
        <span className="dot dot-invert" aria-hidden="true">
          ●
        </span>
        {title}
      </strong>
      <p className="card-text strong">{text}</p>
    </Card>
  );
}
