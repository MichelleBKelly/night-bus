const ORG = "KW AccessAbility";
const APP = "AccessBus";

const STAFF = [
  { id: "ed", full: "Edward Faruzel", role: "staff", pin: "1234" },
  { id: "rob", full: "Robert Wismer", role: "staff", pin: "1234" }
];

const SEED_DRIVERS = [
  { id: "priya", full: "Priya Sandhu", pin: "1234" },
  { id: "tom", full: "Tom Okafor", pin: "1234" }
];

const SEED_MEMBERS = [
  { id: "helen", name: "Helen Cho", seat: "Wheelchair", home: "14 Birch Ave, Kitchener" },
  { id: "samir", name: "Samir Patel", seat: "Seat", home: "220 Oak St, Waterloo" },
  { id: "ruth", name: "Ruth Abebe", seat: "Wheelchair", home: "7 Cedar Lane, Kitchener" },
  { id: "mateo", name: "Mateo Ruiz", seat: "Seat", home: "51 Pine Cres, Waterloo" },
  { id: "june", name: "June Berger", seat: "Seat", home: "22 Maple St, Kitchener" },
  { id: "walter", name: "Walter Singh", seat: "Wheelchair", home: "9 Elm St, Kitchener" }
];

const DROP_REASONS = ["Late return", "Weather conditions"];

const LOCAL_STREETS = [
  ["King Street West", "Kitchener"],
  ["King Street East", "Kitchener"],
  ["Weber Street West", "Kitchener"],
  ["Weber Street East", "Kitchener"],
  ["Victoria Street North", "Kitchener"],
  ["Victoria Street South", "Kitchener"],
  ["Ottawa Street North", "Kitchener"],
  ["Ottawa Street South", "Kitchener"],
  ["Highland Road West", "Kitchener"],
  ["Fairway Road South", "Kitchener"],
  ["Westmount Road East", "Kitchener"],
  ["Fischer-Hallman Road", "Kitchener"],
  ["Courtland Avenue East", "Kitchener"],
  ["Frederick Street", "Kitchener"],
  ["Queen Street South", "Kitchener"],
  ["Lancaster Street West", "Kitchener"],
  ["Belmont Avenue West", "Kitchener"],
  ["Margaret Avenue", "Kitchener"],
  ["Union Street", "Kitchener"],
  ["Stirling Avenue South", "Kitchener"],
  ["Krug Street", "Kitchener"],
  ["Benton Street", "Kitchener"],
  ["Charles Street East", "Kitchener"],
  ["Duke Street", "Kitchener"],
  ["Ontario Street North", "Kitchener"],
  ["Water Street North", "Kitchener"],
  ["Joseph Street", "Kitchener"],
  ["Guelph Street", "Kitchener"],
  ["Homer Watson Boulevard", "Kitchener"],
  ["Bleams Road", "Kitchener"],
  ["Block Line Road", "Kitchener"],
  ["Mill Street", "Kitchener"],
  ["13th Street East", "Kitchener"],
  ["King Street North", "Waterloo"],
  ["King Street South", "Waterloo"],
  ["University Avenue West", "Waterloo"],
  ["University Avenue East", "Waterloo"],
  ["Erb Street West", "Waterloo"],
  ["Erb Street East", "Waterloo"],
  ["Bridgeport Road East", "Waterloo"],
  ["Bridgeport Road West", "Waterloo"],
  ["Columbia Street West", "Waterloo"],
  ["Albert Street", "Waterloo"],
  ["Regina Street North", "Waterloo"],
  ["Phillip Street", "Waterloo"],
  ["Hazel Street", "Waterloo"],
  ["Caroline Street North", "Waterloo"],
  ["Westmount Road North", "Waterloo"],
  ["Northfield Drive East", "Waterloo"],
  ["Weber Street North", "Waterloo"],
  ["Lexington Road", "Waterloo"],
  ["Davenport Road", "Waterloo"],
  ["Bearinger Road", "Waterloo"],
  ["Keats Way", "Waterloo"],
  ["Lester Street", "Waterloo"],
  ["Seagram Drive", "Waterloo"],
  ["Hespeler Road", "Cambridge"],
  ["King Street", "Cambridge"],
  ["King Street East", "Cambridge"],
  ["Main Street", "Cambridge"],
  ["Franklin Boulevard", "Cambridge"],
  ["Dundas Street North", "Cambridge"],
  ["Ainslie Street", "Cambridge"],
  ["King Street North", "St. Jacobs"],
  ["Arthur Street South", "Elmira"]
];

const CITIES = ["Kitchener", "Waterloo", "Cambridge", "St. Jacobs", "Elmira", "Breslau", "Baden", "New Hamburg", "Wellesley", "Ayr"];

function cityProblem(value, example) {
  const last = String(value || "").split(",").pop().trim().toLowerCase();
  const hasCity = String(value || "").indexOf(",") !== -1 && CITIES.some((city) => city.toLowerCase() === last);
  return hasCity ? "" : "Add the city at the end, like " + example + ".";
}

const STREET_WORD = {
  st: "street",
  ave: "avenue",
  av: "avenue",
  rd: "road",
  dr: "drive",
  blvd: "boulevard",
  cres: "crescent",
  cr: "crescent",
  ln: "lane",
  ct: "court",
  n: "north",
  s: "south",
  e: "east",
  w: "west"
};

const TRIPS = [
  {
    id: "bluejays",
    name: "Blue Jays game",
    place: "Rogers Centre",
    date: "2026-11-06",
    driverId: "priya",
    assignment: false,
    boardAt: "16:10",
    destination: "Rogers Centre",
    before: [],
    after: [],
    plannedBy: "staff",
    setUp: true,
    dropPlan: "homes",
    dropReason: "Late return",
    status: "sent",
    startKm: "120210",
    startTime: "15:40",
    endKm: "120396",
    endTime: "23:40",
    litres: "62",
    fuelCost: "98.40",
    hours: "8",
    payType: "paid",
    rate: "20",
    confirmed: ["helen", "samir", "ruth", "mateo", "june", "walter"],
    aboard: ["helen", "samir", "ruth", "mateo", "june", "walter"],
    homes: ["helen", "samir", "ruth", "mateo", "june", "walter"],
    riders: SEED_MEMBERS
  },
  {
    id: "stjacobs",
    name: "St. Jacobs Farmers Market",
    place: "St. Jacobs Farmers Market",
    date: todayIso(),
    driverId: "priya",
    assignment: true,
    boardAt: "09:30",
    destination: "St. Jacobs Farmers Market",
    before: [],
    after: [],
    plannedBy: "staff",
    setUp: true,
    dropPlan: "homes",
    dropReason: "",
    status: "ready",
    startKm: "",
    startTime: "",
    endKm: "",
    endTime: "",
    litres: "",
    fuelCost: "",
    hours: "",
    payType: "paid",
    rate: "20",
    confirmed: ["helen", "samir", "ruth", "mateo", "june"],
    aboard: [],
    homes: ["helen"],
    riders: null
  }
];

const SEED_REPAIRS = [
  { date: "2026-03-30", what: "Annual safety inspection", cost: "145.00" },
  { date: "2026-05-08", what: "Four new tires", cost: "912.40" },
  { date: "2026-07-21", what: "Wheelchair lift repair", cost: "1240.00" },
  { date: "2026-09-02", what: "Oil change", cost: "89.95" },
  { date: "2026-10-14", what: "Brake inspection", cost: "486.20" }
];

const CHAIR_SPACES = 6;
const SEAT_SPACES = 3;
const MAX_EXTRA_STOPS = 3;

const KEYS = {
  session: "aa.session",
  repairs: "aa.repairs",
  members: "aa.members",
  drivers: "aa.drivers",
  notice: "aa.notice",
  trips: "aa.trips",
  deleted: "aa.deleted"
};

let idCount = 0;

function copyMember(member) {
  return { id: member.id, name: member.name, seat: member.seat, home: member.home, spot: member.spot || "" };
}

function usualSpot(member) {
  return member.spot || member.home;
}

function loadMembers() {
  const saved = readJSON(KEYS.members);
  const members = Array.isArray(saved) ? saved : SEED_MEMBERS;
  return members.map(copyMember).sort((a, b) => a.name.localeCompare(b.name));
}

function saveMember(entry) {
  const members = loadMembers();
  const index = members.findIndex((member) => member.id === entry.id);
  if (index === -1) members.push(copyMember(entry));
  else members[index] = copyMember(entry);
  storeSet(KEYS.members, JSON.stringify(members));
}

function memberId(name) {
  return freeId(name, "member", loadMembers().map((member) => member.id));
}

function copyDriver(driver) {
  return { id: driver.id, full: driver.full, role: "driver", pin: driver.pin, active: driver.active !== false };
}

function loadDrivers() {
  const saved = readJSON(KEYS.drivers);
  const drivers = Array.isArray(saved) ? saved : SEED_DRIVERS;
  return drivers.map(copyDriver).sort((a, b) => a.full.localeCompare(b.full));
}

function activeDrivers() {
  return loadDrivers().filter((driver) => driver.active);
}

function saveDriver(entry) {
  const drivers = loadDrivers();
  const index = drivers.findIndex((driver) => driver.id === entry.id);
  if (index === -1) drivers.push(copyDriver(entry));
  else drivers[index] = copyDriver(entry);
  storeSet(KEYS.drivers, JSON.stringify(drivers));
}

function driverId(name) {
  const taken = loadDrivers().map((driver) => driver.id).concat(STAFF.map((person) => person.id));
  return freeId(name, "driver", taken);
}

function freeId(name, fallback, taken) {
  const base = name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") || fallback;
  let id = base;
  let count = 2;
  while (taken.indexOf(id) !== -1) {
    id = base + "-" + count;
    count += 1;
  }
  return id;
}

function tripMembers(people, confirmed, aboard, homes, spots) {
  const changed = spots || {};
  return people
    .filter((member) => confirmed.indexOf(member.id) !== -1)
    .map((member) => ({
      id: member.id,
      name: member.name,
      seat: member.seat,
      home: member.home,
      spot: member.spot || "",
      dropAt: changed[member.id] || usualSpot(member),
      drop: homes.indexOf(member.id) === -1 ? "office" : "home",
      aboard: aboard.indexOf(member.id) !== -1
    }));
}

function spotChanges(members) {
  const changes = {};
  members.forEach((member) => {
    if (member.dropAt && member.dropAt !== usualSpot(member)) changes[member.id] = member.dropAt;
  });
  return changes;
}

function nextId(prefix) {
  idCount += 1;
  return prefix + "-" + idCount;
}

function storeGet(key) {
  try {
    return localStorage.getItem(key);
  } catch (error) {
    return null;
  }
}

function storeSet(key, value) {
  try {
    localStorage.setItem(key, value);
  } catch (error) {
    return;
  }
}

function storeDrop(key) {
  try {
    localStorage.removeItem(key);
  } catch (error) {
    return;
  }
}

function readJSON(key) {
  const raw = storeGet(key);
  if (!raw) return null;
  try {
    return JSON.parse(raw);
  } catch (error) {
    return null;
  }
}

function tripKey(id) {
  return "aa.trip." + id;
}

function everyone() {
  return loadDrivers().concat(STAFF);
}

function signInPeople() {
  return activeDrivers().concat(STAFF);
}

function personById(id) {
  return everyone().find((person) => person.id === id) || null;
}

function currentPerson() {
  const id = storeGet(KEYS.session);
  return signInPeople().find((person) => person.id === id) || null;
}

function adoptRole() {
  const params = new URLSearchParams(location.search);
  const asId = params.get("as");
  if (!asId || !signInPeople().some((person) => person.id === asId)) return;
  storeSet(KEYS.session, asId);
  params.delete("as");
  const query = params.toString();
  history.replaceState(null, "", location.pathname + (query ? "?" + query : ""));
}

function requirePerson(role) {
  const person = currentPerson();
  if (!person) {
    location.replace("index.html");
    return null;
  }
  if (role && person.role !== role) {
    location.replace("home.html");
    return null;
  }
  return person;
}

function wholeKm(value) {
  const trimmed = String(value == null ? "" : value).trim();
  if (!/^\d+$/.test(trimmed)) return null;
  return Number.parseInt(trimmed, 10);
}

function parseAmount(value) {
  const trimmed = String(value == null ? "" : value).trim();
  if (!trimmed) return { empty: true, bad: false, value: null };
  if (!/^\d+(\.\d{1,2})?$/.test(trimmed)) return { empty: false, bad: true, value: null };
  return { empty: false, bad: false, value: Number(trimmed) };
}

function validTime(value) {
  const match = /^(\d{1,2}):(\d{2})$/.exec(String(value == null ? "" : value).trim());
  if (!match) return false;
  const hour = Number(match[1]);
  const minute = Number(match[2]);
  return hour >= 0 && hour <= 23 && minute >= 0 && minute <= 59;
}

function todayIso() {
  const now = new Date();
  return now.getFullYear() + "-" + String(now.getMonth() + 1).padStart(2, "0") + "-" + String(now.getDate()).padStart(2, "0");
}

function nowClock() {
  const now = new Date();
  const hour = String(now.getHours()).padStart(2, "0");
  const minute = String(now.getMinutes()).padStart(2, "0");
  return hour + ":" + minute;
}

function hoursBetween(start, end) {
  if (!validTime(start) || !validTime(end)) return null;
  const startMatch = /^(\d{1,2}):(\d{2})$/.exec(String(start).trim());
  const endMatch = /^(\d{1,2}):(\d{2})$/.exec(String(end).trim());
  const startMinutes = Number(startMatch[1]) * 60 + Number(startMatch[2]);
  let endMinutes = Number(endMatch[1]) * 60 + Number(endMatch[2]);
  if (endMinutes < startMinutes) endMinutes += 24 * 60;
  if (endMinutes === startMinutes) return null;
  const hours = (endMinutes - startMinutes) / 60;
  return Math.round(hours * 100) / 100;
}

