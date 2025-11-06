//* Trusted CDN domains - these are used across multiple CSP directives
//* When adding a new CDN, add it here and it will automatically be allowed
//* for scripts, styles, connections (for source maps), and fonts
const trustedCDNs = [
  'https://cdn.jsdelivr.net/',
  'https://cdnjs.cloudflare.com/',
  'https://stackpath.bootstrapcdn.com/',
  'https://kit.fontawesome.com/',
  'https://kit-free.fontawesome.com/',
  'https://use.fontawesome.com/',
  'https://fonts.googleapis.com/',
  'https://fonts.gstatic.com/',
];

//* Google services domains
const googleDomains = [
  'https://www.google.com/',
  'http://www.google.com/',
  'https://www.gstatic.com/',
  'https://docs.google.com/',
  'http://docs.google.com/',
  'https://play.google.com/',
  'https://accounts.google.com/',
  'https://apis.google.com/',
  'https://www.googleapis.com/',
];

//* Mapbox domains
const mapboxDomains = [
  'https://api.mapbox.com/',
  'https://api.tiles.mapbox.com/',
  'https://a.tiles.mapbox.com/',
  'https://b.tiles.mapbox.com/',
  'https://events.mapbox.com/',
];

//* Constant Contact domains
const constantContactDomains = [
  'https://static.ctctcdn.com/',
  'http://static.ctctcdn.com/',
  'https://listgrowth.ctctcdn.com/',
  'http://listgrowth.ctctcdn.com/',
  'https://visitor2.constantcontact.com/',
  'http://visitor2.constantcontact.com/',
];

//* Script sources: CDNs + Google + Mapbox + Constant Contact
module.exports.scriptSrcUrls = [
  ...trustedCDNs,
  ...mapboxDomains,
  ...googleDomains,
  ...constantContactDomains,
];

//* Style sources: CDNs + Google + Mapbox + Constant Contact
module.exports.styleSrcUrls = [
  ...trustedCDNs,
  ...mapboxDomains,
  ...googleDomains,
  ...constantContactDomains,
];

//* Connect sources: CDNs (for source maps) + Google + Mapbox + Constant Contact
//* Note: CDNs are included here because browsers fetch source maps via connect-src
module.exports.connectSrcUrls = [
  ...trustedCDNs,
  ...mapboxDomains,
  ...googleDomains,
  ...constantContactDomains,
];

//* Font sources: CDNs (fonts.googleapis.com, fonts.gstatic.com) + Google
module.exports.fontSrcUrls = [
  ...trustedCDNs.filter(url => url.includes('fonts')),
  ...googleDomains,
];

//* Image sources: Cloudinary + Unsplash + Placeholder services + Google + Constant Contact
module.exports.imgSrcUrls = [
  'https://placehold.co',
  'https://res.cloudinary.com/dypchgtip/', //SHOULD MATCH YOUR CLOUDINARY ACCOUNT!
  'https://images.unsplash.com/',
  ...googleDomains,
  ...constantContactDomains,
];

//* Frame sources: Google services + YouTube + Other embedded content
//* Note: These domains are allowed to be embedded in iframes
module.exports.frameSrcUrls = [
  ...googleDomains,
  'https://www.youtube.com/',
  'https://heyzine.com/',
  'https://app.mapstechnologies.com/',
  'https://www.google.com/recaptcha/',
];
