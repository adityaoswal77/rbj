import { buildYear, site, yearsInBusiness } from "./site";

export type Lang = "en" | "mr";

/** Latin -> Devanagari digits, so Marathi copy reads natively. */
export function toDevanagariDigits(input: string | number): string {
  const map = "०१२३४५६७८९";
  return String(input).replace(/\d/g, (d) => map[Number(d)]);
}

/** Replaces {years} with the running count, localised per language. */
function withYears(template: string, lang: Lang): string {
  const n = lang === "mr" ? toDevanagariDigits(yearsInBusiness) : String(yearsInBusiness);
  return template.replaceAll("{years}", n);
}

type Collection = {
  id: string;
  title: string;
  description: string;
  imageLabel: string;
};

type TrustPoint = {
  icon: "hallmark" | "craft" | "years";
  title: string;
  description: string;
};

export type Content = {
  brand: { name: string; mark: string; sub: string };
  nav: { collections: string; about: string; visit: string; menu: string; close: string };
  cta: {
    visitStore: string;
    whatsappUs: string;
    whatsappEnquiry: string;
    whatsappCustom: string;
    whatsappGeneral: string;
    seeOnMap: string;
    followUs: string;
  };
  hero: {
    eyebrow: string;
    title: string;
    tagline: string;
    imageLabel: string;
  };
  collections: {
    eyebrow: string;
    title: string;
    intro: string;
    items: Collection[];
  };
  madeToOrder: {
    eyebrow: string;
    title: string;
    body: string;
    points: string[];
    imageLabel: string;
  };
  about: {
    eyebrow: string;
    title: string;
    body: string;
    trust: TrustPoint[];
  };
  instagram: {
    eyebrow: string;
    title: string;
    intro: string;
    imageLabel: string;
  };
  visit: {
    eyebrow: string;
    title: string;
    intro: string;
    imageLabel: string;
    mapLabel: string;
    labels: { address: string; hours: string; phone: string; whatsapp: string };
    hours: string[];
  };
  footer: { tagline: string; copyright: string; instagram: string };
};

const en: Content = {
  brand: { name: "Rajbhi Jewellers", mark: "Rajbhi", sub: "Jewellers" },
  nav: {
    collections: "Collections",
    about: "About",
    visit: "Visit Us",
    menu: "Open menu",
    close: "Close menu",
  },
  cta: {
    visitStore: "Visit Store",
    whatsappUs: "WhatsApp Us",
    whatsappEnquiry: "Enquire on WhatsApp",
    whatsappCustom:
      "Namaskar! I would like to get a piece made to order at Rajbhi Jewellers.",
    whatsappGeneral:
      "Namaskar! I would like to know more about the jewellery at Rajbhi Jewellers.",
    seeOnMap: "See on map",
    followUs: "Follow on Instagram",
  },
  hero: {
    eyebrow: "Saswad · Dist. Pune",
    title: "Rajbhi Jewellers",
    tagline: "Trusted jewellers of Saswad",
    imageLabel: "Hero photograph — gold jewellery close-up",
  },
  collections: {
    eyebrow: "What we make",
    title: "Our Collections",
    intro:
      "Gold, silver and stones, kept simple and made well. Come in and see a piece in your hand before you decide.",
    items: [
      {
        id: "gold",
        title: "Gold Jewellery",
        description:
          "Chains, bangles and necklaces in 22K BIS hallmarked gold, for every day and for occasions.",
        imageLabel: "Gold jewellery",
      },
      {
        id: "silver",
        title: "Silver Jewellery",
        description:
          "Payal, jodvi, pooja articles and gifting silver, finished clean and weighed openly.",
        imageLabel: "Silver jewellery",
      },
      {
        id: "bridal",
        title: "Bridal Sets",
        description:
          "Complete wedding sets — from nath and thushi to the full haar, put together with you.",
        imageLabel: "Bridal jewellery set",
      },
      {
        id: "gemstone",
        title: "Gemstone & Precious Stone Rings",
        description:
          "Certified stones set into rings, made to the recommendation you bring us.",
        imageLabel: "Gemstone rings",
      },
    ],
  },
  madeToOrder: {
    eyebrow: "Made to order",
    title: "Made the way you want it",
    body:
      "Bring us a photograph, an old family piece, or just an idea. Our karigars shape it here — a gemstone ring set to the recommendation you were given, a necklace remade in your mother's design, or something drawn from scratch. You see the design and the weight before any work begins.",
    points: [
      "Design and weight confirmed with you first",
      "Gemstones sourced with certification",
      "Old jewellery reset and remade",
    ],
    imageLabel: "Karigar at work",
  },
  about: {
    eyebrow: "Our family",
    title: "About Us",
    body:
      "Rajbhi Jewellers has stood on the same street in Saswad for {years} years, run by one family across three generations. We began as a small counter serving the weekly market and we are still here because our customers kept coming back — for a daughter's wedding, for a first payal, for a repair on a chain bought here decades ago. Nothing leaves our counter that we would not put on our own family.",
    trust: [
      {
        icon: "hallmark",
        title: "BIS Hallmarked Gold",
        description: "Every gold piece carries the BIS hallmark and its HUID.",
      },
      {
        icon: "craft",
        title: "Custom Craftsmanship",
        description: "Our own karigars, working to your design and your measure.",
      },
      {
        icon: "years",
        title: "Serving Saswad for {years} years",
        description: "Three generations of the same family, at the same counter.",
      },
    ],
  },
  instagram: {
    eyebrow: "Instagram",
    title: `Follow us @${site.instagramHandle}`,
    intro:
      "A look at what leaves our counter — new arrivals, bridal sets and pieces made to order.",
    imageLabel: "Instagram post",
  },
  visit: {
    eyebrow: "Come and see us",
    title: "Visit Us",
    intro:
      "We are on the main road in Saswad, a short walk from the bus stand. Tea is on us.",
    imageLabel: "Our store in Saswad",
    mapLabel: "Google Map — Rajbhi Jewellers, Saswad",
    labels: {
      address: "Address",
      hours: "Opening hours",
      phone: "Phone",
      whatsapp: "WhatsApp",
    },
    hours: ["Monday – Saturday: 10:30 am – 8:30 pm", "Sunday: 10:30 am – 2:00 pm"],
  },
  footer: {
    tagline: "Trusted jewellers of Saswad",
    copyright: `© ${buildYear} ${site.name}. All rights reserved.`,
    instagram: "Instagram",
  },
};

