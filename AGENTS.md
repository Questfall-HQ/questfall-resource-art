# Questfall Resource Art — памятка для следующей задачи

`artwork-manifest.js` — список активных изображений и единственный источник
путей для `catalog.js`, сборки и `bin/sync.mjs`. Сначала прочитайте `README.md`.

## Новое изображение

1. Положите мастер в `sources/<group>/`. PNG здесь допустим: исходники не
   копируются в Application и Admin.
2. Добавьте запись в `artwork-manifest.js` с `group`, `source`, `output`.
   Например, для ресурса: `new_resource: {group: 'resource', source:
   'sources/resources/new-resource.png', output: 'new-resource'}`.
   Для атрибута используйте `group: 'attribute'`, `name` и выходной путь
   `attributes/<name>`. При необходимости можно задать отдельный исходник
   размера через `sources: {tiny: 'sources/...png'}` или `padding` по размерам.
3. Запустите `bun run build:artwork`, затем `bun run check:artwork` и `bun test`.
   Получатся прозрачные AVIF: `tiny` 64 px, `small` 128 px, `large` 256 px.
   `artwork-build-cache.json` хранит хеши; неизменённые варианты не
   пересобираются. Не правьте готовые файлы в `assets/` вручную.
4. Просмотрите три размера на Admin `/system/resources`. Зафиксируйте мастер,
   AVIF и кеш в одном коммите. Выпустите новый неизменяемый Git tag и закрепите
   тот же exact tag в Application и Admin, затем выполните их проверки.

Старые записи с `file` оставлены до получения их исходников. Для них можно
добавить `sources` для отдельных размеров, не меняя утверждённый `file` в
другом слоте (так устроены Gold и Silver). Не добавляйте новые `file`-записи:
проверка пакета требует для нового изображения `source`.
SVG-символы и текст не нужно превращать в AVIF. Дополнительные детали — в
`README.md`.
