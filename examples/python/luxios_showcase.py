from __future__ import annotations

from dataclasses import dataclass
from typing import Final, Iterable

DEFAULT_ACCENT: Final[str] = "#D6B56D"


@dataclass(frozen=True)
class ThemeSample:
    name: str
    enabled: bool = True

    def label(self) -> str:
        return f"{self.name}: {'ready' if self.enabled else 'paused'}"


def visible_themes(samples: Iterable[ThemeSample]) -> list[str]:
    return [sample.label() for sample in samples if sample.enabled]


def main() -> None:
    samples = [ThemeSample("Luxios"), ThemeSample("Midnight", enabled=False)]
    try:
        print(" | ".join(visible_themes(samples)))
    except ValueError as error:
        print(f"Unexpected theme data: {error!s}")


if __name__ == "__main__":
    main()
