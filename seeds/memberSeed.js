//! Members Seed
const mongoose = require('mongoose');
//* Import Model
const Member = require('../models/members.js');

//* Connect to MongoDB
main().catch((err) => console.log(err));
mongoose.connection.once('open', () => {
  console.log('Database Connected!');
});

async function main() {
  await mongoose.connect(`mongodb://127.0.0.1:27017/${process.env.DB_NAME}`);
}

//*  Array without alphabet letters
const membersArray = [
  {
    href: '',
    name: 'Advanced Power & Energy',
  },
  {
    href: 'https://www.aflac.com/agents/raina_tokar.aspx',
    name: 'AFLAC – Raina Tokar',
  },
  {
    href: 'http://www.aimntls.com/',
    name: 'Aim Transportation Solutions',
  },
  {
    href: '',
    name: 'AKE Safety',
  },
  {
    href: 'https://alpinespringsrehab.com/',
    name: 'Alpine Springs',
  },
  {
    href: 'https://www.aus.com/',
    name: 'Allied Universal',
  },
  {
    href: 'https://www.americanhg.com/',
    name: 'American Hospitality Group',
  },
  {
    href: 'https://www.facebook.com/AmInstinct/',
    name: 'American Instinct',
  },
  {
    href: 'http://www.goanderson.com/',
    name: 'Anderson Coach and Travel',
  },
  {
    href: 'https://www.aquaamerica.com/our-states/pennsylvania.aspx',
    name: 'Aqua PA',
  },
  {
    href: 'https://armorliningsusa.com/',
    name: 'Armor Linings',
  },
  {
    href: 'https://www.armstronginsuranceagency.com/',
    name: 'Armstrong Insurance Agency',
  },
  {
    href: 'https://atlanticdiagnosticlaboratories.com/',
    name: 'Atlantic Diagnostic Labs',
  },
  {
    href: 'http://www.avalongcc.com/',
    name: 'Avalon Golf & Country Club',
  },
  {
    href: 'https://www.axiaswa.com/',
    name: 'Axias Wealth Advisors',
  },
  {
    href: 'http://www.bkd.com/',
    name: 'BKD, LLP',
  },
  {
    href: 'https://www.bakertilly.com/',
    name: 'Baker Tilly',
  },
  {
    href: 'http://www.bashlin.com/',
    name: 'Bashlin Industries',
  },
  {
    href: 'http://www.bbpcpa.com/',
    name: 'Black, Bashor & Porsch',
  },
  {
    href: 'https://cnp.benfranklin.org/',
    name: 'Ben Franklin Technology Partners of Central and Northern Pennsylvania ',
  },
  {
    href: 'https://markblack.thepreferredrealty.com/',
    name: 'Berkshire Hathaway',
  },
  {
    href: 'https://goh2o.net/bcwc',
    name: 'Buhl Community Water',
  },
  {
    href: 'https://www.buhlclub.org/',
    name: 'Buhl Community Rec Center',
  },
  {
    href: 'https://www.buhlpark.org/',
    name: 'Buhl Park',
  },
  {
    href: 'https://businesstransitionadvisors.com/',
    name: 'Business Transition Advisors',
  },
  {
    href: 'http://www.bc3.edu/',
    name: 'Butler County Community College',
  },
  {
    href: 'https://carbonsilk.digital/',
    name: 'CarbonSilk',
  },
  {
    href: 'http://www.cashdollarandassociates.com/',
    name: 'Cashdollar & Associates',
  },
  {
    href: 'http://www.cityoffarrell.com/',
    name: 'City of Farrell',
  },
  {
    href: 'https://www.hermitage.net/',
    name: 'City of Hermitage',
  },
  {
    href: 'http://www.penn-northwest.com/about-us/pndc/members/;//www.cecinc.com',
    name: 'Civil & Environmental Consultants',
  },
  {
    href: 'https://workwithclever.com/',
    name: 'Clever Marketing',
  },
  {
    href: 'http://www.comm-foundation.org/',
    name: 'Community Counseling Center of Mercer County',
  },
  {
    href: 'http://comm-foundation.org/',
    name: 'Community Foundation',
  },
  {
    href: 'http://www.ces-env.com/',
    name: 'Compliance Environmental Services',
  },
  {
    href: '',
    name: 'Connell, Inc',
  },
  {
    href: 'https://www.corinthian-event.com/',
    name: 'Corinthian Events Center',
  },
  {
    href: '',
    name: 'Crossroads Development, LTD',
  },
  {
    href: 'https://ctconsultants.com/',
    name: 'CT Consultants',
  },
  {
    href: 'http://www.ctcpackaging.com/',
    name: 'CTC Packaging',
  },
  {
    href: 'http://www.daffins.com/',
    name: 'Daffins, Inc.',
  },
  {
    href: 'http://www.driworldwide.com/',
    name: 'DALKO Resources, Inc.',
  },
  {
    href: 'http://www.davisalloys.com/',
    name: 'Davis Alloys',
  },
  {
    href: 'https://www.deannaturalvending.com/',
    name: 'Dean Natural Vending',
  },
  {
    href: 'http://dsfslag.com/',
    name: 'Development of Sharpsville Furnace ',
  },
  {
    href: 'https://donatellielectric.com/',
    name: 'Donatelli Electric',
  },
  {
    href: 'https://eascarpenters.org/',
    name: 'Eastern Atlantic States Regional Council of Carpenters',
  },
  {
    href: 'http://www.ecenterlindenpointe.com/',
    name: 'eCenter@LindenPointe',
  },
  {
    href: 'http://www.edgewoodsurgical.com/',
    name: 'Edgewood Surgical Hospital',
  },
  {
    href: 'http://www.elwd.com/',
    name: 'Ellwood Crankshaft',
  },
  {
    href: 'https://ekmelaw.com/',
    name: 'Ekker, Kuster, McCall & Epstein',
  },
  {
    href: 'https://www.expresspros.com/butlermercerpa/',
    name: 'Express Employment Professionals ',
  },
  {
    href: 'https://farmaceuticalrx.com/',
    name: 'FarmaceuticalRx',
  },
  {
    href: '',
    name: 'Fast Casual Concepts',
  },
  {
    href: 'https://www.firstenergycorp.com/penn_power.html',
    name: 'First Energy/Penn Power',
  },
  {
    href: 'https://www.fnb-online.com/',
    name: 'FNB Corporation',
  },
  {
    href: 'https://www.forcenow.com/',
    name: 'Force Now',
  },
  {
    href: 'https://www.friendsoffice.com/',
    name: 'Friends Office',
  },
  {
    href: 'https://www.dianegardnerlpl.com/team/diane-gardner',
    name: 'Diane Gardner, LPL Financial',
  },
  {
    href: 'http://www.gatewayengineers.com/',
    name: 'Gateway Engineers',
  },
  {
    href: '',
    name: 'Geo-Technical Advisors',
  },
  {
    href: 'http://www.gilbertsrisksolutions.com/',
    name: 'Gilbert’s Insurance Agency',
  },
  {
    href: 'http://www.goh-inc.com/',
    name: 'Glenn O. Hawbaker Inc.',
  },
  {
    href: 'https://www.gaedc.org/',
    name: 'Greenville Area Economic Development Corp',
  },
  {
    href: 'https://greenvilleborough.com/',
    name: 'Greenville Borough',
  },
  {
    href: 'https://www.staycobblestone.com/pa/greenville',
    name: 'Greenville Cobblestone',
  },
  {
    href: 'https://www.greenvillechamber-pa.com/',
    name: 'Greenville PA Chamber of Commerce',
  },
  {
    href: 'http://www.greenvillesavings.com/',
    name: 'Greenville Savings Bank',
  },
  {
    href: 'http://www.greenvillereynolds.com/',
    name: 'Greenville-Reynolds Dev. Corp.',
  },
  {
    href: 'https://grovecityareachamber.com/',
    name: 'Grove City Area Chamber',
  },
  {
    href: 'https://grovecityonline.com/',
    name: 'Grove City Borough',
  },
  {
    href: 'http://www.gcc.edu/',
    name: 'Grove City College',
  },
  {
    href: 'http://www.gcmcpa.org/',
    name: 'Grove City Medical Center',
  },
  {
    href: 'https://guardianfiltrationproducts.com/',
    name: 'Guardian Filtration Products',
  },
  {
    href: 'http://www.gwbcrane.com/',
    name: 'G.W. Becker Inc.',
  },
  {
    href: 'http://www.hagan1.com/',
    name: 'Hagan Business Machines of Meadville, Inc.',
  },
  {
    href: 'https://www.howardhanna.com/Agent/Detail/Hal-Martin/50938',
    name: 'Hal Martin – Howard Hanna',
  },
  {
    href: 'https://www.hallindustries.com/',
    name: 'Hall Technical Services',
  },
  {
    href: 'https://hapeman.com/',
    name: 'Hapeman Electronics',
  },
  {
    href: 'https://www.hrg-inc.com/',
    name: 'Herbert, Rowland, & Grubic, LLC',
  },
  {
    href: 'https://www.herculesled.com/',
    name: 'Hercules LED LLC',
  },
  {
    href: 'http://www.hermitage.net/government/departments/comdev/index.html',
    name: 'Hermitage Economic Dev. Comm.',
  },
  {
    href: 'http://www.hhsdr.com/',
    name: 'HHSDR Architects/Engineers',
  },
  {
    href: 'http://www.hbkcpa.com/',
    name: 'Hill, Barth & King, LLC',
  },
  {
    href: 'http://www.hoffmanindustrial.com/',
    name: 'Hoffman Industrial Co.',
  },
  {
    href: 'https://www.hopecm.com/locations/Greenville',
    name: 'Hope Center Ministries',
  },
  {
    href: 'http://www.hudsonconstruction.com/',
    name: 'Hudson Construction Inc.',
  },
  {
    href: 'http://www.hudsoncompanies.net/',
    name: 'Hudson Companies',
  },
  {
    href: 'https://sharedeer.org/',
    name: 'Hunters Sharing The Harvest',
  },
  {
    href: 'http://www.huntington.com/',
    name: 'Huntington Bank',
  },
  {
    href: 'https://hurricane-fans.com/',
    name: 'Hurricane Fans',
  },
  {
    href: 'http://www.ilscoextrusions.com/',
    name: 'ILSCO Extrusions Inc.',
  },
  {
    href: 'https://www.isystemsweb.com/',
    name: 'Imperial Systems',
  },
  {
    href: 'http://www.imcerie.com/',
    name: 'Insurance Management Company',
  },
  {
    href: '',
    name: 'Insurance Solutions Group',
  },
  {
    href: 'http://www.integratedfab.com/',
    name: 'Integrated Fabrication',
  },
  {
    href: 'http://www.ibew712.org/',
    name: 'International Brotherhood of Electrical Workers Local Union 712',
  },
  {
    href: 'http://www.interstatepipe.com/',
    name: 'Interstate Pipe & Supply',
  },
  {
    href: 'https://jcl.energy/',
    name: 'JCL Energy',
  },
  {
    href: 'http://www.jfswa.com/',
    name: 'JFS Wealth Advisors',
  },
  {
    href: 'https://www.jjkennedyinc.com/',
    name: 'JJ Kennedy Inc',
  },
  {
    href: 'http://www.jamestowncoatings.com/',
    name: 'Jamestown Coating Technologies',
  },
  {
    href: 'http://www.joycone.com/',
    name: 'Joy Cone Company',
  },
  {
    href: '',
    name: 'Kachulis Foundation',
  },
  {
    href: 'http://www.keystoneadolescentcenter.com/',
    name: 'Keystone Adolescent Center',
  },
  {
    href: '',
    name: 'Kirila Foundation',
  },
  {
    href: 'https://kismetpeo.com/',
    name: 'Kismet PEO',
  },
  {
    href: 'http://www.kraynaks.com/',
    name: 'Kraynak’s',
  },
  {
    href: 'https://www.itv-usa.com/',
    name: 'Lakeview Area Ind. Corp.',
  },
  {
    href: 'http://www.lancastersafety.com/',
    name: 'Lancaster Safety',
  },
  {
    href: 'http://www.laurel.edu/',
    name: 'Laurel Technical Institute',
  },
  {
    href: '',
    name: 'John F. Logan, CPA',
  },
  {
    href: 'https://www.mbausa.org/',
    name: 'Manufacturer and Business Association',
  },
  {
    href: 'https://www.masterpiecepaintingcompany.com/',
    name: 'Masterpiece Painting',
  },
  {
    href: '',
    name: 'Margaret M. Walker Charitable Foundation',
  },
  {
    href: 'https://www.marsbank.com/',
    name: 'Mars Bank',
  },
  {
    href: '',
    name: 'Matthew McConnell, Mercer County Commissioner',
  },
  {
    href: 'http://www.mpbcpa.com/',
    name: 'McGill, Power, Bell & Associates, LLP',
  },
  {
    href: 'https://www.mcelhinnybrothersconstruction.com/',
    name: 'McElhinney Construction',
  },
  {
    href: 'http://www.mcc.co.mercer.pa.us/',
    name: 'Mercer County Board of Commissioners',
  },
  {
    href: 'http://mercercountybuildersassoc.com/',
    name: 'Mercer County Builders Association\n',
  },
  {
    href: '',
    name: 'Mercer County Building Trades Council',
  },
  {
    href: 'http://www.mercomfcu.org/',
    name: 'Mercer County Community Federal Credit Union',
  },
  {
    href: '',
    name: 'Mercer County IDA',
  },
  {
    href: 'http://www.mcsbank.bank/',
    name: 'Mercer County State Bank',
  },
  {
    href: 'http://www.millerind.com/',
    name: 'Miller Industries',
  },
  {
    href: 'http://www.moody-s.com/',
    name: 'Moody and Associates, Inc.',
  },
  {
    href: 'http://www.nfrepair.com/',
    name: 'National Fire & Water Repair',
  },
  {
    href: 'http://www.natfuel.com/',
    name: 'National Fuel Gas',
  },
  {
    href: 'http://www.neffautomation.com/',
    name: 'NEFF',
  },
  {
    href: 'http://www.us.nlmk.com/nlmk-pa/',
    name: 'NLMK Pennsylvania/Duferco Farrell Corp.',
  },
  {
    href: 'https://www.northeastind.com/',
    name: 'Northeast Manufacturing',
  },
  {
    href: 'https://www.nowakendeavors.com/',
    name: 'Nowak Endeavors',
  },
  {
    href: 'http://www.omnitransloading.com/',
    name: 'Omni Bulk Services',
  },
  {
    href: 'https://patternenergy.com/',
    name: 'Pattern Energy',
  },
  {
    href: 'http://www.pennexaluminum.com/',
    name: 'Pennex Aluminum',
  },
  {
    href: 'https://penncredit.com/',
    name: 'Penn Credit',
  },
  {
    href: 'http://pennohiometals.com/',
    name: 'Penn Ohio Metals',
  },
  {
    href: 'http://www.pennstainless.com/',
    name: 'Penn Stainless',
  },
  {
    href: 'https://shenango.psu.edu/',
    name: 'Penn State Shenango',
  },
  {
    href: 'http://www.philadelphiacandies.com/',
    name: 'Philadelphia Candies',
  },
  {
    href: 'http://pbsi-online.com/',
    name: 'Phoenix Building Services, Inc.',
  },
  {
    href: 'https://www.pinetownship.org/',
    name: 'Pine Township',
  },
  {
    href: 'http://www.pnc.com/',
    name: 'PNC Bank',
  },
  {
    href: 'https://poweredaire.com/',
    name: 'Powered Aire',
  },
  {
    href: 'https://premierenergyadvisorsllc.com/',
    name: 'Premier Energy Advisors, LLC',
  },
  {
    href: 'http://www.premierpowersolutions.com/',
    name: 'Premier Power Solutions',
  },
  {
    href: 'http://www.ptrgroup-mfg.com/',
    name: 'PTR Group, LP',
  },
  {
    href: 'https://pursuitlending.com/',
    name: 'Pursuit',
  },
  {
    href: 'https://pymtele.net/',
    name: 'ymatuning Telephone',
  },
  {
    href: 'http://www.reedtax1.com/',
    name: 'Reed & Dailey Associates',
  },
  {
    href: 'http://www.reevesinfotech.com/',
    name: 'Reeves Information Technology, Inc.',
  },
  {
    href: 'https://tracy-mantzell.remax.com/',
    name: 'RE/Max Select Realty',
  },
  {
    href: 'https://www.rsi.biz/',
    name: 'Reynolds Services, Inc.',
  },
  {
    href: 'http://www.rienconstruction.com/',
    name: 'Rien Construction',
  },
  {
    href: 'http://www.riverchapelfinancial.com/',
    name: 'Riverchapel Financial',
  },
  {
    href: 'https://www.roseandblackfh.com/',
    name: 'Rose and Black Funeral Homes',
  },
  {
    href: 'https://www.rbcroyalbank.com/business/index.html',
    name: 'Royal Bank of Canada',
  },
  {
    href: 'http://www.scpgroup.net/',
    name: 'SCP Group',
  },
  {
    href: 'https://servprosoutherntrumbullcounty.com/',
    name: 'Servpro Team Dobson',
  },
  {
    href: 'http://www.sharpsville.org/',
    name: 'Sharpsville Borough',
  },
  {
    href: 'http://www.sharonregional.com/',
    name: 'Sharon Regional Health System',
  },
  {
    href: '',
    name: 'Shenango Township Supervisors',
  },
  {
    href: 'http://www.svezc.com/',
    name: 'Shenango Valley Enterprise Zone',
  },
  {
    href: 'http://www.comm-foundation.org/',
    name: 'Shenango Valley Foundation',
  },
  {
    href: 'http://springfield-mercer.org/',
    name: 'Springfield Township',
  },
  {
    href: 'https://www.stpauls1867.org/',
    name: 'St. Paul Homes',
  },
  {
    href: 'http://www.stantec.com/',
    name: 'Stantec Architecture and Engineering',
  },
  {
    href: 'http://stonekitchens.com/',
    name: 'Stone Kitchens',
  },
  {
    href: 'http://www.strimbumemorialfund.org/',
    name: 'Strimbu Memorial Fund',
  },
  {
    href: 'http://www.sunbeltusa.com/',
    name: 'Sunbelt Transformer',
  },
  {
    href: 'http://www.synergyinsurance.com/',
    name: 'Synergy Comp Insurance',
  },
  {
    href: 'https://www.talbotstaproom.com/',
    name: 'Talbot’s Taproom & Terrace',
  },
  {
    href: 'https://gmg.me/136584',
    name: 'Tax Incentives LLC',
  },
  {
    href: 'http://www.drivetaylorchevrolet.com/',
    name: 'Taylor Chevrolet of Hermitage',
  },
  {
    href: 'https://team-h.com/',
    name: 'Team Hardinger',
  },
  {
    href: 'https://temaroofingservices.com/',
    name: 'TEMA Roofing',
  },
  {
    href: 'https://thebuildersonline.com/',
    name: 'The Builders Association of Eastern OH & Western PA',
  },
  {
    href: 'http://www.garlandco.com/',
    name: 'The Garland Company',
  },
  {
    href: 'http://www.thiel.edu/',
    name: 'Thiel College',
  },
  {
    href: 'http://www.thomas-construction.com/',
    name: 'Thomas Construction Co.',
  },
  {
    href: 'http://www.thompsonfab.com/',
    name: 'Thompson Fabricating Inc.',
  },
  {
    href: 'https://www.tinastaxi.com/',
    name: 'Tina’s Taxi',
  },
  {
    href: 'http://www.upmc.com/',
    name: 'UPMC Horizon',
  },
  {
    href: 'http://www.vendrickconstruction.com/',
    name: 'VendRick Construction',
  },
  {
    href: 'https://wkthomas.net/',
    name: 'WK Thomas and Associates',
  },
  {
    href: 'http://www.walbergfamilypharmacies.com/',
    name: 'Walberg Family Pharmacies',
  },
  {
    href: 'http://www.wallacepancher.com/',
    name: 'WallacePancher',
  },
  {
    href: 'http://www.wcjp.org/',
    name: 'West Central Job Partnership',
  },
  {
    href: 'https://wmasd.k12.pa.us/',
    name: 'West Middlesex Area School District',
  },
  {
    href: 'http://www.wheatlandsteel.com/',
    name: 'Wheatland Steel Processing',
  },
  {
    href: 'http://www.wheatland.com/',
    name: 'Wheatland Tube Company/Maneely Fund',
  },
  {
    href: 'https://www.wholelifepa.org/',
    name: 'Whole Life Services, Inc.',
  },
  {
    href: '',
    name: 'Winner Family Foundation',
  },
  {
    href: '',
    name: 'Winslow Engineering',
  },
  {
    href: 'http://www.yourga.com/',
    name: 'Yourga Trucking',
  },
];