function money(value) {
  return "$" + value.toLocaleString("en-CA", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const WEEKDAYS = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

function dateLabel(value) {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(String(value || ""));
  if (!match) return value;
  return MONTHS[Number(match[2]) - 1] + " " + Number(match[3]) + ", " + match[1];
}

function dayLabel(value) {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(String(value || ""));
  if (!match) return value;
  const day = new Date(Number(match[1]), Number(match[2]) - 1, Number(match[3]));
  return WEEKDAYS[day.getDay()] + ", " + MONTHS[day.getMonth()] + " " + day.getDate();
}

function hourText(value) {
  const rounded = Math.round(value * 100) / 100;
  return (Number.isInteger(rounded) ? String(rounded) : String(rounded)) + " h";
}

// Trips staff create in the prototype live in browser storage next to the built-in samples.
function createdTrips() {
  return readJSON(KEYS.trips) || [];
}

// Deleting hides a trip from every list. In the prototype its saved data stays; "Reset sample trips" brings samples back.
function deletedTrips() {
  return readJSON(KEYS.deleted) || [];
}

function deleteTrip(id) {
  storeSet(KEYS.deleted, JSON.stringify(deletedTrips().filter((item) => item !== id).concat([id])));
}

function tripSources() {
  const gone = deletedTrips();
  return TRIPS.concat(createdTrips()).filter((trip) => gone.indexOf(trip.id) === -1);
}

function newTrip() {
  const drivers = activeDrivers();
  const id = "trip-" + Date.now();
  storeSet(KEYS.trips, JSON.stringify(createdTrips().concat([{
    id,
    name: "",
    place: "",
    date: todayIso(),
    driverId: drivers.length === 1 ? drivers[0].id : "",
    assignment: true,
    boardAt: "",
    destination: "",
    before: [],
    after: [],
    plannedBy: "staff",
    setUp: false,
    dropPlan: "office",
    dropReason: "",
    status: "ready",
    startKm: "",
    startTime: "",
    endKm: "",
    endTime: "",
    litres: "",
    fuelCost: "",
    hours: "",
    payType: "",
    rate: "",
    confirmed: [],
    aboard: [],
    homes: [],
    riders: null
  }])));
  return id;
}

function cloneTrip(id) {
  const source = tripSources().find((item) => item.id === id);
  if (!source) return null;
  const trip = {
    id: source.id,
    name: source.name,
    place: source.place,
    date: source.date,
    driverId: source.driverId,
    assignment: source.assignment,
    boardAt: source.boardAt,
    destination: source.destination,
    before: source.before.slice(),
    after: source.after.slice(),
    plannedBy: source.plannedBy,
    setUp: source.setUp,
    dropPlan: source.dropPlan,
    dropReason: source.dropReason,
    status: source.status,
    startKm: source.startKm,
    startTime: source.startTime,
    endKm: source.endKm,
    endTime: source.endTime,
    litres: source.litres,
    fuelCost: source.fuelCost,
    hours: source.hours,
    payType: source.payType,
    rate: source.rate,
    reviewedBy: "",
    reviewedOn: "",
    reviewedAt: "",
    corrected: false,
    members: []
  };
  const saved = readJSON(tripKey(id)) || {};
  if (typeof saved.name === "string" && saved.name) trip.name = saved.name;
  if (!trip.name) trip.name = "New trip";
  ["date", "driverId", "status", "startKm", "startTime", "endKm", "endTime", "litres", "fuelCost", "hours", "boardAt", "plannedBy", "payType", "rate", "reviewedBy", "reviewedOn", "reviewedAt", "dropPlan", "dropReason"].forEach((key) => {
    if (Object.prototype.hasOwnProperty.call(saved, key) && saved[key] != null) trip[key] = saved[key];
  });
  if (typeof saved.corrected === "boolean") trip.corrected = saved.corrected;
  if (typeof saved.destination === "string" && saved.destination) {
    trip.destination = saved.destination;
    trip.before = Array.isArray(saved.before) ? saved.before.slice() : [];
    trip.after = Array.isArray(saved.after) ? saved.after.slice() : [];
  } else if (Array.isArray(saved.places) && saved.places.length) {
    trip.destination = saved.places[0];
    trip.before = [];
    trip.after = saved.places.slice(1, 1 + MAX_EXTRA_STOPS);
  }
  if (typeof saved.setUp === "boolean") trip.setUp = saved.setUp;
  const confirmed = Array.isArray(saved.confirmed) ? saved.confirmed : source.confirmed;
  const aboard = Array.isArray(saved.aboard) ? saved.aboard : source.aboard;
  const homes = saved.drops
    ? Object.keys(saved.drops).filter((key) => saved.drops[key] === "home")
    : source.homes;
  const riders = Array.isArray(saved.riders) ? saved.riders : source.riders;
  trip.members = tripMembers(riders || loadMembers(), confirmed, aboard, homes, saved.spots);
  return trip;
}

// Prototype: a driver's trips that are not yet sent start again from step 1 at each sign-in,
// so a demo never opens halfway through. Sent and reviewed trips are kept.
function restartDriverTrips(driverId) {
  allTrips().forEach((trip) => {
    if (trip.driverId !== driverId || (trip.status !== "ready" && trip.status !== "started")) return;
    trip.status = "ready";
    ["startKm", "startTime", "endKm", "endTime", "hours", "litres", "fuelCost", "dropReason"].forEach((key) => {
      trip[key] = "";
    });
    trip.members.forEach((member) => {
      member.aboard = false;
    });
    saveTrip(trip);
    dropDraft(trip);
  });
}

function allTrips() {
  return tripSources().map((trip) => cloneTrip(trip.id));
}

function saveTrip(trip) {
  const drops = {};
  trip.members.forEach((member) => {
    drops[member.id] = member.drop;
  });
  storeSet(tripKey(trip.id), JSON.stringify({
    name: trip.name,
    date: trip.date,
    driverId: trip.driverId,
    status: trip.status,
    startKm: trip.startKm,
    startTime: trip.startTime,
    endKm: trip.endKm,
    endTime: trip.endTime,
    litres: trip.litres,
    fuelCost: trip.fuelCost,
    hours: trip.hours,
    boardAt: trip.boardAt,
    destination: trip.destination,
    before: trip.before,
    after: trip.after,
    plannedBy: trip.plannedBy,
    payType: trip.payType,
    rate: trip.rate,
    setUp: trip.setUp,
    reviewedBy: trip.reviewedBy,
    reviewedOn: trip.reviewedOn,
    reviewedAt: trip.reviewedAt,
    corrected: trip.corrected,
    dropPlan: trip.dropPlan,
    dropReason: trip.dropReason,
    confirmed: trip.members.map((member) => member.id),
    aboard: trip.members.filter((member) => member.aboard).map((member) => member.id),
    drops,
    spots: spotChanges(trip.members),
    riders: trip.status === "sent" || trip.status === "reviewed" ? trip.members.map(copyMember) : null
  }));
}

function loadRepairs() {
  const extra = readJSON(KEYS.repairs) || [];
  return SEED_REPAIRS.concat(extra).sort((a, b) => String(b.date).localeCompare(String(a.date)));
}

function saveRepair(entry) {
  const extra = readJSON(KEYS.repairs) || [];
  extra.push(entry);
  storeSet(KEYS.repairs, JSON.stringify(extra));
}

function driverOf(trip) {
  return personById(trip.driverId) || { id: "", full: "No driver yet", role: "driver", active: false };
}

function firstName(person) {
  return person.full.split(" ")[0];
}

function kmFor(trip) {
  const start = wholeKm(trip.startKm);
  const end = wholeKm(trip.endKm);
  if (start === null || end === null || end < start) return null;
  return end - start;
}

function rateOf(trip) {
  if (trip.payType === "volunteer") return 0;
  if (trip.payType !== "paid") return null;
  const parsed = parseAmount(trip.rate);
  return parsed.empty || parsed.bad ? null : parsed.value;
}

function rateText(trip) {
  if (trip.payType === "volunteer") return "Volunteer";
  const rate = rateOf(trip);
  return rate === null ? "Not set by the office" : money(rate) + " an hour";
}

function payFrom(trip, hours) {
  const rate = rateOf(trip);
  if (hours === null || rate === null) return null;
  return Math.round(hours * rate * 100) / 100;
}

function payFor(trip) {
  const hours = parseAmount(trip.hours);
  if (hours.empty || hours.bad) return null;
  return payFrom(trip, hours.value);
}

function periodTotals() {
  const totals = { trips: 0, km: 0, hours: 0, fuel: 0, pay: 0, repairs: 0 };
  allTrips().forEach((trip) => {
    if (trip.status !== "sent" && trip.status !== "reviewed") return;
    totals.trips += 1;
    const km = kmFor(trip);
    if (km !== null) totals.km += km;
    const hours = parseAmount(trip.hours);
    if (!hours.empty && !hours.bad) totals.hours += hours.value;
    const pay = payFor(trip);
    if (pay !== null) totals.pay += pay;
    const fuel = parseAmount(trip.fuelCost);
    if (!fuel.empty && !fuel.bad) totals.fuel += fuel.value;
  });
  loadRepairs().forEach((repair) => {
    const cost = parseAmount(repair.cost);
    if (!cost.empty && !cost.bad) totals.repairs += cost.value;
  });
  return totals;
}

function statusLabel(status) {
  if (status === "ready") return "Not started";
  if (status === "started") return "In progress";
  if (status === "sent") return "Sent to the office";
  if (status === "reviewed") return "Checked";
  return status;
}

function clock12(value) {
  const match = /^(\d{1,2}):(\d{2})$/.exec(String(value || "").trim());
  if (!match) return value;
  const hour = Number(match[1]);
  return (hour % 12 || 12) + ":" + match[2] + " " + (hour < 12 ? "AM" : "PM");
}

const WHEELCHAIR_PATH = "M19 13v-2c-1.54.02-3.09-.75-4.07-1.83l-1.29-1.43c-.17-.19-.38-.34-.61-.45-.01 0-.01-.01-.02-.01H13c-.35-.2-.75-.3-1.19-.26C10.76 7.11 10 8.04 10 9.09V15c0 1.1.9 2 2 2h5v5h2v-5.5c0-1.1-.9-2-2-2h-3v-3.45c1.29 1.07 3.25 1.94 5 1.95zm-6.17 5c-.41 1.16-1.52 2-2.83 2-1.66 0-3-1.34-3-3 0-1.31.84-2.41 2-2.83V12.1c-2.28.46-4 2.48-4 4.9 0 2.76 2.24 5 5 5 2.42 0 4.44-1.72 4.9-4h-2.07z";

function wheelchairIcon() {
  const ns = "http://www.w3.org/2000/svg";
  const svg = document.createElementNS(ns, "svg");
  svg.setAttribute("viewBox", "0 0 24 24");
  svg.setAttribute("aria-hidden", "true");
  svg.setAttribute("focusable", "false");
  svg.setAttribute("class", "member-icon");
  const head = document.createElementNS(ns, "circle");
  head.setAttribute("cx", "12");
  head.setAttribute("cy", "4");
  head.setAttribute("r", "2");
  const body = document.createElementNS(ns, "path");
  body.setAttribute("d", WHEELCHAIR_PATH);
  svg.append(head, body);
  return svg;
}

const DROP_ICONS = {
  home: "M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z",
  office: "M12 7V3H2v18h20V7H12zM6 19H4v-2h2v2zm0-4H4v-2h2v2zm0-4H4V9h2v2zm0-4H4V5h2v2zm4 12H8v-2h2v2zm0-4H8v-2h2v2zm0-4H8V9h2v2zm0-4H8V5h2v2zm10 12h-8v-2h2v-2h-2v-2h2v-2h-2V9h8v10zm-2-8h-2v2h2v-2zm0 4h-2v2h2v-2z",
  other: "M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"
};
const DROP_WORDS = { home: "home", office: "office", other: "other place" };

function pathIcon(d) {
  const ns = "http://www.w3.org/2000/svg";
  const svg = document.createElementNS(ns, "svg");
  svg.setAttribute("viewBox", "0 0 24 24");
  svg.setAttribute("aria-hidden", "true");
  svg.setAttribute("focusable", "false");
  svg.setAttribute("class", "member-icon");
  const path = document.createElementNS(ns, "path");
  path.setAttribute("d", d);
  svg.append(path);
  return svg;
}

// Where a member is dropped off: "office", "home" (their own address), or "other" (a usual spot or a one-off place).
function dropType(member) {
  const kind = dropKind(member);
  return kind === "spot" ? "other" : kind;
}

// A member row whose last item is an icon for where they get off: house, office building or map pin.
// bare: the card title already says "Drop-off", so the row shows just the place.
function dropRow(member, bare) {
  const type = dropType(member);
  const place = type === "office" ? "Office" : member.dropAt;
  return el("li", {
    className: "list-row",
    children: [
      el("span", {
        className: "stack",
        children: [
          el("span", { className: "stack-title", children: [memberLabel(member)] }),
          el("span", {
            className: "stack-note",
            children: bare ? [el("span", { text: place })]
              : [el("span", { text: "Drop-off: " }), el("span", { className: "drop-place", text: place })]
          })
        ]
      }),
      el("span", {
        className: "drop-icon",
        children: [pathIcon(DROP_ICONS[type]), el("span", { className: "visually-hidden", text: "(" + DROP_WORDS[type] + ")" })]
      })
    ]
  });
}

function memberLabel(member) {
  const children = [el("span", { text: member.name })];
  if (member.seat === "Wheelchair") {
    children.push(wheelchairIcon(), el("span", { className: "visually-hidden", text: ", wheelchair" }));
  }
  return el("span", { className: "member-name", children });
}

function seatLine(members) {
  const chairs = members.filter((member) => member.seat === "Wheelchair").length;
  return chairs + " wheelchairs · " + (members.length - chairs) + " seats";
}

function hasRun(trip) {
  return validTime(trip.boardAt);
}

// Before the trip: where the group goes. Pickup and drop-off are already in the trip facts above.
function stopsFor(trip) {
  return visits(trip).map((visit) => ({ place: visit.kind, time: visit.place }));
}

function modeFor(trip, person) {
  const owns = person.role === "driver" && person.id === trip.driverId && trip.setUp;
  if (owns && trip.status === "ready" && !String(trip.startKm || "").trim()) return "lot";
  if (owns && trip.status === "ready") return "board";
  if (owns && trip.status === "started" && !String(trip.endKm || "").trim()) return "end";
  if (owns && trip.status === "started") return "fuel";
  if (person.role === "staff" && trip.status === "sent") return "review";
  if (person.role === "staff" && trip.status === "ready") return "preset";
  return "read";
}

function staffTag(trip) {
  if (trip.status === "ready") return trip.setUp ? "Sent to driver" : "Draft";
  return statusLabel(trip.status);
}

const DRIVER_STEPS = ["lot", "board", "end", "fuel"];

// A driver can reopen an earlier step with ?step=lot|board|end. Later steps stay locked.
function revisitMode(mode, asked) {
  const now = DRIVER_STEPS.indexOf(mode);
  const want = DRIVER_STEPS.indexOf(asked);
  return now > 0 && want !== -1 && want < now ? asked : mode;
}

function stepHref(trip, mode) {
  return "sheet.html?trip=" + trip.id + (mode ? "&step=" + mode : "");
}

function stepLabel(trip, mode) {
  const steps = DRIVER_STEPS;
  const index = steps.indexOf(mode);
  return index === -1 ? null : "Step " + (index + 1) + " of " + steps.length;
}

function driverTask(trip) {
  const mode = modeFor(trip, driverOf(trip));
  if (mode === "lot") return "Start this trip";
  if (mode === "board") return "Sign members in";
  if (mode === "end") return "Finish this trip";
  if (mode === "fuel") return "Add fuel and send";
  return "";
}

function spacesLeft(members) {
  const chairs = members.filter((member) => member.seat === "Wheelchair").length;
  return {
    chairs: CHAIR_SPACES - chairs,
    seats: SEAT_SPACES - (members.length - chairs)
  };
}

function spaceText(left, total) {
  if (left < 0) return Math.abs(left) + " too many";
  if (left === 0) return "Full";
  return left + " of " + total + " free";
}

// Two side-by-side tiles: label, booked/capacity ("2/6"), then the same in words ("2 out of 6 booked").
function spaceTiles(left) {
  const tile = (label, free, total, allBooked) => {
    const labelId = nextId("space");
    const used = total - free;
    const note = free < 0 ? Math.abs(free) + " too many" : free === 0 ? allBooked : used + " out of " + total + " booked";
    return el("div", {
      className: "space-tile" + (free < 0 ? " is-over" : free === 0 ? " is-full" : ""),
      attrs: { role: "group", "aria-labelledby": labelId },
      children: [
        el("p", { className: "space-label", text: label, attrs: { id: labelId } }),
        el("p", { className: "space-answer", text: used + "/" + total, attrs: { "aria-hidden": "true" } }),
        el("p", { className: "space-note", text: note })
      ]
    });
  };
  return el("div", {
    className: "space-tiles",
    children: [
      tile("Wheelchairs", left.chairs, CHAIR_SPACES, "All spaces booked"),
      tile("Seats", left.seats, SEAT_SPACES, "All seats booked")
    ]
  });
}

function el(tag, options) {
  const settings = options || {};
  const node = document.createElement(tag);
  if (settings.className) node.className = settings.className;
  if (settings.text != null) node.textContent = settings.text;
  if (settings.attrs) {
    Object.entries(settings.attrs).forEach(([key, value]) => {
      node.setAttribute(key, value);
    });
  }
  (settings.children || []).flat(Infinity).forEach((child) => {
    if (child) node.append(child);
  });
  return node;
}

function setTitle(title) {
  document.title = title === APP ? title : title + " · " + APP;
}

function mount(root, title, nodes, person) {
  setTitle(title);
  const items = nodes.flat().filter(Boolean);
  if (person) {
    const first = items[0];
    const lead = first && ["back-link", "status-tag", "topbar"].some((name) => first.classList.contains(name)) ? items.shift() : null;
    items.unshift(el("div", { className: "screen-top", children: [lead, profileMenu(person)] }));
    // Driver screens group everything up to the screen title into one header band.
    const titleAt = items.findIndex((node) => node.classList.contains("topbar"));
    if (person.role === "driver" && titleAt >= 0) {
      items.unshift(el("div", { className: "masthead", children: items.splice(0, titleAt + 1) }));
    }
  }
  root.dataset.role = person ? person.role : "";
  root.replaceChildren(...items);
  const count = root.querySelectorAll(".btn-primary").length;
  if (count !== 1) {
    throw new Error("Expected one primary control, found " + count);
  }
}

// An optional grey line sits right under the title, like "Status: Draft".
function topbar(title, sub) {
  return el("header", {
    className: "topbar",
    children: [
      el("h1", { text: title, attrs: { id: "screen-title" } }),
      sub ? el("p", { className: "meta topbar-status", text: sub }) : null
    ].filter(Boolean)
  });
}

function primaryLink(href, text) {
  return el("a", { className: "btn-primary", text, attrs: { href } });
}

function primaryButton(text) {
  return el("button", {
    className: "btn-primary",
    text,
    attrs: { type: "submit" }
  });
}

function backLink(href) {
  return el("a", {
    className: "back-link",
    attrs: { href },
    children: [el("span", { text: "‹", attrs: { "aria-hidden": "true" } }), el("span", { text: "Back" })]
  });
}

function profileMenu(person) {
  const out = el("a", {
    className: "text-link",
    text: "Sign out",
    attrs: { href: "index.html" }
  });
  out.addEventListener("click", () => {
    storeDrop(KEYS.session);
  });
  const exportButton = el("button", { className: "btn-secondary", text: "Export trips", attrs: { type: "button" } });
  exportButton.addEventListener("click", () => {
    menu.open = false;
    openExport(person, menu.querySelector("summary"));
  });
  const menu = el("details", {
    className: "profile",
    children: [
      el("summary", {
        attrs: { "aria-label": person.full + ", account" },
        children: [el("span", { text: person.full.split(" ")[0] }), el("span", { text: "▾", attrs: { "aria-hidden": "true" } })]
      }),
      el("div", {
        className: "profile-panel",
        children: [
          el("p", { className: "profile-name", text: person.full }),
          el("p", { text: person.role === "staff" ? "Staff" : "Driver" }),
          exportButton,
          out
        ]
      })
    ]
  });
  document.addEventListener("click", (event) => {
    if (menu.open && !menu.contains(event.target)) menu.open = false;
  });
  menu.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && menu.open) {
      menu.open = false;
      menu.querySelector("summary").focus();
    }
  });
  return menu;
}

