You are a senior frontend engineer and UI/UX designer.

Refactor the Custom PC Builder project to separate the marketing landing page from the actual configurator application.

Currently the step-by-step PC builder wizard exists in index.html.

You must:

MOVE the entire configurator wizard interface (step progress bar, component cards, sidebar summary, navigation buttons, and scripts) FROM index.html TO component.html.

After moving, index.html must become a clean informational landing page explaining the website.

---

## NEW PAGE RESPONSIBILITIES

index.html = Landing / Introduction page
component.html = Actual PC Builder application

---

## INDEX.HTML REQUIREMENTS (Landing Page)

This page should NOT contain the configurator UI.

It must include the following sections:

1. Hero Section

   * Website name: "Custom PC Builder"
   * Headline: "Design your perfect computer before you buy it"
   * Short description explaining that users can select parts, check compatibility, and estimate cost
   * Primary button: "Start Building" → navigates to component.html

2. How It Works Section
   3 steps with icons:

   * Choose components
   * Check compatibility automatically
   * Review build and simulate checkout

3. Features Section
   Explain what the site helps users do:

   * Prevent incompatible hardware
   * Estimate budget
   * Learn PC parts
   * Experiment with configurations

4. Design Patterns Section (important for project presentation)
   Briefly explain:

   * Singleton stores current build
   * Factory creates components
   * Builder assembles the PC
   * Observer updates UI
   * Strategy handles pricing
   * Decorator adds add-ons

5. Call To Action Section
   Button: "Open PC Configurator" → component.html

Add a footer with project info.

---

## COMPONENT.HTML REQUIREMENTS

This page becomes the application.

It must contain:

* step wizard UI
* progress bar
* component cards
* summary sidebar
* next/back navigation

Ensure all scripts previously used in index.html are correctly linked here.

---

## ROUTING & NAVIGATION

Navbar:

* Home → index.html
* Build PC → component.html
* Checkout → checkout.html

The "Start Building" button on index.html must open component.html.

---

## CODE ORGANIZATION

Do not duplicate scripts.

Move all builder-related JavaScript to component.html.

Keep styling shared using the same style.css.

Explain exactly which code blocks must be removed from index.html and placed into component.html.

After refactoring, the website should open on index.html and the user begins the builder only after clicking Start Building.
