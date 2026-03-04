You are a senior product designer and frontend engineer.

Redesign the entire UI of my Custom PC Builder to look like a modern tech product configurator (similar to Apple or Tesla configurators).

Do NOT change core functionality. Only enhance visuals, layout, and interaction quality.

---

## GLOBAL DESIGN SYSTEM

Create a design system using CSS variables.

Define:
primary color (tech blue or orange accent)
dark background
light background
surface cards
text colors
border radius
shadow elevations

Add theme toggle:
light mode and dark mode
save preference in localStorage

---

## NAVBAR

Redesign navbar:
sticky header
transparent on top
solid on scroll
add theme toggle button
add active page highlight animation

---

## LANDING PAGE

Improve index.html:

Add hero section with gradient background.
Add animated headline.
Add feature icons.
Add "Start Building" CTA with glow hover effect.
Add section explaining design patterns visually.
Add footer with structured columns.

---

## CONFIGURATOR (component.html)

Upgrade wizard UI:

Stepper:

* connected progress line
* checkmarks on completed steps
* animated transitions

Component Cards:
Each card must include:

* product image
* name
* price
* specifications
* select button

When selected:

* highlight border
* glow shadow
* scale animation

---

## BUILD SUMMARY SIDEBAR

Make summary panel sticky.

Add:
animated price change
icons for components
remove button for each component

---

## PERFORMANCE PANEL

Add performance meter to summary sidebar.

Calculate score based on selected CPU and GPU and display:
Gaming Performance
Productivity Performance

Show as animated progress bars.

---

## MICROINTERACTIONS

Add:
hover animations
button ripple effect
smooth page transitions
loading spinner when changing steps

---

## CHECKOUT PAGE

Convert checkout into a modern checkout UI:
card style form
payment icons
order confirmation success screen

Add celebration animation after successful order.

---

## FILES TO MODIFY

style.css
index.html
component.html
build.html
checkout.html
create new file: theme.js

Explain where each code block must be added.

Start by building the CSS design system and dark mode first.
