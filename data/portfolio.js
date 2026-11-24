// Every photo on the site lives in this list, grouped by kind of session.
// Home shows the first six of each kind in a row; My work shows them all.
//
// To add a photo: put the file in images/portfolio/, then copy one entry below.
//   category  family, events, portraits or milestones
//   shape     "wide" for landscape photos, "tall" for portrait photos
//   alt       a short description for people using screen readers
//   caption   shown under the photo (optional)
// Put her favorite first. On My work, the first wide photo of each kind is shown largest.
window.PORTFOLIO = [
  // TODO: Replace every placeholder below with her real photos.
  { src: "images/portfolio/family-1.jpg", category: "family", shape: "wide", alt: "A family walking together in a park", caption: "Sunday in the park" },
  { src: "images/portfolio/family-2.jpg", category: "family", shape: "tall", alt: "Three generations of a family outdoors", caption: "Three generations" },
  { src: "images/portfolio/family-3.jpg", category: "family", shape: "wide", alt: "Grandparents with their grandchildren", caption: "Grandparents" },
  { src: "images/portfolio/family-4.jpg", category: "family", shape: "tall", alt: "A toddler on her father's shoulders", caption: "Up high" },
  { src: "images/portfolio/family-5.jpg", category: "family", shape: "wide", alt: "A family laughing on their front porch", caption: "The front porch" },
  { src: "images/portfolio/family-6.jpg", category: "family", shape: "tall", alt: "A newborn asleep in his mother's arms", caption: "Brand new" },

  { src: "images/portfolio/events-1.jpg", category: "events", shape: "wide", alt: "Guests at an anniversary dinner", caption: "Anniversary dinner" },
  { src: "images/portfolio/events-2.jpg", category: "events", shape: "tall", alt: "A toast at a birthday party", caption: "Fiftieth birthday" },
  { src: "images/portfolio/events-3.jpg", category: "events", shape: "wide", alt: "A family reunion picnic", caption: "Family reunion" },
  { src: "images/portfolio/events-4.jpg", category: "events", shape: "wide", alt: "Guests dancing at a party", caption: "Last dance" },
  { src: "images/portfolio/events-5.jpg", category: "events", shape: "tall", alt: "A mother-to-be opening gifts at her shower", caption: "Baby shower" },
  { src: "images/portfolio/events-6.jpg", category: "events", shape: "wide", alt: "Friends gathered around a birthday cake", caption: "Make a wish" },

  { src: "images/portfolio/portraits-1.jpg", category: "portraits", shape: "tall", alt: "Portrait of a woman by a window", caption: "Window light portrait" },
  { src: "images/portfolio/portraits-2.jpg", category: "portraits", shape: "tall", alt: "Senior portrait outdoors", caption: "Senior portrait" },
  { src: "images/portfolio/portraits-3.jpg", category: "portraits", shape: "wide", alt: "Headshot of a man in a suit", caption: "Professional headshot" },
  { src: "images/portfolio/portraits-4.jpg", category: "portraits", shape: "tall", alt: "Portrait of an older man in his workshop", caption: "In his workshop" },
  { src: "images/portfolio/portraits-5.jpg", category: "portraits", shape: "wide", alt: "A couple sitting together on a bench", caption: "The two of them" },
  { src: "images/portfolio/portraits-6.jpg", category: "portraits", shape: "tall", alt: "Headshot of a woman smiling", caption: "New headshot" },

  { src: "images/portfolio/milestones-1.jpg", category: "milestones", shape: "tall", alt: "A graduate with their diploma", caption: "Class of 2026" },
  { src: "images/portfolio/milestones-2.jpg", category: "milestones", shape: "wide", alt: "A couple just engaged", caption: "She said yes" },
  { src: "images/portfolio/milestones-3.jpg", category: "milestones", shape: "tall", alt: "An expecting mother at sunset", caption: "Maternity" },
  { src: "images/portfolio/milestones-4.jpg", category: "milestones", shape: "wide", alt: "A retirement party toast", caption: "Thirty years" },
  { src: "images/portfolio/milestones-5.jpg", category: "milestones", shape: "tall", alt: "A first birthday with cake", caption: "One year old" },
  { src: "images/portfolio/milestones-6.jpg", category: "milestones", shape: "wide", alt: "Graduates tossing their caps", caption: "Caps off" }
];
