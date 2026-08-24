# AGENTS.md

## Project Type
Pure browser-based simulation (vanilla JS/HTML/CSS). No build system, no package manager, no tests.

## Running
Open `index.html` or `simulation/index.html` directly in a browser. No server required.

## Structure
- Entry: `index.html` (root) → `simulation/index.html`
- Core: `simulation/simulation.js`
- Subsystems: `map/`, `ats/`, `trains/`, `track/`, `interlocking/`, `alarms/`, `translationprovider/`, `uiwindowmanager/`

## No build tooling
- No npm, no tests, no linting, no CI workflows
- Edit JS/HTML/CSS files directly; browser reflects changes on refresh

## Language
Write the code in English but always respond to the conversation in Spanish.