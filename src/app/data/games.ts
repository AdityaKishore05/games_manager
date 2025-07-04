export type Game = {
    id: string;
    slug: string;
    title: string;
    category: string;
    description: string;
    image: string;
    rating: number;
    developer: string;
    publisher: string;
    releaseDate: string;
    platforms: string[];
    story: string;
    setting: string;
    combatStyle: string;
    worldDesign: string;
    playerChoiceImpact: boolean;
    multiplayer: boolean;
    expansionContent: string[];
    difficulty: string;
    progressionSystem: string;
  };
  
  export const games: Game[] = [
    {
      id: "1",
      slug: "elden-ring",
      title: "Elden Ring",
      category: "action-rpg",
      description:
        "Elden Ring is an open-world action RPG developed by FromSoftware and published by Bandai Namco Entertainment. Known for its intricate lore and vast, interconnected world, it offers players an unforgettable adventure where every choice matters.",
      image:
        "https://picfiles.alphacoders.com/511/511279.jpg",
      rating: 9.5,
      developer: "FromSoftware",
      publisher: "Bandai Namco Entertainment",
      releaseDate: "February 25, 2022",
      platforms: [
        "PlayStation 4",
        "PlayStation 5",
        "Xbox One",
        "Xbox Series X/S",
        "PC",
      ],
      story:
        "The story centers around the player character, the Tarnished, who is tasked with seeking the shattered Elden Ring and restoring the world to its former glory. Along the journey, players will encounter powerful demigods and discover hidden secrets about the universe.",
      setting:
        "The world of the Lands Between, a desolate yet mystical realm filled with ruins, dangerous creatures, and ancient secrets.",
      combatStyle:
        "The combat is fast-paced and tactical, focused on stamina management, dodging, and precise strikes. It includes both melee and ranged combat.",
      worldDesign:
        "The world is seamlessly connected with vast open fields, intricate dungeons, and varied environments such as rolling hills, haunted forests, and towering castles.",
      playerChoiceImpact: true,
      multiplayer: true,
      expansionContent: ["Shadow of the Erdtree (upcoming)"],
      difficulty:
        "Very challenging, requiring patience and skillful learning of enemy patterns.",
      progressionSystem:
        "Character progression is based on leveling up through the accumulation of Souls, which can be spent on upgrading stats like strength, dexterity, intelligence, etc.",
    },
    {
      id: "2",
      slug: "god-of-war",
      title: "God of War",
      category: "action-adventure",
      description:
        "God of War blends visceral action with an emotional story set in the world of Norse mythology. It redefines the franchise with a more personal journey for Kratos, taking him on an adventure alongside his son, Atreus, through a beautiful yet dangerous world.",
      image:
        "https://picfiles.alphacoders.com/652/652699.png",
      rating: 9.8,
      developer: "Santa Monica Studio",
      publisher: "Sony Interactive Entertainment",
      releaseDate: "April 20, 2018",
      platforms: ["PlayStation 4", "PlayStation 5"],
      story:
        "Kratos, the God of War, embarks on a journey with his son, Atreus, to fulfill the final wish of his deceased wife – to scatter her ashes at the highest peak of the Nine Realms. Along the way, they confront gods and monsters from Norse mythology.",
      setting:
        "The Nine Realms of Norse mythology, each realm unique with different landscapes and threats, ranging from frost-covered lands to fiery depths.",
      combatStyle:
        "Combat focuses on close-range, brutal hand-to-hand and weapon attacks, with Kratos wielding the Leviathan Axe and Blades of Chaos, complemented by Atreus’s bow and magic.",
      worldDesign:
        "The world is interconnected, with several sprawling, open-world environments. It offers exploration, puzzles, and combat encounters in a stunning, detailed setting.",
      playerChoiceImpact: false,
      multiplayer: false,
      expansionContent: ["God of War: Ragnarok"],
      difficulty:
        "Challenging combat with a focus on strategic use of abilities and quick reflexes.",
      progressionSystem:
        "Kratos and Atreus can level up and acquire new abilities. Armor sets, enchantments, and upgrades provide further customization to playstyles.",
    },
    {
      id: "3",
      slug: "the-witcher-3",
      title: "The Witcher 3: Wild Hunt",
      category: "action-rpg",
      description:
        "The Witcher 3: Wild Hunt is an expansive action RPG set in a dark fantasy world. Players control Geralt of Rivia, a monster hunter searching for his adopted daughter, while navigating a morally complex world filled with political intrigue, magical beasts, and ancient sorcery.",
      image:
        "https://images2.alphacoders.com/137/1377611.jpg",
      rating: 9.7,
      developer: "CD Projekt Red",
      publisher: "CD Projekt",
      releaseDate: "May 19, 2015",
      platforms: [
        "PlayStation 4",
        "Xbox One",
        "PC",
        "Nintendo Switch",
        "PlayStation 5",
        "Xbox Series X/S",
      ],

      story:
        "Geralt of Rivia, a seasoned Witcher, is on a quest to find his adopted daughter, Ciri, who is being pursued by the Wild Hunt, a mysterious and dangerous group. Along the way, Geralt becomes embroiled in a war between Nilfgaard and the Northern Kingdoms, facing moral dilemmas and dangerous foes.",
      setting:
        "The game is set in a richly detailed open world filled with war-torn kingdoms, ancient ruins, dark forests, and villages that tell their own stories. Each area feels alive and immersive.",
      combatStyle:
        "The combat involves a mix of swordplay and magic. Geralt uses his Witcher Signs to cast spells and his swords to defeat both human and monstrous foes. Tactical preparation is key, with signs, potions, and bombs.",
      worldDesign:
        "The world is vast and open, with diverse landscapes ranging from lush forests and swamps to barren deserts and snow-covered mountains. Every location is densely packed with quests and lore.",
      playerChoiceImpact: true,
      multiplayer: false,
      expansionContent: ["Hearts of Stone", "Blood and Wine"],
      difficulty:
        "Challenging, with enemies requiring preparation and adaptation to specific weaknesses, particularly through alchemy and magic.",
      progressionSystem:
        "Geralt's progression revolves around leveling up, acquiring new skills, crafting gear, and making choices that shape the outcome of the story. There is a wide range of combat and non-combat abilities.",
    },
    {
      id: "4",
      slug: "cyberpunk-2077",
      title: "Cyberpunk 2077",
      category: "action-rpg",
      description:
        "Cyberpunk 2077 is a futuristic RPG set in the dystopian world of Night City. Players control V, a mercenary navigating the streets filled with high-tech weaponry, corruption, and cybernetic enhancements. Despite initial criticism, the game offers deep world-building, branching storylines, and a rich narrative.",
      image: "https://images2.alphacoders.com/133/1330770.png",
      rating: 8.5,
      developer: "CD Projekt Red",
      publisher: "CD Projekt",
      releaseDate: "December 10, 2020",
      platforms: [
        "PlayStation 4",
        "PlayStation 5",
        "Xbox One",
        "Xbox Series X/S",
        "PC",
      ],
      story:
        "Set in Night City, players assume the role of V, a customizable protagonist, as they seek a way to remove a dangerous AI known as Johnny Silverhand from their mind. The game explores themes of identity, technology, and power, while offering players the chance to make impactful decisions.",
      setting:
        "Night City, a sprawling cyberpunk metropolis, filled with neon lights, dangerous factions, and towering skyscrapers. The world is dense and alive with various districts, each with its own culture and history.",
      combatStyle:
        "Combat is a mix of gunplay and hacking, with players able to approach fights in a variety of ways. Stealth, explosive gunfire, and cybernetic abilities are all part of the experience.",
      worldDesign:
        "The open world is vertical, densely packed with skyscrapers, alleyways, and dark corners. The setting includes a dynamic weather system and day-night cycle, which significantly impact gameplay and NPC behavior.",
      playerChoiceImpact: true,
      multiplayer: false,
      expansionContent: ["Phantom Liberty"],
      difficulty:
        "Moderate, with varying difficulty depending on the approach to combat and hacking.",
      progressionSystem:
        "Character development focuses on enhancing cyberware, weapons, and combat skills, with branching skill trees based on playstyle preferences.",
    },
      {
        id: "5",
        slug: "ghost-of-tsushima",
        title: "Ghost of Tsushima",
        category: "action-adventure",
        description:
          "Ghost of Tsushima is an action-adventure game that combines stealth, sword combat, and exploration. Set in feudal Japan, it follows the story of Jin Sakai, a samurai who must forsake tradition to protect his homeland from Mongol invaders.",
        image:
          "https://images7.alphacoders.com/135/1355897.jpeg",
        rating: 9.2,
        developer: "Sucker Punch Productions",
        publisher: "Sony Interactive Entertainment",
        releaseDate: "July 17, 2020",
        platforms: ["PlayStation 4", "PlayStation 5"],
        story:
          "Jin Sakai must abandon the strict code of the samurai and become the Ghost, waging an unconventional war to reclaim Tsushima from Mongol control. His journey explores the cost of sacrifice, honor, and rebellion.",
        setting:
          "Set on the island of Tsushima during the first Mongol invasion of Japan. The world is vibrant with cherry blossoms, stormy cliffs, ancient shrines, and war-torn villages.",
        combatStyle:
          "Combat is fluid and cinematic, with deadly katana strikes, parries, and stealth kills. Players can switch between different fighting stances to counter specific enemy types.",
        worldDesign:
          "A richly detailed open world filled with dynamic weather, wildlife, and activities like bamboo strikes, fox shrines, and haiku compositions.",
        playerChoiceImpact: false,
        multiplayer: true,
        expansionContent: ["Iki Island Expansion", "Legends Multiplayer Mode"],
        difficulty:
          "Scalable difficulty with lethal but fair swordplay, encouraging mastery of timing and tactics.",
        progressionSystem:
          "Jin progresses through skill trees, upgrades gear, and unlocks Ghost techniques and stances that alter combat and stealth effectiveness.",
      },
      {
        id: "6",
        slug: "horizon-zero-dawn",
        title: "Horizon Zero Dawn",
        category: "action-rpg",
        description:
          "Horizon Zero Dawn is a post-apocalyptic action RPG set in a world overrun by robotic creatures. As Aloy, a hunter outcast from her tribe, players uncover the mysteries of the ancient world and her own origins.",
        image:
          "https://images8.alphacoders.com/138/1382323.jpg",
        rating: 9.0,
        developer: "Guerrilla Games",
        publisher: "Sony Interactive Entertainment",
        releaseDate: "February 28, 2017",
        platforms: ["PlayStation 4", "PlayStation 5", "PC"],
        story:
          "Aloy sets out on a journey to learn about her past and the collapse of ancient civilization. She must face tribal politics and a rogue AI threatening the world.",
        setting:
          "A lush, reclaimed Earth where robotic wildlife roams forests, deserts, and snowy peaks. Ancient ruins and high-tech facilities lie hidden beneath natural beauty.",
        combatStyle:
          "Combat blends agility, stealth, and strategic use of traps, bows, and elemental ammo to exploit machine weaknesses.",
        worldDesign:
          "Open world is densely packed with side quests, machine sites, hunting grounds, and cultural landmarks.",
        playerChoiceImpact: true,
        multiplayer: false,
        expansionContent: ["The Frozen Wilds"],
        difficulty:
          "Moderate to difficult depending on enemy type and player's strategic approach to combat.",
        progressionSystem:
          "Aloy gains XP, unlocks skill trees, upgrades weapons and armor, and learns machine overrides to turn the tide of battle.",
      },
      {
        id: "7",
        slug: "assassins-creed-valhalla",
        title: "Assassin’s Creed Valhalla",
        category: "action-rpg",
        description:
          "Assassin’s Creed Valhalla is an open-world action RPG where players embody Eivor, a Viking raider seeking glory. Explore England’s kingdoms, forge alliances, and expand your settlement in a historically rich world.",
        image:
          "https://images5.alphacoders.com/134/1343703.jpeg",
        rating: 8.6,
        developer: "Ubisoft Montreal",
        publisher: "Ubisoft",
        releaseDate: "November 10, 2020",
        platforms: [
          "PlayStation 4",
          "PlayStation 5",
          "Xbox One",
          "Xbox Series X/S",
          "PC",
        ],
        story:
          "Eivor leads a Viking clan from Norway to England to find a new home. Amid war, conquest, and myth, Eivor navigates power struggles and the hidden war between the Assassins and Templars.",
        setting:
          "9th-century England and parts of Norway, featuring dynamic weather, rolling hills, ancient ruins, and detailed historical towns.",
        combatStyle:
          "Combat is brutal and diverse with axes, swords, and bows. Players can dual-wield weapons, perform assassinations, or lead large-scale raids.",
        worldDesign:
          "Massive open world with a mix of urban settlements, wilderness, and mythical realms inspired by Norse legends.",
        playerChoiceImpact: true,
        multiplayer: false,
        expansionContent: ["Wrath of the Druids", "Siege of Paris", "Dawn of Ragnarök"],
        difficulty:
          "Scalable, with combat and stealth options rewarding planning and adaptability.",
        progressionSystem:
          "Eivor levels up through experience points, acquires new skills, and customizes gear to suit specific playstyles.",
      },
      {
        id: "8",
        slug: "red-dead-redemption-2",
        title: "Red Dead Redemption 2",
        category: "action-adventure",
        description:
          "Red Dead Redemption 2 is an epic tale of honor, loyalty, and survival in America’s unforgiving heartland. Set before the events of the original game, players follow Arthur Morgan, an outlaw facing the decline of the Wild West.",
        image:
          "https://images6.alphacoders.com/135/1351120.png",
        rating: 9.8,
        developer: "Rockstar Games",
        publisher: "Rockstar Games",
        releaseDate: "October 26, 2018",
        platforms: ["PlayStation 4", "Xbox One", "PC"],

        story:
          "Arthur Morgan, a loyal enforcer of the Van der Linde gang, struggles with his place in a changing world. His choices affect the fates of those around him, as the gang faces increasing pressure from lawmen and internal betrayal.",
        setting:
          "A vast recreation of late 1800s America, with towns, swamps, forests, deserts, and snowy mountains all brought to life with stunning realism.",
        combatStyle:
          "Third-person and first-person gunplay, with manual aiming, cover mechanics, and Dead Eye targeting. Melee combat and stealth are also viable.",
        worldDesign:
          "Highly detailed open world where every action has consequence. NPCs remember your deeds, and the environment evolves over time.",
        playerChoiceImpact: true,
        multiplayer: true,
        expansionContent: ["Red Dead Online"],
        difficulty:
          "Realistic difficulty—combat and survival elements require attention to detail and resource management.",
        progressionSystem:
          "Arthur can upgrade gear, improve camp resources, learn new abilities, and shape the story through moral decisions and exploration.",
      },
    
];
