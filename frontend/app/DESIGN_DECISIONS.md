# Design Decisions: KW AccessAbility bus trip sheet

## Project context
- Goal: Replace the paper trip sheet for KW AccessAbility's one accessible bus, which runs occasional out-of-town trips. Drivers log each trip. Staff review it and report bus costs (kilometres, hours, fuel, pay, repairs) separately from the rest of the agency.
- Users / audience: Part-time paid drivers, including a new team member with no background, and staff (Ed Crusoe, executive director; Rob Wiseman). Members phone in to register and do not use the app. Staff are older adults, and most members have vision loss.
- Constraints: The bus doesn't exist yet (retired GRT Mobility Plus bus expected next spring), drivers aren't hired yet, and funding rules for driver hours are unknown. Member registration stays in the existing Microsoft Access database. Senior-friendly UI: large type, high contrast, plain language, few steps.
- Role / team / timeline: CommuniHacks 2026, Sat 7 Nov 1 PM to Sun 8 Nov 2 PM. Role and team: not stated.

## Decision index
| ID | Title | Area | Status | Date |
|----|-------|------|--------|------|
| D-001 | Leave live GPS tracking out of v1 | Other | Active | 2026-11-07 |
| D-002 | Member registration stays in the Access database | Architecture | Active (refined by D-050) | 2026-11-07 |
| D-003 | Screen titles name the task, not the trip | UI | Superseded by D-014 | 2026-11-07 |
| D-004 | Split the trip start into lot and office screens | UX flow | Active | 2026-11-07 |
| D-005 | Calculate hours and pay from start and end times | UX flow | Active | 2026-11-07 |
| D-006 | Fuel is its own step after the end readings | UX flow | Active | 2026-11-07 |
| D-007 | Staff home leads with the trip waiting for review | UI | Active (totals part superseded by D-029) | 2026-11-07 |
| D-008 | Review shows the record before correction fields | UI | Active | 2026-11-07 |
| D-009 | Errors appear under the field; the banner keeps the instruction | Accessibility | Active | 2026-11-07 |
| D-010 | Sign-in hides PINs and shows a role tag | UI | Active | 2026-11-07 |
| D-011 | Repair form first, history below | UI | Superseded by D-012 | 2026-11-07 |
| D-012 | Repair actions grouped; history last with two-line rows | UI | Active | 2026-11-07 |
| D-013 | Native date and time pickers | UI | Active | 2026-11-07 |
| D-014 | Driver home: destination is the largest text | UI | Active | 2026-11-07 |
| D-015 | Cost fields accept numbers only | UI | Active | 2026-11-07 |
| D-016 | Driver plans the run by default; staff can preset it | UX flow | Superseded by D-066 | 2026-11-07 |
| D-017 | Show wheelchair spaces and seats left on the driver home | UI | Active | 2026-11-07 |
| D-018 | Same plain label for Wheelchair and Seat; wheelchair users listed first | UI | Active (label part superseded by D-027) | 2026-11-07 |
| D-019 | No assigned seats | UX flow | Active | 2026-11-07 |
| D-020 | Remove the "Always the same" card from the run form | UI | Active | 2026-11-07 |
| D-021 | Destinations are set by the office; driver plans only the times | UX flow | Superseded by D-066 | 2026-11-07 |
| D-022 | Driver entries save as they go, step by step | UX flow | Active | 2026-11-07 |
| D-023 | Staff set up the trip, including volunteer or paid and the hourly rate, before sending it to the driver | UX flow | Active | 2026-11-07 |
| D-024 | Trip details as labelled rows, with a relative date | UI | Active (date format superseded by D-046) | 2026-11-07 |
| D-025 | Sign-in list titled "Team"; trip rows put the status tag under the name | Copy / UI | Active (trip-row part superseded by D-033) | 2026-11-07 |
| D-026 | Staff "Correct a number" is collapsed by default | UX flow | Active | 2026-11-07 |
| D-027 | Wheelchair icon after the member's name instead of a Wheelchair/Seat label | UI | Active | 2026-11-07 |
| D-028 | Heading levels: h1 screen task, h2 trip and sections, h3 groups inside a section | UI / Accessibility | Active | 2026-11-07 |
| D-029 | Bus totals as six figure tiles in pairs, always open | UI | Active (refined by D-030) | 2026-11-07 |
| D-030 | Bus totals in a bordered grid; "Add a repair" is a button | UI | Active (button part superseded by D-038) | 2026-11-07 |
| D-031 | Top account bar with name, role and Sign out replaces "Signed in as / Switch person" | UI / UX flow | Superseded by D-032 | 2026-11-07 |
| D-032 | Compact profile menu: first name at top right, tap for name, role and Sign out | UI / UX flow | Active | 2026-11-07 |
| D-033 | Other trips as bordered tap rows with "Today · Not sent yet" in plain text | UI | Active | 2026-11-07 |
| D-034 | Staff home titled "Trips"; the lead trip is a section, not the page title | UI / IA | Active | 2026-11-07 |
| D-035 | Staff home sections share one pattern: heading outside, bordered content; totals state their scope | UI / Copy | Active | 2026-11-07 |
| D-036 | Trip details boxed under the page title; members grouped by where they got off | UI / Copy | Active (members part superseded by D-043) | 2026-11-07 |
| D-037 | Review confirmation with Undo, and a review record on the trip | UX flow / Data | Active | 2026-11-07 |
| D-038 | Repairs get their own section and page; no action button inside Bus totals | IA / UI | Active | 2026-11-07 |
| D-039 | "On file" repairs as bordered rows, newest first, outside the form | UI | Active (renamed by D-040) | 2026-11-07 |
| D-040 | "Repair history" with a running total; money shows thousands separators | Copy / UI | Active | 2026-11-07 |
| D-041 | Release 1 repairs: cost, what was done, date only; receipts later | Scope | Active | 2026-11-07 |
| D-042 | Times shown in 12-hour AM/PM; stored as 24-hour | UI / Copy | Active | 2026-11-07 |
| D-043 | Members as one list with each person's drop-off; Blue Jays sample drops everyone at home | UI / Data | Active (refined by D-047) | 2026-11-07 |
| D-044 | Back is a small "‹ Trips" link at the top, not a full-width button at the bottom | UI / IA | Active | 2026-11-07 |
| D-045 | Trip status is a plain "Status" row in the trip details, not a boxed tag | UI | Active (wording refined by D-057) | 2026-11-07 |
| D-046 | Dates read "Friday, November 6" | Copy | Active | 2026-11-07 |
| D-047 | Home drop-off needs a reason: Late return, Weather conditions, or Other | UX flow / Data | Active (refined by D-054, D-055) | 2026-11-07 |
| D-048 | Staff tick confirmed members in "Set up this trip", with spaces left | UX flow | Active | 2026-11-07 |
| D-049 | Choices use real radio buttons and checkboxes | UI / Accessibility | Active | 2026-11-07 |
| D-050 | Staff Members page: full name, home address, wheelchair; date of birth next release | IA / Scope | Active (screen name refined by D-061) | 2026-11-07 |
| D-051 | Instruction banners stay for the demo; in the product they show only during onboarding or the first few times | UX flow / Content | Active | 2026-11-07 |
| D-052 | Home address suggests Kitchener–Waterloo streets as you type | UI | Active | 2026-11-07 |
| D-053 | Save buttons sit inside the form's card | UI | Active | 2026-11-07 |
| D-054 | Reason folds into the Drop-off row; optional when staff set up the trip | UI / UX flow | Active (Clear button superseded by D-062) | 2026-11-07 |
| D-055 | "Drop-off on the way back" shortened to "Drop-off" | Copy | Active | 2026-11-07 |
| D-056 | "Add a second destination" with an example of what it's for | Copy / UX flow | Superseded by D-063 | 2026-11-07 |
| D-057 | Unsent trip status reads "Draft" | Copy | Active | 2026-11-07 |
| D-058 | Staff manage drivers: add, edit, remove, and pick one per trip | IA / UX flow / Data | Active | 2026-11-07 |
| D-059 | Date and driver are editable fields in "Set up this trip", not an Edit mode | UX flow | Active | 2026-11-07 |
| D-060 | More space between sections on list pages | UI | Active | 2026-11-07 |
| D-061 | "Change member details" renamed "Edit member" | Copy | Active | 2026-11-07 |
| D-062 | Tap a ticked reason again to clear it; no Clear button | UI | Active | 2026-11-07 |
| D-063 | One destination per trip, plus up to 3 stops before or after it | UX flow / Data | Active | 2026-11-07 |
| D-064 | Member drop-off spots are separate from destinations | UX flow / Data | Active (trip-wide choice superseded by D-069) | 2026-11-07 |
| D-065 | One planned time: pickup at the office; no leave-the-lot time | UX flow / Copy | Active (refined by D-066) | 2026-11-07 |
| D-066 | The office plans the run; the driver has 4 steps | UX flow | Active | 2026-11-07 |
| D-067 | Run rows read "Pickup", "Destination", "Stop" on the left, the place on the right | UI / Copy | Active | 2026-11-07 |
| D-068 | Every address ends with a city | Data / Copy | Active | 2026-11-07 |
| D-069 | Drop-off is chosen per member: office by default, home, usual spot, or another address | UX flow / Data | Active | 2026-11-07 |
| D-070 | Run rows stack the answer under the label | UI | Superseded by D-071 | 2026-11-07 |
| D-071 | "The run" stacks short answers under the step name | UI | Superseded by D-076 | 2026-11-07 |
| D-072 | Driver home shows one trip: the soonest open one | UX flow | Active | 2026-11-07 |
| D-073 | Drop the "Park / Parking lot" row from The run | UI | Active | 2026-11-07 |
| D-074 | Drivers can go back to earlier steps | UX flow | Active | 2026-11-07 |
| D-075 | Every back link reads "‹ Back" | Copy / UI | Active | 2026-11-07 |
| D-076 | The run uses label-and-value rows, like the trip facts | UI | Active | 2026-11-07 |
| D-077 | Facts read inline: "Label: value", no aligned column | UI / Accessibility | Active | 2026-11-07 |
| D-078 | The run drops Pickup and Return; the trip facts already show them | UI | Active | 2026-11-07 |
| D-079 | Hide The run when a trip has no extra stops | UI | Active | 2026-11-07 |
| D-080 | Prototype: driver sign-in restarts unsent trips at step 1 | Other | Active | 2026-11-07 |
| D-081 | Step 2 is titled "Member pickup" | Copy | Active | 2026-11-07 |
| D-082 | Step 2 goes straight to step 3 | UX flow | Active | 2026-11-07 |
| D-083 | Fuel labels: "Fuel (litres)" and "Total fuel cost ($)" | Copy | Active | 2026-11-07 |
| D-084 | After a trip, drop the Stops card; show only recorded times | UI / Data | Active | 2026-11-07 |
| D-085 | Every trip waiting for review is in "Waiting for review" | UI | Active | 2026-11-07 |
| D-086 | Member rows end with a drop-off icon: house, office or pin | UI | Active | 2026-11-08 |
| D-087 | "Past trips" lists on the staff and driver homes | UX flow | Active | 2026-11-08 |
| D-088 | "Dropped off at", not "got off at" | Copy | Active | 2026-11-08 |
| D-089 | Past trips sit under Bus totals; rows put date and driver on separate lines | UI | Active | 2026-11-08 |
| D-090 | The organization's name is "KW AccessAbility" everywhere | Copy | Active | 2026-11-08 |

## Decisions