const mr: Content = {
  brand: { name: "राजभी ज्वेलर्स", mark: "राजभी", sub: "ज्वेलर्स" },
  nav: {
    collections: "संग्रह",
    about: "आमच्याविषयी",
    visit: "भेट द्या",
    menu: "मेनू उघडा",
    close: "मेनू बंद करा",
  },
  cta: {
    visitStore: "दुकानाला भेट द्या",
    whatsappUs: "व्हॉट्सअ‍ॅपवर संपर्क",
    whatsappEnquiry: "व्हॉट्सअ‍ॅपवर विचारा",
    whatsappCustom:
      "नमस्कार! मला राजभी ज्वेलर्समध्ये ऑर्डरप्रमाणे दागिना घडवून घ्यायचा आहे.",
    whatsappGeneral:
      "नमस्कार! मला राजभी ज्वेलर्सच्या दागिन्यांविषयी अधिक माहिती हवी आहे.",
    seeOnMap: "नकाशावर पहा",
    followUs: "इन्स्टाग्रामवर फॉलो करा",
  },
  hero: {
    eyebrow: "सासवड · जि. पुणे",
    title: "राजभी ज्वेलर्स",
    tagline: "सासवडचे विश्वासू सराफ",
    imageLabel: "मुख्य छायाचित्र — सोन्याचे दागिने",
  },
  collections: {
    eyebrow: "आमच्याकडे काय मिळेल",
    title: "आमचे संग्रह",
    intro:
      "सोनं, चांदी आणि खडे — साधे आणि नीट घडवलेले. ठरवण्यापूर्वी दुकानात येऊन दागिना हातात घेऊन पहा.",
    items: [
      {
        id: "gold",
        title: "सोन्याचे दागिने",
        description:
          "रोजच्या वापरासाठी आणि सणासुदीसाठी २२ कॅरेट BIS हॉलमार्क सोन्याच्या चेन, बांगड्या आणि हार.",
        imageLabel: "सोन्याचे दागिने",
      },
      {
        id: "silver",
        title: "चांदीचे दागिने",
        description:
          "पैंजण, जोडवी, पूजेचे साहित्य आणि भेटवस्तूंची चांदी — स्वच्छ घडण आणि समोर वजन.",
        imageLabel: "चांदीचे दागिने",
      },
      {
        id: "bridal",
        title: "वधूचे दागिने",
        description:
          "नथ आणि ठुशीपासून पूर्ण हारापर्यंत — तुमच्या पसंतीने जुळवलेले संपूर्ण लग्नाचे संच.",
        imageLabel: "वधूचा दागिन्यांचा संच",
      },
      {
        id: "gemstone",
        title: "रत्नांच्या व खड्यांच्या अंगठ्या",
        description:
          "तुम्ही सांगाल त्या सल्ल्यानुसार प्रमाणित खडे अंगठीत बसवून दिले जातात.",
        imageLabel: "खड्यांच्या अंगठ्या",
      },
    ],
  },
  madeToOrder: {
    eyebrow: "ऑर्डरप्रमाणे घडवणूक",
    title: "तुम्हाला हवा तसा दागिना",
    body:
      "एखादा फोटो, घरातला जुना दागिना किंवा फक्त एक कल्पना घेऊन या. आमचे कारागीर ती इथेच घडवतील — सांगितल्या सल्ल्यानुसार बसवलेली खड्याची अंगठी, आईच्या डिझाइनप्रमाणे पुन्हा घडवलेला हार, किंवा अगदी नव्याने तयार केलेला दागिना. काम सुरू करण्यापूर्वी डिझाइन आणि वजन तुम्हाला दाखवले जाते.",
    points: [
      "डिझाइन आणि वजन आधी तुमच्याकडून निश्चित",
      "प्रमाणपत्रासह खडे उपलब्ध",
      "जुने दागिने मोडून पुन्हा घडवून मिळतात",
    ],
    imageLabel: "कारागीर कामात",
  },
  about: {
    eyebrow: "आमचं कुटुंब",
    title: "आमच्याविषयी",
    body:
      "राजभी ज्वेलर्स सासवडमधल्या याच रस्त्यावर गेली {years} वर्षे उभे आहे — एकाच कुटुंबाच्या तीन पिढ्यांनी चालवलेले. आठवडी बाजारासाठी सुरू झालेल्या छोट्या दुकानापासून आजपर्यंत आम्ही इथेच आहोत, कारण आमचे ग्राहक पुन्हा पुन्हा येत राहिले — मुलीच्या लग्नासाठी, पहिल्या पैंजणासाठी, कित्येक वर्षांपूर्वी इथून घेतलेल्या चेनच्या दुरुस्तीसाठी. जो दागिना आम्ही आमच्या घरात वापरणार नाही, तो आमच्या दुकानातून बाहेर जात नाही.",
    trust: [
      {
        icon: "hallmark",
        title: "BIS हॉलमार्क सोने",
        description: "प्रत्येक सोन्याच्या दागिन्यावर BIS हॉलमार्क आणि HUID असतो.",
      },
      {
        icon: "craft",
        title: "पसंतीनुसार घडणावळ",
        description: "आमचेच कारागीर, तुमच्या डिझाइन आणि मापाप्रमाणे काम.",
      },
      {
        icon: "years",
        title: "सासवडच्या सेवेत {years} वर्षे",
        description: "एकाच दुकानात एकाच कुटुंबाच्या तीन पिढ्या.",
      },
    ],
  },
  instagram: {
    eyebrow: "इन्स्टाग्राम",
    title: `आम्हाला फॉलो करा @${site.instagramHandle}`,
    intro:
      "आमच्या दुकानातून काय बाहेर पडतं याची झलक — नवे दागिने, वधूचे संच आणि ऑर्डरप्रमाणे घडवलेली कामं.",
    imageLabel: "इन्स्टाग्राम पोस्ट",
  },
  visit: {
    eyebrow: "आमच्याकडे या",
    title: "आम्हाला भेट द्या",
    intro:
      "आम्ही सासवडच्या मुख्य रस्त्यावर, बसस्थानकापासून थोड्याच अंतरावर आहोत. चहा आमच्याकडून.",
    imageLabel: "सासवडमधील आमचं दुकान",
    mapLabel: "गूगल नकाशा — राजभी ज्वेलर्स, सासवड",
    labels: {
      address: "पत्ता",
      hours: "वेळ",
      phone: "दूरध्वनी",
      whatsapp: "व्हॉट्सअ‍ॅप",
    },
    hours: ["सोमवार – शनिवार: सकाळी १०:३० – रात्री ८:३०", "रविवार: सकाळी १०:३० – दुपारी २:००"],
  },
  footer: {
    tagline: "सासवडचे विश्वासू सराफ",
    copyright: `© ${toDevanagariDigits(buildYear)} राजभी ज्वेलर्स. सर्व हक्क राखीव.`,
    instagram: "इन्स्टाग्राम",
  },
};

/** Resolves {years} tokens so the dictionaries stay plain, literal objects. */
function resolveTokens(c: Content, lang: Lang): Content {
  return {
    ...c,
    about: {
      ...c.about,
      body: withYears(c.about.body, lang),
      trust: c.about.trust.map((t) => ({ ...t, title: withYears(t.title, lang) })),
    },
  };
}

export const content: Record<Lang, Content> = {
  en: resolveTokens(en, "en"),
  mr: resolveTokens(mr, "mr"),
};
