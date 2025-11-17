import { useEffect, useRef } from "react";
import { useReminder } from "../../hooks/useReminder";
import "./Cat.css";

function FoxAssistant() {
  const { alertTask, isAlert, dismissAlert } = useReminder();
  const audioCtxRef = useRef(null);

  useEffect(() => {
    if (!isAlert) return;
    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    if (!AudioCtx) return;
    if (!audioCtxRef.current) {
      audioCtxRef.current = new AudioCtx();
    }
    const ctx = audioCtxRef.current;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = "triangle";
    osc.frequency.value = 660;
    const now = ctx.currentTime;
    gain.gain.setValueAtTime(0, now);
    gain.gain.linearRampToValueAtTime(0.25, now + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.25);
    osc.connect(gain).connect(ctx.destination);
    osc.start(now);
    osc.stop(now + 0.3);
  }, [isAlert]);

  const handleInteraction = () => {
    if (isAlert) dismissAlert();
  };

  const handleKeyDown = (event) => {
    if (!isAlert) return;
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      dismissAlert();
    }
  };

  return (
    <div
      className={`fox-wrapper ${isAlert ? "alert" : "idle"}`}
      role={isAlert ? "button" : undefined}
      tabIndex={isAlert ? 0 : -1}
      aria-label={
        isAlert
          ? "小狐狸提醒：有任务到期，点击我恢复休息状态"
          : "小狐狸提醒助手"
      }
      aria-live="assertive"
      onClick={handleInteraction}
      onKeyDown={handleKeyDown}
    >
      <div className="fox-shadow" />
      <div className="fox-figure">
        <div className="fox-tail" />
        <div className="fox-body">
          <div className="fox-body-fur" />
          <div className="fox-head">
            <div className="fox-ear left" />
            <div className="fox-ear right" />
            <div className="fox-face">
              <span className="fox-eye left" />
              <span className="fox-eye right" />
              <span className="fox-nose" />
              <span className="fox-fluff left" />
              <span className="fox-fluff right" />
              <span className="fox-smile" />
            </div>
          </div>
          <div className="fox-paws">
            <span />
            <span />
          </div>
        </div>
      </div>

      {isAlert && (
        <div className="fox-bubble">
          <p>呼呼～你的任务到时间了！</p>
          {alertTask?.title && (
            <span className="fox-bubble__task">「{alertTask.title}」</span>
          )}
          <small>轻点我，小狐狸就回去趴着啦</small>
        </div>
      )}
    </div>
  );
}

export default FoxAssistant;