### D-001: Leave live GPS tracking out of v1
- **Date:** 2026-11-07
- **Area:** Other
- **Status:** Active
- **Decision:** No live GPS, member-facing map, or routing in v1.
- **Problem / context:** GPS tracking was on the list of possible features for the bus service.
- **Alternatives considered:** Live GPS with a member view (not asked for by the org; members don't use the app).
- **Rationale:** "We left live GPS tracking out of v1 because the org never asked for it and members don't use the app... Our limited build time went to what a first-day driver and the director actually rely on: a clear trip log and a monthly report."
- **Tradeoffs:** No live location for staff during late returns.
- **Impact / where in code:** Scope only. Listed as out of scope in the bus-service rule.
- **Evidence:** Rob Wiseman interview (no request for tracking).
- **Case study angle:** Scoping to the real job instead of the obvious feature.

### D-002: Member registration stays in the Access database
- **Date:** 2026-11-07
- **Area:** Architecture
- **Status:** Active (refined by D-050: the app keeps a bus-only member list)
- **Decision:** The app doesn't handle member registration. Membership, events attended, and dues stay in the existing Microsoft Access database.
- **Problem / context:** Members register for trips by calling the office. Staff enter new members into Access while they're on the phone.
- **Alternatives considered:** Member self-sign-up in the app (members are mostly people with vision loss and phone in); Access integration (database isn't cloud-based and has a browser plugin issue).
- **Rationale:** From the interview: staff already enter new members live, which matters because so many members have vision loss.
- **Tradeoffs:** The member list in the app is sample data until there is an import.
- **Impact / where in code:** `ROSTER` in `data.js` is a stand-in.
- **Evidence:** Rob Wiseman interview.

### D-003: Screen titles name the task, not the trip
- **Date:** 2026-11-07
- **Area:** UI
- **Status:** Superseded by D-014
- **Decision:** The main heading on the homes and the trip sheet is the action ("Start this trip", "Review this trip"), with the trip name underneath.
- **Problem / context:** A fresh-eye review found the titles led with the trip name and buried the action.
- **Alternatives considered:** Trip name as the title (the earlier version).
- **Rationale:** Not stated by the user (inferred: a first-day driver needs to know what to do first).
- **Tradeoffs:** The destination became less visible, which led to D-014.
- **Impact / where in code:** `renderDriverHome`, `renderStaffHome`, `renderSheet` in `data.js`.
- **Evidence:** none.

### D-004: Split the trip start into lot and office screens
- **Date:** 2026-11-07
- **Area:** UX flow
- **Status:** Active
- **Decision:** Starting a trip takes two screens. At the parking lot the driver enters only the beginning kilometres. At the office they sign in only the members who are there.
- **Problem / context:** One form asked for kilometres, members, and start time together, even though the driver is at two different places for those.
- **Alternatives considered:** A single start form (the earlier version).
- **Rationale:** Not stated by the user (inferred: each place has one job).
- **Tradeoffs:** One more tap and one more screen.
- **Impact / where in code:** Modes `lot` and `board` in `renderSheet`, `modeFor`.
- **Evidence:** none. Not yet tested with a driver.

### D-005: Calculate hours and pay from start and end times
- **Date:** 2026-11-07
- **Area:** UX flow
- **Status:** Active
- **Decision:** The start time is saved automatically when the driver leaves the lot. The end time defaults to now and opens a time picker. Hours = end − start, which handles past-midnight returns. Pay = hours × $20 an hour. The typed "Hours" field was removed.
- **Problem / context:** Drivers had to type hours themselves, which brings back the arithmetic and crossed-out numbers of the paper sheet.
- **Alternatives considered:** Typed hours (the earlier version).
- **Rationale:** Not stated by the user (inferred: avoid manual arithmetic).
- **Tradeoffs:** Paid time currently runs from leaving the lot to the end time. Whether pay starts at the lot is an open question.
- **Impact / where in code:** `hoursBetween`, `nowClock`, `liveFigures` in `data.js`.
- **Evidence:** none.

### D-006: Fuel is its own step after the end readings
- **Date:** 2026-11-07
- **Area:** UX flow
- **Status:** Active
- **Decision:** The end screen shows home drop-offs, ending kilometres, end time, then live kilometres, hours, and pay. Fuel litres and cost come next on "Fuel, if you bought any". Both can be blank, but not just one.
- **Problem / context:** The end form put the fuel fields above the totals, so the result came last.
- **Alternatives considered:** Fuel on the same screen (the earlier version).
- **Rationale:** Not stated by the user (inferred: the result before optional paperwork).
- **Tradeoffs:** One more screen before sending.
- **Impact / where in code:** Modes `end` and `fuel` in `renderSheet`, `applyFuel`.
- **Evidence:** none.

### D-007: Staff home leads with the trip waiting for review
- **Date:** 2026-11-07
- **Area:** UI
- **Status:** Active (the collapsed one-line totals are superseded by D-029)
- **Decision:** The staff home opens with a status tag, "Review this trip", the trip details, and the primary button. "Other trips" follows. Bus totals collapse to one line (km · h · fuel · pay · repairs) that opens the full list.
- **Problem / context:** Totals competed with the review task.
- **Alternatives considered:** Full totals list always open (the earlier version).
- **Rationale:** Not stated by the user (inferred: totals are for reporting, not for the moment staff open the app).
- **Tradeoffs:** Totals take one extra tap.
- **Impact / where in code:** `renderStaffHome`. The totals use a `details` element.
- **Evidence:** none.

### D-008: Review shows the record before correction fields
- **Date:** 2026-11-07
- **Area:** UI
- **Status:** Active
- **Decision:** On review, staff first see the record and members as read-only rows. "Correct a number" comes below with all six fields, and hours recalculate from the times.
- **Problem / context:** Review opened straight into editable fields.
- **Alternatives considered:** Fields first (the earlier version).
- **Rationale:** Not stated by the user (inferred: check before editing).
- **Tradeoffs:** A longer page.
- **Impact / where in code:** Mode `review` in `renderSheet`.
- **Evidence:** none.

### D-009: Errors appear under the field; the banner keeps the instruction
- **Date:** 2026-11-07
- **Area:** Accessibility
- **Status:** Active
- **Decision:** Validation messages appear under the field that failed, with `role="alert"`, `aria-invalid`, and `aria-describedby`. The banner keeps the step's instruction.
- **Problem / context:** Errors used to replace the instruction banner.
- **Alternatives considered:** Error text in the banner (the earlier version).
- **Rationale:** Not stated by the user (inferred: the instruction shouldn't disappear when something goes wrong).
- **Tradeoffs:** none noted.
- **Impact / where in code:** `field`, `failField`, `clearField` in `data.js`; `.field-error` in `components.css`.
- **Evidence:** none.

### D-010: Sign-in hides PINs and shows a role tag
- **Date:** 2026-11-07
- **Area:** UI
- **Status:** Active
- **Decision:** Name rows show the name and a Driver or Staff tag. PINs only appear on the builder screen list.
- **Problem / context:** Each row showed "Driver · 1234", the loudest thing on the screen.
- **Alternatives considered:** Showing PINs on rows (the earlier version).
- **Rationale:** Not stated by the user (inferred: visible PINs teach people to skip the PIN).
- **Tradeoffs:** Demo users need the screen list for PINs.
- **Impact / where in code:** `renderSignIn`, `renderPreview`.
- **Evidence:** none.

### D-011: Repair form first, history below
- **Date:** 2026-11-07
- **Area:** UI
- **Status:** Superseded by D-012
- **Decision:** Order: banner, date, what, cost, Save, "On file", Trips.
- **Problem / context:** History used to sit above the form.
- **Alternatives considered:** History first (the earlier version).
- **Rationale:** Not stated by the user (inferred: entering a repair is the task).
- **Tradeoffs:** Trips ended up below the history.
- **Impact / where in code:** `renderMaintenance`.
- **Evidence:** none.

### D-012: Repair actions grouped; history last with two-line rows
- **Date:** 2026-11-07
- **Area:** UI
- **Status:** Active
- **Decision:** Order: form, Save the repair, Trips, then "On file". Each repair row shows the work in bold, the date below it in regular weight, and the cost on the right.
- **Problem / context:** User: "its awkward to have trips button below and then on file and then save the repairs button on top" and "14 October 2026 · Brake inspection... makes a very long line."
- **Alternatives considered:** D-011 order; single-line "date · what" rows.
- **Rationale:** User feedback above.
- **Tradeoffs:** History needs scrolling.
- **Impact / where in code:** `renderMaintenance`; `.stack`, `.stack-title`, and `.stack-note` in `components.css`.
- **Evidence:** User review of the screen.

### D-013: Native date and time pickers
- **Date:** 2026-11-07
- **Area:** UI
- **Status:** Active
- **Decision:** Date fields use `input type="date"` and time fields use `input type="time"`. Saved dates show as "2 November 2026".
- **Problem / context:** User: "all date pickers in app should return actual calendars (but rn do it THE EASIEST way possible)."
- **Alternatives considered:** A custom calendar component (more build time).
- **Rationale:** User asked for the easiest way.
- **Tradeoffs:** Picker look differs by browser and device.
- **Impact / where in code:** `field` modes `date` and `time`, `dateLabel` in `data.js`.
- **Evidence:** User request.

### D-014: Driver home: destination is the largest text
- **Date:** 2026-11-07
- **Area:** UI
- **Status:** Active
- **Decision:** The driver home shows a status tag ("Assigned to you", "On the road", "Sent to the office"), the trip name as the title, the date in bold, the times, then the primary action. "Signed in as" moved to the bottom. Trip steps show "Step N of M", with the destination and date under the task.
- **Problem / context:** User: "St. Jacobs Farmers Market should be bigger bc how are they gonna know where they go?" Also, the "name · status · date" line "could be organized better." "Trip sent" as a title read as if management had sent the trip.
- **Alternatives considered:** D-003 (task as title).
- **Rationale:** User feedback above.
- **Tradeoffs:** On the driver home, the action is a button rather than the heading.
- **Impact / where in code:** `renderDriverHome`, `tripHead`, `statusTag`, `stepLabel`.
- **Evidence:** User review.

### D-015: Cost fields accept numbers only
- **Date:** 2026-11-07
- **Area:** UI
- **Status:** Active
- **Decision:** Fuel cost and repair cost drop anything except digits and one decimal point as the user types ("12abc.3.4xyz" becomes "12.34").
- **Problem / context:** User: "for cost, dont let enter anything that isnt a number."
- **Alternatives considered:** Showing an error on submit (the earlier behaviour).
- **Rationale:** User request.
- **Tradeoffs:** Pasted values are silently changed.
- **Impact / where in code:** `field` in `data.js`, for ids containing "cost".
- **Evidence:** User request.

### D-016: Driver plans the run by default; staff can preset it
- **Date:** 2026-11-07
- **Area:** UX flow
- **Status:** Superseded by D-066
- **Decision:** If no run is set, step 1 of 5 for the driver is "Plan the run", about 20 minutes before the trip: leave-lot time, office boarding time, and up to 13 destinations. Staff can set the run ahead from "Set the run", and then the driver has 4 steps. Fixed structure (lot, office, destinations, office or homes, lot) is shown as "Always the same".
- **Problem / context:** It was unclear whether management pre-sets the run or it's spontaneous. User: "by default let's make it so driver fills The Run in before the actual trip (like step 0, e.g. 20 min before trip) and then manager can pre-set if thats necessary."
- **Alternatives considered:** Office plans times and destinations, driver records only what happens (recommended by the assistant); a mode switch between office and driver (rejected for doubling the screens); always pre-set by staff.
- **Rationale:** User's direction above.
- **Tradeoffs:** A first-day driver may face a blank plan. The default may change once Rob says how the paper sheet worked.
- **Impact / where in code:** `runForm`, `hasRun`, `stepLabel`, `staffTag`, modes `plan` and `preset`.
- **Evidence:** none. Open question for Rob.
- **Case study angle:** Designing for an unknown process with a default and an override.

### D-017: Show wheelchair spaces and seats left on the driver home
- **Date:** 2026-11-07
- **Area:** UI
- **Status:** Active
- **Decision:** The driver home lists the confirmed member names, with wheelchair users tagged, and shows two counts: wheelchair spaces left (of 6) and seats left (of 3). A full side shows "Full", and an overbooked side shows "N over".
- **Problem / context:** The home only said "6 members confirmed", which hid who and what fits.
- **Alternatives considered:** A count-only card (the earlier version).
- **Rationale:** Not stated by the user (inferred: the bus layout is 6 wheelchair spaces and 3 ambulatory seats, so capacity has two parts).
- **Tradeoffs:** Capacity is hard-coded; modifications could allow up to 5 seats.
- **Impact / where in code:** `CHAIR_SPACES`, `SEAT_SPACES`, `spacesLeft`, `spaceText`.
- **Evidence:** Layout from the Rob Wiseman interview.

### D-018: Same plain label for Wheelchair and Seat; wheelchair users listed first
- **Date:** 2026-11-07
- **Area:** UI
- **Status:** Active (label part superseded by D-027; wheelchair-first order still active)
- **Decision:** Member rows show "Wheelchair" or "Seat" as the same plain right-aligned text, with no boxed tag. Wheelchair users are listed first, then seated members, on the driver home, office sign-in, drop-off, and member lists.
- **Problem / context:** User: "wheelchair / seat has to be like a label thats of the same type bc idk why wheelchairs are that contrast-y now. also, lets do then wheelchairs first, and then seats."
- **Alternatives considered:** Boxed tag for Wheelchair only (the earlier version, which drew attention to one group).
- **Rationale:** User feedback above.
- **Tradeoffs:** Wheelchair users are no longer visually highlighted; grouping does that job.
- **Impact / where in code:** `chairsFirst`, `membersCard`, `renderDriverHome`. `linkTagStandin` removed.
- **Evidence:** User review.

### D-019: No assigned seats
- **Date:** 2026-11-07
- **Area:** UX flow
- **Status:** Active
- **Decision:** The app doesn't assign specific seats or wheelchair positions to members. It only counts spaces left.
- **Problem / context:** The user considered assigning seats to people.
- **Alternatives considered:** Per-member seat assignment (discarded).
- **Rationale:** User: "ill discard that idea bc Rob didnt mention anything ab it and ig people have their seats preferred or choose on the spot bc its no big deal."
- **Tradeoffs:** If boarding order or securing wheelchairs turns out to need a plan, there's no place for it yet.
- **Impact / where in code:** none (feature not built).
- **Evidence:** Absence in the Rob Wiseman interview.
- **Case study angle:** Resisting a feature the research didn't support.

### D-020: Remove the "Always the same" card from the run form
- **Date:** 2026-11-07
- **Area:** UI
- **Status:** Active
- **Decision:** The run form ("Plan the run" / "Set the run") shows only the two times, destinations, Add another destination, and the save button. The read-only card listing the fixed parts of the run was removed.
- **Problem / context:** User, on the card: "what is this card and why is here whatsoever."
- **Alternatives considered:** Keeping the card (it read like more questions, and repeated the two time fields above it).
- **Rationale:** User feedback above. The full run, including return and parking, already shows on the driver home after saving.
- **Tradeoffs:** The form no longer spells out that the return can include home drop-offs; that's covered on the finish screen.
- **Impact / where in code:** `runForm` in `data.js`.
- **Evidence:** User review.

### D-021: Destinations are set by the office; driver plans only the times
- **Date:** 2026-11-07
- **Area:** UX flow
- **Status:** Superseded by D-066
- **Decision:** On "Plan the run", the driver sets only the leave-lot and boarding times. Destinations show read-only as "Set by the office". A secondary "Change a destination" button, with the note "Only change a destination if the office asks you to", unlocks editing and Add another destination. Staff keep the full editor on "Set the run".
- **Problem / context:** User: "why is there Add another destination button? i thought destinations are pre-set by a manager?... and cant be changed unless its a super edge case?"
- **Alternatives considered:** Driver edits destinations freely (the D-016 version); no driver change at all (rejected, since the user allowed edge cases).
- **Rationale:** User's words above. Members vote on and register for a specific event, so the destination is known before the trip.
- **Tradeoffs:** Changes on the day take an extra tap and aren't flagged to staff yet.
- **Impact / where in code:** `runForm` (`locked`, `unlock`) in `data.js`.
- **Evidence:** User review.

### D-022: Driver entries save as they go, step by step
- **Date:** 2026-11-07
- **Area:** UX flow
- **Status:** Active
- **Decision:** The driver flow stays a step-by-step wizard. Typed values (times, kilometres, end time, fuel) save on this phone as the driver types, and member sign-in and home drop-off taps save on each tap. Each step shows "Saved on this phone as you go. You can leave and come back." Drafts clear when a step is submitted. Going back from fuel keeps the end readings.
- **Problem / context:** User: "i really like that you actually broke down the wizard into diff parts (pages)... so as not to overwhelm the driver, its important to also save diff steps so that the driver can return to them later w/o having to fill in information on the go."
- **Alternatives considered:** Save only on submit (the earlier behaviour, which lost typed values when the driver left).
- **Rationale:** User's words above.
- **Tradeoffs:** Drafts live on one phone only (localStorage), not synced to the office.
- **Impact / where in code:** `keepDraft`, `dropDraft`, `savedNote`; `aboardToggle` and `dropToggle` take `onChange`.
- **Evidence:** User feedback.

### D-023: Staff set up the trip, including volunteer or paid and the hourly rate, before sending it to the driver
- **Date:** 2026-11-07
- **Area:** UX flow
- **Status:** Active
- **Decision:** "Set the run" became "Set up this trip". Staff enter destinations (required), choose Volunteer or Paid (required), and enter an hourly rate if Paid (numbers only). Times are optional: leave both blank and the driver plans them. The button reads "Send to Priya". The trip only appears on the driver home after it's sent. Volunteer pay is $0. The driver home shows "Volunteer trip" or "Paid trip · $22.50 an hour". Staff tags: "Not sent yet" / "Sent to driver".
- **Problem / context:** User: "staff when they create a route/trip, they can enter if the driver is volunteer/working, and then if working, in second field enter their rate per hr, before sending the trip to the driver."
- **Alternatives considered:** One fixed rate for every trip (the earlier $20, hard-coded).
- **Rationale:** User's words above. Volunteer and paid drivers both exist with the new funding.
- **Tradeoffs:** The rate is per trip, not stored per driver, so staff re-enter it. The driver sees nothing until staff send the trip.
- **Impact / where in code:** `setupForm`, `rateOf`, `rateText`, `payFrom`, `staffTag`; `setUp`, `payType`, `rate` on trips.
- **Evidence:** User request.

### D-024: Trip details as labelled rows, with a relative date
- **Date:** 2026-11-07
- **Area:** UI
- **Status:** Active
- **Decision:** Under the trip name, details are a two-column label/value list (`dl`): regular-weight label, bold value. Rows include Location (skipped when it equals the trip name), Date ("Friday 6 November (yesterday)", "(today)", "(in 3 days)"), and Driver, Distance, and Drop-off ("Office" or "Office and homes") for staff. The driver home also shows Leave the lot, Board at the office, and Pay. These rows replace the "Driver: Priya Sandhu · 186 km" and "Some get off at home" lines.
- **Problem / context:** User: "proper information/digital hierarchy (e.g. write Location: ... Date:... (3 days ago or 3 days in the future) Driver; mileage: Drop-off type..."
- **Alternatives considered:** Dot-separated sentences (the earlier version).
- **Rationale:** User's words above.
- **Tradeoffs:** Takes more vertical space.
- **Impact / where in code:** `facts`, `tripFacts`, `tripHead`, `relativeDay`, `dateFact`, `placeFact`, `dropFact`; `.facts` and `.fact` in `components.css`. Trips gained an ISO `date`.
- **Evidence:** User review.

### D-025: Sign-in list titled "Team"; trip rows put the status tag under the name
- **Date:** 2026-11-07
- **Area:** Copy / UI
- **Status:** Active
- **Decision:** The sign-in card heading changed from "Your name" to "Team". In trip list rows (`linkTagRow`), the trip name gets its own line and the status tag sits below it, instead of both sharing one line.
- **Problem / context:** User: "change Your name label to Team" and "dont like that text spans across 3 lines" ("St. Jacobs / Farmers / Market" squeezed by the tag).
- **Alternatives considered:** Not stated.
- **Rationale:** User's words above.
- **Tradeoffs:** Rows are slightly taller.
- **Impact / where in code:** `linkTagRow`, sign-in screen in `data.js`.
- **Evidence:** User review.

### D-026: Staff "Correct a number" is collapsed by default
- **Date:** 2026-11-07
- **Area:** UX flow
- **Status:** Active
- **Decision:** On the staff review screen, the six correction fields (times, kilometres, fuel) and the live km/hours/pay preview sit inside a collapsed "Correct a number" section. "Mark reviewed" stays visible below it. If a value fails validation, the section opens itself so the error shows.
- **Problem / context:** User: "i feel like they dont do it THAT often, it can be hidden under a ^ or sth so that form isnt too long."
- **Alternatives considered:** Always-open form (previous).
- **Rationale:** User's words above.
- **Tradeoffs:** One extra tap when a correction is needed.
- **Impact / where in code:** review branch of `renderSheet`; `details.card` gap in `components.css`.
- **Evidence:** User judgement; not yet confirmed with staff how often they correct.

### D-027: Wheelchair icon after the member's name instead of a Wheelchair/Seat label
- **Date:** 2026-11-07
- **Area:** UI
- **Status:** Active (supersedes the label part of D-018)
- **Decision:** Wheelchair users get the wheelchair symbol right after their name. Seated members get no mark. Screen readers hear "Helen Cho, wheelchair". This frees the right side of member rows for status (Aboard, address, Did not board). Wheelchair-first order stays.
- **Problem / context:** User: "add wheelchair as an icon next to name ... so that it indicates whos a wheelchair user w/o taking much space."
- **Alternatives considered:** Icon before the name (would break name alignment); text label (D-018).
- **Rationale:** User's words above. Placement after the name: inferred, keeps names aligned.
- **Tradeoffs:** Relies on the symbol being recognised; the spaces summary still spells out "Wheelchair spaces".
- **Impact / where in code:** `wheelchairIcon`, `memberLabel`, `textRow`, `pressRow`, `membersCard`, driver home; `.member-name`, `.member-icon`, `.visually-hidden` in `components.css`.
- **Evidence:** User request.

### D-028: Heading levels: h1 screen task, h2 trip and sections, h3 groups inside a section
- **Date:** 2026-11-07
- **Area:** UI / Accessibility
- **Status:** Active
- **Decision:** h1 (32px) is the screen's task, one per screen. h2 (24px) is the trip name and every section title, including the collapsible ones. h3 (20px) groups rows or fields inside a section: Times, Kilometres, Pay and Fuel in the record and in Correct a number. On screens with more than one group of fields, every field sits inside a titled section. Screens that are a single short form (sign-in PIN, kilometres at the lot, fuel, add a repair) keep their fields directly under the h1. Rows inside an h3 group use a regular label and a bold value.
- **Problem / context:** User: "proper hierarchy h1 h2 h3 has to be implemented". The trip name was a styled paragraph, and the Destination and rate fields floated outside any section.
- **Alternatives considered:** Not stated.
- **Rationale:** User's words above. Inferred: screen readers can jump by heading, which matters because most members and some staff have vision loss.
- **Tradeoffs:** Slightly longer screens.
- **Impact / where in code:** `tripHead`, `group`, `disclosure`, `recordCard`, `setupForm`, `runForm`, finish step; `--text-subheading`, `h3`, `.group` and `.totals summary` in CSS.
- **Evidence:** User review.

### D-029: Bus totals as six figure tiles in pairs, always open
- **Date:** 2026-11-07
- **Area:** UI
- **Status:** Active (supersedes the collapsed totals line in D-007)
- **Decision:** "Bus totals" is a normal open section on the staff home. It shows six tiles in two columns: a large bold figure with a small label beneath. The pairs are Trips and Distance, Driver hours and Driver pay, Fuel and Repairs. "Add a repair" sits below. Trips counts the sent and reviewed trips the totals cover.
- **Problem / context:** User: the one-line summary was "jut a bunch of numbers/letters rn", "keep at a glance BUT bettr visual hierrchy".
- **Alternatives considered:** Three money figures in one row (cents broke onto a second line at 24px); a label/value list.
- **Rationale:** User's words above. The pairing is inferred: activity, then driver, then bus costs.
- **Tradeoffs:** Taller than the collapsed line. The period is still undefined (open question: what totals funders need).
- **Impact / where in code:** `tiles`, `periodTotals` (adds `trips`), `renderStaffHome`; `.tiles`, `.tile` in `components.css`.
- **Evidence:** User review.

### D-030: Bus totals in a bordered grid; "Add a repair" is a button
- **Date:** 2026-11-07
- **Area:** UI
- **Status:** Active (refines D-029)
- **Decision:** The six totals sit in a 2 × 3 grid with ruled cell borders. "Add a repair" is a full-width secondary button, not a list row.
- **Problem / context:** User: "maybe put this into like a grid for better visibility, also add a repair has to be a visible button, rn its just text and weird line".
- **Alternatives considered:** Not stated.
- **Rationale:** User's words above.
- **Tradeoffs:** None noted.
- **Impact / where in code:** `renderStaffHome`; `.tiles`, `.tile` in `components.css`.
- **Evidence:** User review.

### D-031: Top account bar with name, role and Sign out replaces "Signed in as / Switch person"
- **Date:** 2026-11-07
- **Area:** UI / UX flow
- **Status:** Superseded by D-032 (the bar; the removed bottom pair and new primary buttons still stand)
- **Decision:** Every signed-in screen opens with a ruled bar: the name in bold and the role (Staff or Driver) on the left, a bordered "Sign out" button on the right. Sign out returns to the Team list. The bottom "Signed in as …" line and the "Switch person" button are gone. The driver's sent home now uses "See what you sent" as its primary button. "No trip today" uses "Check again".
- **Problem / context:** User: "dont like signed in as ... / switch person pattern".
- **Alternatives considered:** Keeping it at the bottom as one row; a Menu button (rejected: it hides actions behind a tap, which is harder for older and screen-reader users).
- **Rationale:** User picked the recommended option. Inferred: identity shows first on a shared phone, and the bottom of each screen holds only its task.
- **Tradeoffs:** Takes about 60px at the top of every screen.
- **Impact / where in code:** `accountBar`, `mount(..., person)`; removed `signedIn`, `personSwitch`; `.account` in `components.css`; `bus-service.mdc` and `COMPONENTS.md` wording.
- **Evidence:** User choice.

### D-032: Compact profile menu: first name at top right, tap for name, role and Sign out
- **Date:** 2026-11-07
- **Area:** UI / UX flow
- **Status:** Active (supersedes the bar in D-031)
- **Decision:** A small "Ed ▾" button sits at the top right, on the same line as the status tag, so it adds no height. Tapping it opens a panel with the full name, the role and a Sign out button. Tapping elsewhere or pressing Escape closes it. Screen readers hear "Ed Crusoe, account".
- **Problem / context:** User: "its too big and clanky. maybe just keep like profile and then if u click itll show like sing out ... it takes too much space rn".
- **Alternatives considered:** The full-width bar (D-031).
- **Rationale:** User's words above.
- **Tradeoffs:** Sign out is one tap deeper, and the role is hidden until opened.
- **Impact / where in code:** `profileMenu`, `mount` (puts the status tag and the menu in `.screen-top`); `.screen-top`, `.profile`, `.profile-panel` in `components.css`; `bus-service.mdc`.
- **Evidence:** User review.

### D-033: Other trips as bordered tap rows with "Today · Not sent yet" in plain text
- **Date:** 2026-11-07
- **Area:** UI
- **Status:** Active (supersedes the trip-row part of D-025)
- **Decision:** "Other trips" is an unboxed section (h2 plus list). Each trip is one bordered, full-width tap row: the name in bold, then a plain line with the day and status ("Today · Not sent yet"), and a › arrow on the right. The day reads Today, Tomorrow or Yesterday when it applies, otherwise the full date. The grey status tag and the bottom rule are gone.
- **Problem / context:** User: "dont like how big/clanky Not sent yet looks, thrre muts be a better way".
- **Alternatives considered:** Tag under the name (D-025); a row inside a card (too narrow, wrapped).
- **Rationale:** User's words above. Inferred: a box around a box squeezed the text, and the arrow signals the row opens.
- **Tradeoffs:** The status is less loud than a tag.
- **Impact / where in code:** `tripRow` (replaces `linkTagRow`), `shortDay`, `card(..., plain)`; `.trip-row` in `components.css`.
- **Evidence:** User review.

### D-034: Staff home titled "Trips"; the lead trip is a section, not the page title
- **Date:** 2026-11-07
- **Area:** UI / IA
- **Status:** Active (refines D-007)
- **Decision:** The staff home's h1 is "Trips", on the same line as the profile menu. Three h2 sections follow. The first is named for the lead trip's state ("Waiting for review", "Needs setting up", "Sent to the driver", "On the road") and holds that trip's name (h3), details and primary button ("Review this trip"). "Other trips" and "Bus totals" come after. The status tag at the top of this screen is gone.
- **Problem / context:** User: "why is there even a Other trips tab in a specific Review this trip tab...?" The h1 "Review this trip" made the whole home look like one trip's screen.
- **Alternatives considered:** Not stated.
- **Rationale:** User's words above. Inferred: the h1 names the place, and sections name what is in it.
- **Tradeoffs:** The trip name drops from 24px to 20px on this screen.
- **Impact / where in code:** `renderStaffHome`, `tripHead(..., level)`, `mount` (a lone h1 shares the top row with the profile menu).
- **Evidence:** User review.

### D-035: Staff home sections share one pattern: heading outside, bordered content; totals state their scope
- **Date:** 2026-11-07
- **Area:** UI / Copy
- **Status:** Active (refines D-030, D-033, D-034)
- **Decision:** All three staff-home sections use the same pattern: the h2 sits outside, the content sits in a bordered box. The lead trip's details and button are in one box. Each other trip is a bordered row. The totals grid is bordered, with "Add a repair" below it. Bus totals now say "All trips sent to the office so far, and all repairs on file." The first tile is labelled "Trip sent" or "Trips sent".
- **Problem / context:** User: "bus totals would consider ALL the trips right? then it has to be made clear" and "it has to be unified (text inside container?outside?)".
- **Alternatives considered:** Headings inside cards. Rejected because Other trips rows got squeezed inside a card (D-033).
- **Rationale:** User's words above. Inferred: heading outside avoids boxes inside boxes.
- **Tradeoffs:** The totals period is still all-time until Rob confirms what funders need.
- **Impact / where in code:** `renderStaffHome`; `.box` in `components.css`.
- **Evidence:** User review.

### D-036: Trip details boxed under the page title; members grouped by where they got off
- **Date:** 2026-11-07
- **Area:** UI / Copy
- **Status:** Active
- **Decision:** On every trip screen, the trip name and details sit in a bordered box under the h1, matching the staff home. The Members section opens with "Everyone boarded at the office." It then groups people under h3s. For a sent or reviewed trip: "Dropped off at home" (with each address), "Got off at the office", "Did not board". On the road: "On the bus", "Did not board". Empty groups are hidden.
- **Problem / context:** User: "maybe clearer distinction between review this trip / blue jays game" and "it has to indicate somewhere that 14 Birch Ave or 22 Maple St would be DROP OFF, not pick-up bc company doesnt do pickups".
- **Alternatives considered:** Prefixing each address with "Drop-off:".
- **Rationale:** User's words above. Matches the source rule: no outbound home pickup, boarding is at the office.
- **Tradeoffs:** A longer Members section on finished trips.
- **Impact / where in code:** `renderSheet` (box around the trip head), `membersCard` read branch.
- **Evidence:** User review; `bus-service.mdc`.

### D-037: Review confirmation with Undo, and a review record on the trip
- **Date:** 2026-11-07
- **Area:** UX flow / Data
- **Status:** Active
- **Decision:** After "Mark reviewed", the staff home opens with a status banner: "✓ Blue Jays game is reviewed". It adds "Your corrections are saved." only if a number changed, then "Its kilometres, hours and costs are in the bus totals." An Undo button puts the trip back to Waiting for review and keeps any corrections. The banner shows once. The trip stores who reviewed it, the date and time, and whether numbers were corrected. Its details show "Reviewed: Ed Crusoe, today at 19:57, numbers corrected" to staff and to the driver.
- **Problem / context:** User: "has to show basic confirmation or something, think it thru, when the trip DOES get reviewed".
- **Alternatives considered:** A separate confirmation screen (an extra tap); a toast that disappears (too fast for older users).
- **Rationale:** User's words above. Inferred: Undo protects against mis-taps, and the review record gives funders and the driver an audit trail.
- **Tradeoffs:** Undo doesn't revert corrections. Only one person's review is recorded.
- **Impact / where in code:** `reviewNotice`, `reviewFact`, `todayIso`, review submit in `renderSheet`, `cloneTrip` and `saveTrip` (`reviewedBy`, `reviewedOn`, `reviewedAt`, `corrected`), `KEYS.notice`, preview reset; `.notice` in `components.css`.
- **Evidence:** User request.

### D-038: Repairs get their own section and page; no action button inside Bus totals
- **Date:** 2026-11-07
- **Area:** IA / UI
- **Status:** Active (supersedes the button part of D-030)
- **Decision:** Bus totals is read-only. Below it, a "Repairs" section has one tap row: "1 repair on file · Latest: Brake inspection ›". The row opens the Repairs page (h1 "Repairs"): an "Add a repair" section with date, what and cost, then "Save the repair", "Trips", and "On file".
- **Problem / context:** User: "i kinda feel like Add a repar button feels stray in here... but i cant prove it".
- **Alternatives considered:** Keeping the button; making the Repairs tile tappable (an action nobody can see).
- **Rationale:** Inferred: it was the only action in a read-only summary; repairs are a separate record from trips; you could add a repair but not see the ones on file; and it was too heavy for a few-times-a-year task.
- **Tradeoffs:** One more section on the staff home.
- **Impact / where in code:** `renderStaffHome`, `renderMaintenance`, preview list label.
- **Evidence:** User's hunch; reasoning above. Later approved by the user: "really smart that u put repairs as a separate category LOVE IT... good decision" (2026-11-07).

### D-039: "On file" repairs as bordered rows, newest first, outside the form
- **Date:** 2026-11-07
- **Area:** UI
- **Status:** Active (refines D-012)
- **Decision:** "On file" uses the staff-home pattern: the h2 sits outside, and each repair is a bordered row. The name and cost are bold on the top line (cost on the right), with the date in regular text below. Newest repairs come first. The list sits outside the add-repair form.
- **Problem / context:** User: "this element could be better in terms of spacing / hieararchy". The cost floated between two lines, and the date sat on the rule.
- **Alternatives considered:** Not stated.
- **Rationale:** User's words above. Inferred: consistent with D-035.
- **Tradeoffs:** None noted.
- **Impact / where in code:** `renderMaintenance`; `.record-row`, `.record-cost` in `components.css`.
- **Evidence:** User review.

### D-040: "Repair history" with a running total; money shows thousands separators
- **Date:** 2026-11-07
- **Area:** Copy / UI
- **Status:** Active
- **Decision:** "On file" is renamed "Repair history". It opens with "5 repairs, $2,873.55 in total." and lists repairs newest first by repair date. Every dollar amount in the app now uses thousands separators ($1,240.00). The sample data has five repairs, including a wheelchair lift repair. The staff home row reads "5 repairs · Latest: Brake inspection". The Bus totals scope line says "every repair in the repair history".
- **Problem / context:** User: "try having multiple diff repairs on file . and then instead of on file, maybe like Repair history or sth".
- **Alternatives considered:** Not stated.
- **Rationale:** User's words above. Inferred: the total saves staff adding up a column, and separators make large costs readable.
- **Tradeoffs:** The sample repair amounts are invented for the demo.
- **Impact / where in code:** `SEED_REPAIRS` (ISO dates), `loadRepairs` (sorted), `money`, `renderMaintenance`, `renderStaffHome`.
- **Evidence:** User request.

### D-041: Release 1 repairs: cost, what was done, date only; receipts later
- **Date:** 2026-11-07
- **Area:** Scope
- **Status:** Active
- **Decision:** In release 1, a repair is three fields: how much was spent, what the repair was, and the date. No receipts, attachments, or per-repair detail page. A later release could add receipt uploads for insurance and nonprofit governance. Each repair would then open its own page.
- **Problem / context:** User: "for release 1, ill keep it simple - my decision. just how much money was spent, what repair was, and date. later on we could add receipts for insurance/nonprofit governance stuff. and then it'd lead to a separate page ig, but rn there's no need."
- **Alternatives considered:** Receipts and a detail page now (deferred).
- **Rationale:** User's words above.
- **Tradeoffs:** Proof of each cost stays on paper, in the cabinet or in the accounts, until receipts are added.
- **Impact / where in code:** None. Matches the current `renderMaintenance`. Repair rows stay non-tappable.
- **Evidence:** User decision.

### D-042: Times shown in 12-hour AM/PM; stored as 24-hour
- **Date:** 2026-11-07
- **Area:** UI / Copy
- **Status:** Active
- **Decision:** Every time the app displays reads like "3:40 PM": stops, the record, the driver home, and "Reviewed … at". Error hints say "like 8:40 AM" and "like 1:05 PM". Times are still saved as 24-hour "HH:MM", so hours and pay maths are unchanged. Time inputs are native and follow the device's own clock setting.
- **Problem / context:** User: "times r usually in pm/am since we're in Canada."
- **Alternatives considered:** 24-hour display (previous).
- **Rationale:** User's words above.
- **Tradeoffs:** None noted.
- **Impact / where in code:** `clock12` in `data.js`; `runCard`, `recordCard`, `renderDriverHome`, `reviewFact`, time error messages.
- **Evidence:** User knowledge of local convention.

### D-043: Members as one list with each person's drop-off; Blue Jays sample drops everyone at home
- **Date:** 2026-11-07
- **Area:** UI / Data
- **Status:** Active (supersedes the members part of D-036)
- **Decision:** Members is one list under "Everyone boarded at the office. Drop-off is on the right." Each row shows where that person got off: their home address, "Office", or "Did not board". On the road it shows "On the bus". The Blue Jays sample now drops all six members at home, wheelchair users and seated alike, with matching stops. The Drop-off fact reads "Homes", "Office", or "Office and homes" based on what happened.
- **Problem / context:** User: "i dont like that they're apartheided Dropped off at home and Got off at the office. let's just assume that for this event, they're all dropped off at home, wheelchair and non-wheelchair."
- **Alternatives considered:** Groups by drop-off place (D-036).
- **Rationale:** User's words above.
- **Tradeoffs:** Scanning for "who went to the office" now means reading the right column rather than a heading.
- **Impact / where in code:** `membersCard` read branch, `dropText`, `dropFact`, `TRIPS.bluejays` stops and members; `homesOnReturn` removed.
- **Evidence:** User review.

### D-044: Back is a small "‹ Trips" link at the top, not a full-width button at the bottom
- **Date:** 2026-11-07
- **Area:** UI / IA
- **Status:** Active
- **Decision:** On every step screen (review, set up, plan, lot, office, finish, fuel) and on Repairs, the way back is a small bold "‹ Trips" (staff) or "‹ Today" (driver) link at the top left, opposite the first-name menu. The fuel step's link reads "‹ Finish this trip" and still restores the end readings. The bottom of each form ends on its one main button. A finished trip in read mode keeps its single "Back to trips" button, since that is its only action.
- **Problem / context:** User: "again, not the stray Trips button when reviewing the trip.."
- **Alternatives considered:** Full-width secondary button under the main button (previous).
- **Rationale:** User's words above. Inferred: a full-width button under "Mark reviewed" competes with it and looks like a second action.
- **Tradeoffs:** The back link is smaller than before; it keeps a 48px tap height.
- **Impact / where in code:** `backLink` and `mount` (`.screen-top`) in `data.js`; `.back-link` in `components.css`; `runForm` and `setupForm` no longer take a back node.
- **Evidence:** User review.

### D-045: Trip status is a plain "Status" row in the trip details, not a boxed tag
- **Date:** 2026-11-07
- **Area:** UI
- **Status:** Active
- **Decision:** On every trip screen, the boxed tag above the h1 ("Not sent yet", "Waiting for review") is gone. Status is now a row in the trip details box: "Not sent to Priya yet", "Sent to Priya", "On the road", "Waiting for review", or "Reviewed by Ed Crusoe, today at 7:57 PM". The separate "Reviewed" row is folded into it. Driver step labels ("Step 2 of 4") and the driver home's "Assigned to you" are plain bold text, with no box.
- **Problem / context:** User: "why does Not sent yet take that much space and it also looks like a button?"
- **Alternatives considered:** A smaller tag (still reads as a button).
- **Rationale:** User's words above. Inferred: it matches D-033, where trip rows already show status as plain text.
- **Tradeoffs:** Status is less loud. It sits in the box rather than above the title.
- **Impact / where in code:** `statusFact`, `statusTag`, `renderSheet` header; `.status-tag`, `.step-line` in `components.css`.
- **Evidence:** User review.

### D-046: Dates read "Friday, November 6"
- **Date:** 2026-11-07
- **Area:** Copy
- **Status:** Active (supersedes the date format in D-024)
- **Decision:** Trip dates read "Saturday, November 7 (today)": weekday, comma, month, day. Full dates (repairs) read "November 6, 2026". Both are built from the trip's ISO date, so the hand-typed `when` text is gone.
- **Problem / context:** User: "the date should be Friday, November 6. i think."
- **Alternatives considered:** "Friday 6 November" (previous, UK order).
- **Rationale:** User's words above. Inferred: North American order, like the AM/PM change in D-042. The St. Jacobs sample stays on Saturday, November 7, which is today.
- **Tradeoffs:** None noted.
- **Impact / where in code:** `dayLabel`, `dateLabel`, `dateFact`, `shortDay`; `when` removed from `TRIPS`.
- **Evidence:** User review.

### D-047: Home drop-off needs a reason: Late return, Weather conditions, or Other
- **Date:** 2026-11-07
- **Area:** UX flow / Data
- **Status:** Active (refines D-043)
- **Decision:** "Set up this trip" has a "Drop-off on the way back" section: "At the office" (default) or "At members' homes". Homes asks "Why at home and not the office?": Late return, Weather conditions, or Other reason (with a text field). It's required. If the office planned homes, the driver's Getting off list starts with everyone at home. If the office planned the office and the driver taps someone home, the same reason question appears and is required. The trip details show "Drop-off: Homes" and "Reason: Late return" to staff and the driver.
- **Problem / context:** User: "add reason if drop-off is at home and not office (e.g. Weather conditions)".
- **Alternatives considered:** A reason for each member (more taps; not asked for).
- **Rationale:** User's words above. Inferred: funders and staff can see why the bus went past the office.
- **Tradeoffs:** One reason per trip. The reason list is a guess until Rob confirms it.
- **Impact / where in code:** `DROP_REASONS`, `reasonPicker`, `setupForm`, end step in `renderSheet`, `reasonFact`, `homeDrops`; `dropPlan` and `dropReason` on trips (replace `lateHomes`).
- **Evidence:** User request.

### D-048: Staff tick confirmed members in "Set up this trip", with spaces left
- **Date:** 2026-11-07
- **Area:** UX flow
- **Status:** Active
- **Decision:** "Who is coming" lists every member, wheelchair users first, with a checkbox each. Above it, "Spaces left" shows "Wheelchair spaces: 4 left" and "Seats: Full", which update as staff tick. Sending is blocked with nobody ticked, or with more than 6 wheelchair users or 3 seated members. The read-only Members card under the form is gone.
- **Problem / context:** With a member list (D-050), each trip needs its own confirmed list. Before this, every member was on every trip. The bus-service rule says staff keep a confirmed list per trip.
- **Alternatives considered:** Tag toggles ("Confirmed" / "Add"). Rejected: they looked like buttons inside buttons and wrapped names onto two lines.
- **Rationale:** Not stated (inferred: staff take registrations by phone and need to see room left while they do).
- **Tradeoffs:** The 3-seat limit ignores the possible conversion to 5 seats.
- **Impact / where in code:** `setupForm`, `checkRow`, `tripMembers`; `confirmed` on trips.
- **Evidence:** None yet; added alongside the user's member-management request.

### D-049: Choices use real radio buttons and checkboxes
- **Date:** 2026-11-07
- **Area:** UI / Accessibility
- **Status:** Active
- **Decision:** Single choices (Volunteer/Paid, Office/Homes, the reason, wheelchair Yes/No) are native radio buttons in full-width 48px rows. Multiple choices (who is coming) are native 28px checkboxes. The chosen row keeps the grey fill. The sign-in name list and the driver's Aboard and drop-off toggles are unchanged.
- **Problem / context:** With checkboxes in "Who is coming", the grey-fill-only selection on the other lists was easy to miss.
- **Alternatives considered:** Grey fill only (previous).
- **Rationale:** Not stated (inferred: a filled circle or tick is a familiar sign of what's chosen for older adults, and screen readers announce "radio, checked").
- **Tradeoffs:** Two row styles on the driver screens for now.
- **Impact / where in code:** `choiceGroup`, `checkRow`; `.check-row` in `components.css`.
- **Evidence:** None.

### D-050: Staff Members page: full name, home address, wheelchair; date of birth next release
- **Date:** 2026-11-07
- **Area:** IA / Scope
- **Status:** Active (refines D-002)
- **Decision:** Staff home gets a "Members" row ("6 members · 3 use a wheelchair") that opens a Members page. It follows the Repairs pattern: "Add a member" (full name, home address, "Uses a wheelchair on the bus?" Yes/No), then "All members" as tap rows with the address. Tapping a row opens "Change member details". Duplicate names are refused. Trips already sent keep the details they had when sent. Date of birth waits for the next release. There is no delete yet.
- **Problem / context:** User: "somewhere from admin side, there has to be member management, and for every member, wheelchair or non-wheelchair, address, full name, DOB can wait til next release".
- **Alternatives considered:** Importing from Access (not cloud-based, D-002).
- **Rationale:** User's words above. The page says: "This list is only for the bus... Membership and dues stay in the Access database."
- **Tradeoffs:** Staff enter a member's name and address twice, once in Access and once here.
- **Impact / where in code:** `renderMembers`, `memberFields`, `loadMembers`, `saveMember`, `memberId`, `SEED_MEMBERS` (was `ROSTER`), `riders` snapshot in `saveTrip`; `members.html`; staff home and preview list.
- **Evidence:** User request.

### D-051: Instruction banners stay for the demo; in the product they show only during onboarding or the first few times
- **Date:** 2026-11-07
- **Area:** UX flow / Content
- **Status:** Active
- **Decision:** The grey how-to banners stay on every screen for the demo. Examples: "Check the numbers, then mark the trip reviewed. If one is wrong, open Correct a number." and "Fill in each part, then send the trip to Priya." In the real product, a person sees them during onboarding or on their first few uses of a screen, then not again. Staff "obviously" won't get them every time.
- **Problem / context:** User: "these ... notes and the like could be helpful for example during like onboarding, or to just show them the first coupla times. for the sake of demo, we'll keep them, but usually the staff will obv not get them."
- **Alternatives considered:** Always show them (the current build); remove them (judges and first-time viewers would lose the guidance).
- **Rationale:** User's words above.
- **Tradeoffs:** Not built yet. The demo shows more text than a regular user would see.
- **Impact / where in code:** None yet. Banners come from `banner()` calls in `renderSheet`, `setupForm`, `runForm`, `renderSignIn` and `renderMaintenance`.
- **Evidence:** User decision.

### D-052: Home address suggests Kitchener–Waterloo streets as you type
- **Date:** 2026-11-07
- **Area:** UI
- **Status:** Active
- **Decision:** On Add a member and Change member details, the home address opens a list under the field after two letters. Each row is a street and its city. Choosing one fills "220 King Street West, Kitchener". The list prefers real house numbers in Waterloo Region (Kitchener, Waterloo, Cambridge, St. Jacobs, Elmira). Known local streets still show if that lookup fails. Staff can type an address that is not on the list.
- **Problem / context:** User: "addresses should be like have a dropdown where it will suggest, this is primarily kitchener-waterloo region".
- **Alternatives considered:** Leave it a plain text field. A native browser suggestion list (type stays small and hard to read). A paid maps key.
- **Rationale:** User's words above. Inferred: staff are older adults, so the list uses the same large rows as the rest of the app.
- **Tradeoffs:** Exact house numbers need a network lookup. A street not in the local list, looked up while offline, has to be typed in full.
- **Impact / where in code:** `addressField`, `addressMatches`, `LOCAL_STREETS`; `.suggest` in `components.css`; `memberFields`.
- **Evidence:** User request.

### D-053: Save buttons sit inside the form's card
- **Date:** 2026-11-07
- **Area:** UI
- **Status:** Active
- **Decision:** "Save the member", "Save changes" (Edit member, Edit driver), "Save the driver" and "Save the repair" are the last item inside their bordered card, under the fields, instead of below the card.
- **Problem / context:** User: "save the member button should be inside Add a member container."
- **Alternatives considered:** Button below the card (previous).
- **Rationale:** User's words above. Inferred: the button visibly belongs to the fields it saves, which matters on pages that have a second section (the list) underneath. Applied to Repairs too for consistency.
- **Tradeoffs:** None noted. "Set up this trip" keeps its button at the bottom because it saves several cards at once.
- **Impact / where in code:** `renderMembers`, `renderMaintenance`, `renderDrivers`, `renderDriverEdit`; `el` now flattens nested child arrays.
- **Evidence:** User review.

### D-054: Reason folds into the Drop-off row; optional when staff set up the trip
- **Date:** 2026-11-07
- **Area:** UI / UX flow
- **Status:** Active (refines D-047; Clear button superseded by D-062)
- **Decision:** The separate "Reason" row is gone everywhere. The Drop-off row reads "Homes (Late return)", or just "Homes" with no reason. In "Set up this trip", the reason group is "Reason (optional)" and appears only when "At members' homes" is picked. "Clear the reason" appears once one is chosen, because radio buttons can't be unticked. The driver's end-of-trip reason, asked when the driver drops someone home on an office trip, is still required.
- **Problem / context:** User: "delete Reason, it should be Drop-off Homes (Late return)... drop-off at home reason optional obv, if home drop off is selected".
- **Alternatives considered:** A "No reason" radio option (one more row to read).
- **Rationale:** User's words above.
- **Tradeoffs:** Trips can now have home drop-offs with no reason on record. The bus-service rule said every home drop-off records one. Whether the driver's prompt should also be optional is unconfirmed.
- **Impact / where in code:** `dropFact`, `dropPlace` (replace `reasonFact`, `homeDrops`); `reasonPicker(prefix, current, optional)`; `choiceGroup().clear`; `setupForm`; end-step banner in `renderSheet`.
- **Evidence:** User review.

### D-055: "Drop-off on the way back" shortened to "Drop-off"
- **Date:** 2026-11-07
- **Area:** Copy
- **Status:** Active (refines D-047)
- **Decision:** The "Set up this trip" card heading is "Drop-off". The options stay "At the office" and "At members' homes".
- **Problem / context:** User: "Drop-off on the way back lengthy for a label".
- **Alternatives considered:** "Return drop-off".
- **Rationale:** User's words above. Inferred: there is no outbound drop-off, since everyone boards at the office, so "on the way back" added nothing.
- **Tradeoffs:** None noted.
- **Impact / where in code:** `setupForm`.
- **Evidence:** User review.

### D-056: "Add a second destination" with an example of what it's for
- **Date:** 2026-11-07
- **Area:** Copy / UX flow
- **Status:** Superseded by D-063
- **Decision:** The first field is "Destination". Under it: "Going to more than one place before the trip back? For example, lunch and then the market. Add each place in the order the bus visits it." The button reads "Add a second destination", then "Add a third destination", and so on. Added fields are "Then, destination 2". The hint hides once a second field exists.
- **Problem / context:** User: "dont understand what 'add another destination' implies at all."
- **Alternatives considered:** "Add a stop" (clashes with the stops list on the sheet).
- **Rationale:** User's words above. The bus-service rule says a trip sometimes has a second destination before the return.
- **Tradeoffs:** More text in the card. There is no way to remove an added field; staff leave it blank.
- **Impact / where in code:** `placeEditor`.
- **Evidence:** User review.

### D-057: Unsent trip status reads "Draft"
- **Date:** 2026-11-07
- **Area:** Copy
- **Status:** Active (refines D-045, D-033)
- **Decision:** A trip staff haven't sent yet shows "Status: Draft" on the sheet and "Today · Draft" in Other trips. It was "Not sent to Priya yet" and "Not sent yet". "Sent to Priya" is unchanged.
- **Problem / context:** User: "status not sent to priya yet same label sounds weird, maybe in progress?"
- **Alternatives considered:** "In progress" (the user's suggestion). Rejected because the driver side already uses "In progress" for a trip on the road, and staff see "On the road" for it.
- **Rationale:** Inferred: "Draft" is short, familiar from email, and can't be confused with a trip under way.
- **Tradeoffs:** "Draft" doesn't say who it's waiting on. The lead card heading still says "Needs setting up".
- **Impact / where in code:** `statusFact`, `staffTag`.
- **Evidence:** User review.

### D-058: Staff manage drivers: add, edit, remove, and pick one per trip
- **Date:** 2026-11-07
- **Area:** IA / UX flow / Data
- **Status:** Active
- **Decision:** A "Drivers" section on the staff home ("2 drivers · Priya, Tom") opens a Drivers page with the same layout as Members. "Add a driver" takes a full name and a 4-digit PIN. Each row shows the driver's next trip. "Edit driver" changes the name, or sets a new PIN (blank keeps the old one). "Remove from the team" asks to confirm. Removed drivers can't sign in, but past trips keep their name. Removal is blocked while the driver has a trip that hasn't been sent yet. A second sample driver, Tom Okafor (PIN 1234), was added.
- **Problem / context:** User: "have to add ability to manage drivers bc why do we only have 1 driver rn... more like 2-8 (absolut max)... adding/removing/changing/setting the driver for the trip".
- **Alternatives considered:** Hard delete (breaks past trip records).
- **Rationale:** User's words above. The interview mentions three rotating volunteer drivers, and new funding pays part-time drivers.
- **Tradeoffs:** No cap at 8. Staff see PINs only when they set them.
- **Impact / where in code:** `STAFF`, `SEED_DRIVERS` (replace `PEOPLE`), `loadDrivers`, `activeDrivers`, `saveDriver`, `signInPeople`, `renderDrivers`, `renderDriverEdit`; `drivers.html`; staff home; preview list.
- **Evidence:** User request.

### D-059: Date and driver are editable fields in "Set up this trip", not an Edit mode
- **Date:** 2026-11-07
- **Area:** UX flow
- **Status:** Active
- **Decision:** "Set up this trip" opens with a "Date and driver" card: a date picker, pre-filled, and the active drivers as radio buttons. The box above shows only the trip name and Status. Changing the driver updates the banner, the pay heading and the button ("Send to Tom") as you tap. Staff can change both until the driver starts. A new date can't be in the past.
- **Problem / context:** User: "why can't i change driver / date if i need to? like idk if its better to like add Edit button there for core information, or to just leave it there like a field with pre-filled".
- **Alternatives considered:** An Edit button on the read-only details. Rejected because the whole screen is already a form, and a second edit mode is one more step and one more state to understand.
- **Rationale:** Inferred from the above.
- **Tradeoffs:** The reassigned driver isn't told; they see it on their home. The trip name itself still can't be changed.
- **Impact / where in code:** `setupForm`, preset header in `renderSheet`; `date` and `driverId` saved in `saveTrip`/`cloneTrip`.
- **Evidence:** User review.

### D-060: More space between sections on list pages
- **Date:** 2026-11-07
- **Area:** UI
- **Status:** Active
- **Decision:** Sections that follow another section (Other trips, Bus totals, Members, Drivers, Repairs on the staff home, and the list under a form on Members, Drivers, Repairs) get 16px more top space: 40px instead of 24px.
- **Problem / context:** User: "add some more spacing between categories... not like crazy amount but rn its just a bit too suffocating".
- **Alternatives considered:** 48px (more than asked).
- **Rationale:** User's words above.
- **Tradeoffs:** Longer scroll on the staff home.
- **Impact / where in code:** `.screen > .plain + .plain`, `.screen > form + .plain` in `components.css`.
- **Evidence:** User review.

### D-061: "Change member details" renamed "Edit member"
- **Date:** 2026-11-07
- **Area:** Copy
- **Status:** Active (refines D-050)
- **Decision:** The screen is "Edit member". The list hint says "Tap a name to edit it." The matching driver screen is "Edit driver".
- **Problem / context:** User: "change member details label -> Manage Member or like again better label cuz its too long".
- **Alternatives considered:** "Manage member" (the user's suggestion). Rejected because the screen only edits fields; "manage" suggests more.
- **Rationale:** Inferred from the above.
- **Tradeoffs:** None noted.
- **Impact / where in code:** `renderMembers`.
- **Evidence:** User review.

### D-062: Tap a ticked reason again to clear it; no Clear button
- **Date:** 2026-11-07
- **Area:** UI
- **Status:** Active (supersedes the Clear button in D-054)
- **Decision:** In "Set up this trip", tapping the ticked reason again un-ticks it, and so does Space on the keyboard. A line under "Reason (optional)" says "Tap a reason again to remove it." The "Clear the reason" button is gone. Only this optional group works this way. Every other radio group, including the driver's required reason, behaves normally.
- **Problem / context:** User: "do we need Clear the reason button...? usually u'd just click on the thing u selected to de-select it, no?"
- **Alternatives considered:** A "No reason given" option, ticked by default (recommended as the standard pattern for an optional single choice). Keeping the Clear button.
- **Rationale:** User: these screens are used only by staff and drivers, not by members with vision loss ("obviously blind people wouldnt drive").
- **Tradeoffs:** Radio buttons don't normally un-tick, so the hint line is needed. Some screen readers may not announce the un-tick.
- **Impact / where in code:** `choiceGroup(options, value, onPick, toggle)`, `reasonPicker`.
- **Evidence:** User decision.

### D-063: One destination per trip, plus up to 3 stops before or after it
- **Date:** 2026-11-07
- **Area:** UX flow / Data
- **Status:** Active (supersedes D-056)
- **Decision:** The "Destination and stops" card has one required "Destination" field. "Add a stop before" and "Add a stop after" add fields under "Before the destination" and "After the destination", shown in the order the bus visits them. A trip can have 3 extra stops at most; then the buttons hide. A blank stop is dropped. Trip details show "Location: Rogers Centre" and "Other stops: Swiss Chalet (before), Dairy Queen (after)". The driver's run lists each place as "Stop" or "Destination".
- **Problem / context:** User: "there cant be 5 destinations, it would be 1 final destination (movie theatre) and 3 stops before/after so destination can only be 1".
- **Alternatives considered:** A list of equal destinations (D-056).
- **Rationale:** User's words above.
- **Tradeoffs:** Stops on one side can't be reordered except by retyping them. The cap of 3 is read from the user's example. It also fits the interview's "up to about 15 stops" once the lot, the office and home drop-offs are counted.
- **Impact / where in code:** `routeEditor` (replaces `placeEditor`), `applyRoute`, `visits`, `placeFact`, `stopsFact`, `stopsFor`, `runForm`, `setupForm`; `destination`, `before`, `after` on trips (replace `places`); `MAX_EXTRA_STOPS`.
- **Evidence:** User review.

### D-064: Member drop-off spots are separate from destinations
- **Date:** 2026-11-07
- **Area:** UX flow / Data
- **Status:** Active (refines D-063 and D-050; trip-wide office or drop-offs choice superseded by D-069)
- **Decision:** Destinations and stops are only places the whole group goes (Dairy Queen, an art gallery). Where members get off is its own list under "Drop-off". Each member has a usual spot: their home address, unless the Members page sets "Usual drop-off spot (optional)", like a bus stop. When "At members' homes" is picked, "Set up this trip" lists "Where each member gets off". Tapping a name changes the spot for this trip only, using the same Kitchener–Waterloo address field. The trip keeps one choice for everyone, office or drop-offs. On the day, the driver taps anyone who got off at the office instead.
- **Problem / context:** User: "i dont want them to manually add stops for all members... do destinations only for reason that aernt like member addresses... u can select then individually for any resident change it if needed for example from their address to lik ea stop".
- **Alternatives considered:** Members as stops in the destination list. A per-member office-or-spot choice in setup (user: "lets keep the easier option... it can be changed to A later i just dont wanna complicate it even further").
- **Rationale:** User's words above. Staff set a spot once, not every trip.
- **Tradeoffs:** Staff can't plan a mix of office and drop-offs, only the driver can on the day. The driver can't change a spot's address on the day, only switch it to the office.
- **Impact / where in code:** `spot` on members, `usualSpot`, `dropAt` and `spotChanges` on trips (stored as `spots`), `setupForm` spot rows, `memberFields`, `plannedRow`, `dropToggle` (now name with "Gets off at…" under it), `addressMatches`.
- **Evidence:** User review and AskQuestion answers.

### D-065: One planned time: pickup at the office; no leave-the-lot time
- **Date:** 2026-11-07
- **Area:** UX flow / Copy
- **Status:** Active (refines D-016, D-021 and D-024)
- **Decision:** The only planned time is the pickup at the office. "Plan the run" has a "Pickup" card with one field, "Time at the office". "Set up this trip" has "Pickup (optional)": "Leave it blank and Priya sets it before the trip." The driver home shows "Pickup: 9:30 AM at the office", and the run starts with "Pickup at the office". The "Leave the lot" field and row are gone. The driver still enters kilometres at the lot, and the start time is still saved there, so mileage and hours are unchanged.
- **Problem / context:** User: "'leave the lot' is way too detailed. unneccesery. we just need time to be at office for pickup."
- **Alternatives considered:** Keeping both times (previous design).
- **Rationale:** Members need to know only when to be at the office. When the bus leaves the lot is up to the driver.
- **Tradeoffs:** Staff no longer see when the driver plans to leave the lot, only the actual start time on the sent record.
- **Impact / where in code:** `pickupField`, `runForm`, `setupForm`, `stopsFor`, the driver home's `tripFacts`; `leaveLot` and `timesProblem` removed.
- **Evidence:** User review.

### D-066: The office plans the run; the driver has 4 steps
- **Date:** 2026-11-07
- **Area:** UX flow
- **Status:** Active (supersedes D-016 and D-021; refines D-065)
- **Decision:** "Set up this trip" requires the pickup time, in the first card, "Date, pickup and driver", with the note "Members get this time when they confirm by phone." The driver's "Plan the run" step is gone. The driver wizard is 4 steps: kilometres at the lot, who is at the office, finish this trip, fuel. The driver can no longer change the destination or stops.
- **Problem / context:** User: "the run isnt planned by Priya Sandhu. the driver." Also, members register by phone, so they need the pickup time before the day.
- **Alternatives considered:** Driver plans the pickup time on the day (D-016).
- **Rationale:** User's words above.
- **Tradeoffs:** If the destination changes on the day, the driver can't record it. Staff would need to fix it afterwards, and review can't do that yet.
- **Impact / where in code:** `modeFor` (no "plan" mode), `stepLabel`, `driverTask`, `hasRun` (now a valid pickup time), `runCard`, `setupForm`; `runForm` and `plannerText` removed.
- **Evidence:** User review.

### D-067: Run rows read "Pickup", "Destination", "Stop" on the left, the place on the right
- **Date:** 2026-11-07
- **Area:** UI / Copy
- **Status:** Active
- **Decision:** In "The run", the bold left column is what happens (Pickup, Stop, Destination, Return, Park) and the right column is where or when ("9:30 AM at the office", "St. Jacobs Farmers Market", "Office and member drop-offs", "The parking lot"). The record of a sent trip keeps place on the left and time on the right.
- **Problem / context:** User: "why tf is St. Jacobs Farmers Market / Destination labels swapped in places in the run?" The destination row put the place where the other rows had the step name.
- **Alternatives considered:** None.
- **Rationale:** Same column means the same kind of thing on every row.
- **Tradeoffs:** None noted.
- **Impact / where in code:** `stopsFor`, `returnText`.
- **Evidence:** User review.

### D-068: Every address ends with a city
- **Date:** 2026-11-07
- **Area:** Data / Copy
- **Status:** Active
- **Decision:** Member homes, usual spots and one-trip drop-off addresses must end with ", City" (Kitchener, Waterloo, or another Region of Waterloo town). Without one: "Add the city at the end, like 14 Birch Ave, Kitchener." Sample homes now include the city.
- **Problem / context:** User: "why do some addresses have , Kitchener and others dont have city listed? it's either/or. lets keep city kitchener/waterloo after every address pls."
- **Alternatives considered:** Adding "Kitchener" automatically when the city is missing. Rejected: the address may be in Waterloo.
- **Rationale:** User's words above.
- **Tradeoffs:** The town list is fixed in `CITIES`. An address outside it can't be saved.
- **Impact / where in code:** `CITIES`, `cityProblem`, `memberFields`, `dropPicker`, `SEED_MEMBERS`, the Blue Jays sample stops.
- **Evidence:** User review.

### D-069: Drop-off is chosen per member: office by default, home, usual spot, or another address
- **Date:** 2026-11-07
- **Area:** UX flow / Data
- **Status:** Active (supersedes the trip-wide office or drop-offs choice in D-064)
- **Decision:** The "Drop-off" card in "Set up this trip" lists each member who is coming, "Gets off at the office" by default. Tapping a name opens "Where <name> gets off" with: Office, "Home: <address>", "Usual spot: <spot>" (only if set on the Members page), and "Another address" with the address field. "Done" closes it. The optional reason shows once anyone is not at the office. On the finish step the driver sees the same list and can change any member the same way. Trip details show "Office", "Homes" or "Office and homes".
- **Problem / context:** User: "for drop-offs, the options should default to office, but can be changed to people's addresses, OR another address completely (e.g. unrelated bus stop)... lets assume this is for manager and driver can handle it as an edge case."
- **Alternatives considered:** One choice for the whole trip (D-064, user's earlier pick to keep it simple).
- **Rationale:** User's words above.
- **Tradeoffs:** Staff tap each member who isn't getting off at the office. On a late Blue Jays trip that is every member.
- **Impact / where in code:** `dropPicker`, `dropKind`, `setupForm` (`plans`, `pickers`), the finish step in `renderSheet`, `dropPlace`, `plannedRow`, `stackRow`, `membersCard`; `dropToggle` and the "At the office / At members' homes" choice removed. `trip.dropPlan` is now set from the members ("homes" if anyone is not at the office).
- **Evidence:** User review.

### D-070: Run rows stack the answer under the label
- **Date:** 2026-11-07
- **Area:** UI
- **Status:** Superseded by D-071
- **Decision:** Each row in "The run" and a sent trip's "Stops" shows the label in bold ("Pickup") with the answer on the line under it ("9:30 AM at the office"), using the full width. The same row style as member drop-offs.
- **Problem / context:** User: "this is a painful section bc why do we have 2 rows for answers. there has to be a more elegant way to handle this." Right-aligned answers wrapped onto two ragged lines next to the label.
- **Alternatives considered:** Label and answer side by side, left-aligned like the trip details.
- **Rationale:** Answers like "Office and member drop-offs" fit on one line when they get the full width.
- **Tradeoffs:** The card is a little taller.
- **Impact / where in code:** `runCard` uses `stackRow`.
- **Evidence:** User review.

### D-071: "The run" stacks short answers under the step name
- **Date:** 2026-11-07
- **Area:** UI
- **Status:** Active (supersedes D-070; refines D-067)
- **Decision:** Each stop in "The run" is a stacked row: step name ("Pickup"), then the answer on the next line at full width. Answers are short so they stay on one line: Pickup shows only the time, Return shows "Office" / "Homes" / "Office and homes", Park shows "Parking lot". Spacing sits on the label and note, not on the list item, so it lines up with the card heading.
- **Problem / context:** User: side-by-side answers wrapped onto two ragged lines; stacked rows were indented past the heading.
- **Alternatives considered:** Facts two-column layout (answers wrapped again in the card). Side-by-side list rows.
- **Rationale:** Full-width answers fit on one line. Short copy keeps the card compact.
- **Tradeoffs:** Pickup no longer repeats "at the office" under the Pickup label.
- **Impact / where in code:** `runStopRow`, `runCard`, `returnText`, `stopsFor`; `.run-stop` styles.
- **Evidence:** User review.

### D-072: Driver home shows one trip: the soonest open one
- **Date:** 2026-11-07
- **Area:** UX flow
- **Status:** Active
- **Decision:** The driver home shows one trip. Prefer a trip that is started, then a ready trip, then a sent trip waiting for review. Within that, the soonest date. Reviewed trips leave the home. No trip list for v1.
- **Problem / context:** User: "do we have to add option if multiple trips are assigned or nah? for first ver maybe just 1 trip assigned by default?"
- **Alternatives considered:** A list of all assigned trips. A "Also assigned: …" note under the current trip.
- **Rationale:** User: one trip for the first version. There is only one bus, so a driver can't run two trips at once.
- **Tradeoffs:** A driver with a trip next week and one today sees today. A trip already sent stays on the home until staff review it, so a newer ready trip waits.
- **Impact / where in code:** `driverTrip` (replaces `assignment` lookup on the driver home).
- **Evidence:** User decision.

### D-073: Drop the "Park / Parking lot" row from The run
- **Date:** 2026-11-07
- **Area:** UI
- **Status:** Active
- **Decision:** The run card on the driver home ends at Return. The last "Park / Parking lot" row is removed.
- **Tradeoffs:** The bus always ends at the lot, so the row told the driver nothing new. The parking-lot stops in the list shown after a trip is sent, and the kilometre banners, are unchanged.
- **Impact / where in code:** `stopsFor` in data.js.
- **Evidence:** User decision.

### D-074: Drivers can go back to earlier steps
- **Date:** 2026-11-07
- **Area:** UX flow
- **Status:** Active
- **Decision:** On steps 2 to 4, the top back link goes to the step before it. On step 1 it goes to Today. The link reads "‹ Back" (see D-075). The earlier step opens with what the driver already entered. Saving it returns the driver to the step they were on. Later steps can't be opened early.
- **Problem / context:** User couldn't find steps 1 and 2 after finishing them. Saved progress opened the sheet at Step 3 with no way back, so a wrong starting kilometre reading couldn't be fixed.
- **Alternatives considered:** Reset the trip (fixes the demo, not the gap).
- **Tradeoffs:** Going back to step 1 keeps the original start time, so editing kilometres doesn't change paid hours. Steps 2 to 4 no longer show a direct link to Today.
- **Impact / where in code:** `DRIVER_STEPS`, `revisitMode`, `stepHref`, `renderSheet` in data.js. The fuel step's old back link, which cleared the end readings, is replaced. Script version bumped to `data.js?v=4`.
- **Evidence:** User decision.

### D-075: Every back link reads "‹ Back"
- **Date:** 2026-11-07
- **Area:** Copy / UI
- **Status:** Active (refines D-074)
- **Decision:** Every back link in the app reads "‹ Back", whether it goes to the previous driver step, Today, Trips, Members or Drivers. It no longer names where it goes.
- **Problem / context:** User: "just < Back, and everywhere it has to be the same." The D-074 links named the step, like "Step 1: Kilometres at the lot".
- **Tradeoffs:** The link doesn't say where it goes. The page title of the destination does.
- **Impact / where in code:** `backLink(href)` in data.js now sets the text itself. Script version bumped to `data.js?v=5`.
- **Evidence:** User decision.

### D-076: The run uses label-and-value rows, like the trip facts
- **Date:** 2026-11-07
- **Area:** UI
- **Status:** Active (supersedes D-071)
- **Decision:** The run card shows each step on one line, label then value ("Pickup 9:30 AM"), using the same facts list as Date, Pickup and Drop-off at the top of the page. The ruled, stacked rows are gone. The "Stops" card after a trip is sent uses the same rows.
- **Problem / context:** User: the stacked rows could be simplified to one row each, like the facts on top.
- **Tradeoffs:** Long values, like a member drop-off address, wrap in the value column instead of having the full width.
- **Impact / where in code:** `runCard` now calls `facts`; `runStopRow` and `.run-stop` styles removed.
- **Evidence:** User decision.

### D-077: Facts read inline: "Label: value", no aligned column
- **Date:** 2026-11-07
- **Area:** UI / Accessibility
- **Status:** Active (refines D-024 and D-076)
- **Decision:** Every facts list (trip details, The run, Stops) shows each row as one line of text, "Date: Saturday, November 7 (today)", with the value starting right after the label. Labels and values are no longer in two aligned columns.
- **Problem / context:** User asked whether the rows need to be that aligned, or whether text could flow naturally.
- **Alternatives considered:** Aligned two-column key/value list (common in iOS Settings and receipts). It helps scanning long lists, which these 3 to 5 rows aren't.
- **Rationale:** At large text and zoom, a fixed label column squeezes values into a narrow strip; inline text wraps under the label. The value sits right after its label, so there's no gap to misread across. The colon reads as a sentence, including for screen readers.
- **Tradeoffs:** Values don't line up, so comparing them down the list is slightly harder.
- **Impact / where in code:** `.facts` / `.fact` in components.css; `facts` in data.js adds ": " to each label. Script version bumped to `data.js?v=7`.
- **Evidence:** User decision.

### D-078: The run drops Pickup and Return; the trip facts already show them
- **Date:** 2026-11-07
- **Area:** UI
- **Status:** Active (refines D-073 and D-076)
- **Decision:** Before a trip starts, The run lists only where the group goes: the destination and any extra stops. Pickup and Return are removed, because the trip facts above show "Pickup: 9:30 AM at the office" and "Drop-off: Office and homes".
- **Problem / context:** The same pickup time and drop-off showed twice on the driver home.
- **Tradeoffs:** The run no longer reads as the full sequence from pickup to return; the driver reads the facts for both ends. The "Stops" list after a trip is sent is unchanged.
- **Impact / where in code:** `stopsFor` in data.js; `returnText` removed.
- **Evidence:** User decision.

### D-079: Hide The run when a trip has no extra stops
- **Date:** 2026-11-07
- **Area:** UI
- **Status:** Active (refines D-078)
- **Decision:** Before a trip is sent, The run card shows only when the office added extra stops, like lunch before the movie. Without them, the card is hidden.
- **Problem / context:** After D-078, a trip with no extra stops showed one row, "Destination: St. Jacobs Farmers Market", repeating the page heading.
- **Tradeoffs:** The card comes and goes between trips, so drivers won't always find it in the same place. The "Stops" card after a trip is sent always shows.
- **Impact / where in code:** `runCard` in data.js returns nothing when there are no extra stops.
- **Evidence:** User decision.

### D-080: Prototype: driver sign-in restarts unsent trips at step 1
- **Date:** 2026-11-07
- **Area:** Other
- **Status:** Active (prototype only)
- **Decision:** When a driver signs in, their trips that are not yet sent go back to step 1: kilometres, times, fuel, drop reason and who boarded are cleared. Sent and reviewed trips, and the office's setup, are kept.
- **Problem / context:** User signed in as Priya and the trip said "Finish this trip" and opened step 3, because progress from earlier testing was saved on the device. User: "just let me start from page 1 of wizard."
- **Tradeoffs:** In real use this is wrong: a driver who signs out mid-trip would lose their readings (D-022 saves as they go). Remove before real drivers use it.
- **Impact / where in code:** `restartDriverTrips`, called from the sign-in submit in data.js.
- **Evidence:** User decision.

### D-081: Step 2 is titled "Member pickup"
- **Date:** 2026-11-07
- **Area:** Copy
- **Status:** Active
- **Decision:** The driver's step 2 screen title changes from "Who is at the office" to "Member pickup". "Pickup" is one word, matching "Pickup:" in the trip facts.
- **Problem / context:** User suggestion.
- **Tradeoffs:** The title no longer says where pickup happens; the banner still says "At the office, sign in the members who are there."
- **Impact / where in code:** `renderSheet` task title and form label in data.js.
- **Evidence:** User decision.

### D-082: Step 2 goes straight to step 3
- **Date:** 2026-11-07
- **Area:** UX flow
- **Status:** Active
- **Decision:** Pressing "Leave the office" on step 2 (Member pickup) opens step 3, Finish this trip, instead of the driver home.
- **Problem / context:** User went from step 2 to the home page mid-wizard and found it broke the flow.
- **Tradeoffs:** Step 3 opens while the bus is still on the road, hours before the driver needs it. "Saved on this phone as you go" covers leaving and coming back.
- **Impact / where in code:** board submit in `renderSheet`, data.js.
- **Evidence:** User decision.

### D-083: Fuel labels: "Fuel (litres)" and "Total fuel cost ($)"
- **Date:** 2026-11-07
- **Area:** Copy
- **Status:** Active
- **Decision:** The fuel fields read "Fuel (litres)" and "Total fuel cost ($)", on the driver's fuel step and in staff review.
- **Problem / context:** User found "Fuel cost" unclear and suggested adding "per litre". The field is the total paid (sample $98.40), and it's added to the bus cost totals, so a per-litre label would make drivers type the pump price.
- **Alternatives considered:** "Price per litre" (wrong for the data). Asking for price per litre and calculating the total (extra step, and the receipt shows the total).
- **Tradeoffs:** Longer labels.
- **Impact / where in code:** fuel `field` calls in `renderSheet`, data.js.
- **Evidence:** User decision.

### D-084: After a trip, drop the Stops card; show only recorded times
- **Date:** 2026-11-07
- **Area:** UI / Data
- **Status:** Active
- **Decision:** On a sent or reviewed trip, the "Stops" card with a time for every stop and member drop-off is removed. The record card already shows the only times the app records: Start (saved when the driver finishes step 1) and End (entered in step 3). Times for each stop and drop-off move to release 2.
- **Problem / context:** User: drivers never enter when each member got off, so where would those times come from? They came only from sample data.
- **Alternatives considered:** Ask the driver to tap at each stop (more steps while driving). Record times with GPS (release 2, see D-001).
- **Tradeoffs:** Staff can't see how long each drop-off took. The sample trips' per-stop times are deleted.
- **Impact / where in code:** `runCard` and `stopsFor` in data.js; `stops` removed from the sample trips and `cloneTrip`.
- **Evidence:** User decision.

### D-085: Every trip waiting for review is in "Waiting for review"
- **Date:** 2026-11-07
- **Area:** UI
- **Status:** Active (refines D-007)
- **Decision:** The staff home lists every trip sent to the office under "Waiting for review", each in its own box with a "Review this trip" button. "Other trips" holds only trips that aren't waiting. With nothing waiting, the next open trip leads, as before.
- **Problem / context:** User saw two trips sent to the office in different sections: the first under "Waiting for review", the second under "Other trips" tagged "Sent to the office".
- **Tradeoffs:** With several trips waiting, the top section gets long and pushes Bus totals down.
- **Impact / where in code:** `renderStaffHome` in data.js.
- **Evidence:** User decision.

### D-086: Member rows end with a drop-off icon: house, office or pin
- **Date:** 2026-11-08
- **Area:** UI
- **Status:** Active
- **Decision:** In the Members list (planned "Gets off at" and finished "Got off at"), each row ends with an icon for where the member gets off: a house for their home address, an office building for the office, a map pin for anywhere else (a usual spot or a one-off place). Office rows say "Office" instead of an address. Home and other rows keep the address.
- **Problem / context:** User request.
- **Tradeoffs:** The icons are hidden from screen readers; each row adds hidden text "(home)", "(office)" or "(other place)". The pin isn't in the sample data, so it wasn't checked on screen.
- **Impact / where in code:** `dropRow`, `dropType`, `pathIcon`, `DROP_ICONS` in data.js; `.drop-icon` in components.css. The drop-off picker in step 3 is unchanged.
- **Evidence:** User decision.

### D-087: "Past trips" lists on the staff and driver homes
- **Date:** 2026-11-08
- **Area:** UX flow
- **Status:** Active (refines D-085 and D-072)
- **Decision:** The staff home splits "Other trips" into "Open trips" (not started or in progress, soonest first) and "Past trips" (reviewed, newest first, with the driver's name). The driver home adds "Your past trips": their sent and reviewed trips other than the one shown, newest first, also shown when no trip is assigned. Each row opens that trip on its own page.
- **Problem / context:** User: finished trips had nowhere to go except the bus totals, and need to be viewable one by one.
- **Alternatives considered:** A separate Past trips page (one more page to find; the lists are short for one bus).
- **Tradeoffs:** The list grows with every trip and pushes Bus totals down; it will need a "Show more" or its own page once there are many trips.
- **Impact / where in code:** `pastTripsCard`, `renderStaffHome`, `renderDriverHome` in data.js.
- **Evidence:** User decision.

### D-088: "Dropped off at", not "got off at"
- **Date:** 2026-11-08
- **Area:** Copy
- **Status:** Active
- **Decision:** All member drop-off wording uses "drop off". The plan reads "Drop-off: Office" or "Drop-off: 14 Birch Ave, Kitchener", matching "Drop-off:" in the trip facts. The record reads "Dropped off at …". Step 3's card is "Drop-offs" (was "Getting off"), and its banner, the picker heading, the error message, the setup note and the Members page use the same wording.
- **Problem / context:** User: "not got off but dropped off at."
- **Tradeoffs:** "Dropped off" describes what the driver does, not what the member does.
- **Impact / where in code:** strings in `dropRow` callers, `dropPicker`, `membersCard`, step 3 in `renderSheet`, setup note and Members page, data.js.
- **Evidence:** User decision.

### D-089: Past trips sit under Bus totals; rows put date and driver on separate lines
- **Date:** 2026-11-08
- **Area:** UI
- **Status:** Active (refines D-087)
- **Decision:** On the staff home, "Past trips" moves directly under "Bus totals", so the finished trips sit next to the numbers they add up to. Each row has three lines: the trip name (bold), the date, then "Driver: Priya Sandhu". "Reviewed" is dropped, since every trip in the staff list is reviewed. The driver's "Your past trips" rows use the same layout: name, date, then status ("Sent to the office" or "Reviewed"). With no trip waiting or open, the staff home has no top section, instead of featuring a reviewed trip as "Sent to the driver".
- **Problem / context:** User: move past trips under Bus totals, and give the date and driver a clearer hierarchy than one line joined by dots.
- **Tradeoffs:** Rows are taller. Bus totals still count trips waiting for review, which the Past trips list doesn't show (they're in "Waiting for review").
- **Impact / where in code:** `tripRow` (note can be several lines), `pastTripsCard` callers, `renderStaffHome` in data.js.
- **Evidence:** User decision.

### D-090: The organization's name is "KW AccessAbility" everywhere
- **Date:** 2026-11-08
- **Area:** Copy
- **Status:** Active
- **Decision:** Every page title and the `ORG` value read "KW AccessAbility", replacing "Assess Ability". Page titles become "<screen> · KW AccessAbility", and the sign-in meta line reads "KW AccessAbility bus". This log also drops the spaced form "KW Access Ability".
- **Problem / context:** The app said "Assess Ability", which is a misspelling and doesn't match the organization's real name. The user confirmed "KW AccessAbility" during `/impeccable init`.
- **Tradeoffs:** Longer titles, so browser tabs cut them off sooner.
- **Impact / where in code:** `ORG` in data.js (used by `document.title` and the sign-in meta), and the `<title>` of every HTML page, including the redirect pages in driver/ and staff/.
- **Evidence:** User decision.

## Open questions
- 2026-11-07: Release 2: record times at each stop and member drop-off (driver taps, or GPS). See D-084.
- 2026-11-07: Did the office write the destination and times on the old paper sheet, or did the driver fill everything? This decides whether D-016's default should flip.
- 2026-11-07: Who decides a second destination: the office, or the driver on the day?
- 2026-11-07: Does paid time start when the bus leaves the lot, at the office, or at the first stop? (D-005 assumes the lot.)
- 2026-11-07: What do the funding rules allow for paid driver hours, and are member pickups in scope? Ask Rob and Ed.
- 2026-11-07: What totals does the funder require for bus-specific reporting?
- 2026-11-07: Get the old paper trip form from the office (13th Street East near Sterling).
- 2026-11-07: Team members and roles for the case study.
- 2026-11-07: Is a paid driver's hourly rate the same on every trip (store it on the driver), or can it change per trip (D-023 stores it per trip)?
- 2026-11-07: Should staff be told when a driver changes a destination on the day (D-021)?
- 2026-11-07: Label "Kilometres" or "Mileage" for the beginning and ending odometer readings? Kept "Kilometres" for now. Ask Rob what the paper sheet and the funder call it.
- 2026-11-07: Which reasons for home drop-off does the office actually use (D-047)? "Late return" and "Weather conditions" are placeholders. Ask Rob.
- 2026-11-07: Is entering a member in both Access and the bus Members list acceptable to staff, or is an export from Access possible (D-050)?
- 2026-11-07: What is date of birth for in the next release (age checks, funder reporting)? D-050.
- 2026-11-07: Should a member be removable from the Members list, and what happens to trips they were on?
- 2026-11-07: Routes with Google Maps. Should the app suggest the order of home drop-offs, and who can reorder it? This would partly reverse D-001 ("no routing in v1"). Ask Rob whether wheelchair positions on the bus force an unloading order.
- 2026-11-07: Should the driver's end-of-trip reason also be optional (D-054)?
- 2026-11-07: Should a reassigned driver be told, or is their home screen enough (D-059)?
- 2026-11-07: With the "Plan the run" step gone (D-066), how should a destination change on the day get recorded: by the driver, or by staff afterwards?
- 2026-11-07: Should a late trip have a "Drop everyone at home" shortcut, so staff don't have to tap each member (D-069)?
- 2026-11-07: For D-051, how many uses before the how-to banners hide ("first coupla times")? Can a person bring them back? Do the same rules apply to drivers, given a new part-time driver may run the bus rarely? Should the Members-page note about Access stay always, since it states scope rather than steps?
