// Cover Blobs
import coverCeiling from '../assets/blobs/cover-blobs/ceiling-blob.png';
import coverFull from '../assets/blobs/cover-blobs/full-cover-blob.png';
import coverNone from '../assets/blobs/cover-blobs/no-cover-blob.png';
import coverUmbrella from '../assets/blobs/cover-blobs/umbrella-blob.png';

// Dietary Restriction Blobs
import dietGlutenFree from '../assets/blobs/dietary-rest-blobs/glutenFree-blob.png';
import dietVegan from '../assets/blobs/dietary-rest-blobs/vegan-blob.png';
import dietVeggie from '../assets/blobs/dietary-rest-blobs/veggie-blob.png';

// Emotional Blobs
import emotionCozy from '../assets/blobs/emotional-blobs/cozy-blob.png';
import emotionElegant from '../assets/blobs/emotional-blobs/elegant-blob.png';
import emotionFamily from '../assets/blobs/emotional-blobs/family-friendly-blob.png';
import emotionFriends from '../assets/blobs/emotional-blobs/friends-blob.png';
import emotionGroups from '../assets/blobs/emotional-blobs/groups-blob.png';
import emotionLgtbi from '../assets/blobs/emotional-blobs/lgtbi-friendly-blob.png';
import emotionLively from '../assets/blobs/emotional-blobs/lively-blob.png';
import emotionPetLovers from '../assets/blobs/emotional-blobs/petlovers-blob.png';
import emotionRelaxed from '../assets/blobs/emotional-blobs/relaxed-blob.png';
import emotionRomantic from '../assets/blobs/emotional-blobs/romantic-blob.png';
import emotionSilent from '../assets/blobs/emotional-blobs/silent-blob.png';
import emotionTrendy from '../assets/blobs/emotional-blobs/trendy-blob.png';

// Food Blobs
import foodAmerican from '../assets/blobs/food-blobs/american-blob.png';
import foodAsian from '../assets/blobs/food-blobs/asian-blob.png';
import foodBreakfast from '../assets/blobs/food-blobs/breakfast-blob.png';
import foodBrunch from '../assets/blobs/food-blobs/brunch-blob.png';
import foodBurger from '../assets/blobs/food-blobs/burger-blob.png';
import foodChicken from '../assets/blobs/food-blobs/chicken-blob.png';
import foodChinese from '../assets/blobs/food-blobs/chinese-blob.png';
import foodDailyMenu from '../assets/blobs/food-blobs/dailyMenu-blob.png';
import foodIndian from '../assets/blobs/food-blobs/indian-blob.png';
import foodItalian from '../assets/blobs/food-blobs/italian-blob.png';
import foodKebab from '../assets/blobs/food-blobs/kebab-blob.png';
import foodLatin from '../assets/blobs/food-blobs/latin-blob.png';
import foodMex from '../assets/blobs/food-blobs/mex-blob.png';
import foodMiddleEast from '../assets/blobs/food-blobs/middleEast-blob.png';
import foodPeruvian from '../assets/blobs/food-blobs/peruvian-blob.png';
import foodPizza from '../assets/blobs/food-blobs/pizza-blob.png';
import foodSpanish from '../assets/blobs/food-blobs/spanish-food.png';
import foodTapas from '../assets/blobs/food-blobs/tapas-blob.png';
import foodThai from '../assets/blobs/food-blobs/thai-blob.png';
import foodViet from '../assets/blobs/food-blobs/viet-blob.png';

// Placement Blobs
import placeNature from '../assets/blobs/placement-blobs/nature-blob.png';
import placePark from '../assets/blobs/placement-blobs/park-blob.png';
import placeRooftop from '../assets/blobs/placement-blobs/rooftop-blob.png';
import placeSeaside from '../assets/blobs/placement-blobs/seaside-blob.png';
import placeSquare from '../assets/blobs/placement-blobs/square-blob.png';
import placeStreet from '../assets/blobs/placement-blobs/street-blob.png';

export const getBlobs = () => ({
    cover: {
        ceiling: coverCeiling,
        full: coverFull,
        none: coverNone,
        umbrella: coverUmbrella
    },
    dietary: {
        glutenFree: dietGlutenFree,
        vegan: dietVegan,
        veggie: dietVeggie
    },
    emotional: {
        cozy: emotionCozy,
        elegant: emotionElegant,
        family: emotionFamily,
        friends: emotionFriends,
        groups: emotionGroups,
        lgtbi: emotionLgtbi,
        lively: emotionLively,
        petLovers: emotionPetLovers,
        relaxed: emotionRelaxed,
        romantic: emotionRomantic,
        silent: emotionSilent,
        trendy: emotionTrendy
    },
    food: {
        american: foodAmerican,
        asian: foodAsian,
        breakfast: foodBreakfast,
        brunch: foodBrunch,
        burger: foodBurger,
        chicken: foodChicken,
        chinese: foodChinese,
        dailyMenu: foodDailyMenu,
        indian: foodIndian,
        italian: foodItalian,
        kebab: foodKebab,
        latin: foodLatin,
        mex: foodMex,
        middleEast: foodMiddleEast,
        peruvian: foodPeruvian,
        pizza: foodPizza,
        spanish: foodSpanish,
        tapas: foodTapas,
        thai: foodThai,
        viet: foodViet
    },
    placement: {
        nature: placeNature,
        park: placePark,
        rooftop: placeRooftop,
        seaside: placeSeaside,
        square: placeSquare,
        street: placeStreet
    }
});


export const BLOB_TRANSLATIONS = {
    categories: {
        cover: "Tipus de coberta",
        dietary: "Tipus de dieta",
        emotional: "Ambient",
        food: "Tipus de menjar",
        placement: "Ubicació"
    },
    cover: {
        ceiling: "Sostre",
        full: "Coberta",
        none: "Descoberta",
        umbrella: "Para-sol"
    },
    dietary: {
        glutenFree: "Sense gluten",
        vegan: "Vegana",
        veggie: "Vegetariana"
    },
    emotional: {
        cozy: "Acollidora",
        elegant: "Elegant",
        family: "Familiar",
        friends: "Pels amics",
        groups: "Per a grups",
        lgtbi: "LGTBI+ friendly",
        lively: "Té marxa",
        petLovers: "Pet-lover",
        relaxed: "Relax",
        romantic: "Romàntica",
        silent: "Silenciosa",
        trendy: "En tendència"
    },
    food: {
        american: "Americana",
        asian: "Asiàtica",
        breakfast: "Esmorzar",
        brunch: "Brunch",
        burger: "Hamburguesa",
        chicken: "Pollastre",
        chinese: "Xinesa",
        dailyMenu: "Menú del dia",
        indian: "India",
        italian: "Italiana",
        kebab: "Kebab",
        latin: "Llatina",
        mex: "Mexicana",
        middleEast: "Orient Mitjà",
        peruvian: "Peruana",
        pizza: "Pizza",
        spanish: "Espanyola",
        tapas: "Tapes",
        thai: "Tailandesa",
        viet: "Vietnamita"
    },
    placement: {
        nature: "Natura",
        park: "Parc",
        rooftop: "Rooftop",
        seaside: "Marítima",
        square: "Plaça",
        street: "Carrer"
    }
} as const;


export type BlobCollection = ReturnType<typeof getBlobs>;