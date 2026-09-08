import Image from "next/image";

export function TypographicPortrait() {
  return (
    <div className="portrait-wrap" aria-label="Portrait of Ariel Nazareno - System Identification">
      <div className="portrait-hud-top">
        <span><i /> SYSTEM READY</span>
        <span>USER: ARIEL</span>
      </div>
      <div className="portrait-hud-role">ROLE: ERP_SUPPORT</div>
      <div className="portrait-media">
        <Image 
          src="/myID.jpg" 
          alt="System Identification Portrait of Ariel Nazareno" 
          fill 
          priority 
          sizes="(max-width: 900px) 90vw, 42vw" 
          className="portrait-image" 
        />
        <div className="portrait-tint" />
        <div className="portrait-grid" />
        <div className="portrait-scanlines" />
        <span className="portrait-crosshair crosshair-top" />
        <span className="portrait-crosshair crosshair-bottom" />
      </div>
      <div className="portrait-hud-bottom">
        <span>ACCESS: GRANTED</span>
        <span>STATUS: VERIFIED ✓</span>
      </div>
      <span className="portrait-tag tag-one">SAP / 01</span>
      <span className="portrait-tag tag-two">DATA / 02</span>
    </div>
  );
}