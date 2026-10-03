# Questfall Resource Art

Следовать [workspace AGENTS.md](../AGENTS.md). Перед изменением artwork читать
[процедуру в README](README.md#adding-and-updating-artwork).

- `artwork-manifest.js` — источник активных путей для `catalog.js`, build и sync.
- Новые изображения добавлять через `source` и AVIF pipeline; не добавлять
  legacy `file`-записи. Мастера живут в `sources/`, готовые `assets/` не править руками.
- Старые `file` сохранять до получения мастеров; `sources` для отдельных размеров
  не должны подменять утверждённый `file` другого слота. SVG и текст оставлять такими.
- Мастер, AVIF и cache сохранять вместе. При выпуске публиковать неизменяемый tag,
  закреплять один exact tag в Application/Admin и выполнять их release-проверки.
