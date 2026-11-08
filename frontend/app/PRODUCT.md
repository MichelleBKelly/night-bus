# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

- **Drivers (primary):** Part-time paid drivers of KW AccessAbility's single accessible bus, including a new team member with no background. They run occasional out-of-town trips and log each one: readings at the lot, pickup at the office, the trip, fuel, and end-of-trip drop-offs. They may drive the bus rarely, so every run can feel like the first.
- **Staff:** Edward Faruzel (executive director) and Robert Wismer. They set up trips (date, driver, volunteer or paid, hourly rate, confirmed members, destination and up to 3 stops), send them to the driver, review completed trip sheets, correct numbers, log repairs, and report bus costs. Staff are older adults.
- **Members (not users):** Members phone in to register and never use the app. Most have vision loss. Some use wheelchairs. They appear in the app as records only.

## Product Purpose

Replaces the paper trip sheet for KW AccessAbility's accessible bus. Drivers log each trip step by step, and staff review it and report the bus's costs (kilometres, hours, fuel, pay, repairs) separately from the rest of the agency.

Success means:
1. A clickable prototype that hackathon judges understand by the CommuniHacks 2026 deadline (Sun 8 Nov 2026, 2 PM).
2. Staff actually adopt it in place of the paper sheet once the bus arrives next spring.

## Positioning

The app is built around one small agency's single bus and its real process: the office plans the run, the driver records only what happens on the day, and the bus's costs come out separate from the rest of the agency. It is not a general fleet or dispatch tool.

## Operating Context

- The bus is a retired GRT Mobility Plus bus, expected next spring. It doesn't exist yet, and drivers aren't hired yet.
- The office is on 13th Street East, Kitchener. Trips start at the bus lot, pick members up at the office, and go to one destination plus up to 3 stops before or after it.
- Each member's drop-off on the way back is chosen per person: the office by default, their home, their usual spot, or another address. A home drop-off needs a reason.
- Member registration stays in the existing Microsoft Access database. The app keeps its own Members list (full name, home address, wheelchair).
- Addresses are in Kitchener–Waterloo and nearby, and every address ends with a city.

## Capabilities and Constraints

- Static HTML/CSS/JS screens built mobile-first in a single page column. The prototype stores data in the browser (`data.js`) and uses sample PINs.
- A teammate-built backend exists in a separate GitHub repository, but the link hasn't been shared here yet. How and whether this front end connects to it is undecided.
- Hours and pay are calculated from start and end times. Driver entries save as they go.
- Out of scope for v1: live GPS tracking and routing, receipts on repairs, and date of birth on members (next release).
- Undecided product facts (full list in `DESIGN_DECISIONS.md` › Open questions):
  - when paid time starts;
  - what the funding rules allow for driver hours;
  - which totals the funder requires;
  - whether the hourly rate is per driver or per trip;
  - the real home drop-off reasons;
  - "Kilometres" vs "Mileage";
  - how changes to the run on the day get recorded.

## Brand Commitments

- The organization's name is **KW AccessAbility** (not "Assess Ability" or "KW Access Ability"; see D-090).
- Voice: plain language, short labels, screen titles that name the task (see `DESIGN_DECISIONS.md` for the copy decisions D-001 to D-069 and later).

## Evidence on Hand

- `DESIGN_DECISIONS.md`: the running decision log and open questions from the hackathon.
- `COMPONENTS.md`: the component inventory.
- `data.js`: sample staff, drivers, members and Kitchener–Waterloo streets. All names and PINs are invented sample data.
- Not on hand: the old paper trip form (still to get from the office), the funder's reporting requirements, real testimonials, and usage data. Do not fabricate any of these.

## Product Principles

1. **Paper first, then better.** Match what the paper sheet and the office already do before adding anything new.
2. **The office plans, the driver records.** Drivers get the fewest possible steps, each saved as they go.
3. **Defaults with an override.** Where the real process is unknown, pick a sensible default and let staff change it.
4. **Bus costs stand alone.** Every recorded number should roll up into separate bus-cost reporting.
5. **Only what v1 needs.** Defer GPS, receipts and other extras until the process is confirmed with Ed and Rob.

## Accessibility & Inclusion

Senior-friendly for older staff and new drivers: large type, high contrast, plain language, few steps, real radio buttons and checkboxes, native date and time pickers, errors shown under the field, and a clear heading order (h1 task, h2 trip and sections, h3 groups). Members with vision loss don't use the app.
