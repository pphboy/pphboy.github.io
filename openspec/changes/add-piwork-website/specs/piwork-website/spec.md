# Spec Delta

## Purpose

Give technical users an English and Simplified Chinese product introduction and accurate documentation for trying Piwork and understanding its portable Work model.

## ADDED Requirements

### Requirement: Explain the three core concepts

The website SHALL describe Piwork as a shareable, runnable AI workspace powered by an evolvable Harness. It SHALL explain Work as the portable workspace, Service as its capabilities, and Harness as its intelligent execution layer, with current behavior distinguished from future direction.

#### Scenario: First visit
- **WHEN** a visitor opens the homepage
- **THEN** they can find the three concepts, the Work lifecycle, prerequisites, and a Get Started link without a long marketing page

### Requirement: Provide useful and verifiable documentation

The website SHALL contain Getting Started, Work/Service/Harness concepts, Kanban Demo, and Work/Service/Harness Spec pages. Commands and formats MUST match the actual Piwork source. Missing demo assets and unverified behavior MUST be identified explicitly.

#### Scenario: Try the current Docker delivery
- **WHEN** a Docker-capable user follows installation and first-Work instructions
- **THEN** they receive real setup files, startup and Desktop commands, and the stop/export/import/start sequence

#### Scenario: Read the Kanban page
- **WHEN** no public Kanban archive or recording exists
- **THEN** the page explains the intended demo, a reproducible build/import path, and its missing release materials without invented assets

### Requirement: Serve independently under the product path

Website documentation SHALL be available in English and Simplified Chinese only, with English at `/piwork/` and Chinese at `/piwork/zh/`. Both versions SHALL cover the same guides, concepts, demo, and specifications. Website navigation, assets, and direct documentation URLs MUST work under `/piwork/` with readable desktop and mobile layouts and the default light/dark theme.

#### Scenario: Change language on a documentation page
- **WHEN** a reader uses the language selector on a guide, concept, demo, or specification page
- **THEN** the corresponding page loads in the selected language, with localized navigation and search

#### Scenario: Open a deep link
- **WHEN** a visitor directly opens a concept or guide URL beneath `/piwork/`
- **THEN** the page, navigation, and assets load from the same product base path
