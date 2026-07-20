"use client";

import { useState } from "react";
import tarotCards from "@/lib/tarotCards.json";

type TarotCard = (typeof tarotCards)[number];

const majorElements = ["Spirit", "Air", "Earth", "Fire", "Water"];

function cardMeta(card: TarotCard) {
  const suits = ["Wands", "Cups", "Swords", "Pentacles"];
  const suit = suits.find((item) => card.name.includes(item));
  const element = suit === "Wands" ? "Fire" : suit === "Cups" ? "Water" : suit === "Swords" ? "Air" : suit === "Pentacles" ? "Earth" : majorElements[card.id % majorElements.length];
  const words = card.advice
    .replace(/[^a-zA-Z ]/g, " ")
    .split(/\s+/)
    .filter((word) => word.length > 5)
    .slice(0, 3);
  return { element, keywords: words.length === 3 ? words : ["clarity", "guidance", "growth"] };
}

function roman(value: number) {
  const map: Array<[number, string]> = [[50, "L"], [40, "XL"], [10, "X"], [9, "IX"], [5, "V"], [4, "IV"], [1, "I"]];
  let number = value;
  return map.reduce((result, [unit, symbol]) => {
    while (number >= unit) { result += symbol; number -= unit; }
    return result;
  }, "");
}

export function DailyCardDraw() {
  const [card, setCard] = useState<TarotCard | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);

  function drawCard() {
    if (isDrawing) return;
    setIsDrawing(true);
    window.setTimeout(() => {
      let selected = tarotCards[Math.floor(Math.random() * tarotCards.length)];
      if (tarotCards.length > 1 && selected.id === card?.id) {
        selected = tarotCards[selected.id % tarotCards.length];
      }
      setCard(selected);
      setIsDrawing(false);
    }, 1450);
  }

  return (
    <>
      <section className="cosmic-draw" aria-labelledby="daily-guidance-title">
        <div className="cosmic-stars" aria-hidden="true" />
        <header className="cosmic-heading">
          <p>✦ &nbsp; The Oracle &nbsp; ✦</p>
          <h1 id="daily-guidance-title">Your Daily Draw</h1>
          <span>Still your mind. Hold your question. When you are ready, reach<br />into the deck.</span>
        </header>

        {!card && !isDrawing ? (
          <div className="oracle-opening">
            <blockquote>“The cards do not predict what will happen. They illuminate what is already happening beneath the surface of your awareness.”</blockquote>
            <strong>— THE ALIEYA METHOD</strong>
            <button type="button" onClick={drawCard}>Draw a Card</button>
          </div>
        ) : (
          <div className={`cosmic-result${isDrawing ? " consulting" : ""}`}>
            <div className="cosmic-card-column">
              <div className={`cosmic-card${card ? ` card-tone-${card.id % 4}` : ""}`}>
                {isDrawing ? (
                  <div className="consulting-copy"><b>✦</b><span>Consulting…</span></div>
                ) : card ? (
                  <>
                    <div className="card-sky"><span>✦</span><i>☾</i><span>· ✧ ·</span></div>
                    <div className="card-horizon" />
                    <div className="cosmic-card-name"><small>{roman(card.id)}</small><strong>{card.name}</strong></div>
                  </>
                ) : null}
              </div>
              <button className="draw-another" type="button" onClick={drawCard} disabled={isDrawing}>
                {isDrawing ? "Consulting" : "Draw Another"}
              </button>
            </div>

            {isDrawing ? (
              <div className="consulting-quote">
                <blockquote>“The cards do not predict what will happen. They illuminate what is already happening beneath the surface of your awareness.”</blockquote>
                <strong>— THE ALIEYA METHOD</strong>
              </div>
            ) : card ? <CompactReading card={card} /> : null}
          </div>
        )}
      </section>

      {card && !isDrawing ? <FullReading card={card} /> : null}
    </>
  );
}

function CompactReading({ card }: { card: TarotCard }) {
  const meta = cardMeta(card);
  const summary = card.general.split(/(?<=[.!?])\s/)[0];
  return (
    <div className="compact-reading">
      <p>{roman(card.id)} &nbsp;—&nbsp; {meta.element} &nbsp;—&nbsp; {meta.keywords.join(", ")}</p>
      <h2>{card.name}</h2>
      <span className="compact-rule" />
      <strong>{summary}</strong>
      <div className="keyword-panel">
        <small>Keywords</small>
        <div>{meta.keywords.map((word) => <span key={word}>{word}</span>)}</div>
      </div>
    </div>
  );
}

function FullReading({ card }: { card: TarotCard }) {
  const sections = [
    ["General Guidance", card.general, "✦"],
    ["Love & Relationships", card.love, "♡"],
    ["Career & Finances", card.career, "◇"],
    ["Spiritual Guidance", card.spiritual, "☾"],
  ] as const;
  return (
    <section className="card-reading" id="daily-card-reading" aria-labelledby="full-card-name">
      <div className="reading-copy">
        <p className="eyebrow">Your complete guidance</p>
        <h2 id="full-card-name">{card.name}</h2>
        <p className="reading-lead">Read your message with an open mind and trust your intuition. This guidance is here to help you navigate today’s energy.</p>
        <div className="guidance-grid">
          {sections.map(([title, content, symbol]) => <article key={title}><span aria-hidden="true">{symbol}</span><div><h3>{title}</h3><p>{content}</p></div></article>)}
        </div>
        <div className="daily-advice"><p className="eyebrow">Advice for Today</p><p>{card.advice}</p></div>
        <div className="affirmation-card"><span aria-hidden="true">✦</span><p className="eyebrow">Today’s Affirmation</p><blockquote>{card.affirmation}</blockquote></div>
        <div className="journal-prompt"><span aria-hidden="true">☾</span><div><h3>Journal Prompt</h3><p>{card.journalPrompt}</p></div></div>
      </div>
    </section>
  );
}
