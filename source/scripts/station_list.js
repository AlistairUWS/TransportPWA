/*global stations */

var stations = {
	"Aberdeen": "ABD",
	"Aberdour": "AUR",
	"Achanalt": "AAT",
	"Achnasheen": "ACN",
	"Achnashellach": "ACH",
	"Addiewell": "ADW",
	"Airbles": "AIR",
	"Airdrie": "ADR",
	"Alexandra Parade": "AXP",
	"Alexandria": "ALX",
	"Alness": "ASS",
	"Altnabreac": "ABC",
	"Anderston": "AND",
	"Annan": "ANN",
	"Anniesland": "ANL",
	"Arbroath": "ARB",
	"Ardgay": "ARD",
	"Ardlui": "AUI",
	"Ardrossan Harbour": "ADS",
	"Ardrossan South Beach": "ASB",
	"Ardrossan Town": "ADN",
	"Argyle Street": "AGS",
	"Arisaig": "ARG",
	"Arrochar & Tarbet": "ART",
	"Ashfield": "ASF",
	"Attadale": "ATT",
	"Auchinleck": "AUK",
	"Aviemore": "AVM",
	"Ayr": "AYR",
	"Baillieston": "BIO",
	"Balloch": "BSG",
	"Balmossie": "BSI",
	"Banavie": "BNV",
	"Barassie": "BSS",
	"Bardon Mill": "BLL",
	"Bargeddie": "BGI",
	"Barnhill": "BNL",
	"Barrhead": "BRR",
	"Barrhill": "BRL",
	"Barry Links": "BYL",
	"Bathgate": "BHG",
	"Bearsden": "BRN",
	"Beasdale": "BSL",
	"Beauly": "BEL",
	"Bellgrove": "BLG",
	"Bellshill": "BLH",
	"Bishopbriggs": "BBG",
	"Bishopton": "BPT",
	"Blair Atholl": "BLA",
	"Blairhill": "BAI",
	"Blantyre": "BLT",
	"Blaydon": "BLO",
	"Bogston": "BGS",
	"Bowling": "BWG",
	"Brampton Cumbria": "BRP",
	"Branchton": "BCN",
	"Breich": "BRC",
	"Bridge Of Allan": "BEA",
	"Bridge Of Orchy": "BRO",
	"Bridgeton": "BDG",
	"Brora": "BRA",
	"Broughty Ferry": "BYF",
	"Brunstane": "BGA",
	"Burnside": "BUI",
	"Burntisland": "BTS",
	"Busby": "BUS",
	"Cambuslang": "CBL",
	"Camelon": "CMO",
	"Cardenden": "CDD",
	"Cardonald": "CDO",
	"Cardross": "CDR",
	"Carfin": "CRF",
	"Carlisle": "CAR",
	"Carluke": "CLU",
	"Carmyle": "CML",
	"Carnoustie": "CAN",
	"Carntyne": "CAY",
	"Carrbridge": "CAG",
	"Carstairs": "CRS",
	"Cartsdyke": "CDY",
	"Cathcart": "CCT",
	"Charing Cross": "CHG",
	"Chatelherault": "CTE",
	"Clarkston": "CKS",
	"Cleland": "CEA",
	"Clydebank": "CYK",
	"Coatbridge Central": "CBC",
	"Coatbridge Sunnyside": "CBS",
	"Coatdyke": "COA",
	"Connel Ferry": "CON",
	"Corbridge": "CRB",
	"Corkerhill": "CKH",
	"Corpach": "CPA",
	"Corrour": "CRR",
	"Cowdenbeath": "COW",
	"Craigendoran": "CGD",
	"Crewe": "CRE",
	"Crianlarich": "CNR",
	"Croftfoot": "CFF",
	"Crookston": "CKT",
	"Crosshill": "COI",
	"Crossmyloof": "CMY",
	"Croy": "CRO",
	"Culrain": "CUA",
	"Cumbernauld": "CUB",
	"Cupar": "CUP",
	"Curriehill": "CUH",
	"Dalgety Bay": "DAG",
	"Dalmally": "DAL",
	"Dalmarnock": "DAK",
	"Dalmeny": "DAM",
	"Dalmuir": "DMR",
	"Dalreoch": "DLR",
	"Dalry": "DLY",
	"Dalwhinnie": "DLW",
	"Dingwall": "DIN",
	"Drem": "DRM",
	"Drumchapel": "DMC",
	"Drumfrochar": "DFR",
	"Drumgelloch": "DRU",
	"Drumry": "DMY",
	"Duirinish": "DRN",
	"Duke Street": "DST",
	"Dumbarton Central": "DBC",
	"Dumbarton East": "DBE",
	"Dumbreck": "DUM",
	"Dumfries": "DMF",
	"Dunblane": "DBL",
	"Duncraig": "DCG",
	"Dundee": "DEE",
	"Dunfermline Queen Margaret": "DFL",
	"Dunfermline Town": "DFE",
	"Dunkeld & Birnam": "DKD",
	"Dunlop": "DNL",
	"Dunrobin Castle": "DNO",
	"Dyce": "DYC",
	"East Kilbride": "EKL",
	"Easterhouse": "EST",
	"Edinburgh": "EDB",
	"Edinburgh Park": "EDP",
	"Elgin": "ELG",
	"Exhibition Centre": "EXG",
	"Fairlie": "FRL",
	"Falkirk Grahamston": "FKG",
	"Falkirk High": "FKK",
	"Falls Of Cruachan": "FOC",
	"Fauldhouse": "FLD",
	"Fearn": "FRN",
	"Forres": "FOR",
	"Forsinard": "FRS",
	"Fort Matilda": "FTM",
	"Fort William": "FTW",
	"Garelochhead": "GCH",
	"Garrowhill": "GAR",
	"Garscadden": "GRS",
	"Gartcosh": "GRH",
	"Garve": "GVE",
	"Georgemas Junction": "GGJ",
	"Giffnock": "GFN",
	"Gilshochill": "GSC",
	"Girvan": "GIR",
	"Glasgow Central": "GLC",
	"Glasgow Queen Street": "GLQ",
	"Gleneagles": "GLE",
	"Glenfinnan": "GLF",
	"Glengarnock": "GLG",
	"Glenrothes With Thornton": "GLT",
	"Golf Street": "GOF",
	"Golspie": "GOL",
	"Gourock": "GRK",
	"Greenfaulds": "GRL",
	"Greenock Central": "GKC",
	"Greenock West": "GKW",
	"Gretna Green": "GEA",
	"Hairmyres": "HMY",
	"Haltwhistle": "HWH",
	"Hamilton Central": "HNC",
	"Hamilton West": "HNW",
	"Hartwood": "HTW",
	"Hawkhead": "HKH",
	"Haydon Bridge": "HDB",
	"Haymarket": "HYM",
	"Helensburgh Central": "HLC",
	"Helensburgh Upper": "HLU",
	"Helmsdale": "HMS",
	"Hexham": "HEX",
	"High Street": "HST",
	"Hillfoot": "HLF",
	"Hillington East": "HLE",
	"Hillington West": "HLW",
	"Holytown": "HLY",
	"Howwood": "HOZ",
	"Huntly": "HNT",
	"Hyndland": "HYN",
	"I.B.M.": "HYZ",
	"Insch": "INS",
	"Invergordon": "IGD",
	"Invergowrie": "ING",
	"Inverkeithing": "INK",
	"Inverkip": "INP",
	"Inverness": "INV",
	"Invershin": "INH",
	"Inverurie": "INR",
	"Irvine": "IRV",
	"Johnstone": "JHN",
	"Jordanhill": "JOR",
	"Keith": "KEH",
	"Kelvindale": "KVD",
	"Kennishead": "KNS",
	"Kildonan": "KIL",
	"Kilmarnock": "KMK",
	"Kilmaurs": "KLM",
	"Kilpatrick": "KPT",
	"Kilwinning": "KWN",
	"Kinbrace": "KBC",
	"Kinghorn": "KGH",
	"Kings Park": "KGP",
	"Kingsknowe": "KGE",
	"Kingussie": "KIN",
	"Kirkcaldy": "KDY",
	"Kirkconnel": "KRK",
	"Kirkhill": "KKH",
	"Kirknewton": "KKN",
	"Kirkwood": "KWD",
	"Kyle Of Lochalsh": "KYL",
	"Ladybank": "LDY",
	"Lairg": "LRG",
	"Lanark": "LNK",
	"Langbank": "LGB",
	"Langside": "LGS",
	"Larbert": "LBT",
	"Largs": "LAR",
	"Larkhall": "LRH",
	"Lenzie": "LNZ",
	"Leuchars": "LEU",
	"Linlithgow": "LIN",
	"Livingston North": "LSN",
	"Livingston South": "LVG",
	"Loch Awe": "LHA",
	"Loch Eil Outward Bound": "LHE",
	"Lochailort": "KCM",
	"Locheilside": "LCS",
	"Lochgelly": "LCG",
	"Lochluichart": "LCC",
	"Lochwinnoch": "LHW",
	"London Euston": "KCM",
	"Longniddry": "LND",
	"Mallaig": "MLG",
	"Markinch": "MNC",
	"Maryhill": "MYH",
	"Maxwell Park": "MAX",
	"Maybole": "MAY",
	"Merryton": "MEY",
	"Metrocentre": "MCE",
	"Milliken Park": "MIN",
	"Milngavie": "MLN",
	"Monifieth": "MON",
	"Montrose": "MTS",
	"Morar": "MRR",
	"Mosspark": "MPK",
	"Motherwell": "MTH",
	"Mount Florida": "MFL",
	"Mount Vernon": "MTV",
	"Muir Of Ord": "MOO",
	"Muirend": "MUI",
	"Musselburgh": "MUB",
	"Nairn": "NRN",
	"Neilston": "NEI",
	"New Cumnock": "NCK",
	"Newcastle": "NCL",
	"Newcraighall": "NEY",
	"Newton": "NSD",
	"Newtonmore": "NWR",
	"Newton-On-Ayr": "NOA",
	"Nitshill": "NIT",
	"North Berwick": "NBW",
	"North Queensferry": "NQU",
	"Oban": "OBN",
	"Paisley Canal": "PCN",
	"Paisley Gilmour Street": "PYG",
	"Paisley St James": "PYJ",
	"Partick": "PTK",
	"Patterton": "PTT",
	"Perth": "PTH",
	"Pitlochry": "PIT",
	"Plockton": "PLK",
	"Pollokshaws East": "PWE",
	"Pollokshaws West": "PWW",
	"Pollokshields East": "PLE",
	"Pollokshields West": "PLW",
	"Polmont": "PMT",
	"Port Glasgow": "PTG",
	"Portlethen": "PLN",
	"Possilpark & Parkhouse": "PPK",
	"Preston": "PRE",
	"Prestonpans": "PST",
	"Prestwick Int. Airport": "PWC",
	"Prestwick Town": "PTW",
	"Priesthill & Darnley": "PTL",
	"Prudhoe": "PRU",
	"Queens Park": "QBR",
	"Rannoch": "RAN",
	"Renton": "RTN",
	"Riding Mill": "RDM",
	"Rogart": "ROG",
	"Rosyth": "ROS",
	"Roy Bridge": "RYB",
	"Rutherglen": "RUT",
	"Saltcoats": "SLT",
	"Sanquhar": "SQH",
	"Scotscalder": "SCT",
	"Scotstounhill": "SCH",
	"Shawlands": "SHL",
	"Shettleston": "SLS",
	"Shieldmuir": "SDM",
	"Shotts": "SHS",
	"Singer": "SIN",
	"Slateford": "SLA",
	"South Gyle": "SGL",
	"Spean Bridge": "SBR",
	"Springburn": "SPR",
	"Springfield": "SPF",
	"Stepps": "SPS",
	"Stevenston": "STV",
	"Stewarton": "STT",
	"Stirling": "STG",
	"Stocksfield": "SKS",
	"Stonehaven": "STN",
	"Stranraer": "STR",
	"Strathcarron": "STC",
	"Stromeferry": "STF",
	"Summerston": "SUM",
	"Tain": "TAI",
	"Taynuilt": "TAY",
	"Thornliebank": "THB",
	"Thorntonhall": "THT",
	"Thurso": "THS",
	"Troon": "TRN",
	"Tulloch": "TUL",
	"Tyndrum Lower": "TYL",
	"Uddingston": "UDD",
	"Uphall": "UHA",
	"Upper Tyndrum": "UHL",
	"Wallyford": "WAF",
	"Watford Junction": "WFJ",
	"Wemyss Bay": "WMS",
	"West Calder": "WCL",
	"West Kilbride": "WKB",
	"Wester Hailes": "WTA",
	"Westerton": "WES",
	"Wetheral": "WRL",
	"Whifflet": "WFF",
	"Whinhill": "WNL",
	"Whitecraigs": "WCR",
	"Wick": "WCK",
	"Williamwood": "WLM",
	"Wishaw": "WSH",
	"Woodhall": "WDL",
	"Wylam": "WYM",
	"Yoker:": "YOK"
};