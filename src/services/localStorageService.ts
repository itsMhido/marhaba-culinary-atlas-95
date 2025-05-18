import { User, Recipe, RecipeVariant, Region, AuthState } from '../types';

// Clés pour LocalStorage
const STORAGE_KEYS = {
  USERS: 'moroccan-cuisine-app_users',
  RECIPES: 'moroccan-cuisine-app_recipes',
  RECIPE_VARIANTS: 'moroccan-cuisine-app_recipe-variants',
  REGIONS: 'moroccan-cuisine-app_regions',
  AUTH: 'moroccan-cuisine-app_auth',
};

// Service pour manipuler le LocalStorage avec typage
export const localStorageService = {
  // Utilisateurs
  getUsers: (): User[] => {
    const users = localStorage.getItem(STORAGE_KEYS.USERS);
    return users ? JSON.parse(users) : [];
  },
  
  setUsers: (users: User[]): void => {
    localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(users));
  },
  
  addUser: (user: User): void => {
    const users = localStorageService.getUsers();
    localStorageService.setUsers([...users, user]);
  },
  
  // Recettes
  getRecipes: (): Recipe[] => {
    const recipes = localStorage.getItem(STORAGE_KEYS.RECIPES);
    return recipes ? JSON.parse(recipes) : [];
  },
  
  setRecipes: (recipes: Recipe[]): void => {
    localStorage.setItem(STORAGE_KEYS.RECIPES, JSON.stringify(recipes));
  },
  
  addRecipe: (recipe: Recipe): void => {
    const recipes = localStorageService.getRecipes();
    localStorageService.setRecipes([...recipes, recipe]);
  },
  
  updateRecipe: (updatedRecipe: Recipe): void => {
    const recipes = localStorageService.getRecipes();
    const updatedRecipes = recipes.map((recipe) =>
      recipe.id === updatedRecipe.id ? updatedRecipe : recipe
    );
    localStorageService.setRecipes(updatedRecipes);
  },
  
  deleteRecipe: (recipeId: string): void => {
    const recipes = localStorageService.getRecipes();
    const updatedRecipes = recipes.filter((recipe) => recipe.id !== recipeId);
    localStorageService.setRecipes(updatedRecipes);
    
    // Delete variants for this recipe
    const variants = localStorageService.getRecipeVariants();
    const updatedVariants = variants.filter((variant) => variant.recipeId !== recipeId);
    localStorageService.setRecipeVariants(updatedVariants);
  },
  
  // Variantes de recettes
  getRecipeVariants: (): RecipeVariant[] => {
    const variants = localStorage.getItem(STORAGE_KEYS.RECIPE_VARIANTS);
    return variants ? JSON.parse(variants) : [];
  },
  
  setRecipeVariants: (variants: RecipeVariant[]): void => {
    localStorage.setItem(STORAGE_KEYS.RECIPE_VARIANTS, JSON.stringify(variants));
  },
  
  addRecipeVariant: (variant: RecipeVariant): void => {
    const variants = localStorageService.getRecipeVariants();
    localStorageService.setRecipeVariants([...variants, variant]);
  },
  
  updateRecipeVariant: (updatedVariant: RecipeVariant): void => {
    const variants = localStorageService.getRecipeVariants();
    const updatedVariants = variants.map((variant) =>
      variant.id === updatedVariant.id ? updatedVariant : variant
    );
    localStorageService.setRecipeVariants(updatedVariants);
  },
  
  deleteRecipeVariant: (variantId: string): void => {
    const variants = localStorageService.getRecipeVariants();
    const updatedVariants = variants.filter((variant) => variant.id !== variantId);
    localStorageService.setRecipeVariants(updatedVariants);
  },
  
  // Régions
  getRegions: (): Region[] => {
    const regions = localStorage.getItem(STORAGE_KEYS.REGIONS);
    return regions ? JSON.parse(regions) : [];
  },
  
  setRegions: (regions: Region[]): void => {
    localStorage.setItem(STORAGE_KEYS.REGIONS, JSON.stringify(regions));
  },
  
  // Authentification
  getAuth: (): AuthState => {
    const auth = localStorage.getItem(STORAGE_KEYS.AUTH);
    return auth ? JSON.parse(auth) : { user: null, isAuthenticated: false };
  },
  
  setAuth: (authState: AuthState): void => {
    localStorage.setItem(STORAGE_KEYS.AUTH, JSON.stringify(authState));
  },
  
  // Initialisation avec des données de test
  initializeAppData: (): void => {
    // Ne pas réinitialiser si les données existent déjà
    if (localStorage.getItem(STORAGE_KEYS.REGIONS)) return;
    
    // Utilisateurs initiaux
    const initialUsers: User[] = [
      {
        id: '1',
        username: 'admin',
        password: 'admin123', // En production, il faudrait hasher les mots de passe
        role: 'admin',
      },
      {
        id: '2',
        username: 'user',
        password: 'user123',
        role: 'user',
      },
    ];
    localStorageService.setUsers(initialUsers);
    
    // Régions du Maroc
    const initialRegions: Region[] = [
      {
        id: '1',
        name: 'Tanger-Tétouan-Al Hoceïma',
        nameAr: 'طنجة - تطوان - الحسيمة',
        description: 'Région du nord du Maroc, connue pour sa cuisine méditerranéenne et ses saveurs de poisson.',
        coordinates: [35.7595, -5.8340],
      },
      {
        id: '2',
        name: 'L\'Oriental',
        nameAr: 'الشرق',
        description: 'Région à l\'est du pays, avec une cuisine influencée par l\'Algérie voisine.',
        coordinates: [34.6830, -1.9126],
      },
      {
        id: '3',
        name: 'Fès-Meknès',
        nameAr: 'فاس - مكناس',
        description: 'Cœur historique de la cuisine marocaine, Fès est considérée comme la capitale culinaire du Maroc.',
        coordinates: [34.0372, -5.0004],
      },
      {
        id: '4',
        name: 'Rabat-Salé-Kénitra',
        nameAr: 'الرباط - سلا - القنيطرة',
        description: 'La région de la capitale, mêlant traditions culinaires royales et influences côtières.',
        coordinates: [34.0209, -6.8416],
      },
      {
        id: '5',
        name: 'Béni Mellal-Khénifra',
        nameAr: 'بني ملال - خنيفرة',
        description: 'Région du Moyen Atlas, célèbre pour ses plats berbères.',
        coordinates: [32.3366, -6.3497],
      },
      {
        id: '6',
        name: 'Casablanca-Settat',
        nameAr: 'الدار البيضاء - سطات',
        description: 'Région économique principale, avec une cuisine moderne et diversifiée.',
        coordinates: [33.5731, -7.5898],
      },
      {
        id: '7',
        name: 'Marrakech-Safi',
        nameAr: 'مراكش - آسفي',
        description: 'Célèbre pour le tajine et les plats aux épices vibrantes.',
        coordinates: [31.6295, -7.9811],
      },
      {
        id: '8',
        name: 'Drâa-Tafilalet',
        nameAr: 'درعة - تافيلالت',
        description: 'Région des oasis, connue pour ses dattes et sa cuisine berbère du sud.',
        coordinates: [31.9302, -4.4283],
      },
      {
        id: '9',
        name: 'Souss-Massa',
        nameAr: 'سوس - ماسة',
        description: 'Région d\'Agadir, célèbre pour ses fruits et son huile d\'argan.',
        coordinates: [30.4278, -9.5981],
      },
      {
        id: '10',
        name: 'Guelmim-Oued Noun',
        nameAr: 'كلميم - واد نون',
        description: 'Porte du Sahara, mêlant influences du nord et du désert.',
        coordinates: [28.9870, -10.0574],
      },
      {
        id: '11',
        name: 'Laâyoune-Sakia El Hamra',
        nameAr: 'العيون - الساقية الحمراء',
        description: 'Cuisine saharienne avec forte influence de la culture hassanie.',
        coordinates: [27.1536, -13.2035],
      },
      {
        id: '12',
        name: 'Dakhla-Oued Ed-Dahab',
        nameAr: 'الداخلة - وادي الذهب',
        description: 'Région la plus au sud, connue pour ses fruits de mer et ses influences sahariennes.',
        coordinates: [23.7141, -15.9369],
      },
    ];
    localStorageService.setRegions(initialRegions);
    
    // Recettes initiales
    const initialRecipes: Recipe[] = [
      {
        id: '1',
        name: 'Tajine de poulet aux olives et citrons confits',
        nameAr: 'طاجين الدجاج بالزيتون والليمون المخلل',
        regionId: '7', // Marrakech-Safi
        description: 'Un classique de la cuisine marocaine, ce tajine combine la tendreté du poulet avec l\'acidité des citrons confits et la saveur des olives.',
        ingredients: [
          '1 poulet coupé en morceaux',
          '2 oignons émincés',
          '3 gousses d\'ail écrasées',
          '2 citrons confits coupés en quartiers',
          '200g d\'olives vertes dénoyautées',
          '1 cuillère à café de gingembre moulu',
          '1 cuillère à café de curcuma',
          '1 cuillère à café de paprika',
          '1/2 cuillère à café de safran',
          '1 bouquet de persil et coriandre',
          '3 cuillères à soupe d\'huile d\'olive',
          'Sel et poivre',
        ],
        steps: [
          'Dans un tajine ou une cocotte, faire chauffer l\'huile d\'olive.',
          'Faire dorer les morceaux de poulet de tous les côtés.',
          'Ajouter les oignons émincés et l\'ail, faire revenir jusqu\'à ce qu\'ils soient translucides.',
          'Ajouter toutes les épices, sel et poivre, bien mélanger.',
          'Verser de l\'eau à hauteur, couvrir et laisser mijoter à feu doux pendant 45 minutes.',
          'Ajouter les citrons confits et les olives, poursuivre la cuisson 15 minutes.',
          'Parsemer de persil et coriandre ciselés avant de servir.',
        ],
        imageUrl: '/tajine-poulet.jpg',
        category: 'plat',
        preparationTime: 20,
        cookingTime: 60,
        servings: 4,
        difficulty: 'moyen',
        createdAt: 1651234567890,
        createdBy: '1',
      },
      {
        id: '2',
        name: 'Couscous aux sept légumes',
        nameAr: 'كسكس بسبع خضروات',
        regionId: '6', // Casablanca-Settat
        description: 'Le couscous, plat emblématique du vendredi, est préparé avec une variété de légumes de saison et servi avec de la viande ou du poulet.',
        ingredients: [
          '500g de semoule de couscous moyenne',
          '500g d\'épaule d\'agneau coupée en morceaux',
          '2 oignons',
          '3 tomates',
          '3 carottes',
          '2 navets',
          '2 courgettes',
          '1 branche de céleri',
          '200g de potiron',
          '250g de pois chiches trempés la veille',
          '1 cuillère à café de ras el hanout',
          '1 cuillère à café de curcuma',
          '1 pincée de safran',
          'Huile d\'olive',
          'Sel et poivre',
          'Bouquet garni (persil et coriandre)',
        ],
        steps: [
          'Préparer la semoule selon les instructions du paquet, en l\'humidifiant et en la travaillant plusieurs fois.',
          'Dans une couscoussière, faire revenir la viande avec les oignons hachés et les épices.',
          'Ajouter les pois chiches et couvrir d\'eau, laisser cuire 1 heure.',
          'Ajouter les légumes coupés en gros morceaux et cuire encore 30 minutes.',
          'Pendant ce temps, cuire la semoule à la vapeur 3 fois en la travaillant entre chaque cuisson.',
          'Servir la semoule arrosée d\'un peu de bouillon, avec les légumes et la viande disposés par-dessus.',
        ],
        imageUrl: '/couscous.jpg',
        category: 'plat',
        preparationTime: 30,
        cookingTime: 120,
        servings: 6,
        difficulty: 'difficile',
        createdAt: 1651234567890,
        createdBy: '1',
      },
      {
        id: '3',
        name: 'Pastilla au Poulet et Amandes',
        nameAr: 'بسطيلة بالدجاج واللوز',
        regionId: '3', // Fès-Meknès
        description: 'La pastilla est un plat festif d\'origine andalouse, mêlant sucré et salé. Cette version au poulet et amandes est typique de Fès.',
        ingredients: [
          '500g de blanc de poulet',
          '1 oignon haché',
          '3 œufs',
          '100g d\'amandes effilées',
          '1 bouquet de persil et coriandre',
          '1 cuillère à café de gingembre moulu',
          '1 cuillère à café de cannelle',
          '1 pincée de safran',
          '8 feuilles de brick ou pâte filo',
          '50g de beurre fondu',
          '2 cuillères à soupe de sucre glace',
          '1 cuillère à café de cannelle pour saupoudrer',
          'Sel et poivre',
        ],
        steps: [
          'Faire cuire le poulet avec l\'oignon et les épices dans un peu d\'eau pendant 30 minutes.',
          'Effilocher le poulet et réserver le bouillon.',
          'Faire torréfier les amandes à sec dans une poêle puis réserver.',
          'Dans le bouillon, faire cuire les œufs en remuant pour obtenir une texture brouillée.',
          'Mélanger le poulet effiloché, les œufs et les herbes hachées.',
          'Beurrer un moule rond et disposer les feuilles de brick en alternant.',
          'Déposer la farce au poulet, replier les bords des feuilles.',
          'Badigeonner de beurre fondu et enfourner à 180°C pendant 20 minutes.',
          'Saupoudrer de sucre glace et cannelle avant de servir.',
        ],
        imageUrl: '/pastilla.jpg',
        category: 'entrée',
        preparationTime: 40,
        cookingTime: 50,
        servings: 6,
        difficulty: 'difficile',
        createdAt: 1651234567890,
        createdBy: '1',
      },
      // Nouvelles recettes ajoutées
      {
        id: '4',
        name: 'Rfissa au Poulet',
        nameAr: 'الرفيسة بالدجاج',
        regionId: '4', // Rabat-Salé-Kénitra
        description: 'La Rfissa est un plat traditionnel marocain à base de msemen (crêpes feuilletées) émietté, de poulet et de lentilles, parfumé aux épices et à la fenugrec.',
        ingredients: [
          '1 poulet entier coupé en morceaux',
          '500g de msemen (ou trid/feuilles de brick)',
          '250g de lentilles',
          '2 oignons',
          '3 gousses d\'ail',
          '1 cuillère à soupe de graines de fenugrec',
          '1 cuillère à soupe de ras el hanout',
          '1 cuillère à café de gingembre moulu',
          '1 bouquet de coriandre',
          '2 bâtons de cannelle',
          '1 pincée de safran',
          'Huile d\'olive',
          'Sel et poivre',
        ],
        steps: [
          'Faire tremper les graines de fenugrec dans l\'eau tiède pendant 30 minutes.',
          'Dans une marmite, faire dorer le poulet avec les oignons émincés et l\'ail écrasé.',
          'Ajouter les épices, sel, poivre et le fenugrec égoutté.',
          'Couvrir d\'eau et laisser mijoter 45 minutes.',
          'Dans une autre casserole, cuire les lentilles jusqu\'à ce qu\'elles soient tendres.',
          'Émietter le msemen (ou le trid) dans un grand plat.',
          'Verser le bouillon parfumé sur le msemen émietté.',
          'Disposer le poulet et les lentilles sur le dessus.',
          'Garnir de coriandre ciselée avant de servir.',
        ],
        imageUrl: '/placeholder-food.jpg',
        category: 'plat',
        preparationTime: 30,
        cookingTime: 90,
        servings: 6,
        difficulty: 'moyen',
        createdAt: 1651234567890,
        createdBy: '1',
      },
      {
        id: '5',
        name: 'Harira',
        nameAr: 'الحريرة',
        regionId: '3', // Fès-Meknès
        description: 'Soupe traditionnelle marocaine servie notamment pendant le mois de Ramadan, riche en légumineuses, viande et aromates.',
        ingredients: [
          '200g de viande d\'agneau coupée en dés',
          '100g de pois chiches trempés la veille',
          '100g de lentilles',
          '2 oignons émincés',
          '3 branches de céleri hachées',
          '1 bouquet de coriandre',
          '1 bouquet de persil',
          '3 tomates pelées et concassées',
          '2 cuillères à soupe de concentré de tomate',
          '100g de vermicelles fins',
          '50g de farine',
          '1 cuillère à café de gingembre moulu',
          '1 cuillère à café de curcuma',
          '1 cuillère à café de cannelle',
          '1 citron',
          'Sel et poivre',
        ],
        steps: [
          'Faire revenir la viande avec les oignons dans un peu d\'huile.',
          'Ajouter les épices, les herbes hachées, le céleri et les tomates.',
          'Incorporer les pois chiches et les lentilles, couvrir d\'eau.',
          'Laisser mijoter 1h30 à couvert, en remuant régulièrement.',
          'Diluer la farine dans un peu d\'eau et l\'ajouter doucement au bouillon tout en fouettant.',
          'Ajouter les vermicelles et poursuivre la cuisson 10 minutes.',
          'Servir chaud avec des quartiers de citron.',
        ],
        imageUrl: '/placeholder-food.jpg',
        category: 'entrée',
        preparationTime: 25,
        cookingTime: 120,
        servings: 8,
        difficulty: 'moyen',
        createdAt: 1651234583890,
        createdBy: '1',
      },
      {
        id: '6',
        name: 'Tanjia Marrakchia',
        nameAr: 'الطنجية المراكشية',
        regionId: '7', // Marrakech-Safi
        description: 'Spécialité de Marrakech, la tanjia est un plat à base de viande d\'agneau cuite lentement avec des épices dans une jarre en terre cuite.',
        ingredients: [
          '1kg de jarret d\'agneau coupé en morceaux',
          '8 gousses d\'ail',
          '2 cuillères à café de cumin',
          '2 cuillères à café de paprika',
          '1 cuillère à café de gingembre moulu',
          '1 pincée de safran',
          'Le jus d\'un citron confit',
          '2 cuillères à soupe d\'huile d\'olive',
          'Sel et poivre',
        ],
        steps: [
          'Mélanger tous les ingrédients dans un grand bol.',
          'Transférer dans une terrine en terre cuite (tanjia) ou une cocotte.',
          'Fermer hermétiquement avec du papier sulfurisé et une ficelle.',
          'Cuire au four à 160°C pendant 4 à 5 heures, jusqu\'à ce que la viande se défasse facilement.',
          'Servir directement dans le récipient de cuisson, accompagné de pain marocain.',
        ],
        imageUrl: '/placeholder-food.jpg',
        category: 'plat',
        preparationTime: 15,
        cookingTime: 300,
        servings: 4,
        difficulty: 'facile',
        createdAt: 1651234683890,
        createdBy: '1',
      },
      {
        id: '7',
        name: 'Cornes de Gazelle',
        nameAr: 'كعب الغزال',
        regionId: '9', // Souss-Massa
        description: 'Pâtisseries marocaines en forme de croissants, fourrées à la pâte d\'amande parfumée à la fleur d\'oranger et cannelle.',
        ingredients: [
          '500g de farine',
          '100g de beurre fondu',
          '1 œuf',
          '100ml d\'eau de fleur d\'oranger',
          '50ml d\'eau tiède',
          '1 pincée de sel',
          'Pour la farce:',
          '500g d\'amandes mondées et moulues',
          '200g de sucre glace',
          '2 cuillères à soupe d\'eau de fleur d\'oranger',
          '1 cuillère à café de cannelle',
          'Eau de rose pour la finition',
          'Sucre glace pour saupoudrer',
        ],
        steps: [
          'Préparer la pâte en mélangeant la farine, le beurre fondu, l\'œuf, l\'eau de fleur d\'oranger, l\'eau tiède et le sel.',
          'Pétrir jusqu\'à obtenir une pâte homogène et laisser reposer 30 minutes.',
          'Préparer la farce en mélangeant les amandes moulues, le sucre glace, l\'eau de fleur d\'oranger et la cannelle.',
          'Étaler la pâte finement et découper des cercles d\'environ 10 cm de diamètre.',
          'Déposer une cuillère de farce sur chaque cercle et replier pour former un croissant.',
          'Pincer les extrémités et incurver légèrement pour donner la forme caractéristique.',
          'Cuire au four à 180°C pendant 15 à 20 minutes.',
          'À la sortie du four, vaporiser d\'eau de rose et saupoudrer de sucre glace.',
        ],
        imageUrl: '/placeholder-food.jpg',
        category: 'dessert',
        preparationTime: 60,
        cookingTime: 20,
        servings: 30,
        difficulty: 'difficile',
        createdAt: 1651234783890,
        createdBy: '1',
      },
      {
        id: '8',
        name: 'Makouda',
        nameAr: 'المعقودة',
        regionId: '1', // Tanger-Tétouan-Al Hoceïma
        description: 'Croquettes de pommes de terre épicées, croustillantes à l\'extérieur et moelleuses à l\'intérieur. Un street food populaire du nord du Maroc.',
        ingredients: [
          '1kg de pommes de terre',
          '3 gousses d\'ail écrasées',
          '1 bouquet de persil haché',
          '1 cuillère à café de cumin',
          '1 cuillère à café de paprika',
          '1/2 cuillère à café de curcuma',
          '2 œufs battus',
          'Farine pour l\'enrobage',
          'Huile pour friture',
          'Sel et poivre',
        ],
        steps: [
          'Faire cuire les pommes de terre en robe des champs, puis les peler et les écraser.',
          'Ajouter l\'ail écrasé, le persil haché et les épices, bien mélanger.',
          'Assaisonner avec le sel et le poivre, incorporer les œufs battus.',
          'Former des galettes ou des boulettes avec la préparation.',
          'Passer légèrement dans la farine et faire frire dans l\'huile chaude jusqu\'à ce qu\'elles soient dorées.',
          'Égoutter sur du papier absorbant.',
          'Servir chaud avec une sauce harissa ou une sauce tomate épicée.',
        ],
        imageUrl: '/placeholder-food.jpg',
        category: 'entrée',
        preparationTime: 30,
        cookingTime: 15,
        servings: 6,
        difficulty: 'facile',
        createdAt: 1651234883890,
        createdBy: '1',
      },
      {
        id: '9',
        name: 'M\'hancha aux Amandes',
        nameAr: 'المحنشة باللوز',
        regionId: '3', // Fès-Meknès
        description: 'Pâtisserie marocaine en forme de serpent enroulé, garnie d\'une délicieuse farce aux amandes et parfumée à l\'eau de fleur d\'oranger.',
        ingredients: [
          '250g de pâte filo ou feuilles de brick',
          '500g d\'amandes moulues',
          '200g de sucre en poudre',
          '100g de beurre fondu',
          '2 cuillères à soupe d\'eau de fleur d\'oranger',
          '1 cuillère à café de cannelle',
          '1 pincée de sel',
          'Miel pour le sirop',
          'Pistaches concassées pour la décoration',
        ],
        steps: [
          'Préparer la farce en mélangeant les amandes moulues, le sucre, la cannelle, l\'eau de fleur d\'oranger et une pincée de sel.',
          'Étaler une feuille de pâte filo et la badigeonner de beurre fondu.',
          'Disposer une bande de farce aux amandes le long du bord inférieur.',
          'Rouler la pâte pour former un boudin.',
          'Enrouler le boudin en spirale pour former la "m\'hancha" (serpent).',
          'Badigeonner de beurre fondu et enfourner à 180°C pendant 20-25 minutes.',
          'Arroser de miel chaud et décorer de pistaches concassées avant de servir.',
        ],
        imageUrl: '/placeholder-food.jpg',
        category: 'dessert',
        preparationTime: 40,
        cookingTime: 25,
        servings: 10,
        difficulty: 'moyen',
        createdAt: 1651234983890,
        createdBy: '1',
      },
      {
        id: '10',
        name: 'Mrouzia',
        nameAr: 'المروزية',
        regionId: '7', // Marrakech-Safi
        description: 'Tajine sucré-salé d\'agneau aux raisins secs, amandes et miel, traditionnellement préparé pour l\'Aïd al-Adha.',
        ingredients: [
          '1kg d\'épaule d\'agneau coupée en morceaux',
          '2 oignons émincés',
          '200g de raisins secs',
          '150g d\'amandes mondées',
          '3 cuillères à soupe de miel',
          '1 cuillère à café de cannelle',
          '1 cuillère à café de gingembre moulu',
          '1/2 cuillère à café de ras el hanout',
          '1 pincée de safran',
          '2 bâtons de cannelle',
          '3 cuillères à soupe d\'huile d\'olive',
          'Sel et poivre',
        ],
        steps: [
          'Faire tremper les raisins secs dans de l\'eau tiède pendant 30 minutes.',
          'Dans un tajine ou une cocotte, faire dorer la viande dans l\'huile avec les oignons.',
          'Ajouter les épices, sel et poivre, bien mélanger.',
          'Couvrir d\'eau et laisser mijoter 1h30 à couvert.',
          'Faire torréfier les amandes dans une poêle sans matière grasse.',
          'Quand la viande est tendre, ajouter le miel, les raisins égouttés et les amandes.',
          'Poursuivre la cuisson 15 minutes à découvert pour que la sauce épaississe.',
          'Servir chaud, accompagné de pain marocain.',
        ],
        imageUrl: '/placeholder-food.jpg',
        category: 'plat',
        preparationTime: 30,
        cookingTime: 120,
        servings: 6,
        difficulty: 'moyen',
        createdAt: 1651235083890,
        createdBy: '1',
      },
    ];
    localStorageService.setRecipes(initialRecipes);
    
    // Variantes de recettes initiales
    const initialVariants: RecipeVariant[] = [
      {
        id: '1',
        recipeId: '1',
        name: 'Tajine de poulet aux abricots',
        description: 'Une version sucrée-salée du tajine de poulet, avec des abricots secs à la place des citrons confits.',
        ingredients: [
          '1 poulet coupé en morceaux',
          '2 oignons émincés',
          '3 gousses d\'ail écrasées',
          '200g d\'abricots secs',
          '100g de pruneaux',
          '50g d\'amandes effilées',
          '1 cuillère à café de cannelle',
          '1 cuillère à café de gingembre moulu',
          '1 cuillère à café de miel',
          '3 cuillères à soupe d\'huile d\'olive',
          'Sel et poivre',
        ],
        steps: [
          'Dans un tajine, faire dorer le poulet dans l\'huile d\'olive.',
          'Ajouter les oignons et l\'ail, faire revenir.',
          'Incorporer les épices, sel et poivre.',
          'Mouiller avec de l\'eau et laisser mijoter 30 minutes.',
          'Ajouter les fruits secs et le miel, poursuivre la cuisson 15 minutes.',
          'Parsemer d\'amandes grillées avant de servir.',
        ],
        imageUrl: '/tajine-abricots.jpg',
        createdAt: 1651234567890,
        createdBy: '2',
        votes: 5,
        voterIds: ['1', '2'],
      },
    ];
    localStorageService.setRecipeVariants(initialVariants);
  },
};