// ---------- Bottom sheet ----------
// A modal sheet with a title, an optional grey line, a body and one main button.
// onAction returns true to close. ×, Escape or a tap outside closes without acting.
function modalSheet(title, sub, body, actionText, onAction, returnFocus, cancelText) {
  const titleId = nextId("sheet");
  const close = el("button", {
    className: "sheet-close",
    attrs: { type: "button", "aria-label": "Close" },
    children: [el("span", { text: "×", attrs: { "aria-hidden": "true" } })]
  });
  const action = el("button", { className: "btn-primary", text: actionText, attrs: { type: "button" } });
  const sheet = el("dialog", {
    className: "sheet",
    attrs: { "aria-labelledby": titleId },
    children: [
      el("div", {
        className: "sheet-head",
        children: [
          el("div", { children: [el("h2", { text: title, attrs: { id: titleId } }), sub ? meta(sub) : null].filter(Boolean) }),
          close
        ]
      }),
      el("div", { className: "sheet-body", children: body }),
      action
    ]
  });
  const shut = () => sheet.close();
  if (cancelText) {
    const cancel = el("button", { className: "text-link sheet-cancel", text: cancelText, attrs: { type: "button" } });
    cancel.addEventListener("click", shut);
    sheet.append(cancel);
  }
  sheet.addEventListener("close", () => {
    sheet.remove();
    if (returnFocus) returnFocus.focus();
  });
  sheet.addEventListener("click", (event) => {
    if (event.target === sheet) shut();
  });
  close.addEventListener("click", shut);
  action.addEventListener("click", async () => {
    action.disabled = true;
    try {
      if (await onAction()) shut();
    } finally {
      action.disabled = false;
    }
  });
  document.body.append(sheet);
  sheet.showModal();
  return { sheet, action, shut };
}

// ---------- Export ----------
// Staff export every trip (and repairs); a driver exports only their own trips.

const EXPORT_LIBS = {
  xlsx: ["https://cdn.jsdelivr.net/npm/xlsx@0.18.5/dist/xlsx.full.min.js"],
  pdf: [
    "https://cdn.jsdelivr.net/npm/jspdf@2.5.1/dist/jspdf.umd.min.js",
    "https://cdn.jsdelivr.net/npm/jspdf-autotable@3.8.2/dist/jspdf.plugin.autotable.min.js"
  ]
};

function loadScript(src) {
  return new Promise((resolve, reject) => {
    if (document.querySelector('script[src="' + src + '"]')) {
      resolve();
      return;
    }
    const script = document.createElement("script");
    script.src = src;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error("Could not load " + src));
    document.head.append(script);
  });
}

async function loadExportLib(format) {
  for (const src of EXPORT_LIBS[format]) await loadScript(src);
}

function exportPeriod(key) {
  const now = new Date();
  const pad = (n) => String(n).padStart(2, "0");
  const month = (offset) => {
    const day = new Date(now.getFullYear(), now.getMonth() + offset, 1);
    return day.getFullYear() + "-" + pad(day.getMonth() + 1);
  };
  if (key === "this") return { label: MONTHS[now.getMonth()] + " " + now.getFullYear(), match: (date) => String(date).startsWith(month(0)) };
  if (key === "last") {
    const last = new Date(now.getFullYear(), now.getMonth() - 1, 1);
    return { label: MONTHS[last.getMonth()] + " " + last.getFullYear(), match: (date) => String(date).startsWith(month(-1)) };
  }
  return { label: "All trips", match: () => true };
}

function tripHours(trip) {
  const recorded = parseAmount(trip.hours);
  if (!recorded.empty && !recorded.bad) return recorded.value;
  return hoursBetween(trip.startTime, trip.endTime);
}

// Turns the choices into plain tables: { title, head: [...], rows: [[...]] }.
function exportTables(person, choices) {
  const period = exportPeriod(choices.period);
  const trips = allTrips()
    .filter((trip) => person.role === "staff" || trip.driverId === person.id)
    .filter((trip) => trip.setUp || trip.status !== "ready")
    .filter((trip) => period.match(trip.date))
    .sort((a, b) => String(a.date).localeCompare(String(b.date)));
  const tables = [];
  const head = [];
  const pick = [];
  const add = (label, read) => {
    head.push(label);
    pick.push(read);
  };
  add("Date", (trip) => trip.date);
  add("Trip", (trip) => trip.name);
  if (choices.details) {
    add("Destination", (trip) => trip.destination || "");
    add("Other stops", (trip) => stopsFact(trip) || "");
    if (person.role === "staff") add("Driver", (trip) => driverOf(trip).full);
    add("Pickup", (trip) => (validTime(trip.boardAt) ? clock12(trip.boardAt) : ""));
    add("Status", (trip) => statusLabel(trip.status));
  }
  if (choices.km) {
    add("Start km", (trip) => wholeKm(trip.startKm) ?? "");
    add("End km", (trip) => wholeKm(trip.endKm) ?? "");
    add("Kilometres", (trip) => (kmFor(trip) === null ? "" : kmFor(trip)));
    add("Start time", (trip) => (validTime(trip.startTime) ? clock12(trip.startTime) : ""));
    add("End time", (trip) => (validTime(trip.endTime) ? clock12(trip.endTime) : ""));
    add("Hours", (trip) => (tripHours(trip) === null ? "" : tripHours(trip)));
  }
  if (choices.pay) {
    add("Pay type", (trip) => (trip.payType === "paid" ? "Paid" : trip.payType === "volunteer" ? "Volunteer" : ""));
    add("Hourly rate", (trip) => (rateOf(trip) === null || trip.payType !== "paid" ? "" : rateOf(trip)));
    add("Pay", (trip) => {
      const pay = payFrom(trip, tripHours(trip));
      return pay === null ? "" : pay;
    });
  }
  if (choices.fuel) {
    add("Fuel (litres)", (trip) => parseAmount(trip.litres).value ?? "");
    add("Fuel cost", (trip) => (parseAmount(trip.fuelCost).value ?? ""));
  }
  tables.push({ title: "Trips", head, rows: trips.map((trip) => pick.map((read) => read(trip))) });
  if (choices.members) {
    const rows = [];
    trips.forEach((trip) => {
      trip.members.forEach((member) => {
        rows.push([
          trip.date,
          trip.name,
          member.name,
          member.seat === "Wheelchair" ? "Wheelchair" : "Seat",
          isDone(trip) ? (member.aboard ? "Yes" : "No") : "",
          member.drop === "home" ? member.dropAt : "Office"
        ]);
      });
    });
    tables.push({ title: "Members", head: ["Date", "Trip", "Member", "Seat", "Boarded", "Drop-off"], rows });
  }
  if (choices.repairs && person.role === "staff") {
    const repairs = loadRepairs()
      .filter((repair) => period.match(repair.date))
      .sort((a, b) => String(a.date).localeCompare(String(b.date)));
    tables.push({
      title: "Repairs",
      head: ["Date", "Repair", "Cost"],
      rows: repairs.map((repair) => [repair.date, repair.what, parseAmount(repair.cost).value ?? repair.cost])
    });
  }
  return { tables, period, count: trips.length };
}

function exportFileName(person, ext) {
  const who = person.role === "staff" ? "trips" : firstName(person).toLowerCase() + "-trips";
  return "accessbus-" + who + "-" + todayIso() + "." + ext;
}

