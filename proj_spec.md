You are a senior full-stack software engineer.

Your task is to generate a complete 4-page website project called **Custom PC Builder** using Node.js, Express, HTML, CSS and Vanilla JavaScript.

The goal of this project is to demonstrate multiple software design patterns inside a real working website.

The code must be clean, beginner-readable, and separated into modules.

---

## PROJECT DESCRIPTION

The website allows a user to assemble a custom desktop computer by selecting components (CPU, GPU, RAM, Motherboard, Storage, PSU, Cabinet), view the build, check compatibility, and simulate checkout.

The system must remember the user’s selected parts across all pages.

There is no database. Use in-memory storage and browser localStorage.

---

## PAGES (exactly 4)

1. Home Page (index.html)

* shows categories of components
* clicking a category opens the component selection page

2. Component Page (component.html)

* shows list of available components
* user can click "Add to Build"

3. My Build Page (build.html)

* displays all selected parts
* shows total price
* shows compatibility warnings

4. Checkout Page (checkout.html)

* select payment method
* select optional add-ons
* show final cost
* simulate purchase success

---

## REQUIRED DESIGN PATTERNS

1. SINGLETON PATTERN
   File: BuildManager.js

Responsibilities:

* store selected components
* store total price
* provide addComponent(), removeComponent(), getBuild()
* only one instance allowed in entire app

All pages must use the same instance.

---

2. FACTORY PATTERN
   File: ComponentFactory.js

Create component objects:

* CPU
* GPU
* RAM
* Motherboard
* Storage
* PSU
* Cabinet

Each class must have:

* name
* price
* specifications
* getDetails()

Factory method:
createComponent(type, data)

---

3. BUILDER PATTERN
   File: PCBuilder.js

Construct the final PC step-by-step.

Methods:
setCPU()
setGPU()
setRAM()
setMotherboard()
setStorage()
setPSU()
setCabinet()
build()

Returns a PC object containing full configuration.

---

4. OBSERVER PATTERN
   Files: Observer.js

The BuildManager must allow subscribers.

When components change:

* UI updates automatically
* total price recalculates
* compatibility check runs

Provide:
subscribe()
unsubscribe()
notify()

---

5. STRATEGY PATTERN
   File: PricingStrategy.js

Different pricing behaviors:

* RegularPricing
* StudentDiscountPricing
* FestivalPricing

Checkout page selects a pricing strategy dynamically.

Also implement PaymentStrategy:

* UPIPayment
* CardPayment
* CODPayment

---

6. DECORATOR PATTERN
   File: AddonsDecorator.js

Add optional features to a PC:

* ExtendedWarranty
* RGBLighting
* ProfessionalAssembly

Each decorator adds:

* extra cost
* description

---

7. COMPATIBILITY CHECKER
   File: CompatibilityChecker.js

Must automatically validate:

* CPU socket vs motherboard
* RAM type vs motherboard
* PSU wattage vs GPU requirement

Return warnings for build page.

---

## BACKEND

Use Node.js + Express.

Provide API endpoints:

GET /components
GET /build
POST /build/add
POST /build/remove
POST /checkout

No database. Store build in memory.

---

## FRONTEND

Use vanilla JS (no React).

Requirements:

* fetch API for backend calls
* dynamic DOM updates
* navbar shows selected parts count
* localStorage used to persist session

---

## STYLING

Create clean responsive CSS.
Simple modern card layout.
Use flexbox or grid.

---

## WHAT TO GENERATE

1. folder structure
2. package.json
3. server.js
4. all JS modules
5. all HTML pages
6. CSS file
7. example component data

Write code file-by-file and explain where each file should be saved.

Do not skip files. Do not summarize code.
