You are a senior frontend UI/UX engineer.

Refactor the existing Custom PC Builder frontend into a **step-by-step configuration wizard interface** instead of a category grid.

GOAL:
The user should select PC parts in a guided sequence, one category at a time, instead of seeing all categories simultaneously.

---

## NEW USER FLOW

Convert the homepage into a configurator wizard.

Steps order:

1. CPU
2. Motherboard
3. RAM
4. GPU
5. Storage
6. PSU
7. Cabinet
8. Review Build

The page must only display ONE category at a time.

When a component is selected:

* automatically save it using BuildManager
* move to the next step

Include:
Next button
Back button

---

## LAYOUT REQUIREMENTS

The page layout must contain 3 main sections:

1. Top progress indicator

   * horizontal stepper bar
   * shows all steps
   * highlights current step
   * completed steps should show a checkmark

2. Main selection area (center)

   * cards for components of the current category
   * each card shows:
     name
     price
     key specs
     "Select" button

3. Build Summary Sidebar (right side)

   * always visible
   * shows selected components
   * shows running total price
   * updates automatically via Observer pattern

---

## UI BEHAVIOR

When user selects a component:

* highlight selected card
* save to BuildManager
* notify observers
* update sidebar total
* enable Next button

Back button:

* returns to previous category
* keeps previous selections

Progress bar must update dynamically.

---

## STYLING REQUIREMENTS

Use modern clean UI:

* soft shadows
* rounded cards
* accent color for selected items
* responsive layout
* flexbox or CSS grid

Add hover animations to component cards.

---

## FILES TO MODIFY

Refactor and generate code for:

index.html
component.html (merge into wizard if necessary)
style.css
main.js (or frontend controller)

Create a StepController.js that manages:

* current step
* navigation
* step validation

---

## INTEGRATION

The wizard must use:
BuildManager singleton
Observer pattern to update sidebar
ComponentFactory when selecting items

Do not remove existing logic. Refactor it to work with the step wizard.

Explain where each new code block should go.