function xlsxBlob(made) {
  const book = window.XLSX.utils.book_new();
  made.tables.forEach((table) => {
    const sheet = window.XLSX.utils.aoa_to_sheet([table.head].concat(table.rows));
    sheet["!cols"] = table.head.map((label, index) => ({
      wch: Math.min(40, Math.max(label.length, ...table.rows.map((row) => String(row[index] ?? "").length)) + 2)
    }));
    window.XLSX.utils.book_append_sheet(book, sheet, table.title);
  });
  const bytes = window.XLSX.write(book, { bookType: "xlsx", type: "array" });
  return new Blob([bytes], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" });
}

function pdfBlob(person, made) {
  const wide = made.tables[0].head.length > 7;
  const doc = new window.jspdf.jsPDF({ orientation: wide ? "landscape" : "portrait", unit: "pt", format: "letter" });
  const left = 40;
  doc.setFont("helvetica", "bold");
  doc.setFontSize(18);
  doc.text(APP + " trips", left, 50);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(11);
  doc.setTextColor(61, 83, 86);
  doc.text(ORG + " · " + made.period.label + " · Exported by " + person.full + " on " + dateLabel(todayIso()), left, 68);
  let y = 90;
  made.tables.forEach((table) => {
    doc.setTextColor(21, 94, 99);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(13);
    doc.text(table.title, left, y);
    doc.autoTable({
      startY: y + 8,
      head: [table.head],
      // Money columns read "$22.50" in the PDF; the spreadsheet keeps plain numbers so they can be added up.
      body: table.rows.length
        ? table.rows.map((row) => row.map((cell, index) => (typeof cell === "number" && /pay|rate|cost/i.test(table.head[index]) ? money(cell) : String(cell))))
        : [["Nothing in this period."]],
      margin: { left, right: left },
      // Wide tables never break words; columns that don't fit continue on the next page with Date and Trip repeated.
      horizontalPageBreak: table.head.length > 8,
      horizontalPageBreakRepeat: [0, 1],
      styles: {
        font: "helvetica",
        fontSize: 9,
        cellPadding: 4,
        textColor: [20, 39, 42],
        lineColor: [185, 203, 204],
        lineWidth: 0.5,
        cellWidth: table.head.length > 8 ? "wrap" : "auto"
      },
      headStyles: { fillColor: [238, 245, 245], textColor: [21, 94, 99], fontStyle: "bold" },
      alternateRowStyles: { fillColor: [255, 255, 255] },
      theme: "grid"
    });
    y = doc.lastAutoTable.finalY + 28;
  });
  return doc.output("blob");
}

function saveBlob(blob, name) {
  const url = URL.createObjectURL(blob);
  const link = el("a", { attrs: { href: url, download: name } });
  document.body.append(link);
  link.click();
  link.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

async function buildExport(person, choices) {
  await loadExportLib(choices.format);
  const made = exportTables(person, choices);
  const blob = choices.format === "xlsx" ? xlsxBlob(made) : pdfBlob(person, made);
  return { blob, made, name: exportFileName(person, choices.format) };
}

function openExport(person, returnFocus) {
  const staff = person.role === "staff";
  const choices = { format: "pdf", period: "this", details: true, members: false, km: true, pay: true, fuel: false, repairs: false };
  let ui = null;
  const format = choiceGroup([["pdf", "PDF"], ["xlsx", "Excel (.xlsx)"]], choices.format, (key) => {
    choices.format = key;
    ui.action.textContent = key === "xlsx" ? "Download Excel" : "Download PDF";
  });
  const period = choiceGroup([["this", "This month"], ["last", "Last month"], ["all", "All trips"]], choices.period, (key) => {
    choices.period = key;
  });
  const boxes = [
    ["details", "Trip details", "Destination, stops, " + (staff ? "driver, " : "") + "pickup time, status"],
    ["members", "Members", "Who came and where they were dropped off"],
    ["km", "Kilometres and hours", "Odometer readings, start and end times"],
    ["pay", "Pay", "Volunteer or paid, rate, pay"],
    ["fuel", "Fuel", "Litres and cost"]
  ].concat(staff ? [["repairs", "Repairs", "Bus repairs and their costs"]] : []);
  const includeList = el("ul", {
    children: boxes.map(([key, label, note]) => checkRow(
      el("span", { className: "stack", children: [el("span", { className: "stack-title", text: label }), el("span", { className: "stack-note", text: note })] }),
      choices[key],
      (checked) => {
        choices[key] = checked;
        error.hidden = true;
      }
    ))
  });
  const error = el("p", { className: "field-error", attrs: { role: "alert" } });
  error.hidden = true;
  ui = modalSheet(
    "Export trips",
    staff ? "Every trip, for reports and funders." : "Your trips only.",
    [
      group("Format", [format.node]),
      group("Which trips", [period.node]),
      group("Include", [meta("Date and trip name are always included."), includeList, error])
    ],
    "Download PDF",
    async () => {
      const any = boxes.some(([key]) => choices[key]);
      if (!any) {
        error.textContent = "Choose at least one thing to include.";
        error.hidden = false;
        return false;
      }
      try {
        const built = await buildExport(person, choices);
        saveBlob(built.blob, built.name);
        return true;
      } catch (problem) {
        error.textContent = "The export could not be made. Check the internet connection and try again.";
        error.hidden = false;
        return false;
      }
    },
    returnFocus
  );
}

function banner(text) {
  return el("p", { className: "banner", text, attrs: { role: "status" } });
}

function meta(text) {
  return el("p", { className: "meta", text });
}

function statusTag(text) {
  return el("p", { className: "status-tag", text });
}

function relativeDay(iso) {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(String(iso || ""));
  if (!match) return "";
  const day = new Date(Number(match[1]), Number(match[2]) - 1, Number(match[3]));
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const diff = Math.round((day - today) / 86400000);
  if (diff === 0) return "today";
  if (diff === 1) return "tomorrow";
  if (diff === -1) return "yesterday";
  return diff > 0 ? "in " + diff + " days" : Math.abs(diff) + " days ago";
}

function shortDay(trip) {
  const relative = relativeDay(trip.date);
  if (relative === "today" || relative === "tomorrow" || relative === "yesterday") {
    return relative.charAt(0).toUpperCase() + relative.slice(1);
  }
  // Lists use the short form ("Nov 6"); trip details keep the full date.
  return shortDate(trip.date);
}

function shortDate(value) {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(String(value || ""));
  if (!match) return value;
  return MONTHS[Number(match[2]) - 1].slice(0, 3) + " " + Number(match[3]);
}

function reviewFact(trip) {
  if (trip.status !== "reviewed" || !trip.reviewedBy) return null;
  const who = personById(trip.reviewedBy);
  const relative = relativeDay(trip.reviewedOn);
  const day = relative || dateLabel(trip.reviewedOn);
  const parts = [who ? who.full : "The office", day + " at " + clock12(trip.reviewedAt)];
  if (trip.corrected) parts.push("numbers corrected");
  return parts.join(", ");
}

function dateFact(trip) {
  const relative = relativeDay(trip.date);
  return relative ? dayLabel(trip.date) + " (" + relative + ")" : dayLabel(trip.date);
}

function visits(trip) {
  return trip.before.map((place) => ({ place, kind: "Stop" }))
    .concat([{ place: trip.destination, kind: "Destination" }])
    .concat(trip.after.map((place) => ({ place, kind: "Stop" })));
}

function placeFact(trip) {
  return trip.destination === trip.name ? null : trip.destination;
}

function stopsFact(trip) {
  const before = trip.before.map((place) => place + " (before)");
  const after = trip.after.map((place) => place + " (after)");
  return before.concat(after).join(", ") || null;
}

function isDone(trip) {
  return trip.status === "sent" || trip.status === "reviewed";
}

function dropPlace(trip) {
  const riding = isDone(trip) ? trip.members.filter((member) => member.aboard) : trip.members;
  const homes = riding.filter((member) => member.drop === "home").length;
  if (!homes) return "Office";
  return homes === riding.length ? "Homes" : "Office and homes";
}

function dropFact(trip) {
  const place = dropPlace(trip);
  return place !== "Office" && trip.dropReason ? place + " (" + trip.dropReason + ")" : place;
}

function statusFact(trip, person) {
  if (trip.status === "reviewed") {
    const review = reviewFact(trip);
    return review ? "Checked by " + review : "Checked";
  }
  if (person.role === "driver") return statusLabel(trip.status);
  if (trip.status === "ready") return trip.setUp ? "Sent to " + firstName(driverOf(trip)) : "Draft";
  if (trip.status === "started") return "On the road";
  return "Waiting to be checked";
}

function facts(pairs) {
  const children = [];
  pairs.forEach(([label, value]) => {
    if (value == null || value === "") return;
    children.push(el("div", {
      className: "fact",
      children: [el("dt", { text: label }), el("dd", { text: value })]
    }));
  });
  return el("dl", { className: "facts", children });
}

function tripFacts(trip, extra) {
  return facts([
    ["Location", placeFact(trip)],
    ["Other stops", stopsFact(trip)],
    ["Date", dateFact(trip)],
    ...(extra || [])
  ]);
}

function tripHead(trip, extra, level) {
  return el("div", {
    className: "trip-head",
    children: [el(level || "h2", { text: trip.name }), tripFacts(trip, extra)]
  });
}

function card(title, body, plain) {
  const headingId = nextId("card");
  return el("section", {
    className: plain ? "plain" : "card",
    attrs: { "aria-labelledby": headingId },
    children: [el("h2", typeof title === "string"
      ? { text: title, attrs: { id: headingId } }
      : { children: title, attrs: { id: headingId } }), body]
  });
}

function group(title, children) {
  return el("div", {
    className: "group",
    children: [el("h3", { text: title }), ...children]
  });
}

function disclosure(title, body) {
  return el("details", {
    className: "card totals",
    children: [
      el("summary", { children: [el("h2", { text: title })] }),
      el("div", { className: "totals-body place-list", children: body })
    ]
  });
}

function tiles(items) {
  return el("dl", {
    className: "tiles",
    children: items.map(([value, label]) => el("div", {
      className: "tile",
      children: [el("dt", { text: label }), el("dd", { text: value })]
    }))
  });
}

function summaryBox(label, children) {
  return el("div", {
    className: "summary-box",
    attrs: { role: "group", "aria-label": label },
    children
  });
}

// Label on top, number underneath, grouped as one unit so each number clearly belongs to its label.
function metric(value, label) {
  const captionId = nextId("metric");
  return [
    el("div", {
      className: "metric",
      children: [
        el("p", { className: "metric-label", text: label, attrs: { id: captionId } }),
        el("p", {
          className: "counter",
          text: value,
          attrs: { "aria-describedby": captionId }
        })
      ]
    })
  ];
}

function textRow(label, value) {
  const children = [typeof label === "string" ? el("span", { text: label }) : label];
  if (value) children.push(el("span", { text: value }));
  return el("li", { className: "list-row", children });
}

function stackRow(label, note) {
  return el("li", {
    className: "list-row",
    children: [el("span", {
      className: "stack",
      children: [
        el("span", { className: "stack-title", children: [label] }),
        el("span", { className: "stack-note", text: note })
      ]
    })]
  });
}

function plannedRow(trip, member) {
  if (dropPlace(trip) === "Office") return textRow(memberLabel(member));
  return dropRow(member);
}

function linkRow(href, label, value) {
  const children = [el("span", { text: label })];
  if (value) children.push(el("span", { text: value }));
  return el("li", {
    children: [el("a", { className: "list-row", attrs: { href }, children })]
  });
}

function tripRow(href, title, note) {
  return el("li", {
    children: [
      el("a", {
        className: "list-row trip-row",
        attrs: { href },
        children: [
          el("div", {
            className: "stack",
            children: [
              typeof title === "string"
                ? el("span", { className: "stack-title", text: title })
                : el("span", { className: "stack-title", children: [title] }),
              // A note can be one line or several (one line each, like date then driver).
              ...[].concat(note).filter(Boolean).map((line) => el("span", { className: "stack-note", text: line }))
            ]
          }),
          el("span", { className: "trip-row-arrow", text: "›", attrs: { "aria-hidden": "true" } })
        ]
      })
    ]
  });
}

const MANAGE_ICONS = {
  members: "M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z",
  drivers: "M4 16c0 .88.39 1.67 1 2.22V20c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h8v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1.78c.61-.55 1-1.34 1-2.22V6c0-3.5-3.58-4-8-4s-8 .5-8 4v10zm3.5 1c-.83 0-1.5-.67-1.5-1.5S6.67 14 7.5 14s1.5.67 1.5 1.5S8.33 17 7.5 17zm9 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm1.5-6H6V6h12v5z",
  trip: "M16.53 11.06L15.47 10l-4.88 4.88-2.12-2.12-1.06 1.06L10.59 17l5.94-5.94zM19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11z",
  repairs: "M22.7 19l-9.1-9.1c.9-2.3.4-5-1.5-6.9-2-2-5-2.4-7.4-1.3L9 6 6 9 1.6 4.7C.4 7.1.9 10.1 2.9 12.1c1.9 1.9 4.6 2.4 6.9 1.5l9.1 9.1c.4.4 1 .4 1.4 0l2.3-2.3c.5-.4.5-1.1.1-1.4z"
};

function manageRow(href, iconPath, title, note) {
  return el("li", {
    children: [
      el("a", {
        className: "list-row manage-row",
        attrs: { href },
        children: [
          el("span", { className: "manage-icon", children: [pathIcon(iconPath)] }),
          el("span", {
            className: "stack",
            children: [el("span", { className: "stack-title", text: title }), el("span", { className: "stack-note", text: note })]
          }),
          el("span", { className: "trip-row-arrow", text: "›", attrs: { "aria-hidden": "true" } })
        ]
      })
    ]
  });
}

function manageList(title, rows) {
  const headingId = nextId("card");
  return el("section", {
    className: "plain",
    attrs: { "aria-labelledby": headingId },
    children: [el("h2", { text: title, attrs: { id: headingId } }), el("ul", { className: "manage-list", children: rows })]
  });
}

function list(rows) {
  return el("ul", { children: rows });
}

function form(label, children) {
  return el("form", {
    attrs: { "aria-label": label, novalidate: "novalidate" },
    children
  });
}

function field(id, label, value, mode) {
  const control = el("input", {
    attrs: {
      id,
      name: id,
      type: mode === "date" || mode === "time" ? mode : "text",
      inputmode: mode === "date" || mode === "time" ? "none" : mode,
      autocomplete: "off",
      spellcheck: "false"
    }
  });
  control.value = value == null ? "" : String(value);
  if (mode === "time" && /^\d:\d{2}$/.test(control.value)) control.value = "0" + control.value;
  if (mode === "decimal" && /cost|rate/.test(id)) {
    control.addEventListener("input", () => {
      const cleaned = control.value.replace(/[^\d.]/g, "").replace(/(\..*)\./g, "$1");
      if (cleaned !== control.value) control.value = cleaned;
    });
  }
  const error = el("p", {
    className: "field-error",
    attrs: { id: id + "-error", role: "alert" }
  });
  error.hidden = true;
  return {
    wrap: el("label", {
      className: "field",
      children: [el("span", { text: label }), control, error]
    }),
    control,
    error
  };
}

function failField(made, message) {
  made.error.hidden = false;
  made.error.textContent = message;
  made.control.setAttribute("aria-invalid", "true");
  made.control.setAttribute("aria-describedby", made.error.id);
  made.control.focus();
}

function clearField(made) {
  made.error.hidden = true;
  made.error.textContent = "";
  made.control.removeAttribute("aria-invalid");
  made.control.removeAttribute("aria-describedby");
}

function addressQuery(value) {
  const parts = String(value || "")
    .toLowerCase()
    .replace(/[.,#]/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .split(" ")
    .filter(Boolean);
  if (parts.length && /^\d+[a-z]?$/.test(parts[0])) {
    return { number: parts[0], words: parts.slice(1) };
  }
  return { number: "", words: parts };
}

function wordsFit(hay, words) {
  const hayWords = hay.toLowerCase().split(/\s+/);
  let index = 0;
  return words.every((word) => {
    while (index < hayWords.length) {
      const hayWord = hayWords[index];
      index += 1;
      const full = STREET_WORD[word];
      if (hayWord.startsWith(word) || (full && hayWord.startsWith(full))) return true;
    }
    return false;
  });
}

function addressMatches(value) {
  const query = addressQuery(value);
  if (query.words.join("").length < 2) return [];
  const rows = [];
  const seen = new Set();
  const add = (row) => {
    const key = row.value.toLowerCase();
    if (seen.has(key)) return;
    seen.add(key);
    rows.push(row);
  };
  loadMembers().forEach((member) => {
    [member.home, member.spot].forEach((saved) => {
      const known = String(saved || "").trim();
      if (!known || !wordsFit(known, query.words)) return;
      if (query.number && !known.toLowerCase().startsWith(query.number)) return;
      add({ line: known, city: "", value: known });
    });
  });
  LOCAL_STREETS.forEach(([street, city]) => {
    if (!wordsFit(street + " " + city, query.words)) return;
    const line = query.number ? query.number + " " + street : street;
    add({ line, city, value: line + ", " + city });
  });
  return rows.slice(0, 5);
}

function photonRows(features) {
  const rows = [];
  const seen = new Set();
  features.forEach((feature) => {
    const props = feature.properties || {};
    if (props.countrycode !== "CA" || !props.street || !props.city) return;
    if (props.county && props.county !== "Waterloo") return;
    const namedPlace = props.osm_key === "landuse" || props.osm_key === "boundary" || props.osm_key === "place";
    if (!props.housenumber && namedPlace) return;
    const line = props.housenumber ? props.housenumber + " " + props.street : props.street;
    const value = line + ", " + props.city;
    const key = value.toLowerCase();
    if (seen.has(key)) return;
    seen.add(key);
    rows.push({ line, city: props.city, value, house: Boolean(props.housenumber) });
  });
  return rows;
}

// Places the office has used before (destinations and stops), matched word by word.
function placeMatches(value) {
  const words = String(value || "").toLowerCase().split(/\s+/).filter(Boolean);
  if (words.join("").length < 2) return [];
  const seen = new Set();
  const rows = [];
  allTrips().forEach((trip) => {
    [trip.destination].concat(trip.before || [], trip.after || []).forEach((place) => {
      const known = String(place || "").trim();
      const key = known.toLowerCase();
      if (!known || seen.has(key) || !wordsFit(known, words)) return;
      seen.add(key);
      rows.push({ line: known, city: "", value: known });
    });
  });
  return rows.slice(0, 3);
}

// Named places anywhere in Canada, nearest to Kitchener–Waterloo first: "Rogers Centre" + "Toronto".
function photonPlaces(features) {
  const rows = [];
  const seen = new Set();
  features.forEach((feature) => {
    const props = feature.properties || {};
    if (props.countrycode !== "CA") return;
    const name = props.name || (props.street ? (props.housenumber ? props.housenumber + " " : "") + props.street : "");
    if (!name) return;
    const city = props.city || props.town || props.village || props.county || "";
    const value = city && city !== name ? name + ", " + city : name;
    const key = value.toLowerCase();
    if (seen.has(key)) return;
    seen.add(key);
    const detail = [props.name && props.street ? (props.housenumber ? props.housenumber + " " : "") + props.street : "", city].filter(Boolean).join(", ");
    rows.push({ line: name, city: detail, value });
  });
  return rows;
}

// mode "place": a destination or stop, which can be a named place outside the region.
function addressField(id, label, value, mode) {
  const places = mode === "place";
  const made = field(id, label, value, "text");
  made.wrap.classList.remove("field");
  made.control.setAttribute("role", "combobox");
  made.control.setAttribute("aria-autocomplete", "list");
  made.control.setAttribute("aria-expanded", "false");
  made.control.setAttribute("aria-controls", id + "-suggest");
  made.control.setAttribute("aria-haspopup", "listbox");
  const list = el("ul", {
    className: "suggest",
    attrs: { id: id + "-suggest", role: "listbox", "aria-label": places ? "Place suggestions" : "Kitchener–Waterloo addresses" }
  });
  list.hidden = true;
  made.error.remove();
  const wrap = el("div", {
    className: "field address-field",
    children: [made.wrap, list, made.error]
  });
  let active = -1;
  let pending = null;
  let timer = 0;
  let suppress = false;

  function close() {
    window.clearTimeout(timer);
    if (pending) pending.abort();
    list.hidden = true;
    list.replaceChildren();
    made.control.setAttribute("aria-expanded", "false");
    made.control.removeAttribute("aria-activedescendant");
    active = -1;
  }

  function choose(row) {
    suppress = true;
    made.control.value = row.value;
    made.control.dispatchEvent(new Event("input", { bubbles: true }));
    suppress = false;
    close();
    made.control.focus();
  }

  function paint(rows, status) {
    if (!list.isConnected) return;
    list.replaceChildren();
    active = -1;
    made.control.removeAttribute("aria-activedescendant");
    if (!rows.length && !status) {
      close();
      return;
    }
    list.hidden = false;
    made.control.setAttribute("aria-expanded", "true");
    list.setAttribute("role", rows.length ? "listbox" : "status");
    if (!rows.length) {
      list.append(el("li", { children: [el("p", { className: "suggest-empty", text: status })] }));
      return;
    }
    const rank = { Kitchener: 0, Waterloo: 1, "St. Jacobs": 2, Elmira: 3, Cambridge: 4 };
    (places ? rows.slice() : rows.slice().sort((a, b) => {
      if (!a.city !== !b.city) return a.city ? 1 : -1;
      return (rank[a.city] ?? 5) - (rank[b.city] ?? 5) || a.line.localeCompare(b.line);
    })).slice(0, 5).forEach((row, index) => {
      const button = el("button", {
        className: "list-row",
        attrs: {
          type: "button",
          role: "option",
          id: id + "-option-" + index,
          "aria-selected": "false"
        },
        children: [el("span", {
          className: "stack",
          children: [
            el("span", { className: "stack-title", text: row.line }),
            row.city ? el("span", { className: "stack-note", text: row.city }) : null
          ]
        })]
      });
      button.addEventListener("pointerdown", (event) => event.preventDefault());
      button.addEventListener("click", () => choose(row));
      list.append(el("li", { children: [button] }));
    });
  }

  function move(step) {
    const options = [...list.querySelectorAll("[role='option']")];
    if (!options.length) return;
    active = (active + step + options.length) % options.length;
    options.forEach((option, index) => {
      option.setAttribute("aria-selected", index === active ? "true" : "false");
    });
    made.control.setAttribute("aria-activedescendant", options[active].id);
  }

  function searchPlaces(typed) {
    if (pending) pending.abort();
    pending = new AbortController();
    const signal = pending.signal;
    const url = "https://photon.komoot.io/api/?q=" + encodeURIComponent(typed.trim())
      + "&lat=43.45&lon=-80.49&limit=8&lang=en";
    const quiet = () => {
      if (!placeMatches(typed).length) close();
    };
    fetch(url, { signal })
      .then((response) => response.json())
      .then((data) => {
        if (signal.aborted || made.control.value !== typed || !list.isConnected) return;
        const remote = photonPlaces(data.features || []);
        // A remembered place that the lookup also finds shows once, as the lookup's row (it has the address), listed first.
        const local = placeMatches(typed);
        const known = new Set(local.map((row) => row.value.toLowerCase()));
        const isKnown = (row) => known.has(row.value.toLowerCase()) || known.has(row.line.toLowerCase());
        const found = remote.filter(isKnown);
        const foundNames = new Set(found.flatMap((row) => [row.value.toLowerCase(), row.line.toLowerCase()]));
        const rows = found
          .concat(local.filter((row) => !foundNames.has(row.value.toLowerCase())))
          .concat(remote.filter((row) => !isKnown(row)));
        if (rows.length) paint(rows, "");
        else quiet();
      })
      .catch(() => {
        if (signal.aborted || made.control.value !== typed || !list.isConnected) return;
        quiet();
      });
  }

  function searchRemote(typed) {
    if (places) {
      searchPlaces(typed);
      return;
    }
    if (pending) pending.abort();
    pending = new AbortController();
    const signal = pending.signal;
    const url = "https://photon.komoot.io/api/?q=" + encodeURIComponent(typed.trim())
      + "&bbox=-80.70,43.30,-80.25,43.62&limit=8&lang=en";
    fetch(url, { signal })
      .then((response) => response.json())
      .then((data) => {
        if (signal.aborted || made.control.value !== typed || !list.isConnected) return;
        const remote = photonRows(data.features || []);
        const houses = remote.filter((row) => row.house);
        const local = addressMatches(typed);
        if (houses.length) {
          paint(local.filter((row) => !row.city).concat(houses), "");
          return;
        }
        if (local.length) return;
        const streets = remote.filter((row) => !row.house);
        paint(streets, streets.length ? "" : "No match nearby. Type the full address.");
      })
      .catch(() => {
        if (signal.aborted || made.control.value !== typed || !list.isConnected) return;
        if (addressMatches(typed).length) return;
        paint([], "No match nearby. Type the full address.");
      });
  }

  function refresh() {
    if (suppress) return;
    const typed = made.control.value;
    const ready = addressQuery(typed).words.join("").length >= 2;
    window.clearTimeout(timer);
    if (!ready) {
      if (pending) pending.abort();
      close();
      return;
    }
    const local = places ? placeMatches(typed) : addressMatches(typed);
    // A place name can be anything, so places never show a "looking up" or "no match" note.
    if (places) {
      if (local.length) paint(local, "");
      else close();
    } else {
      paint(local, local.length ? "" : "Looking up Kitchener–Waterloo addresses.");
    }
    timer = window.setTimeout(() => searchRemote(typed), 300);
  }

  made.control.addEventListener("input", refresh);
  made.control.addEventListener("keydown", (event) => {
    if (event.key === "ArrowDown") {
      event.preventDefault();
      if (list.hidden) refresh();
      move(1);
      return;
    }
    if (event.key === "ArrowUp") {
      event.preventDefault();
      move(-1);
      return;
    }
    if (event.key === "Escape") {
      close();
      return;
    }
    if (event.key === "Enter" && active >= 0) {
      event.preventDefault();
      const option = list.querySelector("[aria-selected='true']");
      if (option) option.click();
    }
  });
  made.control.addEventListener("blur", () => close());
  document.addEventListener("pointerdown", function onDoc(event) {
    if (!wrap.isConnected) {
      document.removeEventListener("pointerdown", onDoc);
      return;
    }
    if (!wrap.contains(event.target)) close();
  });
  return { wrap, control: made.control, error: made.error };
}

function pinField() {
  const made = field("pin", "PIN", "", "numeric");
  made.control.maxLength = 4;
  made.control.autocomplete = "off";
  return made;
}

function pressRow(label, value, pressed, onToggle) {
  const tag = el("span", { className: "tag tag-action", text: value });
  const button = el("button", {
    className: "list-row",
    attrs: { type: "button", "aria-pressed": pressed ? "true" : "false" },
    children: [typeof label === "string" ? el("span", { text: label }) : label, tag]
  });
  button.addEventListener("click", () => {
    const next = onToggle();
    button.setAttribute("aria-pressed", next.pressed ? "true" : "false");
    tag.textContent = next.value;
  });
  return el("li", { children: [button] });
}

function aboardToggle(member, onChange) {
  return pressRow(memberLabel(member), member.aboard ? "Aboard" : "Sign in", member.aboard, () => {
    member.aboard = !member.aboard;
    onChange();
    return { pressed: member.aboard, value: member.aboard ? "Aboard" : "Sign in" };
  });
}

function dropKind(member) {
  if (member.drop !== "home") return "office";
  if (member.dropAt === member.home) return "home";
  if (member.spot && member.dropAt === member.spot) return "spot";
  return "other";
}

// compact: sits under a ticked name in "Set up this trip" as a small "Drop-off: Office ›" line.
function dropPicker(member, onChange, compact) {
  const item = el(compact ? "div" : "li", { className: compact ? "drop-slot" : "" });
  let open = false;
  let kind = dropKind(member);
  let otherValue = kind === "other" ? member.dropAt : "";
  let other = null;

  function apply() {
    member.drop = kind === "office" ? "office" : "home";
    member.dropAt = kind === "office" ? usualSpot(member)
      : kind === "home" ? member.home
        : kind === "spot" ? member.spot
          : otherValue.trim();
    if (onChange) onChange();
  }

  function finish() {
    if (kind === "other") {
      const value = otherValue.trim();
      const problem = !value ? "Enter the address where " + member.name + " is dropped off."
        : cityProblem(value, "King St W & Victoria St, Kitchener");
      if (problem) {
        failField(other, problem);
        other.control.focus();
        return false;
      }
    }
    apply();
    open = false;
    return true;
  }

  function closedRow() {
    const where = member.drop === "home" ? member.dropAt : "Office";
    const button = compact ? el("button", {
      className: "drop-link",
      attrs: { type: "button", "aria-haspopup": "dialog", "aria-label": "Drop-off for " + member.name + ": " + where + ". Change" },
      children: [
        el("span", { children: ["Drop-off: ", el("strong", { text: where })] }),
        el("span", { className: "trip-row-arrow", text: "›", attrs: { "aria-hidden": "true" } })
      ]
    }) : el("button", {
      className: "list-row",
      attrs: { type: "button", "aria-expanded": "false" },
      children: [
        el("span", {
          className: "stack",
          children: [
            el("span", { className: "stack-title", children: [memberLabel(member)] }),
            el("span", { className: "stack-note", text: "Drop-off: " + (member.drop === "home" ? member.dropAt : "Office") })
          ]
        }),
        el("span", { className: "trip-row-arrow", text: "›", attrs: { "aria-hidden": "true" } })
      ]
    });
    button.addEventListener("click", () => {
      if (compact) {
        openSheet();
        return;
      }
      open = true;
      draw();
      item.querySelector("input:checked, input").focus();
    });
    return button;
  }

  // compact: the choice opens in a bottom sheet, so the member list stays one level deep.
  // Nothing changes until Save; ×, Escape or tapping outside leaves the drop-off as it was.
  function openSheet() {
    const startKind = kind;
    const startOther = otherValue;
    const options = [["office", "Office"], ["home", "Home: " + member.home]];
    if (member.spot) options.push(["spot", "Usual spot: " + member.spot]);
    options.push(["other", "Another address"]);
    other = addressField("drop-" + member.id, "Address", otherValue);
    other.wrap.hidden = kind !== "other";
    other.control.addEventListener("input", () => {
      otherValue = other.control.value;
      clearField(other);
    });
    const choice = choiceGroup(options, kind, (key) => {
      kind = key;
      other.wrap.hidden = key !== "other";
      if (key === "other") other.control.focus();
    });
    const titleId = nextId("sheet");
    const close = el("button", {
      className: "sheet-close",
      attrs: { type: "button", "aria-label": "Close without saving" },
      children: [el("span", { text: "×", attrs: { "aria-hidden": "true" } })]
    });
    const save = el("button", { className: "btn-primary", text: "Save", attrs: { type: "button" } });
    const sheet = el("dialog", {
      className: "sheet",
      attrs: { "aria-labelledby": titleId },
      children: [
        el("div", {
          className: "sheet-head",
          children: [
            el("div", {
              children: [
                el("h2", { text: "Drop-off", attrs: { id: titleId } }),
                el("p", { className: "meta", text: member.name })
              ]
            }),
            close
          ]
        }),
        el("div", { className: "sheet-body", children: [choice.node, other.wrap] }),
        save
      ]
    });
    let saved = false;
    const shut = () => sheet.close();
    sheet.addEventListener("close", () => {
      if (!saved) {
        kind = startKind;
        otherValue = startOther;
      }
      sheet.remove();
      draw();
      item.querySelector("button").focus();
    });
    // A tap on the dimmed backdrop lands on the dialog itself, outside its content.
    sheet.addEventListener("click", (event) => {
      if (event.target === sheet) shut();
    });
    close.addEventListener("click", shut);
    save.addEventListener("click", () => {
      if (!finish()) return;
      saved = true;
      shut();
    });
    document.body.append(sheet);
    sheet.showModal();
    (sheet.querySelector("input:checked") || sheet.querySelector("input")).focus();
  }

  function openRow() {
    const options = [["office", "Office"], ["home", "Home: " + member.home]];
    if (member.spot) options.push(["spot", "Usual spot: " + member.spot]);
    options.push(["other", "Another address"]);
    other = addressField("drop-" + member.id, "Address", otherValue);
    other.wrap.hidden = kind !== "other";
    other.control.addEventListener("input", () => {
      otherValue = other.control.value;
      clearField(other);
    });
    const choice = choiceGroup(options, kind, (key) => {
      kind = key;
      other.wrap.hidden = key !== "other";
      if (key === "other") other.control.focus();
      else apply();
    });
    const done = el("button", { className: "btn-secondary", text: "Done", attrs: { type: "button" } });
    done.addEventListener("click", () => {
      if (!finish()) return;
      draw();
      item.querySelector("button").focus();
    });
    return el("div", {
      className: "spot-edit",
      children: [group(compact ? "Drop-off" : "Where " + member.name + " is dropped off", [choice.node, other.wrap]), done]
    });
  }

  function draw() {
    item.replaceChildren(open ? openRow() : closedRow());
  }

  draw();
  return {
    node: item,
    read() {
      if (!open) return true;
      if (!finish()) return false;
      draw();
      return true;
    }
  };
}

function checkRow(label, checked, onChange) {
  const box = el("input", { attrs: { type: "checkbox" } });
  box.checked = checked;
  const row = el("label", {
    className: "list-row check-row",
    children: [box, label]
  });
  box.addEventListener("change", () => onChange(box.checked));
  return el("li", { children: [row] });
}

function choiceGroup(options, value, onPick, toggle) {
  let current = value;
  const name = nextId("choice");
  const inputs = options.map(([key]) => {
    const input = el("input", { attrs: { type: "radio", name, value: key } });
    input.checked = current === key;
    input.addEventListener("change", () => {
      if (!input.checked) return;
      current = key;
      if (onPick) onPick(key);
    });
    if (toggle) {
      input.addEventListener("click", () => {
        if (current !== key) return;
        input.checked = false;
        current = "";
        if (onPick) onPick("");
      });
    }
    return input;
  });
  return {
    node: list(options.map(([, label], index) => el("li", {
      children: [el("label", { className: "list-row check-row", children: [inputs[index], el("span", { text: label })] })]
    }))),
    value: () => current,
    focus: () => inputs[0].focus()
  };
}

function reasonPicker(prefix, current, optional) {
  const preset = DROP_REASONS.indexOf(current) !== -1;
  const start = !current ? "" : preset ? current : "other";
  const other = field(prefix + "-other", "What is the reason?", preset ? "" : current, "text");
  other.wrap.hidden = start !== "other";
  const error = el("p", { className: "field-error", attrs: { role: "alert" } });
  error.hidden = true;
  const choice = choiceGroup(
    DROP_REASONS.map((reason) => [reason, reason]).concat([["other", "Other"]]),
    start,
    (key) => {
      error.hidden = true;
      other.wrap.hidden = key !== "other";
      if (key === "other") other.control.focus();
      if (!key) clearField(other);
    },
    optional
  );
  other.control.addEventListener("input", () => clearField(other));
  return {
    node: group(optional ? "Reason (optional)" : "Why not at the office?", [
      optional ? meta("Tap a reason again to remove it.") : null,
      choice.node,
      error,
      other.wrap
    ]),
    read() {
      clearField(other);
      error.hidden = true;
      const key = choice.value();
      if (!key && optional) return "";
      if (!key) {
        error.hidden = false;
        error.textContent = "Choose why members did not get off at the office.";
        choice.focus();
        return null;
      }
      if (key !== "other") return key;
      const text = other.control.value.trim();
      if (!text) {
        failField(other, "Enter the reason.");
        return null;
      }
      return text;
    }
  };
}

function runCard(trip) {
  const done = trip.status === "sent" || trip.status === "reviewed";
  if (!hasRun(trip)) {
    return card("The run", el("p", { text: "The office sets the pickup time when it sets up the trip." }));
  }
  // With no extra stops, the run would only repeat the destination in the heading.
  if (!done && !trip.before.length && !trip.after.length) return null;
  // After the trip, the record already shows the start and end times, the only times the app records.
  // Per-stop and per-member times are for release 2.
  if (done) return null;
  return card("The run", facts(stopsFor(trip).map((stop) => [stop.place, clock12(stop.time)])));
}

function draftKey(trip) {
  return "aa.draft." + trip.id;
}

function keepDraft(trip, made) {
  const id = made.control.id;
  const drafts = readJSON(draftKey(trip)) || {};
  if (Object.prototype.hasOwnProperty.call(drafts, id)) made.control.value = drafts[id];
  made.control.addEventListener("input", () => {
    const next = readJSON(draftKey(trip)) || {};
    next[id] = made.control.value;
    storeSet(draftKey(trip), JSON.stringify(next));
  });
}

function dropDraft(trip) {
  storeDrop(draftKey(trip));
}

function savedNote() {
  return meta("Saved on this phone as you go. You can leave and come back.");
}

// One ordered list, in the order the bus visits: the destination plus up to 3 stops.
// Drag the grip (or focus it and press the arrow keys) to move a place earlier or later.
function routeEditor(trip) {
  const destination = addressField("destination", "Destination", trip.destination, "place");
  destination.control.addEventListener("input", () => clearField(destination));
  const rows = el("ol", { className: "route-list" });
  const items = [];
  const hint = meta("");
  const live = el("p", { className: "visually-hidden", attrs: { "aria-live": "polite" } });
  const add = el("button", { className: "btn-secondary", text: "+ Add a stop", attrs: { type: "button" } });
  let made = 0;

  const placeName = (item) => item.made.control.value.trim() || (item.kind === "dest" ? "Destination" : "this stop");
  const stopCount = () => items.filter((item) => item.kind === "stop").length;
  const paint = () => {
    const stops = stopCount();
    items.forEach((item) => {
      item.grip.hidden = !stops;
      item.grip.setAttribute("aria-label", "Move " + placeName(item) + ". Use the up and down arrow keys.");
    });
    add.hidden = stops >= MAX_EXTRA_STOPS;
    rows.classList.toggle("has-stops", stops > 0);
    hint.textContent = !stops
      ? "Stops are places the group visits together, like lunch before a movie. Members' homes are not stops. Up to " + MAX_EXTRA_STOPS + "."
      : stops >= MAX_EXTRA_STOPS
        ? MAX_EXTRA_STOPS + " stops is the most for one trip. Drag ⠿ to change the order."
        : "Drag ⠿ to put places in the order the bus visits them. Members' homes are not stops.";
  };
  const redraw = () => {
    rows.replaceChildren(...items.map((item) => item.node));
    paint();
  };
  // Swap with one neighbour. The neighbour's node moves, not the dragged one, so pointer capture and focus stay put.
  const move = (item, to) => {
    const from = items.indexOf(item);
    if (to < 0 || to >= items.length || Math.abs(to - from) !== 1) return false;
    const other = items[to];
    items[to] = item;
    items[from] = other;
    rows.insertBefore(other.node, to < from ? item.node.nextSibling : item.node);
    paint();
    return true;
  };

  const makeRow = (kind, entry) => {
    const grip = el("button", {
      className: "route-grip",
      attrs: { type: "button" },
      children: [el("span", { text: "⠿", attrs: { "aria-hidden": "true" } })]
    });
    const remove = kind === "stop" ? el("button", {
      className: "route-remove",
      attrs: { type: "button", "aria-label": "Remove stop" },
      children: [el("span", { text: "×", attrs: { "aria-hidden": "true" } })]
    }) : null;
    // The × sits inside the stop's box, so every box in the list is the same width.
    const box = el("span", { className: "route-box" });
    entry.control.replaceWith(box);
    box.append(entry.control);
    if (remove) box.append(remove);
    const node = el("li", {
      className: "route-row" + (kind === "dest" ? " is-destination" : ""),
      children: [grip, entry.wrap]
    });
    const item = { kind, made: entry, node, grip };

    grip.addEventListener("keydown", (event) => {
      const step = event.key === "ArrowUp" ? -1 : event.key === "ArrowDown" ? 1 : 0;
      if (!step) return;
      event.preventDefault();
      if (move(item, items.indexOf(item) + step)) {
        grip.focus();
        live.textContent = placeName(item) + ", " + (items.indexOf(item) + 1) + " of " + items.length + ".";
      }
    });
    // Pointer drag: the row follows the finger and swaps past each neighbour's middle.
    grip.addEventListener("pointerdown", (event) => {
      if (event.button !== 0) return;
      event.preventDefault();
      grip.setPointerCapture(event.pointerId);
      node.classList.add("is-dragging");
      let startY = event.clientY;
      const onMove = (moveEvent) => {
        const index = items.indexOf(item);
        const dy = moveEvent.clientY - startY;
        const prev = items[index - 1];
        const next = items[index + 1];
        if (prev && dy < 0 && -dy > prev.node.offsetHeight / 2) {
          startY -= prev.node.offsetHeight;
          move(item, index - 1);
        } else if (next && dy > 0 && dy > next.node.offsetHeight / 2) {
          startY += next.node.offsetHeight;
          move(item, index + 1);
        }
        node.style.transform = "translateY(" + (moveEvent.clientY - startY) + "px)";
      };
      const onUp = () => {
        node.classList.remove("is-dragging");
        node.style.transform = "";
        grip.removeEventListener("pointermove", onMove);
        grip.removeEventListener("pointerup", onUp);
        grip.removeEventListener("pointercancel", onUp);
        live.textContent = placeName(item) + ", " + (items.indexOf(item) + 1) + " of " + items.length + ".";
      };
      grip.addEventListener("pointermove", onMove);
      grip.addEventListener("pointerup", onUp);
      grip.addEventListener("pointercancel", onUp);
    });
    if (remove) {
      remove.addEventListener("click", () => {
        const at = items.indexOf(item);
        items.splice(at, 1);
        redraw();
        const focusTo = items[Math.min(at, items.length - 1)];
        focusTo.made.control.focus();
      });
    }
    entry.control.addEventListener("input", paint);
    return item;
  };

  const addStop = (value) => {
    made += 1;
    const item = makeRow("stop", addressField("stop-" + made, "Stop", value, "place"));
    return item;
  };
  trip.before.forEach((place) => items.push(addStop(place)));
  items.push(makeRow("dest", destination));
  trip.after.forEach((place) => items.push(addStop(place)));
  add.addEventListener("click", () => {
    // A new stop goes after the destination; drag it earlier if it comes first.
    const item = addStop("");
    items.push(item);
    redraw();
    item.made.control.focus();
  });
  redraw();

  return {
    node: el("div", {
      className: "place-list route-editor",
      children: [rows, hint, add, live]
    }),
    read() {
      clearField(destination);
      const main = destination.control.value.trim();
      if (!main) {
        failField(destination, "Enter where the trip is going, like Rogers Centre.");
        return null;
      }
      const at = items.findIndex((item) => item.kind === "dest");
      const values = (list_) => list_.map((item) => item.made.control.value.trim()).filter(Boolean);
      return { destination: main, before: values(items.slice(0, at)), after: values(items.slice(at + 1)) };
    },
    focus() {
      destination.control.focus();
    }
  };
}

function applyRoute(trip, route) {
  trip.destination = route.destination;
  trip.before = route.before;
  trip.after = route.after;
}

function pickupField(trip) {
  return field("board-at", "Pickup time at the office", trip.boardAt, "time");
}

function setupForm(trip, onSaved) {
  const drivers = activeDrivers();
  const startDriver = drivers.some((driver) => driver.id === trip.driverId) ? trip.driverId : "";
  const nameNodes = [];
  const driverName = () => {
    const node = el("span");
    nameNodes.push(node);
    return node;
  };
  const submit = primaryButton("");
  const paintDriver = (id) => {
    const driver = drivers.find((item) => item.id === id);
    const first = driver ? firstName(driver) : "the driver";
    nameNodes.forEach((node) => {
      node.textContent = first;
    });
    submit.textContent = trip.setUp ? "Save changes" : "Send to " + first;
  };
  const tripName = field("trip-name", "Name", trip.name === "New trip" && !trip.setUp ? "" : trip.name, "text");
  const date = field("trip-date", "Date", trip.date, "date");
  const startDate = trip.date;
  const driverError = el("p", { className: "field-error", attrs: { role: "alert" } });
  driverError.hidden = true;
  const driverChoice = choiceGroup(drivers.map((driver) => [driver.id, driver.full]), startDriver, (id) => {
    driverError.hidden = true;
    paintDriver(id);
  });
  date.control.addEventListener("input", () => clearField(date));
  const editor = routeEditor(trip);
  const people = chairsFirst(loadMembers());
  const picked = new Set(trip.members.map((member) => member.id));
  const chosen = () => people.filter((member) => picked.has(member.id));
  // Same Wheelchairs / Seats tiles as the driver home, redrawn as members are ticked.
  const spaces = el("div", { attrs: { "aria-live": "polite" } });
  const drawSpaces = () => {
    spaces.replaceChildren(spaceTiles(spacesLeft(chosen())));
  };
  drawSpaces();
  const membersError = el("p", { className: "field-error", attrs: { role: "alert" } });
  membersError.hidden = true;
  // Each ticked member shows their drop-off right under their name, so there's no separate Drop-off card.
  const slots = {};
  const memberRows = people.map((member) => {
    const row = checkRow(memberLabel(member), picked.has(member.id), (checked) => {
      if (checked) picked.add(member.id);
      else picked.delete(member.id);
      membersError.hidden = true;
      drawSpaces();
      drawSpots();
    });
    row.className = "member-pick";
    slots[member.id] = row;
    return row;
  });

  const plans = {};
  people.forEach((member) => {
    const planned = trip.members.find((item) => item.id === member.id);
    const kept = planned && planned.drop === "home";
    plans[member.id] = Object.assign(copyMember(member), {
      drop: kept ? "home" : "office",
      dropAt: kept ? planned.dropAt : usualSpot(member)
    });
  });
  const pickers = {};
  const pickerFor = (member) => {
    if (!pickers[member.id]) pickers[member.id] = dropPicker(plans[member.id], () => drawReason(), true);
    return pickers[member.id];
  };
  const dropNote = el("p", { className: "meta", children: ["Drop-off is the office unless you change it. On the day, ", driverName(), " can change it too."] });
  function drawSpots() {
    people.forEach((member) => {
      const going = picked.has(member.id);
      const node = pickerFor(member).node;
      if (going && !node.isConnected) slots[member.id].append(node);
      if (!going && node.isConnected) node.remove();
    });
    dropNote.hidden = !picked.size;
    drawReason();
  }
  const reason = reasonPicker("drop-reason", trip.dropReason, true);
  const reasonArea = el("div", { className: "place-list", children: [reason.node] });
  function drawReason() {
    reasonArea.hidden = !chosen().some((member) => plans[member.id].drop === "home");
  }
  drawSpots();

  const rate = field("pay-rate", "Hourly rate in dollars", trip.rate, "decimal");
  rate.wrap.hidden = trip.payType !== "paid";
  const payError = el("p", { className: "field-error", attrs: { role: "alert" } });
  payError.hidden = true;
  const payChoice = choiceGroup([["volunteer", "Volunteer"], ["paid", "Paid"]], trip.payType, (key) => {
    payError.hidden = true;
    rate.wrap.hidden = key !== "paid";
    if (key === "paid") rate.control.focus();
  });
  const board = pickupField(trip);

  const panel = form("Set up this trip", [
    el("p", {
      className: "banner",
      children: trip.setUp
        ? [driverName(), " already has this trip. Change anything until the trip starts, then save."]
        : ["Fill in each part, then send it to ", driverName(), ". You can change it until the trip starts."]
    }),
    card("Trip", [
      tripName.wrap,
      date.wrap,
      board.wrap,
      meta("Members get this time when they confirm by phone.")
    ]),
    card("Driver and pay", [
      group("Driver", [
        drivers.length ? driverChoice.node : meta("No drivers yet. Add one on the Drivers page."),
        driverError
      ]),
      group("Pay", [
        payChoice.node,
        payError,
        rate.wrap
      ])
    ]),
    card("Where to", editor.node),
    card("Who is coming", [
      el("div", {
        className: "card-intro",
        children: [meta("Tick who confirmed by phone. Only they can board."), spaces]
      }),
      el("ul", { className: "member-picks", children: memberRows }),
      membersError,
      dropNote,
      reasonArea,
      meta("Someone missing? Add them on the Members page.")
    ]),
    submit,
    deleteControl(trip)
  ]);
  paintDriver(startDriver);
  [tripName, board, rate].forEach((made) => {
    made.control.addEventListener("input", () => clearField(made));
  });
  panel.addEventListener("submit", (event) => {
    event.preventDefault();
    [tripName, date, board, rate].forEach(clearField);
    payError.hidden = true;
    membersError.hidden = true;
    driverError.hidden = true;
    const nameValue = tripName.control.value.trim();
    if (!nameValue) {
      failField(tripName, "Enter a name for the trip, like Blue Jays game.");
      return;
    }
    const dateValue = date.control.value.trim();
    if (!/^\d{4}-\d{2}-\d{2}$/.test(dateValue)) {
      failField(date, "Choose the date of the trip.");
      return;
    }
    if (dateValue !== startDate && dateValue < todayIso()) {
      failField(date, "Choose today or a later date.");
      return;
    }
    const boardValue = board.control.value.trim();
    if (!validTime(boardValue)) {
      failField(board, "Choose the pickup time at the office.");
      return;
    }
    const pickedDriver = driverChoice.value();
    if (!pickedDriver) {
      driverError.hidden = false;
      driverError.textContent = drivers.length
        ? "Choose who drives this trip."
        : "Add a driver on the Drivers page first.";
      if (drivers.length) driverChoice.focus();
      return;
    }
    const route = editor.read();
    if (!route) return;
    const going = chosen();
    const left = spacesLeft(going);
    const membersProblem = !going.length ? "Confirm at least one member."
      : left.chairs < 0 ? "The bus has " + CHAIR_SPACES + " wheelchair spaces. Remove a wheelchair user."
        : left.seats < 0 ? "The bus has " + SEAT_SPACES + " seats. Remove a member who does not use a wheelchair."
          : "";
    if (membersProblem) {
      membersError.hidden = false;
      membersError.textContent = membersProblem;
      if (memberRows.length) memberRows[0].querySelector("input").focus();
      return;
    }
    if (!going.every((member) => pickerFor(member).read())) return;
    const away = going.filter((member) => plans[member.id].drop === "home");
    const dropReason = away.length ? reason.read() : "";
    if (dropReason === null) return;
    const payType = payChoice.value();
    if (!payType) {
      payError.hidden = false;
      payError.textContent = "Choose Volunteer or Paid.";
      payChoice.focus();
      return;
    }
    const parsedRate = parseAmount(rate.control.value);
    if (payType === "paid" && (parsedRate.empty || parsedRate.bad || parsedRate.value <= 0)) {
      failField(rate, "Enter the hourly rate, like 20.00.");
      return;
    }
    trip.name = nameValue;
    trip.boardAt = boardValue;
    trip.plannedBy = "staff";
    trip.date = dateValue;
    trip.driverId = pickedDriver;
    applyRoute(trip, route);
    const spots = {};
    away.forEach((member) => {
      spots[member.id] = plans[member.id].dropAt;
    });
    trip.members = tripMembers(going, going.map((member) => member.id), [], away.map((member) => member.id), spots);
    trip.dropPlan = away.length ? "homes" : "office";
    trip.dropReason = dropReason;
    trip.payType = payType;
    trip.rate = payType === "paid" ? rate.control.value.trim() : "";
    trip.setUp = true;
    saveTrip(trip);
    onSaved();
  });
  return panel;
}

// Staff can delete a trip until the driver starts it. A started trip is a record for the funders.
function deleteControl(trip) {
  const name = trip.name && trip.name !== "New trip" ? trip.name : "this trip";
  const button = el("button", { className: "text-link text-danger", text: "Delete trip", attrs: { type: "button" } });
  button.addEventListener("click", () => {
    const driver = trip.setUp ? firstName(driverOf(trip)) : "";
    const ui = modalSheet(
      "Delete " + name + "?",
      null,
      [el("p", {
        text: (driver ? "It disappears from " + driver + "'s screen too. " : "") + "This can't be undone."
      })],
      "Delete trip",
      () => {
        deleteTrip(trip.id);
        location.href = "home.html";
        return true;
      },
      button,
      "Keep the trip"
    );
    ui.action.classList.add("btn-danger");
  });
  return button;
}

function chairsFirst(members) {
  return members
    .filter((member) => member.seat === "Wheelchair")
    .concat(members.filter((member) => member.seat !== "Wheelchair"));
}

function membersCard(trip, mode, onChange) {
  const members = chairsFirst(trip.members);
  const keep = () => {
    saveTrip(trip);
    if (onChange) onChange();
  };
  if (mode === "start") {
    return card("Sign members in", list(members.map((member) => aboardToggle(member, keep))));
  }
  if (trip.status === "ready") {
    return card("Members", list(members.map((member) => plannedRow(trip, member))));
  }
  const finished = isDone(trip);
  return card(finished ? "Members & Drop-off" : "Members", [
    meta("Everyone boarded at the office."),
    list(members.map((member) => !member.aboard ? stackRow(memberLabel(member), "Did not board")
      : !finished ? stackRow(memberLabel(member), "On the bus")
        : dropRow(member, true)))
  ]);
}

function recordCard(trip) {
  const hours = parseAmount(trip.hours);
  const fuelLitres = parseAmount(trip.litres);
  const fuelCost = parseAmount(trip.fuelCost);
  const km = kmFor(trip);
  const pay = payFor(trip);
  const groups = [
    ["Times", [
      trip.startTime ? textRow("Start", clock12(trip.startTime)) : null,
      trip.endTime ? textRow("End", clock12(trip.endTime)) : null,
      !hours.empty && !hours.bad ? textRow("Hours", hourText(hours.value)) : null
    ]],
    ["Kilometres", [
      trip.startKm ? textRow("Beginning", trip.startKm) : null,
      trip.endKm ? textRow("Ending", trip.endKm) : null,
      km !== null ? textRow("Total", km + " km") : null
    ]],
    ["Pay", [
      textRow("Rate", rateText(trip)),
      pay !== null ? textRow("Pay", money(pay)) : null
    ]],
    ["Fuel", [
      !fuelLitres.empty && !fuelLitres.bad ? textRow("Litres", String(fuelLitres.value)) : null,
      !fuelCost.empty && !fuelCost.bad ? textRow("Cost", money(fuelCost.value)) : null
    ]]
  ];
  return card("Details", groups
    .map(([title, rows]) => [title, rows.filter(Boolean)])
    .filter(([, rows]) => rows.length)
    .map(([title, rows]) => group(title, [list(rows)])));
}

function readingOf(source) {
  if (source == null) return "";
  return typeof source === "string" ? source : source.value;
}

// Same layout as the finished trip's summary: label on top, live number underneath.
function liveFigures(trip, readings) {
  const payLabel = trip.payType === "volunteer" ? "Pay (volunteer trip)"
    : rateOf(trip) === null ? "Pay (rate not set by the office)"
      : "Pay at " + rateText(trip);
  const km = metric("–", "Kilometres")[0];
  const hoursBox = metric("–", "Hours")[0];
  const payBox = metric("–", payLabel)[0];
  const kmNode = km.querySelector(".counter");
  const hoursNode = hoursBox.querySelector(".counter");
  const payNode = payBox.querySelector(".counter");

  function draw() {
    const start = wholeKm(readingOf(readings.startKm));
    const end = wholeKm(readingOf(readings.endKm));
    const hours = hoursBetween(readingOf(readings.startTime), readingOf(readings.endTime));
    kmNode.textContent = start === null || end === null || end < start ? "–" : (end - start) + " km";
    hoursNode.textContent = hours === null ? "–" : hourText(hours);
    const pay = payFrom(trip, hours);
    payNode.textContent = pay === null ? "–" : money(pay);
  }

  draw();
  [readings.startKm, readings.endKm, readings.startTime, readings.endTime].forEach((source) => {
    if (source && source.addEventListener) source.addEventListener("input", draw);
  });
  return summaryBox("Kilometres, hours, and pay", [km, hoursBox, payBox]);
}

function applyFuel(trip, litres, cost) {
  const parsedLitres = parseAmount(litres);
  const parsedCost = parseAmount(cost);
  if (parsedLitres.bad) return { field: "litres", message: "Enter fuel litres as a number." };
  if (parsedCost.bad) return { field: "cost", message: "Enter the fuel cost as a number, like 98.40." };
  if (parsedLitres.empty !== parsedCost.empty) {
    return {
      field: parsedLitres.empty ? "litres" : "cost",
      message: "Enter both litres and cost, or leave both blank."
    };
  }
  trip.litres = parsedLitres.empty ? "" : litres.trim();
  trip.fuelCost = parsedCost.empty ? "" : cost.trim();
  return null;
}

function sheetHome(person) {
  return person.role === "staff" ? "Back to trips" : "Back to today";
}

// One screen: a flat list of names (initial, name, role underneath, a check on the picked one),
// then the PIN box, whose label names the picked person.
function renderSignIn(root) {
  const people = signInPeople();
  let selected = people[0];
  const pin = pinField();
  const pinLabel = pin.wrap.querySelector("span");
  const paintLabel = () => {
    pinLabel.textContent = "PIN for " + selected.full.split(" ")[0];
  };
  const buttons = people.map((person) => {
    const initials = person.full.split(" ").map((part) => part[0]).join("").slice(0, 2);
    const button = el("button", {
      className: "person-row",
      attrs: { type: "button", "aria-pressed": person.id === selected.id ? "true" : "false" },
      children: [
        el("span", { className: "person-initials", text: initials, attrs: { "aria-hidden": "true" } }),
        el("span", {
          className: "person-text",
          children: [
            el("span", { className: "person-name", text: person.full }),
            el("span", { className: "person-role", text: person.role === "driver" ? "Driver" : "Staff" })
          ]
        }),
        el("span", { className: "person-check", attrs: { "aria-hidden": "true" } })
      ]
    });
    button.addEventListener("click", () => {
      selected = person;
      buttons.forEach((item) => {
        item.setAttribute("aria-pressed", item === button ? "true" : "false");
      });
      paintLabel();
      clearField(pin);
      pin.control.focus();
    });
    return button;
  });
  paintLabel();
  const panel = form("Sign in", [
    el("ul", {
      className: "person-list",
      attrs: { "aria-label": "Your name" },
      children: buttons.map((button) => el("li", { children: [button] }))
    }),
    el("div", {
      className: "pin-block",
      children: [pin.wrap, meta("Forgot your PIN? Ask the office.")]
    }),
    primaryButton("Sign in")
  ]);
  pin.control.addEventListener("input", () => clearField(pin));
  panel.addEventListener("submit", (event) => {
    event.preventDefault();
    const entered = pin.control.value.trim();
    if (entered !== selected.pin) {
      failField(pin, entered
        ? "That PIN does not match " + selected.full + "."
        : "Enter the 4-digit PIN.");
      return;
    }
    storeSet(KEYS.session, selected.id);
    if (selected.role === "driver") restartDriverTrips(selected.id);
    location.href = "home.html";
  });
  mount(root, "Sign in", [
    el("div", {
      className: "brand",
      children: [
        el("img", { className: "brand-mark", attrs: { src: "assets/accessbus-mark.png", alt: "", width: "56", height: "56" } }),
        el("p", {
          className: "brand-name",
          children: [el("span", { text: APP }), el("span", { className: "brand-org", text: ORG })]
        })
      ]
    }),
    topbar("Sign in", "Pick your name and enter your PIN."),
    panel
  ]);
  pin.control.focus();
}

function renderHome(root) {
  adoptRole();
  const person = requirePerson();
  if (!person) return;
  if (person.role === "staff") {
    renderStaffHome(root, person);
    return;
  }
  renderDriverHome(root, person);
}

// Finished trips (sent or reviewed), newest first. Each opens on its own page.
// Past trips: one grouped list, each row a bold trip name over one grey line ("Friday, November 6 · Priya Sandhu").
function pastTripsCard(trips, title, noteFor) {
  const past = trips.filter(isDone).sort((a, b) => b.date.localeCompare(a.date));
  if (!past.length) return null;
  return manageList(title, past.map((trip) => manageRow(
    "sheet.html?trip=" + trip.id,
    MANAGE_ICONS.trip,
    trip.name,
    [].concat(noteFor(trip)).filter(Boolean).join(" · ")
  )));
}

function driverTrip(person) {
  return allTrips()
    .filter((item) => item.setUp && item.driverId === person.id && item.status !== "reviewed")
    .sort((a, b) => {
      const rank = (trip) => trip.status === "started" ? 0 : trip.status === "ready" ? 1 : 2;
      return rank(a) - rank(b) || a.date.localeCompare(b.date);
    })[0] || null;
}

function renderDriverHome(root, person) {
  const trip = driverTrip(person);
  if (!trip) {
    mount(root, "No trip today", [
      topbar("No trip today"),
      el("p", { text: "Nothing is assigned to you yet. When the office sends you a trip, it shows here." }),
      primaryLink("home.html", "Check again"),
      pastTripsCard(allTrips().filter((item) => item.driverId === person.id), "Your past trips", (item) => [shortDay(item), statusLabel(item.status)])
    ], person);
    return;
  }
  const task = driverTask(trip);
  const sent = trip.status === "sent" || trip.status === "reviewed";
  const nodes = [
    statusTag(sent ? statusLabel(trip.status) : trip.status === "started" ? "On the road" : "Assigned to you"),
    topbar(trip.name),
    tripFacts(trip, sent ? [] : [
      ["Pickup", hasRun(trip) ? clock12(trip.boardAt) + " at the office" : "Not set by the office yet"],
      ["Drop-off", dropFact(trip)],
      ["Pay", rateText(trip)]
    ])
  ];
  if (sent) {
    const km = kmFor(trip);
    const hours = parseAmount(trip.hours);
    const pay = payFor(trip);
    nodes.push(summaryBox("This trip", [
      ...metric(km === null ? "–" : km + " km", "Kilometres"),
      ...metric(hours.empty || hours.bad ? "–" : hourText(hours.value), "Hours"),
      ...metric(pay === null ? "–" : money(pay), "Pay")
    ]));
    nodes.push(primaryLink("sheet.html?trip=" + trip.id, "See what you sent"));
  } else {
    const spaces = spacesLeft(trip.members);
    nodes.push(primaryLink("sheet.html?trip=" + trip.id, task));
    if (hasRun(trip)) nodes.push(runCard(trip));
    nodes.push(card("Who can board", [
      spaceTiles(spaces),
      list(chairsFirst(trip.members).map((member) => plannedRow(trip, member)))
    ]));
  }
  nodes.push(pastTripsCard(
    allTrips().filter((item) => item.driverId === person.id && item.id !== trip.id),
    "Your past trips",
    (item) => [shortDay(item), statusLabel(item.status)]
  ));
  mount(root, trip.name, nodes, person);
}

function reviewNotice() {
  const notice = readJSON(KEYS.notice);
  storeDrop(KEYS.notice);
  if (!notice || notice.kind !== "reviewed") return null;
  const trip = cloneTrip(notice.trip);
  if (!trip || trip.status !== "reviewed") return null;
  const undo = el("button", {
    className: "btn-secondary",
    text: "Undo",
    attrs: { type: "button" }
  });
  undo.addEventListener("click", () => {
    trip.status = "sent";
    trip.reviewedBy = "";
    trip.reviewedOn = "";
    trip.reviewedAt = "";
    trip.corrected = false;
    saveTrip(trip);
    location.reload();
  });
  return el("div", {
    className: "banner notice",
    attrs: { role: "status" },
    children: [
      el("p", { className: "notice-title", text: "✓ " + trip.name + " is checked" }),
      el("p", {
        text: (trip.corrected ? "Your corrections are saved. " : "") + "Its kilometres, hours and costs are in the bus totals."
      }),
      undo
    ]
  });
}

function renderStaffHome(root, person) {
  const trips = allTrips();
  const sent = trips.filter((trip) => trip.status === "sent");
  const open = trips.filter((trip) => trip.status === "ready" || trip.status === "started");
  // Every trip waiting for review goes in the top section; with none waiting, the next open trip leads.
  // Reviewed trips never lead: with nothing waiting or open, there is no top section.
  const leads = sent.length ? sent : open.slice(0, 1);
  const others = trips.filter((trip) => leads.indexOf(trip) === -1);
  const totals = periodTotals();
  const lead = leads[0];
  const leadTitle = !lead ? null
    : lead.status === "sent" ? "Pending approval"
      : lead.status === "started" ? "On the road"
        : lead.setUp ? "Sent to the driver" : "Needs setting up";
  const leadBox = (trip) => {
    const km = kmFor(trip);
    const task = trip.status === "sent" ? "Open" : trip.status === "ready" ? "Set up this trip" : "Open this trip";
    return el("div", {
      className: "box",
      children: [
        tripHead(trip, [
          ["Driver", driverOf(trip).full],
          ["Distance", km === null ? null : km + " km"],
          ["Drop-off", dropFact(trip)]
        ], "h3"),
        primaryLink("sheet.html?trip=" + trip.id, task)
      ]
    });
  };
  const create = el("button", { className: "btn-secondary", text: "+ New trip", attrs: { type: "button" } });
  create.addEventListener("click", () => {
    location.href = "sheet.html?trip=" + newTrip();
  });
  const nodes = [
    topbar("Trips"),
    create,
    reviewNotice(),
    lead ? card(leadTitle, leads.map(leadBox), true) : null
  ];
  const upcoming = others.filter((trip) => !isDone(trip)).sort((a, b) => a.date.localeCompare(b.date));
  if (upcoming.length) {
    nodes.push(card("Open trips", list(upcoming.map((trip) => tripRow(
      "sheet.html?trip=" + trip.id,
      trip.name,
      shortDay(trip) + " · " + staffTag(trip)
    ))), true));
  }
  nodes.push(card("Bus totals", [
    el("p", { text: "All trips sent to the office so far, and every repair in the repair history." }),
    tiles([
      [String(totals.trips), totals.trips === 1 ? "Trip sent" : "Trips sent"],
      [totals.km + " km", "Distance"],
      [hourText(totals.hours), "Driver hours"],
      [money(totals.pay), "Driver pay"],
      [money(totals.fuel), "Fuel"],
      [money(totals.repairs), "Repairs"]
    ])
  ], true));
  // Every staff past trip is reviewed, so the row shows only the date and driver.
  nodes.push(pastTripsCard(others, "Past trips", (trip) => [shortDay(trip), driverOf(trip).full]));
  const members = loadMembers();
  const chairs = members.filter((member) => member.seat === "Wheelchair").length;
  const drivers = activeDrivers();
  const repairs = loadRepairs();
  const latest = repairs[0];
  // One grouped list of the places staff go to manage things, like a phone's Settings.
  nodes.push(manageList("Manage", [
    manageRow("members.html", MANAGE_ICONS.members, "Members (" + members.length + ")",
      members.length ? chairs + (chairs === 1 ? " uses" : " use") + " a wheelchair" : "No members yet. Add the first one"),
    manageRow("drivers.html", MANAGE_ICONS.drivers, "Drivers (" + drivers.length + ")",
      drivers.length ? drivers.map(firstName).join(", ") : "No drivers yet. Add the first one"),
    manageRow("maintenance.html", MANAGE_ICONS.repairs, "Repairs (" + repairs.length + ")",
      latest ? "Latest: " + latest.what : "No repairs yet. Add the first one")
  ]));
  mount(root, "Trips", nodes, person);
}

function renderSheet(root) {
  adoptRole();
  const person = requirePerson();
  if (!person) return;
  const trip = cloneTrip(new URLSearchParams(location.search).get("trip"));
  if (!trip) {
    mount(root, "Trip", [
      backLink("home.html"),
      topbar("Trip"),
      banner("That trip is not on the list."),
      primaryLink("home.html", sheetHome(person))
    ], person);
    return;
  }
  const current = modeFor(trip, person);
  const mode = revisitMode(current, new URLSearchParams(location.search).get("step"));
  const revisit = mode !== current;
  const stepIndex = DRIVER_STEPS.indexOf(mode);
  const task = mode === "preset" ? "Set up this trip"
      : mode === "lot" ? "Kilometres at the lot"
        : mode === "board" ? "Member pickup"
          : mode === "end" ? "Finish this trip"
            : mode === "fuel" ? "Fuel, if you bought any"
              : mode === "review" ? "Check trip sheet"
                : trip.name;
  const step = stepLabel(trip, mode);
  const extra = [
    ["Status", step ? null : statusFact(trip, person)],
    ["Driver", person.role === "staff" ? driverOf(trip).full : null],
    ["Drop-off", dropFact(trip)]
  ];
  // "Set up this trip" shows its status as a grey line under the title; the name is the first field.
  const head = mode === "preset" ? null : mode === "read" ? tripFacts(trip, extra) : tripHead(trip, extra);
  const nodes = [
    stepIndex > 0 ? backLink(stepHref(trip, DRIVER_STEPS[stepIndex - 1])) : backLink("home.html"),
    step ? el("p", { className: "step-line", text: step }) : null,
    topbar(task, mode === "preset" ? "Status: " + statusFact(trip, person) : null),
    mode === "preset" ? null : el("div", { className: "box", children: [head] })
  ];

  if (mode === "preset") {
    nodes.push(setupForm(trip, () => {
      location.href = "home.html";
    }));
  } else if (mode === "lot") {
    const km = field("begin-km", "Beginning kilometres", trip.startKm || "", "numeric");
    keepDraft(trip, km);
    const panel = form("Kilometres at the lot", [
      banner("At the parking lot, enter the kilometres. The start time is saved when you continue."),
      km.wrap,
      primaryButton("Continue"),
      savedNote()
    ]);
    km.control.addEventListener("input", () => clearField(km));
    panel.addEventListener("submit", (event) => {
      event.preventDefault();
      if (wholeKm(km.control.value) === null) {
        failField(km, "Enter the beginning kilometres as a whole number.");
        return;
      }
      trip.startKm = km.control.value.trim();
      if (!revisit) trip.startTime = nowClock();
      saveTrip(trip);
      dropDraft(trip);
      location.href = stepHref(trip);
    });
    nodes.push(panel);
  } else if (mode === "board") {
    const boardError = el("p", { className: "field-error", attrs: { id: "board-error", role: "alert" } });
    boardError.hidden = true;
    const members = membersCard(trip, "start");
    const panel = form("Member pickup", [
      banner("At the office, sign in the members who are there. Only confirmed members can board."),
      members,
      boardError,
      primaryButton("Leave the office"),
      savedNote()
    ]);
    panel.addEventListener("submit", (event) => {
      event.preventDefault();
      if (!trip.members.some((member) => member.aboard)) {
        boardError.hidden = false;
        boardError.textContent = "Sign in each member who is at the office.";
        return;
      }
      trip.status = "started";
      saveTrip(trip);
      location.href = stepHref(trip);
    });
    nodes.push(panel);
  } else if (mode === "end") {
    const endKm = field("end-km", "Ending kilometres", trip.endKm || "", "numeric");
    const endTime = field("end-time", "End time", trip.endTime || nowClock(), "time");
    keepDraft(trip, endKm);
    keepDraft(trip, endTime);
    const plannedHomes = trip.dropPlan === "homes";
    const needsReason = () => !plannedHomes && trip.members.some((member) => member.aboard && member.drop === "home");
    const reason = reasonPicker("drop-reason", plannedHomes ? "" : trip.dropReason);
    const reasonArea = el("div", { className: "place-list", children: [reason.node] });
    reasonArea.hidden = !needsReason();
    const pickers = chairsFirst(trip.members.filter((member) => member.aboard)).map((member) => dropPicker(member, () => {
      saveTrip(trip);
      reasonArea.hidden = !needsReason();
    }));
    const gettingOff = card("Drop-offs", [list(pickers.map((picker) => picker.node)), reasonArea]);
    const panel = form("Finish this trip", [
      banner("Back at the parking lot. Check where each member was dropped off. If it changed, tap their name."),
      gettingOff,
      card("Kilometres and time", [
        endKm.wrap,
        endTime.wrap,
        liveFigures(trip, {
          startKm: trip.startKm,
          endKm: endKm.control,
          startTime: trip.startTime,
          endTime: endTime.control
        })
      ]),
      primaryButton("Continue"),
      savedNote()
    ]);
    endKm.control.addEventListener("input", () => clearField(endKm));
    endTime.control.addEventListener("input", () => clearField(endTime));
    panel.addEventListener("submit", (event) => {
      event.preventDefault();
      clearField(endKm);
      clearField(endTime);
      const end = wholeKm(endKm.control.value);
      const start = wholeKm(trip.startKm);
      if (end === null) {
        failField(endKm, "Enter the ending kilometres as a whole number.");
        return;
      }
      if (start !== null && end < start) {
        failField(endKm, "Ending kilometres are below the beginning kilometres.");
        return;
      }
      if (!validTime(endTime.control.value)) {
        failField(endTime, "Enter the end time, like 1:05 PM.");
        return;
      }
      const hours = hoursBetween(trip.startTime, endTime.control.value.trim());
      if (hours === null) {
        failField(endTime, "Enter an end time after the start.");
        return;
      }
      if (!pickers.every((picker) => picker.read())) return;
      if (needsReason()) {
        const picked = reason.read();
        if (picked === null) return;
        trip.dropReason = picked;
      } else if (!plannedHomes) {
        trip.dropReason = "";
      }
      trip.endKm = endKm.control.value.trim();
      trip.endTime = endTime.control.value.trim();
      trip.hours = String(hours);
      saveTrip(trip);
      dropDraft(trip);
      location.href = stepHref(trip);
    });
    nodes.push(panel);
  } else if (mode === "fuel") {
    const litres = field("fuel-litres", "Fuel (litres)", trip.litres, "decimal");
    const cost = field("fuel-cost", "Total fuel cost ($)", trip.fuelCost, "decimal");
    keepDraft(trip, litres);
    keepDraft(trip, cost);
    const panel = form("Fuel, if you bought any", [
      banner("Enter the fuel if you bought any. Leave both blank if you did not."),
      litres.wrap,
      cost.wrap,
      primaryButton("Send to the office"),
      savedNote()
    ]);
    litres.control.addEventListener("input", () => {
      clearField(litres);
      clearField(cost);
    });
    cost.control.addEventListener("input", () => {
      clearField(litres);
      clearField(cost);
    });
    panel.addEventListener("submit", (event) => {
      event.preventDefault();
      clearField(litres);
      clearField(cost);
      const problem = applyFuel(trip, litres.control.value, cost.control.value);
      if (problem) {
        failField(problem.field === "litres" ? litres : cost, problem.message);
        return;
      }
      trip.status = "sent";
      saveTrip(trip);
      dropDraft(trip);
      location.href = "home.html";
    });
    nodes.push(panel);
  } else if (mode === "review") {
    const startKm = field("begin-km", "Beginning kilometres", trip.startKm, "numeric");
    const startTime = field("start-time", "Start time", trip.startTime, "time");
    const endKm = field("end-km", "Ending kilometres", trip.endKm, "numeric");
    const endTime = field("end-time", "End time", trip.endTime, "time");
    const litres = field("fuel-litres", "Fuel (litres)", trip.litres, "decimal");
    const cost = field("fuel-cost", "Total fuel cost ($)", trip.fuelCost, "decimal");
    const fields = [startKm, startTime, endKm, endTime, litres, cost];
    const initial = fields.map((made) => made.control.value);
    const correct = disclosure("Correct a number", [
      group("Times", [startTime.wrap, endTime.wrap]),
      group("Kilometres", [startKm.wrap, endKm.wrap]),
      group("Fuel", [litres.wrap, cost.wrap]),
      liveFigures(trip, {
        startKm: startKm.control,
        endKm: endKm.control,
        startTime: startTime.control,
        endTime: endTime.control
      })
    ]);
    const panel = form("Check trip sheet", [
      correct,
      primaryButton("Mark as checked")
    ]);
    const fail = (made, message) => {
      correct.open = true;
      failField(made, message);
    };
    fields.forEach((made) => {
      made.control.addEventListener("input", () => fields.forEach(clearField));
    });
    panel.addEventListener("submit", (event) => {
      event.preventDefault();
      fields.forEach(clearField);
      const start = wholeKm(startKm.control.value);
      const end = wholeKm(endKm.control.value);
      if (start === null) {
        fail(startKm, "Enter the beginning kilometres as a whole number.");
        return;
      }
      if (end === null) {
        fail(endKm, "Enter the ending kilometres as a whole number.");
        return;
      }
      if (end < start) {
        fail(endKm, "Ending kilometres are below the beginning kilometres.");
        return;
      }
      if (!validTime(startTime.control.value)) {
        fail(startTime, "Enter the start time, like 8:40 AM.");
        return;
      }
      if (!validTime(endTime.control.value)) {
        fail(endTime, "Enter the end time, like 1:05 PM.");
        return;
      }
      const hours = hoursBetween(startTime.control.value.trim(), endTime.control.value.trim());
      if (hours === null) {
        fail(endTime, "Enter an end time after the start.");
        return;
      }
      const problem = applyFuel(trip, litres.control.value, cost.control.value);
      if (problem) {
        fail(problem.field === "litres" ? litres : cost, problem.message);
        return;
      }
      trip.startKm = startKm.control.value.trim();
      trip.startTime = startTime.control.value.trim();
      trip.endKm = endKm.control.value.trim();
      trip.endTime = endTime.control.value.trim();
      trip.hours = String(hours);
      trip.status = "reviewed";
      trip.reviewedBy = person.id;
      trip.reviewedOn = todayIso();
      trip.reviewedAt = nowClock();
      trip.corrected = fields.some((made, index) => made.control.value.trim() !== initial[index].trim());
      saveTrip(trip);
      storeSet(KEYS.notice, JSON.stringify({ kind: "reviewed", trip: trip.id }));
      location.href = "home.html";
    });
    nodes.push(banner("Check the numbers, then mark the trip sheet as checked. If one is wrong, open Correct a number."));
    nodes.push(recordCard(trip));
    nodes.push(membersCard(trip, "read"));
    nodes.push(panel);
  } else {
    if (trip.startKm || trip.endKm) nodes.push(recordCard(trip));
    nodes.push(runCard(trip));
    nodes.push(membersCard(trip, "read"));
    nodes.push(primaryLink("home.html", sheetHome(person)));
  }

  mount(root, task, nodes, person);
}

function renderMaintenance(root, saved) {
  adoptRole();
  const person = requirePerson("staff");
  if (!person) return;
  const date = field("repair-date", "Date", "", "date");
  const what = field("repair-what", "What was done", "", "text");
  const cost = field("repair-cost", "Cost", "", "decimal");
  const panel = form("Add a repair", [
    banner("Repairs stay with the bus. They are separate from a trip."),
    saved ? meta("Saved with the bus records.") : null,
    card("Add a repair", [date.wrap, what.wrap, cost.wrap, primaryButton("Save the repair")])
  ]);
  const history = loadRepairs();
  const spent = history.reduce((sum, repair) => sum + (parseAmount(repair.cost).value || 0), 0);
  const onFile = card("Repair history", [meta(history.length + " repairs, " + money(spent) + " in total."), list(history.map((repair) => el("li", {
    children: [
      el("div", {
        className: "list-row trip-row record-row",
        children: [
          el("div", {
            className: "stack",
            children: [
              el("span", { className: "stack-title", text: repair.what }),
              el("span", { className: "stack-note", text: dateLabel(repair.date) })
            ]
          }),
          el("span", { className: "record-cost", text: money(parseAmount(repair.cost).value || 0) })
        ]
      })
    ]
  })))], true);
  [date, what, cost].forEach((made) => {
    made.control.addEventListener("input", () => clearField(made));
  });
  panel.addEventListener("submit", (event) => {
    event.preventDefault();
    const parsed = parseAmount(cost.control.value);
    if (!date.control.value.trim()) {
      failField(date, "Enter the date.");
      return;
    }
    if (!what.control.value.trim()) {
      failField(what, "Enter what was done.");
      return;
    }
    if (parsed.empty || parsed.bad) {
      failField(cost, "Enter the cost as a number, like 42.00.");
      return;
    }
    saveRepair({
      date: date.control.value.trim(),
      what: what.control.value.trim(),
      cost: cost.control.value.trim()
    });
    renderMaintenance(root, true);
  });
  mount(root, "Repairs", [
    backLink("home.html"),
    topbar("Repairs"),
    panel,
    onFile
  ], person);
}

function memberFields(member) {
  const name = field("member-name", "Full name", member ? member.name : "", "text");
  const home = addressField("member-home", "Home address", member ? member.home : "");
  const spot = addressField("member-spot", "Usual drop-off spot (optional)", member ? member.spot : "");
  const chairError = el("p", { className: "field-error", attrs: { role: "alert" } });
  chairError.hidden = true;
  const chair = choiceGroup(
    [["yes", "Yes"], ["no", "No"]],
    member ? (member.seat === "Wheelchair" ? "yes" : "no") : "",
    () => {
      chairError.hidden = true;
    }
  );
  [name, home, spot].forEach((made) => {
    made.control.addEventListener("input", () => clearField(made));
  });
  return {
    nodes: [
      name.wrap,
      home.wrap,
      spot.wrap,
      meta("Only if they often get off somewhere else, like a bus stop. It shows as a choice when you set up a trip."),
      group("Uses a wheelchair on the bus?", [chair.node, chairError])
    ],
    read(takenNames) {
      [name, home, spot].forEach(clearField);
      chairError.hidden = true;
      const full = name.control.value.trim().replace(/\s+/g, " ");
      if (!full) {
        failField(name, "Enter the member's full name.");
        return null;
      }
      const taken = takenNames.find((other) => other.toLowerCase() === full.toLowerCase());
      if (taken) {
        failField(name, taken + " is already on the list.");
        return null;
      }
      if (!home.control.value.trim()) {
        failField(home, "Enter the home address. The driver uses it for drop-offs at home.");
        return null;
      }
      const homeCity = cityProblem(home.control.value, "14 Birch Ave, Kitchener");
      if (homeCity) {
        failField(home, homeCity);
        return null;
      }
      const spotCity = spot.control.value.trim() ? cityProblem(spot.control.value, "King St W & Victoria St, Kitchener") : "";
      if (spotCity) {
        failField(spot, spotCity);
        return null;
      }
      if (!chair.value()) {
        chairError.hidden = false;
        chairError.textContent = "Choose Yes or No.";
        chair.focus();
        return null;
      }
      const spotValue = spot.control.value.trim();
      return {
        name: full,
        home: home.control.value.trim(),
        spot: spotValue.toLowerCase() === home.control.value.trim().toLowerCase() ? "" : spotValue,
        seat: chair.value() === "yes" ? "Wheelchair" : "Seat"
      };
    }
  };
}

function renderMembers(root, savedText) {
  adoptRole();
  const person = requirePerson("staff");
  if (!person) return;
  const params = new URLSearchParams(location.search);
  const members = loadMembers();
  const editId = params.get("member");

  if (editId) {
    const member = members.find((item) => item.id === editId);
    if (!member) {
      mount(root, "Member", [
        backLink("members.html"),
        topbar("Member"),
        banner("That member is not on the list."),
        primaryLink("members.html", "Back to members")
      ], person);
      return;
    }
    const made = memberFields(member);
    const panel = form("Edit member", [
      card(member.name, [made.nodes, primaryButton("Save changes")])
    ]);
    panel.addEventListener("submit", (event) => {
      event.preventDefault();
      const others = members.filter((item) => item.id !== member.id).map((item) => item.name);
      const entry = made.read(others);
      if (!entry) return;
      saveMember({ id: member.id, name: entry.name, home: entry.home, spot: entry.spot, seat: entry.seat });
      location.href = "members.html?changed=" + encodeURIComponent(entry.name);
    });
    mount(root, "Edit member", [
      backLink("members.html"),
      topbar("Edit member"),
      panel
    ], person);
    return;
  }

  const changed = params.get("changed");
  const saved = savedText ? "Saved. " + savedText + " is on the list."
    : changed ? "Saved the changes to " + changed + "."
      : "";
  const made = memberFields(null);
  const panel = form("Add a member", [
    card("Add a member", [made.nodes, primaryButton("Save the member")])
  ]);
  panel.addEventListener("submit", (event) => {
    event.preventDefault();
    const entry = made.read(members.map((item) => item.name));
    if (!entry) return;
    saveMember({ id: memberId(entry.name), name: entry.name, home: entry.home, spot: entry.spot, seat: entry.seat });
    history.replaceState(null, "", "members.html");
    renderMembers(root, entry.name);
  });
  const chairs = members.filter((member) => member.seat === "Wheelchair").length;
  mount(root, "Members", [
    backLink("home.html"),
    topbar("Members"),
    banner("This list is only for the bus: who uses a wheelchair, and where to drop them at home. Membership and dues stay in the Access database."),
    saved ? meta(saved) : null,
    panel,
    card("All members", [
      meta(members.length + (members.length === 1 ? " member, " : " members, ") + chairs + (chairs === 1 ? " uses" : " use") + " a wheelchair. Tap a name to edit it."),
      list(chairsFirst(members).map((member) => tripRow(
        "members.html?member=" + member.id,
        memberLabel(member),
        member.spot ? member.home + ". Drop-off: " + member.spot : member.home
      )))
    ], true)
  ], person);
}

function openTripsFor(driver) {
  return allTrips().filter((trip) => trip.driverId === driver.id && (trip.status === "ready" || trip.status === "started"));
}

function driverFields(driver) {
  const name = field("driver-name", "Full name", driver ? driver.full : "", "text");
  const pin = field("driver-pin", driver ? "New PIN" : "4-digit PIN", "", "numeric");
  pin.control.maxLength = 4;
  [name, pin].forEach((made) => {
    made.control.addEventListener("input", () => clearField(made));
  });
  return {
    nodes: [
      name.wrap,
      pin.wrap,
      driver ? meta("Leave the PIN blank to keep the current one.") : meta("Tell the driver this PIN. They use it to sign in.")
    ],
    read(takenNames) {
      [name, pin].forEach(clearField);
      const full = name.control.value.trim().replace(/\s+/g, " ");
      if (!full) {
        failField(name, "Enter the driver's full name.");
        return null;
      }
      const taken = takenNames.find((other) => other.toLowerCase() === full.toLowerCase());
      if (taken) {
        failField(name, taken + " is already on the team.");
        return null;
      }
      const code = pin.control.value.trim();
      if (!(driver && !code) && !/^\d{4}$/.test(code)) {
        failField(pin, "Enter a 4-digit PIN.");
        return null;
      }
      return { full, pin: code || driver.pin };
    }
  };
}

function renderDriverEdit(root, person, driver, others) {
  const first = firstName(driver);
  const made = driverFields(driver);
  const panel = form("Edit driver", [
    card(driver.full, [made.nodes, primaryButton("Save changes")])
  ]);
  panel.addEventListener("submit", (event) => {
    event.preventDefault();
    const entry = made.read(others);
    if (!entry) return;
    saveDriver({ id: driver.id, full: entry.full, pin: entry.pin, active: true });
    location.href = "drivers.html?changed=" + encodeURIComponent(entry.full);
  });

  const open = openTripsFor(driver);
  let removeBody;
  if (open.length) {
    removeBody = [meta(first + " is set to drive " + open.map((trip) => trip.name + " (" + shortDay(trip) + ")").join(" and ")
      + ". Choose another driver for that trip in Set up this trip first.")];
  } else {
    const ask = el("button", { className: "btn-secondary", text: "Remove " + first, attrs: { type: "button" } });
    const yes = el("button", { className: "btn-secondary", text: "Yes, remove " + first, attrs: { type: "button" } });
    const no = el("button", { className: "btn-secondary", text: "Keep " + first, attrs: { type: "button" } });
    const confirmText = el("p", { className: "notice-title", text: "Remove " + driver.full + " from the team?" });
    const confirmBox = el("div", { className: "banner notice", attrs: { role: "alert" }, children: [confirmText, yes, no] });
    confirmBox.hidden = true;
    ask.addEventListener("click", () => {
      ask.hidden = true;
      confirmBox.hidden = false;
      no.focus();
    });
    no.addEventListener("click", () => {
      confirmBox.hidden = true;
      ask.hidden = false;
      ask.focus();
    });
    yes.addEventListener("click", () => {
      saveDriver({ id: driver.id, full: driver.full, pin: driver.pin, active: false });
      location.href = "drivers.html?removed=" + encodeURIComponent(driver.full);
    });
    removeBody = [meta(first + " will no longer be able to sign in. Trips " + first + " already drove keep the name."), ask, confirmBox];
  }

  mount(root, "Edit driver", [
    backLink("drivers.html"),
    topbar("Edit driver"),
    panel,
    card("Remove from the team", removeBody, true)
  ], person);
}

function renderDrivers(root) {
  adoptRole();
  const person = requirePerson("staff");
  if (!person) return;
  const params = new URLSearchParams(location.search);
  const drivers = activeDrivers();
  const takenBy = (skipId) => drivers.filter((driver) => driver.id !== skipId).map((driver) => driver.full)
    .concat(STAFF.map((staff) => staff.full));
  const editId = params.get("driver");

  if (editId) {
    const driver = drivers.find((item) => item.id === editId);
    if (!driver) {
      mount(root, "Driver", [
        backLink("drivers.html"),
        topbar("Driver"),
        banner("That driver is not on the team."),
        primaryLink("drivers.html", "Back to drivers")
      ], person);
      return;
    }
    renderDriverEdit(root, person, driver, takenBy(driver.id));
    return;
  }

  const added = params.get("added");
  const changed = params.get("changed");
  const removed = params.get("removed");
  const saved = added ? "Saved. " + added + " can sign in now."
    : changed ? "Saved the changes to " + changed + "."
      : removed ? removed + " is off the team and can no longer sign in."
        : "";
  const made = driverFields(null);
  const panel = form("Add a driver", [
    card("Add a driver", [made.nodes, primaryButton("Save the driver")])
  ]);
  panel.addEventListener("submit", (event) => {
    event.preventDefault();
    const entry = made.read(takenBy(""));
    if (!entry) return;
    saveDriver({ id: driverId(entry.full), full: entry.full, pin: entry.pin, active: true });
    location.href = "drivers.html?added=" + encodeURIComponent(entry.full);
  });
  const nextTrip = (driver) => {
    const open = openTripsFor(driver).sort((a, b) => a.date.localeCompare(b.date));
    return open.length ? open[0].name + " · " + shortDay(open[0]) : "No trip assigned";
  };
  mount(root, "Drivers", [
    backLink("home.html"),
    topbar("Drivers"),
    banner("Drivers sign in with their name and a 4-digit PIN. Choose the driver for each trip in Set up this trip."),
    saved ? meta(saved) : null,
    panel,
    card("All drivers", [
      meta(drivers.length === 1 ? "1 driver. Tap a name to edit it or change the PIN." : drivers.length + " drivers. Tap a name to edit it or change the PIN."),
      drivers.length
        ? list(drivers.map((driver) => tripRow("drivers.html?driver=" + driver.id, driver.full, nextTrip(driver))))
        : meta("No drivers yet.")
    ], true)
  ], person);
}

function renderPreview(root) {
  const rows = [
    ["home.html?as=priya", "Driver home", "Priya"],
    ["home.html?as=tom", "Driver home", "Tom"],
    ["home.html?as=ed", "Staff home", "Ed"],
    ["home.html?as=rob", "Staff home", "Rob"],
    ["sheet.html?trip=stjacobs&as=priya", "St. Jacobs sheet", "Shared"],
    ["sheet.html?trip=bluejays&as=ed", "Blue Jays sheet", "Shared"],
    ["maintenance.html?as=ed", "Repairs", "Staff"],
    ["members.html?as=ed", "Members", "Staff"],
    ["drivers.html?as=ed", "Drivers", "Staff"]
  ];
  const reset = el("button", {
    className: "btn-secondary",
    text: "Reset sample trips",
    attrs: { type: "button" }
  });
  const resetNote = meta("");
  resetNote.hidden = true;
  reset.addEventListener("click", () => {
    tripSources().forEach((trip) => {
      storeDrop(tripKey(trip.id));
      dropDraft(trip);
    });
    storeDrop(KEYS.trips);
    storeDrop(KEYS.deleted);
    storeDrop(KEYS.repairs);
    storeDrop(KEYS.members);
    storeDrop(KEYS.drivers);
    storeDrop(KEYS.notice);
    resetNote.hidden = false;
    resetNote.textContent = "Sample trips, members, drivers and repairs are back to the start.";
  });
  mount(root, "Screen list", [
    backLink("index.html"),
    topbar("Screen list"),
    banner("Builder list. This page is not in the app. Everyone's PIN is 1234."),
    list(rows.map((row) => linkRow(row[0], row[1], row[2]))),
    primaryLink("index.html", "Open sign in"),
    reset,
    resetNote
  ]);
}
