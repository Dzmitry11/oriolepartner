# ORIOLE_PARTNER

Подробная документация для разработчиков.

## О проекте
ORIOLE_PARTNER — фронтенд-приложение на TypeScript с React и Vite. Проект построен с современным стеком: React 19, TypeScript, Vite, TailwindCSS, TanStack (router и query), Radix UI и интеграцией Supabase для бэкенда/хранилища данных.

Этот README помогает новым разработчикам быстро запустить проект, понять структуру, окружение и рекомендуемые практики.

---

## Технологии (основные)
- Язык: TypeScript
- UI: React 19, TailwindCSS, Radix UI, Lucide icons
- Маршрутизация/данные: @tanstack/react-router, @tanstack/react-query
- Бэкенд: @supabase/supabase-js (клиент)
- Формы и валидация: react-hook-form, zod
- Бандлер: Vite
- Утилиты: date-fns, recharts, embla-carousel и т. п.

---

## Требования
- Node.js (рекомендуется LTS, например 18.x или новее)
- npm (или yarn/pnpm)
- Рекомендуется использовать nvm для управления версиями Node.js

---

## Быстрый старт (локально)
1. Клонируйте репозиторий:
   ```bash
   git clone <this-repository-url>
   cd <repository-name>
   ```

2. Установите зависимости:
   ```bash
   npm install
   ```

3. Создайте файл окружения (см. раздел "Переменные окружения") и заполните секреты.

4. Запустите режим разработки:
   ```bash
   npm run dev
   ```

Обычно Vite поднимает сервер по адресу http://localhost:5173. Проверьте вывод в консоли для точного адреса.

---

## Скрипты (package.json)
- npm run dev — запуск в режиме разработки
- npm run build — сборка production
- npm run build:dev — сборка в режиме development
- npm run preview — предварительный просмотр собранного билда
- npm run lint — запуск ESLint
- npm run format — запуск Prettier (форматирование)

---

## Переменные окружения
Создайте `.env.local` (или используйте секреты в CI) и добавьте переменные с префиксом `VITE_`, чтобы они были доступны в клиентском коде через `import.meta.env`.

Пример `.env.example`:
```
# Supabase
VITE_SUPABASE_URL=https://your-supabase-url.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key

# Прочие переменные (пример)
# VITE_API_BASE_URL=https://api.example.com
```

Не храните реальные ключи в публичных репозиториях.

---

## Рекомендованный пример инициализации Supabase
Создайте `src/lib/supabase.ts` (пример):
```ts
import { createClient } from '@supabase/supabase-js'

const url = import.meta.env.VITE_SUPABASE_URL as string
const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string

if (!url || !anonKey) {
  throw new Error('Supabase env variables are not set (VITE_SUPABASE_URL / VITE_SUPABASE_ANON_KEY)')
}

export const supabase = createClient(url, anonKey)
```

---

## Структура проекта (ожидаемая / ориентировочно)
- src/
  - components/ — переиспользуемые UI-компоненты
  - features/ или modules/ — доменные фичи
  - routes/ — маршруты (TanStack Start использует file-based routing)
  - hooks/ — кастомные хуки
  - lib/ или services/ — инициализации и клиенты (supabase, api)
  - styles/ — глобальные стили, Tailwind
- public/ — статические ресурсы (иконки, логотипы)
- package.json, tsconfig.json, vite.config.ts

Откройте реальные папки в `src/` для точной структуры — названия папок могут отличаться.

---

## Разработка и рабочий процесс
- Ветки: используйте feature-ветки: `feature/<имя>`, `fix/<описание>`.
- Коммиты: понятные сообщения, например `feat:`, `fix:`, `chore:`, `docs:`.
- Pull Request: подробное описание изменений, скриншоты и список проверок.
- Не выполнять force-push в общих ветках (особенно в `main`).

---

## Code style и проверки
- ESLint + Prettier настроены (скрипты: lint, format).
- Перед пушем запускайте:
  ```bash
  npm run lint
  npm run format
  ```
- Рекомендуется добавить pre-commit хуки (husky) и автоформатирование при коммитах.

---

## Тесты
В package.json тестовых команд нет. Рекомендуется добавить Vitest + Testing Library:
- npm run test — запуск тестов
- npm run test:watch — запуск в режиме watch

---

## CI / CD и деплой
- Сборка: `npm run build` → папка `dist`.
- Деплой: Vercel/Netlify/Static server — настройте переменные окружения в панели хостинга.
- Если есть серверные функции (Nitro/SSR), настройте соответствующие окружения.

---

## Рекомендации по безопасности
- Никогда не коммитьте секреты (ключи, пароли) в репозиторий.
- Используйте переменные окружения в CI/хостинге.
- Для чувствительных операций (админ, бэкенд) используйте серверную авторизацию.

---

## Troubleshooting
- Проблемы с зависимостями: удалите `node_modules` и `package-lock.json` и выполните `npm install`.
- Ошибки сборки Vite: проверьте версии плагинов и конфигурацию `vite.config.ts`.
- Проблемы сетевых запросов к Supabase: проверьте правильность `VITE_SUPABASE_URL` и `VITE_SUPABASE_ANON_KEY`, CORS и правила в проекте Supabase.

---

## Что можно улучшить (рекомендации)
- Добавить `./.env.example` и `src/lib/supabase.ts` (пример выше).
- Добавить файл CONTRIBUTING.md с правилами ветвления/commit message/PR.
- Добавить LICENSE (например MIT).
- Настроить тестовую среду (Vitest) и пример тестов.
- Настроить CI (GitHub Actions) для lint/build/test.
- Убрать/переосмыслить devDependency `@lovable.dev/vite-tanstack-config`, если проект не использует Lovable.

---

## Вклад
1. Форк/ветка: `git checkout -b feature/your-feature`
2. Коммиты: небольшие и атомарные
3. PR: опишите причины и изменения, добавьте скриншоты/демо при необходимости

---

## Контакты / поддержка
Если возникли вопросы по архитектуре или настройке — создайте Issue в репозитории с подробным описанием окружения и шагах для воспроизведения.

---
