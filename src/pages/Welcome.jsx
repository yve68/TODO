import { Link } from "react-router-dom";

function WelcomePage() {
  return (
    <div className="welcome">
      <div className="welcome__glow" />
      <p className="welcome__eyebrow">轻盈的日常 · 治愈的节奏</p>
      <h1 className="welcome__title">TODOFLOW</h1>
      <p className="welcome__tagline">自信掌控每一个闪闪发亮的瞬间 ✨</p>
      <Link className="welcome__cta" to="/app">
        开始安排今天
      </Link>
    </div>
  );
}

export default WelcomePage;
