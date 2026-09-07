import { ImageResponse } from "next/og";

export const alt = "Ariel Nazareno - ERP / SAP Technical Support Specialist";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", padding: "68px", background: "#080b10", color: "#e9f0f7", fontFamily: "sans-serif" }}>
      <div style={{ display: "flex", color: "#7bb7ff", fontSize: 24, letterSpacing: 5 }}>AN / BUILT FROM SYSTEMS</div>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <div style={{ display: "flex", fontSize: 70, fontWeight: 700, letterSpacing: -3 }}>ARIEL NAZARENO</div>
        <div style={{ display: "flex", marginTop: 16, color: "#7bb7ff", fontSize: 30, letterSpacing: 4 }}>ERP / SAP</div>
        <div style={{ display: "flex", fontSize: 38, letterSpacing: 2 }}>TECHNICAL SUPPORT SPECIALIST</div>
      </div>
      <div style={{ display: "flex", color: "#9cadbc", fontSize: 22, letterSpacing: 4 }}>SAP  /  ERP  /  AUTOMATION  /  DATA</div>
    </div>,
    { ...size },
  );
}
