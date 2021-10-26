// The amount of images in each folder
// The images are saved server side but the code is executed client side
// We can't search through the image paths so we need to "know" each path
// If we know the parent dirs and the filename structure, we can choose a number =< these to get the exact path
const imgCounts = {
	"Backgrounds": 10,
	"Board behind Hands": 1,
	"Hands": 192,
	
	"Body 1/Body": 8,
	"Body 1/Bottoms": 9,
	"Body 1/Chains": 49,
	"Body 1/Tattoos": 5,
	"Body 1/Tops": 19,
	"Body 1/Wounds": 8,
	
	"Body 2/Body": 8,
	"Body 2/Bottoms": 9,
	"Body 2/Chains": 49,
	"Body 2/Tattoos": 5,
	"Body 2/Tops": 19,
	"Body 2/Wounds": 8,
	
	"Body 3/Body": 8,
	"Body 3/Bottoms": 9,
	"Body 3/Chains": 48,
	"Body 3/Tattoos": 5,
	"Body 3/Tops": 19,
	"Body 3/Wounds": 8,
	
	"Head 1/Bubblegum": 3,
	"Head 1/Eyebrows": 11,
	"Head 1/Eyes": 20,
	"Head 1/Face Tats": 1,
	"Head 1/Facial Hair": 10,
	"Head 1/Full Masks": 20,
	"Head 1/Glasses": 16,
	"Head 1/Hair": 10,
	"Head 1/Hats": 13,
	"Head 1/Head": 8,
	"Head 1/Laser Eyes": 3,
	"Head 1/Mouth": 10,
	"Head 1/Nose": 10,
	"Head 1/Partial Masks": 12,
	
	"Head 2/Bubblegum": 3,
	"Head 2/Eyebrows": 11,
	"Head 2/Eyes": 20,
	"Head 2/Face Tats": 1,
	"Head 2/Facial Hair": 10,
	"Head 2/Full Masks": 20,
	"Head 2/Glasses": 16,
	"Head 2/Hair": 10,
	"Head 2/Hats": 13,
	"Head 2/Head": 8,
	"Head 2/Laser Eyes": 3,
	"Head 2/Masks": 32,
	"Head 2/Mouth": 10,
	"Head 2/Nose": 10,
	"Head 2/Partial Masks": 12,
	
	"Head 3/Bubblegum": 3,
	"Head 3/Eyebrows": 11,
	"Head 3/Eyes": 20,
	"Head 3/Face Tats": 1,
	"Head 3/Facial Hair": 10,
	"Head 3/Full Masks": 20,
	"Head 3/Glasses": 16,
	"Head 3/Hair": 10,
	"Head 3/Hats": 12,
	"Head 3/Head": 8,
	"Head 3/Laser Eyes": 3,
	"Head 3/Masks": 32,
	"Head 3/Mouth": 10,
	"Head 3/Nose": 10,
	"Head 3/Partial Masks": 12,
	
	"Head 4/Bubblegum": 3,
	"Head 4/Eyebrows": 11,
	"Head 4/Eyes": 20,
	"Head 4/Face Tats": 1,
	"Head 4/Facial Hair": 10,
	"Head 4/Full Masks": 20,
	"Head 4/Glasses": 16,
	"Head 4/Hair": 10,
	"Head 4/Hats": 10,
	"Head 4/Head": 8,
	"Head 4/Laser Eyes": 3,
	"Head 4/Masks": 32,
	"Head 4/Mouth": 10,
	"Head 4/Nose": 10,
	"Head 4/Partial Masks": 12,
};


const allCategories = [
	"Backgrounds",

	"Bottoms",
	"Body",
	"Tattoos",
	"Tops",
	"Chains",
	"Wounds",

	"Head",
	"Face Tats",
	"Eyebrows",
	"Eyes",
	"Mouth",
	"Nose",
	"Facial Hair",
	"Partial Masks",
	"Glasses",
	"Hair",
	"Bubblegum",
	"Full Masks",
	"Hats",
	"Laser Eyes",
	
	"Board behind Hands",
	"Hands",
];


// Categories to ignore on key category pick
const excludeCategories = {
	"Tattoos": [],
	"Tops": [],
	"Chains": [],
	"Wounds": [],
	"Face Tats": [],
	"Eyes": [
		"Laser Eyes",
	],
	"Mouth": [
		"Bubblegum",
	],
	"Facial Hair": [
		"Partial Masks",
		"Full Masks",
	],
	"Partial Masks": [
		"Facial Hair",
		"Bubblegum",
		"Full Masks",
	],
	"Glasses": [
		"Full Masks",
		"Laser Eyes",
	],
	"Hair": [
		"Full Masks",
		"Hats",
	],
	"Bubblegum": [
		"Mouth",
		"Partial Masks",
		"Full Masks",
	],
	"Full Masks": [
		"Facial Hair",
		"Partial Masks",
		"Glasses",
		"Hair",
		"Bubblegum",
		"Hats",
		"Laser Eyes",
	],
	"Hats": [
		"Hair",
		"Full Masks",
	],
	"Laser Eyes": [
		"Eyes",
		"Glasses",
		"Full Masks",
	],
};


// 0 = never, 1 = always
const pickChances = {
    "Full Masks": 0.1,
    "Bubblegum": 0.1,
    "Laser Eyes": 0.1,
    "Face Tats": 0.2,
    "Partial Masks": 0.2,
    "Tattoos": 0.3,
    "Glasses": 0.3,
    "Hats": 0.3,
    "Wounds": 0.3,
    "Chains": 0.4,
    "Facial Hair": 0.5,
    "Tops": 0.8,
    "Hair": 0.9,
	"Eyes": 1,
	"Mouth": 1,
};


const dirCounts = {
    "Body": 3,
    "Head": 4,
};