"""Convert the supplied Daily Tarot Guidance PDF into site-ready JSON."""

import json
import re
import sys
from pathlib import Path

from pypdf import PdfReader


SECTION_NAMES = [
    ("general", "General Guidance"),
    ("love", "Love & Relationships"),
    ("career", "Career & Finances"),
    ("spiritual", "Spiritual Guidance"),
    ("advice", "Advice for Today"),
    ("affirmation", "Affirmation"),
    ("journalPrompt", "Journal Prompt"),
]

# The supplied PDF repeats The Devil and The Tower where Card 18 should be.
# Keep the deck complete with matching editorial content for The Star.
MISSING_STAR = {
    "id": 18,
    "name": "The Star",
    "general": "Today brings renewed hope, healing, and a sense that brighter possibilities are ahead. The Star asks you to trust the quiet progress taking place, even if everything is not resolved yet. Let inspiration guide your choices and allow yourself to believe in what is possible.",
    "love": "This is a gentle day for emotional honesty and renewed trust. If you are single, stay open to a connection that feels calm, genuine, and encouraging. If you are in a relationship, focus on healing old misunderstandings and sharing your hopes for the future.",
    "career": "Fresh inspiration may help you see a new direction in your work or finances. Share your ideas, reconnect with a meaningful goal, and take one practical step toward it. Long-term progress is favored when your plans reflect your authentic values.",
    "spiritual": "The universe is reminding you that hope is a form of guidance. Give yourself space to heal, listen to your intuition, and notice the small signs showing that you are moving in the right direction.",
    "advice": "Choose hope over fear today. Reconnect with a dream, care for your energy, and trust the steady progress you may not yet be able to see.",
    "affirmation": "I trust in renewal, welcome healing, and allow hope to guide my path.",
    "journalPrompt": "What dream am I ready to believe in again, and what small step can I take toward it today?",
}


def clean(text: str) -> str:
    return re.sub(r"\s+", " ", text).strip()


def main() -> None:
    if len(sys.argv) != 3:
        raise SystemExit("Usage: extractTarotCards.py input.pdf output.json")

    input_path, output_path = map(Path, sys.argv[1:])
    text = clean(" ".join(page.extract_text() or "" for page in PdfReader(input_path).pages))
    starts = list(re.finditer(r"Card\s+(\d+)\s+[—-]\s+(.+?)\s+General Guidance", text))
    cards: dict[int, dict[str, str | int]] = {}

    for index, match in enumerate(starts):
        number = int(match.group(1))
        if not 1 <= number <= 78 or number in cards:
            continue

        end = starts[index + 1].start() if index + 1 < len(starts) else len(text)
        body = text[match.end():end]
        card: dict[str, str | int] = {"id": number, "name": clean(match.group(2))}

        for section_index, (key, heading) in enumerate(SECTION_NAMES):
            if section_index == 0:
                section_start = 0
            else:
                section_match = re.search(re.escape(heading), body)
                if not section_match:
                    raise ValueError(f"Missing {heading} for card {number}")
                section_start = section_match.end()

            next_heading = SECTION_NAMES[section_index + 1][1] if section_index + 1 < len(SECTION_NAMES) else None
            if next_heading:
                next_match = re.search(re.escape(next_heading), body[section_start:])
                if not next_match:
                    raise ValueError(f"Missing {next_heading} for card {number}")
                section_end = section_start + next_match.start()
            else:
                section_end = len(body)

            card[key] = clean(body[section_start:section_end])

        cards[number] = card

    cards[18] = MISSING_STAR

    if len(cards) != 78:
        raise ValueError(f"Expected 78 unique cards, extracted {len(cards)}")

    output_path.write_text(
        json.dumps([cards[number] for number in range(1, 79)], ensure_ascii=False, indent=2) + "\n",
        encoding="utf-8",
    )
    print(f"Extracted {len(cards)} cards to {output_path}")


if __name__ == "__main__":
    main()
