// Every photo on the site lives in this list. The home page shows the ones
// marked `featured: true`; the Work page shows them all.
//
// To add a photo: put the file in images/portfolio/, then copy one entry below.
//   category  events, portraits, family or milestones
//   shape     "wide" for landscape photos, "tall" for portrait photos
//   alt       a short description for people using screen readers
//   caption   shown under the photo (optional)
window.PORTFOLIO = [
  { src: "images/portfolio/events-1.jpg", category: "events", shape: "wide", featured: true,
    alt: "Guests at an anniversary dinner", caption: "Anniversary dinner" },
  { src: "images/portfolio/portraits-1.jpg", category: "portraits", shape: "tall", featured: true,
    alt: "Portrait of a woman by a window", caption: "Window light portrait" },
  { src: "images/portfolio/family-2.jpg", category: "family", shape: "tall", featured: true,
    alt: "Three generations of a family outdoors", caption: "Three generations" },
  { src: "images/portfolio/milestones-1.jpg", category: "milestones", shape: "tall", featured: true,
    alt: "A graduate with their diploma", caption: "Class of 2026" },
  { src: "images/portfolio/events-2.jpg", category: "events", shape: "tall",
    alt: "A toast at a birthday party", caption: "Fiftieth birthday" },
  { src: "images/portfolio/family-1.jpg", category: "family", shape: "wide", featured: true,
    alt: "A family walking together in a park", caption: "Sunday in the park" },
  { src: "images/portfolio/milestones-3.jpg", category: "milestones", shape: "tall", featured: true,
    alt: "An expecting mother at sunset", caption: "Maternity" },
  { src: "images/portfolio/portraits-2.jpg", category: "portraits", shape: "tall",
    alt: "Senior portrait outdoors", caption: "Senior portrait" },
  { src: "images/portfolio/family-3.jpg", category: "family", shape: "wide",
    alt: "Grandparents with their grandchildren", caption: "Grandparents" },
  { src: "images/portfolio/portraits-3.jpg", category: "portraits", shape: "wide",
    alt: "Headshot of a man in a suit", caption: "Professional headshot" },
  { src: "images/portfolio/events-3.jpg", category: "events", shape: "wide",
    alt: "Dancing at a company celebration", caption: "Company celebration" },
  { src: "images/portfolio/milestones-2.jpg", category: "milestones", shape: "wide",
    alt: "An engaged couple laughing", caption: "Engagement" }
];
