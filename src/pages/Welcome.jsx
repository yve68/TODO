import { Link } from "react-router-dom";

function WelcomePage() {
  return (
    <div className="welcome">
      <div className="welcome__glow" />
      <p className="welcome__eyebrow">轻盈的日常 · 治愈的节奏</p>
      <h1 className="welcome__title">TODOFLOW</h1>

      <Link className="welcome__cta" to="/app">
        开始安排今天
      </Link>
    </div>
  );
}

export default WelcomePage;
