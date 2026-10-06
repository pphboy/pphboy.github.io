# Spec Delta

## Purpose

Publish independent product documentation on the existing blog domain without either deployment removing the other site's files or overwriting concurrent commits.

## ADDED Requirements

### Requirement: Limit product deployment to its own subtree

Product deployment SHALL replace only `gh-pages/piwork/`. Every tracked file outside that path MUST retain its content and Git mode. Deployment MUST fail before pushing if its changes escape that scope or its generated homepage is absent.

#### Scenario: Publish product updates
- **WHEN** Piwork is deployed over an existing Pages branch
- **THEN** obsolete product files are removed, new product files are copied, and root blog files remain unchanged

### Requirement: Protect product files during blog deployment

The existing blog deployment entry point SHALL continue publishing the generated blog while preserving `piwork/` and root hosting controls. Deployments MUST use normal non-force pushes and retry against the newest branch on competing updates.

#### Scenario: Blog deployment follows product deployment
- **WHEN** the maintainer runs the existing blog deploy command
- **THEN** the blog is updated and the current Piwork subtree remains unchanged

#### Scenario: Another publisher wins a push race
- **WHEN** a concurrent update reaches the Pages branch first
- **THEN** deployment reapplies its own scoped update to the latest branch or fails safely without discarding the other update

### Requirement: Automate product deployment independently

Product source changes on main SHALL trigger a locked dependency install, build, validation, and scoped Pages-branch deployment. Pull requests SHALL build without publishing, and manual deployment SHALL be available.

#### Scenario: Review a pull request
- **WHEN** a pull request changes the product site
- **THEN** automation builds and validates it without modifying the Pages branch
