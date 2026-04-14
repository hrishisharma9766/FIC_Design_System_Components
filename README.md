# fic-designsystem-components

Evaa Design System components for React.

This repository contains:

- A publishable component library (Vite + React + TypeScript)
- A local showcase app to preview components during development (see [App.tsx](file:///d:/First%20Insight%20Company/New%20folder/designcheck/src/App.tsx))

Figma source: https://www.figma.com/design/H9nMooeYt4KObEGnhqxE1A/Evaa-Design-System-V.2

## Install

```bash
npm i fic-designsystem-components
```

Peer dependencies:

- react >= 18
- react-dom >= 18

## Usage

Import the stylesheet once (recommended in your app entry):

```ts
import 'fic-designsystem-components/style.css';
```

Then import and use components:

```tsx
import { Button, PillBadge, TreeListCheckboxes } from 'fic-designsystem-components';

export function Example() {
  return (
    <div>
      <Button variant="primary">Primary</Button>
      <PillBadge variant="blue" size="sm">Eligibility Verification</PillBadge>
      <TreeListCheckboxes ariaLabel="Tree list checkboxes" />
    </div>
  );
}
```

Notes:

- `style.css` includes the design tokens and component styles used by this library.
- `theme.css` is exported as an alias of `style.css` for compatibility:

```ts
import 'fic-designsystem-components/theme.css';
```

## Exports

This package ships:

- ESM: `dist/index.mjs` (via `exports.import`)
- CJS: `dist/index.cjs` (via `exports.require`)
- Types: `dist/index.d.ts`
- CSS: `dist/style.css`

Browse the full export surface in [index.ts](file:///d:/First%20Insight%20Company/New%20folder/designcheck/src/index.ts).

## Development

Run the local component showcase:

```bash
npm run dev
```

Other commands:

```bash
npm run build
npm run lint
npm run preview
```

## Publishing

`prepublishOnly` runs `npm run build` automatically.

```bash
npm publish
```

## License

MIT (see [LICENSE](file:///d:/First%20Insight%20Company/New%20folder/designcheck/LICENSE)).
