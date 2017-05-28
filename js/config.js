



export var colors =  ["#913cca","#bb3d7b", "#d63f4a","#da3f43", "#cc3e5c"];;
export var font = "tahoma";
export var Radius = 0.7;


export var text = [
  "Excel 2017",
  "#RedefiningLines",
  "Coming Soon.."
];



export var scrollDelay = 3000; // delay for accepting the next scroll event
export var autoScrollDelay = 4000;




export function scrollRevealConfig() {



	sr.reveal('#e2017',{ duration: 2000,origin: "bottom",distance: "200px"});
	sr.reveal('#e2016',{ duration: 2000,delay:200,origin: "bottom",distance: "200px"});
	sr.reveal('#e2015',{ duration: 2000,delay:400,origin: "bottom",distance: "200px"});
	sr.reveal('#e2014',{ duration: 2000,delay:800,origin: "bottom",distance: "200px"});

	// sr.reveal('.copyrt',{duration:2000,origin: "bottom"});

	sr.reveal('.facebook',{ duration: 2000,delay:400,origin: "bottom",distance: "100px"});
	sr.reveal('.gplus',{ duration: 2000,delay:200,origin: "bottom",distance: "100px"});
	sr.reveal('.insta',{ duration: 2000,origin: "bottom",distance: "100px"});

	sr.reveal('.mec-logo',{ duration: 2000, origin:"left",distance:"100px"});
	sr.reveal('.excel-logo',{ duration: 2000, origin: "right",distance:"100px"});

}