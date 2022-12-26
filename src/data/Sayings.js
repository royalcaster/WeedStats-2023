// Hier einfach neue Sprüche / Zitate einfügen
const sayings = [
  '"Ich glaube, die Leute müssen über die Tatsache unterrichtet werden, dass Marihuana keine Droge ist. Marihuana ist eine Blume Gottes Gnade."\n- Willie Nelson',
  '"Das ist keine Droge, das ist ein Blatt."\n- Arnold Schwarzenegger',
  '"Ganja ist die Heilung einer Nation, Alkohol ist ihre Zerstörung."\n- Bob Marley',
  '"Mach das Beste, das du kannst aus den indischen Hanfsamen und säe ihn überall."\n- George Washington',
  '"Als ich ein Kind war habe ich häufig inhaliert. Darum ging es doch.“\n- Barack Obama',
  '"Gras lässt mich das fühlen, was ich fühlen muss.“\n- Snoop Dogg',
  '"Das erste Mal habe ich Gras mit meiner Mutter und meinem Stiefvater geraucht“\n- Matt Damon',
  '"Ich rauche viel Gras, wenn ich Songs schreibe."\n- Lady Gaga',
  '"Wenn man von einem unerträglichen Druck loskommen will, so hat man Haschisch nötig”\n- Friedrich Nietzsche',
  '"Natürlich weiß ich wie man einen Joint dreht."\n- Martha Stewart',
  '"Ich bin kein großer Kiffer oder sowas in der Art... aber Gras ist viel, viel weniger gefährlich als Alkohol."\n- Johnny Depp',
  '"[Ich] geb niemals das Ganja auf."\n- Morgan Freemann',
  '"Weißt du, wie viele Filme ich geschrieben habe, als ich high war?"\n- Jon Stewart',
  '"Rauchen hat mir geholfen meine Sinne besser wahr zu nehmen. Ich habe eine ganz neue Dimension von Sex erfahren."\n- Hugh Heffner',
  '"Einige meiner schönsten Stunden habe ich auf meiner hinteren Veranda verbracht, Hanf geraucht und beobachtet, so weit mein Auge reicht."\n- Thomas Jefferson',
  '"Es ist schwer, gemein zu sein, wenn man bekifft ist."\n– Bill Lee',
  '"Gras macht mich immer schläfrig“\n– Bryan Cranston',
  '"Erstmal ein piefen."\n- Vincent Pfäfflin',
  "Don't drink and drive, smoke and fly!",
  "Rettet die Wälder, Hanf auf die Felder.",
  "Hanf allein macht nicht glücklich, man muss ihn schon rauchen.",
  "Roll it up, Light it up, Smoke it up!",
  "Lieber ein Joint als kein Joint.",
  "Am Morgen ein Joint und der Tag ist dein Freund.",
  "Can-nabis denn Sünde sein?",
  "Don't panic, it's organic.",
  "Einatmen, halten, ausatmen und grinsen.",
  "Entweder du liebst Gras oder du liegst falsch.",
];

const getRandomSaying = () => {
  return sayings[Math.floor(Math.random() * sayings.length)];
};

export default getRandomSaying;