async function addMembers(membersArray) {
  await Member.deleteMany({});
  const members = await Member.insertMany(membersArray);

  console.log(members);
  console.log('Members Added'.red);
}

addMembers(membersArray).then(() => {
  mongoose.connection.close();
});

//   //* Below is the storage with alphabet included, A, B, C, etc
// [
//   ({
//     href: 'undefined',
//     name: 'A',
//   },
//   {
//     href: '',
//     name: 'Advanced Power & Energy',
//   },
//   {
//     href: 'https://www.aflac.com/agents/raina_tokar.aspx',
//     name: 'AFLAC – Raina Tokar',
//   },
//   {
//     href: 'http://www.aimntls.com/',
//     name: 'Aim Transportation Solutions',
//   },
//   {
//     href: '',
//     name: 'AKE Safety',
//   },
//   {
//     href: 'https://alpinespringsrehab.com/',
//     name: 'Alpine Springs',
//   },
//   {
//     href: 'https://www.aus.com/',
//     name: 'Allied Universal',
//   },
//   {
//     href: 'https://www.americanhg.com/',
//     name: 'American Hospitality Group',
//   },
//   {
//     href: 'https://www.facebook.com/AmInstinct/',
//     name: 'American Instinct',
//   },
//   {
//     href: 'http://www.goanderson.com/',
//     name: 'Anderson Coach and Travel',
//   },
//   {
//     href: 'https://www.aquaamerica.com/our-states/pennsylvania.aspx',
//     name: 'Aqua PA',
//   },
//   {
//     href: 'https://armorliningsusa.com/',
//     name: 'Armor Linings',
//   },
//   {
//     href: 'https://www.armstronginsuranceagency.com/',
//     name: 'Armstrong Insurance Agency',
//   },
//   {
//     href: 'https://atlanticdiagnosticlaboratories.com/',
//     name: 'Atlantic Diagnostic Labs',
//   },
//   {
//     href: 'http://www.avalongcc.com/',
//     name: 'Avalon Golf & Country Club',
//   },
//   {
//     href: 'https://www.axiaswa.com/',
//     name: 'Axias Wealth Advisors',
//   },
//   {
//     href: 'undefined',
//     name: 'B',
//   },
//   {
//     href: 'http://www.bkd.com/',
//     name: 'BKD, LLP',
//   },
//   {
//     href: 'https://www.bakertilly.com/',
//     name: 'Baker Tilly',
//   },
//   {
//     href: 'http://www.bashlin.com/',
//     name: 'Bashlin Industries',
//   },
//   {
//     href: 'http://www.bbpcpa.com/',
//     name: 'Black, Bashor & Porsch',
//   },
//   {
//     href: 'https://cnp.benfranklin.org/',
//     name: 'Ben Franklin Technology Partners of Central and Northern Pennsylvania ',
//   },
//   {
//     href: 'https://markblack.thepreferredrealty.com/',
//     name: 'Berkshire Hathaway',
//   },
//   {
//     href: 'https://goh2o.net/bcwc',
//     name: 'Buhl Community Water',
//   },
//   {
//     href: 'https://www.buhlclub.org/',
//     name: 'Buhl Community Rec Center',
//   },
//   {
//     href: 'https://www.buhlpark.org/',
//     name: 'Buhl Park',
//   },
//   {
//     href: 'https://businesstransitionadvisors.com/',
//     name: 'Business Transition Advisors',
//   },
//   {
//     href: 'http://www.bc3.edu/',
//     name: 'Butler County Community College',
//   },
//   {
//     href: 'undefined',
//     name: 'C',
//   },
//   {
//     href: 'https://carbonsilk.digital/',
//     name: 'CarbonSilk',
//   },
//   {
//     href: 'http://www.cashdollarandassociates.com/',
//     name: 'Cashdollar & Associates',
//   },
//   {
//     href: 'http://www.cityoffarrell.com/',
//     name: 'City of Farrell',
//   },
//   {
//     href: 'https://www.hermitage.net/',
//     name: 'City of Hermitage',
//   },
//   {
//     href: 'http://www.penn-northwest.com/about-us/pndc/members/;//www.cecinc.com',
//     name: 'Civil & Environmental Consultants',
//   },
//   {
//     href: 'https://workwithclever.com/',
//     name: 'Clever Marketing',
//   },
//   {
//     href: 'http://www.comm-foundation.org/',
//     name: 'Community Counseling Center of Mercer County',
//   },
//   {
//     href: 'http://comm-foundation.org/',
//     name: 'Community Foundation',
//   },
//   {
//     href: 'http://www.ces-env.com/',
//     name: 'Compliance Environmental Services',
//   },
//   {
//     href: '',
//     name: 'Connell, Inc',
//   },
//   {
//     href: 'https://www.corinthian-event.com/',
//     name: 'Corinthian Events Center',
//   },
//   {
//     href: '',
//     name: 'Crossroads Development, LTD',
//   },
//   {
//     href: 'https://ctconsultants.com/',
//     name: 'CT Consultants',
//   },
//   {
//     href: 'http://www.ctcpackaging.com/',
//     name: 'CTC Packaging',
//   },
//   {
//     href: 'undefined',
//     name: 'D',
//   },
//   {
//     href: 'http://www.daffins.com/',
//     name: 'Daffins, Inc.',
//   },
//   {
//     href: 'http://www.driworldwide.com/',
//     name: 'DALKO Resources, Inc.',
//   },
//   {
//     href: 'http://www.davisalloys.com/',
//     name: 'Davis Alloys',
//   },
//   {
//     href: 'https://www.deannaturalvending.com/',
//     name: 'Dean Natural Vending',
//   },
//   {
//     href: 'http://dsfslag.com/',
//     name: 'Development of Sharpsville Furnace ',
//   },
//   {
//     href: 'https://donatellielectric.com/',
//     name: 'Donatelli Electric',
//   },
//   {
//     href: 'undefined',
//     name: 'E',
//   },
//   {
//     href: 'https://eascarpenters.org/',
//     name: 'Eastern Atlantic States Regional Council of Carpenters',
//   },
//   {
//     href: 'http://www.ecenterlindenpointe.com/',
//     name: 'eCenter@LindenPointe',
//   },
//   {
//     href: 'http://www.edgewoodsurgical.com/',
//     name: 'Edgewood Surgical Hospital',
//   },
//   {
//     href: 'http://www.elwd.com/',
//     name: 'Ellwood Crankshaft',
//   },
//   {
//     href: 'https://ekmelaw.com/',
//     name: 'Ekker, Kuster, McCall & Epstein',
//   },
//   {
//     href: 'https://www.expresspros.com/butlermercerpa/',
//     name: 'Express Employment Professionals ',
//   },
//   {
//     href: 'undefined',
//     name: 'F',
//   },
//   {
//     href: 'https://farmaceuticalrx.com/',
//     name: 'FarmaceuticalRx',
//   },
//   {
//     href: '',
//     name: 'Fast Casual Concepts',
//   },
//   {
//     href: 'https://www.firstenergycorp.com/penn_power.html',
//     name: 'First Energy/Penn Power',
//   },
//   {
//     href: 'https://www.fnb-online.com/',
//     name: 'FNB Corporation',
//   },
//   {
//     href: 'https://www.forcenow.com/',
//     name: 'Force Now',
//   },
//   {
//     href: 'https://www.friendsoffice.com/',
//     name: 'Friends Office',
//   },
//   {
//     href: 'undefined',
//     name: 'G',
//   },
//   {
//     href: 'https://www.dianegardnerlpl.com/team/diane-gardner',
//     name: 'Diane Gardner, LPL Financial',
//   },
//   {
//     href: 'http://www.gatewayengineers.com/',
//     name: 'Gateway Engineers',
//   },
//   {
//     href: '',
//     name: 'Geo-Technical Advisors',
//   },
//   {
//     href: 'http://www.gilbertsrisksolutions.com/',
//     name: 'Gilbert’s Insurance Agency',
//   },
//   {
//     href: 'http://www.goh-inc.com/',
//     name: 'Glenn O. Hawbaker Inc.',
//   },
//   {
//     href: 'https://www.gaedc.org/',
//     name: 'Greenville Area Economic Development Corp',
//   },
//   {
//     href: 'https://greenvilleborough.com/',
//     name: 'Greenville Borough',
//   },
//   {
//     href: 'https://www.staycobblestone.com/pa/greenville',
//     name: 'Greenville Cobblestone',
//   },
//   {
//     href: 'https://www.greenvillechamber-pa.com/',
//     name: 'Greenville PA Chamber of Commerce',
//   },
//   {
//     href: 'http://www.greenvillesavings.com/',
//     name: 'Greenville Savings Bank',
//   },
//   {
//     href: 'http://www.greenvillereynolds.com/',
//     name: 'Greenville-Reynolds Dev. Corp.',
//   },
//   {
//     href: 'https://grovecityareachamber.com/',
//     name: 'Grove City Area Chamber',
//   },
//   {
//     href: 'https://grovecityonline.com/',
//     name: 'Grove City Borough',
//   },
//   {
//     href: 'http://www.gcc.edu/',
//     name: 'Grove City College',
//   },
//   {
//     href: 'http://www.gcmcpa.org/',
//     name: 'Grove City Medical Center',
//   },
//   {
//     href: 'https://guardianfiltrationproducts.com/',
//     name: 'Guardian Filtration Products',
//   },
//   {
//     href: 'http://www.gwbcrane.com/',
//     name: 'G.W. Becker Inc.',
//   },
//   {
//     href: 'undefined',
//     name: 'H',
//   },
//   {
//     href: 'http://www.hagan1.com/',
//     name: 'Hagan Business Machines of Meadville, Inc.',
//   },
//   {
//     href: 'https://www.howardhanna.com/Agent/Detail/Hal-Martin/50938',
//     name: 'Hal Martin – Howard Hanna',
//   },
//   {
//     href: 'https://www.hallindustries.com/',
//     name: 'Hall Technical Services',
//   },
//   {
//     href: 'https://hapeman.com/',
//     name: 'Hapeman Electronics',
//   },
//   {
//     href: 'https://www.hrg-inc.com/',
//     name: 'Herbert, Rowland, & Grubic, LLC',
//   },
//   {
//     href: 'https://www.herculesled.com/',
//     name: 'Hercules LED LLC',
//   },
//   {
//     href: 'http://www.hermitage.net/government/departments/comdev/index.html',
//     name: 'Hermitage Economic Dev. Comm.',
//   },
//   {
//     href: 'http://www.hhsdr.com/',
//     name: 'HHSDR Architects/Engineers',
//   },
//   {
//     href: 'http://www.hbkcpa.com/',
//     name: 'Hill, Barth & King, LLC',
//   },
//   {
//     href: 'http://www.hoffmanindustrial.com/',
//     name: 'Hoffman Industrial Co.',
//   },
//   {
//     href: 'https://www.hopecm.com/locations/Greenville',
//     name: 'Hope Center Ministries',
//   },
//   {
//     href: 'http://www.hudsonconstruction.com/',
//     name: 'Hudson Construction Inc.',
//   },
//   {
//     href: 'http://www.hudsoncompanies.net/',
//     name: 'Hudson Companies',
//   },
//   {
//     href: 'https://sharedeer.org/',
//     name: 'Hunters Sharing The Harvest',
//   },
//   {
//     href: 'http://www.huntington.com/',
//     name: 'Huntington Bank',
//   },
//   {
//     href: 'https://hurricane-fans.com/',
//     name: 'Hurricane Fans',
//   },
//   {
//     href: 'undefined',
//     name: 'I',
//   },
//   {
//     href: 'http://www.ilscoextrusions.com/',
//     name: 'ILSCO Extrusions Inc.',
//   },
//   {
//     href: 'https://www.isystemsweb.com/',
//     name: 'Imperial Systems',
//   },
//   {
//     href: 'http://www.imcerie.com/',
//     name: 'Insurance Management Company',
//   },
//   {
//     href: '',
//     name: 'Insurance Solutions Group',
//   },
//   {
//     href: 'http://www.integratedfab.com/',
//     name: 'Integrated Fabrication',
//   },
//   {
//     href: 'http://www.ibew712.org/',
//     name: 'International Brotherhood of Electrical Workers Local Union 712',
//   },
//   {
//     href: 'http://www.interstatepipe.com/',
//     name: 'Interstate Pipe & Supply',
//   },
//   {
//     href: '',
//     name: '',
//   },
//   {
//     href: 'undefined',
//     name: 'J',
//   },
//   {
//     href: 'https://jcl.energy/',
//     name: 'JCL Energy',
//   },
//   {
//     href: 'http://www.jfswa.com/',
//     name: 'JFS Wealth Advisors',
//   },
//   {
//     href: 'https://www.jjkennedyinc.com/',
//     name: 'JJ Kennedy Inc',
//   },
//   {
//     href: 'http://www.jamestowncoatings.com/',
//     name: 'Jamestown Coating Technologies',
//   },
//   {
//     href: 'http://www.joycone.com/',
//     name: 'Joy Cone Company',
//   },
//   {
//     href: 'undefined',
//     name: 'K',
//   },
//   {
//     href: '',
//     name: 'Kachulis Foundation',
//   },
//   {
//     href: 'http://www.keystoneadolescentcenter.com/',
//     name: 'Keystone Adolescent Center',
//   },
//   {
//     href: '',
//     name: 'Kirila Foundation',
//   },
//   {
//     href: 'https://kismetpeo.com/',
//     name: 'Kismet PEO',
//   },
//   {
//     href: 'http://www.kraynaks.com/',
//     name: 'Kraynak’s',
//   },
//   {
//     href: 'undefined',
//     name: 'L',
//   },
//   {
//     href: 'https://www.itv-usa.com/',
//     name: 'Lakeview Area Ind. Corp.',
//   },
//   {
//     href: 'http://www.lancastersafety.com/',
//     name: 'Lancaster Safety',
//   },
//   {
//     href: 'http://www.laurel.edu/',
//     name: 'Laurel Technical Institute',
//   },
//   {
//     href: '',
//     name: 'John F. Logan, CPA',
//   },
//   {
//     href: 'undefined',
//     name: 'M',
//   },
//   {
//     href: 'https://www.mbausa.org/',
//     name: 'Manufacturer and Business Association',
//   },
//   {
//     href: 'https://www.masterpiecepaintingcompany.com/',
//     name: 'Masterpiece Painting',
//   },
//   {
//     href: '',
//     name: 'Margaret M. Walker Charitable Foundation',
//   },
//   {
//     href: 'https://www.marsbank.com/',
//     name: 'Mars Bank',
//   },
//   {
//     href: '',
//     name: 'Matthew McConnell, Mercer County Commissioner',
//   },
//   {
//     href: 'http://www.mpbcpa.com/',
//     name: 'McGill, Power, Bell & Associates, LLP',
//   },
//   {
//     href: 'https://www.mcelhinnybrothersconstruction.com/',
//     name: 'McElhinney Construction',
//   },
//   {
//     href: 'http://www.mcc.co.mercer.pa.us/',
//     name: 'Mercer County Board of Commissioners',
//   },
//   {
//     href: 'http://mercercountybuildersassoc.com/',
//     name: 'Mercer County Builders Association\n',
//   },
//   {
//     href: '',
//     name: 'Mercer County Building Trades Council',
//   },
//   {
//     href: 'http://www.mercomfcu.org/',
//     name: 'Mercer County Community Federal Credit Union',
//   },
//   {
//     href: '',
//     name: 'Mercer County IDA',
//   },
//   {
//     href: 'http://www.mcsbank.bank/',
//     name: 'Mercer County State Bank',
//   },
//   {
//     href: 'http://www.millerind.com/',
//     name: 'Miller Industries',
//   },
//   {
//     href: 'http://www.moody-s.com/',
//     name: 'Moody and Associates, Inc.',
//   },
//   {
//     href: 'undefined',
//     name: 'N',
//   },
//   {
//     href: 'http://www.nfrepair.com/',
//     name: 'National Fire & Water Repair',
//   },
//   {
//     href: 'http://www.natfuel.com/',
//     name: 'National Fuel Gas',
//   },
//   {
//     href: 'http://www.neffautomation.com/',
//     name: 'NEFF',
//   },
//   {
//     href: 'http://www.us.nlmk.com/nlmk-pa/',
//     name: 'NLMK Pennsylvania/Duferco Farrell Corp.',
//   },
//   {
//     href: 'https://www.northeastind.com/',
//     name: 'Northeast Manufacturing',
//   },
//   {
//     href: 'https://www.nowakendeavors.com/',
//     name: 'Nowak Endeavors',
//   },
//   {
//     href: 'undefined',
//     name: 'O',
//   },
//   {
//     href: 'http://www.omnitransloading.com/',
//     name: 'Omni Bulk Services',
//   },
//   {
//     href: 'undefined',
//     name: 'P',
//   },
//   {
//     href: 'https://patternenergy.com/',
//     name: 'Pattern Energy',
//   },
//   {
//     href: 'http://www.pennexaluminum.com/',
//     name: 'Pennex Aluminum',
//   },
//   {
//     href: 'https://penncredit.com/',
//     name: 'Penn Credit',
//   },
//   {
//     href: 'http://pennohiometals.com/',
//     name: 'Penn Ohio Metals',
//   },
//   {
//     href: 'http://www.pennstainless.com/',
//     name: 'Penn Stainless',
//   },
//   {
//     href: 'https://shenango.psu.edu/',
//     name: 'Penn State Shenango',
//   },
//   {
//     href: 'http://www.philadelphiacandies.com/',
//     name: 'Philadelphia Candies',
//   },
//   {
//     href: 'http://pbsi-online.com/',
//     name: 'Phoenix Building Services, Inc.',
//   },
//   {
//     href: 'https://www.pinetownship.org/',
//     name: 'Pine Township',
//   },
//   {
//     href: 'http://www.pnc.com/',
//     name: 'PNC Bank',
//   },
//   {
//     href: 'https://poweredaire.com/',
//     name: 'Powered Aire',
//   },
//   {
//     href: 'https://premierenergyadvisorsllc.com/',
//     name: 'Premier Energy Advisors, LLC',
//   },
//   {
//     href: 'http://www.premierpowersolutions.com/',
//     name: 'Premier Power Solutions',
//   },
//   {
//     href: 'http://www.ptrgroup-mfg.com/',
//     name: 'PTR Group, LP',
//   },
//   {
//     href: 'https://pursuitlending.com/',
//     name: 'Pursuit',
//   },
//   {
//     href: 'https://pymtele.net/',
//     name: 'ymatuning Telephone',
//   },
//   {
//     href: 'undefined',
//     name: 'R',
//   },
//   {
//     href: 'http://www.reedtax1.com/',
//     name: 'Reed & Dailey Associates',
//   },
//   {
//     href: 'http://www.reevesinfotech.com/',
//     name: 'Reeves Information Technology, Inc.',
//   },
//   {
//     href: 'https://tracy-mantzell.remax.com/',
//     name: 'RE/Max Select Realty',
//   },
//   {
//     href: 'https://www.rsi.biz/',
//     name: 'Reynolds Services, Inc.',
//   },
//   {
//     href: 'http://www.rienconstruction.com/',
//     name: 'Rien Construction',
//   },
//   {
//     href: 'http://www.riverchapelfinancial.com/',
//     name: 'Riverchapel Financial',
//   },
//   {
//     href: 'https://www.roseandblackfh.com/',
//     name: 'Rose and Black Funeral Homes',
//   },
//   {
//     href: 'https://www.rbcroyalbank.com/business/index.html',
//     name: 'Royal Bank of Canada',
//   },
//   {
//     href: 'undefined',
//     name: 'S',
//   },
//   {
//     href: 'http://www.scpgroup.net/',
//     name: 'SCP Group',
//   },
//   {
//     href: 'https://servprosoutherntrumbullcounty.com/',
//     name: 'Servpro Team Dobson',
//   },
//   {
//     href: 'http://www.sharpsville.org/',
//     name: 'Sharpsville Borough',
//   },
//   {
//     href: 'http://www.sharonregional.com/',
//     name: 'Sharon Regional Health System',
//   },
//   {
//     href: '',
//     name: 'Shenango Township Supervisors',
//   },
//   {
//     href: 'http://www.svezc.com/',
//     name: 'Shenango Valley Enterprise Zone',
//   },
//   {
//     href: 'http://www.comm-foundation.org/',
//     name: 'Shenango Valley Foundation',
//   },
//   {
//     href: 'http://springfield-mercer.org/',
//     name: 'Springfield Township',
//   },
//   {
//     href: 'https://www.stpauls1867.org/',
//     name: 'St. Paul Homes',
//   },
//   {
//     href: 'http://www.stantec.com/',
//     name: 'Stantec Architecture and Engineering',
//   },
//   {
//     href: 'http://stonekitchens.com/',
//     name: 'Stone Kitchens',
//   },
//   {
//     href: 'http://www.strimbumemorialfund.org/',
//     name: 'Strimbu Memorial Fund',
//   },
//   {
//     href: 'http://www.sunbeltusa.com/',
//     name: 'Sunbelt Transformer',
//   },
//   {
//     href: 'http://www.synergyinsurance.com/',
//     name: 'Synergy Comp Insurance',
//   },
//   {
//     href: 'undefined',
//     name: 'T',
//   },
//   {
//     href: 'https://www.talbotstaproom.com/',
//     name: 'Talbot’s Taproom & Terrace',
//   },
//   {
//     href: 'https://gmg.me/136584',
//     name: 'Tax Incentives LLC',
//   },
//   {
//     href: 'http://www.drivetaylorchevrolet.com/',
//     name: 'Taylor Chevrolet of Hermitage',
//   },
//   {
//     href: 'https://team-h.com/',
//     name: 'Team Hardinger',
//   },
//   {
//     href: 'https://temaroofingservices.com/',
//     name: 'TEMA Roofing',
//   },
//   {
//     href: 'https://thebuildersonline.com/',
//     name: 'The Builders Association of Eastern OH & Western PA',
//   },
//   {
//     href: 'http://www.garlandco.com/',
//     name: 'The Garland Company',
//   },
//   {
//     href: 'http://www.thiel.edu/',
//     name: 'Thiel College',
//   },
//   {
//     href: 'http://www.thomas-construction.com/',
//     name: 'Thomas Construction Co.',
//   },
//   {
//     href: 'http://www.thompsonfab.com/',
//     name: 'Thompson Fabricating Inc.',
//   },
//   {
//     href: 'https://www.tinastaxi.com/',
//     name: 'Tina’s Taxi',
//   },
//   {
//     href: 'undefined',
//     name: 'U',
//   },
//   {
//     href: 'http://www.upmc.com/',
//     name: 'UPMC Horizon',
//   },
//   {
//     href: 'undefined',
//     name: 'V',
//   },
//   {
//     href: 'http://www.vendrickconstruction.com/',
//     name: 'VendRick Construction',
//   },
//   {
//     href: 'undefined',
//     name: 'W',
//   },
//   {
//     href: 'https://wkthomas.net/',
//     name: 'WK Thomas and Associates',
//   },
//   {
//     href: 'http://www.walbergfamilypharmacies.com/',
//     name: 'Walberg Family Pharmacies',
//   },
//   {
//     href: 'http://www.wallacepancher.com/',
//     name: 'WallacePancher',
//   },
//   {
//     href: 'http://www.wcjp.org/',
//     name: 'West Central Job Partnership',
//   },
//   {
//     href: 'https://wmasd.k12.pa.us/',
//     name: 'West Middlesex Area School District',
//   },
//   {
//     href: 'http://www.wheatlandsteel.com/',
//     name: 'Wheatland Steel Processing',
//   },
//   {
//     href: 'http://www.wheatland.com/',
//     name: 'Wheatland Tube Company/Maneely Fund',
//   },
//   {
//     href: 'https://www.wholelifepa.org/',
//     name: 'Whole Life Services, Inc.',
//   },
//   {
//     href: '',
//     name: 'Winner Family Foundation',
//   },
//   {
//     href: '',
//     name: 'Winslow Engineering',
//   },
//   {
//     href: 'undefined',
//     name: 'Y',
//   },
//   {
//     href: 'http://www.yourga.com/',
//     name: 'Yourga Trucking',
//   },
//   {
//     href: 'undefined',
//     name: 'Z',
//   })
// ];
