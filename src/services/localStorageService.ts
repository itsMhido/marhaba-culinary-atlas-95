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
      // 7 nouvelles recettes ajoutées
      {
        id: '11',
        name: 'Chebakia',
        nameAr: 'الشباكية',
        regionId: '3', // Fès-Meknès
        description: 'Pâtisserie marocaine traditionnelle en forme de fleur ou de rose, frite et trempée dans du miel parfumé. Très populaire pendant le Ramadan.',
        ingredients: [
          '500g de farine',
          '100g de beurre fondu',
          '1 pincée de sel',
          '2 cuillères à café de cannelle moulue',
          '1 cuillère à café de graines de sésame moulues',
          '1 cuillère à café d\'anis moulu',
          '1 cuillère à café de graines de fenouil moulues',
          '1 pincée de safran (facultatif)',
          'Huile pour friture',
          'Pour le sirop:',
          '500g de miel',
          '2 cuillères à soupe d\'eau de fleur d\'oranger',
          '1 cuillère à soupe de graines de sésame grillées',
        ],
        steps: [
          'Mélanger la farine avec le beurre fondu, le sel et les épices jusqu\'à obtenir une consistance sablée.',
          'Ajouter progressivement de l\'eau tiède pour former une pâte ferme et lisse.',
          'Laisser reposer la pâte pendant 30 minutes couverte d\'un linge.',
          'Diviser la pâte en petites boules puis les étaler finement au rouleau.',
          'Découper des rectangles de pâte, faire 4 incisions parallèles au centre, puis plier et façonner en forme de rose.',
          'Faire frire dans l\'huile chaude jusqu\'à ce qu\'ils soient dorés des deux côtés.',
          'Préparer le sirop en chauffant le miel avec l\'eau de fleur d\'oranger.',
          'Tremper les chebakias dans le sirop de miel chaud pendant quelques minutes.',
          'Les égoutter et les saupoudrer de graines de sésame grillées.',
        ],
        imageUrl: '/placeholder-food.jpg',
        category: 'dessert',
        preparationTime: 60,
        cookingTime: 30,
        servings: 20,
        difficulty: 'difficile',
        createdAt: 1661234567890,
        createdBy: '1',
      },
      {
        id: '12',
        name: 'Bissara',
        nameAr: 'البصارة',
        regionId: '1', // Tanger-Tétouan-Al Hoceïma
        description: 'Soupe traditionnelle à base de fèves sèches ou de pois cassés, particulièrement populaire dans le nord du Maroc pendant l\'hiver.',
        ingredients: [
          '500g de fèves sèches pelées (ou pois cassés)',
          '1 oignon émincé',
          '4 gousses d\'ail écrasées',
          '1 cuillère à soupe de cumin moulu',
          '1 cuillère à café de paprika',
          '1/2 cuillère à café de piment rouge (facultatif)',
          '4 cuillères à soupe d\'huile d\'olive',
          'Le jus d\'un citron',
          'Sel et poivre',
          'Persil ou coriandre hachés pour la garniture',
        ],
        steps: [
          'Rincer les fèves sèches et les faire tremper dans l\'eau froide pendant une nuit.',
          'Égoutter et placer les fèves dans une grande marmite avec l\'oignon émincé.',
          'Couvrir généreusement d\'eau et porter à ébullition.',
          'Réduire le feu et laisser mijoter pendant 1h30 à 2h jusqu\'à ce que les fèves soient très tendres.',
          'Mixer la soupe à l\'aide d\'un mixeur plongeant jusqu\'à obtenir une texture lisse.',
          'Ajouter l\'ail écrasé, le cumin, le paprika, le sel et le poivre.',
          'Poursuivre la cuisson à feu doux pendant 10 minutes en remuant régulièrement.',
          'Avant de servir, arroser chaque bol d\'huile d\'olive, de jus de citron et saupoudrer de cumin et de paprika.',
          'Garnir de persil ou de coriandre hachés.',
        ],
        imageUrl: '/placeholder-food.jpg',
        category: 'entrée',
        preparationTime: 20,
        cookingTime: 120,
        servings: 6,
        difficulty: 'facile',
        createdAt: 1671234567890,
        createdBy: '1',
      },
      {
        id: '13',
        name: 'Seffa Medfouna',
        nameAr: 'السفة المدفونة',
        regionId: '3', // Fès-Meknès
        description: 'Plat festif de couscous sucré aux amandes et à la cannelle, généralement servi avec de la viande cachée au centre, d\'où son nom "medfouna" (enterrée).',
        ingredients: [
          '500g de couscous fin',
          '500g d\'épaule d\'agneau',
          '2 oignons',
          '3 bâtons de cannelle',
          '1 cuillère à café de gingembre moulu',
          '1 pincée de safran',
          '150g d\'amandes mondées',
          '100g de raisins secs',
          '80g de beurre',
          '50g de sucre en poudre',
          '2 cuillères à soupe de cannelle moulue',
          'Sel et poivre',
        ],
        steps: [
          'Faire cuire la viande avec les oignons, le gingembre, le safran, les bâtons de cannelle, sel et poivre dans une marmite pendant environ 1h30.',
          'Pendant ce temps, préparer le couscous selon les instructions du paquet, en le travaillant plusieurs fois.',
          'Faire griller les amandes mondées au four et les concasser grossièrement.',
          'Faire tremper les raisins secs dans de l\'eau tiède pendant 30 minutes.',
          'Une fois le couscous cuit, le mélanger avec le beurre fondu pour que les grains se séparent bien.',
          'Dans un grand plat, disposer une couche de couscous, saupoudrer de sucre et de cannelle.',
          'Placer la viande au centre et la recouvrir du reste de couscous.',
          'Saupoudrer à nouveau de sucre, de cannelle, et parsemer d\'amandes grillées et de raisins secs.',
          'Servir chaud, traditionnellement sans couverts, en mangeant avec trois doigts de la main droite.',
        ],
        imageUrl: '/placeholder-food.jpg',
        category: 'plat',
        preparationTime: 40,
        cookingTime: 120,
        servings: 6,
        difficulty: 'moyen',
        createdAt: 1681234567890,
        createdBy: '1',
      },
      {
        id: '14',
        name: 'Zaalouk',
        nameAr: 'الزعلوك',
        regionId: '7', // Marrakech-Safi
        description: 'Salade cuite d\'aubergines et de tomates épicée, servie comme entrée ou accompagnement de grillades.',
        ingredients: [
          '2 grosses aubergines',
          '4 tomates mûres',
          '3 gousses d\'ail écrasées',
          '1 cuillère à café de cumin moulu',
          '1 cuillère à café de paprika',
          '1/2 cuillère à café de piment (facultatif)',
          '1 citron (jus)',
          '3 cuillères à soupe d\'huile d\'olive',
          '1 bouquet de persil et coriandre hachés',
          'Sel et poivre',
        ],
        steps: [
          'Piquer les aubergines avec une fourchette et les faire cuire au four à 200°C pendant 30 minutes jusqu\'à ce qu\'elles soient tendres.',
          'Peler les aubergines et les écraser grossièrement.',
          'Peler et épépiner les tomates, puis les couper en petits dés.',
          'Dans une poêle, faire chauffer l\'huile d\'olive et y faire revenir l\'ail écrasé.',
          'Ajouter les tomates, le cumin, le paprika, le sel et le poivre.',
          'Laisser mijoter 10 minutes jusqu\'à ce que les tomates rendent leur jus.',
          'Incorporer les aubergines écrasées et poursuivre la cuisson à feu doux pendant 15 minutes.',
          'Écraser légèrement le mélange à la fourchette tout en mélangeant.',
          'Ajouter le jus de citron et les herbes hachées avant de servir.',
          'Servir tiède ou froid avec du pain marocain.',
        ],
        imageUrl: '/placeholder-food.jpg',
        category: 'entrée',
        preparationTime: 15,
        cookingTime: 50,
        servings: 4,
        difficulty: 'facile',
        createdAt: 1691234567890,
        createdBy: '1',
      },
      {
        id: '15',
        name: 'Berkoukes',
        nameAr: 'البركوكس',
        regionId: '5', // Béni Mellal-Khénifra
        description: 'Plat berbère traditionnel à base de gros couscous (berkoukes) servi dans une sauce riche aux légumes et à la viande.',
        ingredients: [
          '400g de berkoukes (gros couscous)',
          '500g d\'agneau coupé en morceaux',
          '1 oignon haché',
          '2 tomates pelées et hachées',
          '3 carottes coupées en rondelles',
          '2 courgettes coupées en dés',
          '1 navet coupé en dés',
          '100g de pois chiches trempés la veille',
          '1 cuillère à soupe de concentré de tomate',
          '1 cuillère à café de cumin',
          '1 cuillère à café de paprika',
          '1/2 cuillère à café de cannelle',
          '1 bouquet garni (persil, coriandre)',
          'Huile d\'olive',
          'Sel et poivre',
        ],
        steps: [
          'Dans une marmite, faire revenir la viande avec l\'oignon dans l\'huile d\'olive.',
          'Ajouter les épices, le concentré de tomate et les tomates hachées.',
          'Mouiller avec 1,5 litre d\'eau et ajouter les pois chiches.',
          'Porter à ébullition puis réduire le feu et laisser mijoter 45 minutes.',
          'Ajouter les légumes coupés et poursuivre la cuisson pendant 20 minutes.',
          'Pendant ce temps, rincer le berkoukes à l\'eau froide.',
          'Ajouter le berkoukes dans la marmite, remuer délicatement.',
          'Couvrir et laisser mijoter à feu doux pendant 20-25 minutes jusqu\'à ce que le berkoukes soit tendre et ait absorbé une partie du bouillon.',
          'Servir chaud, garni d\'herbes fraîches hachées.',
        ],
        imageUrl: '/placeholder-food.jpg',
        category: 'plat',
        preparationTime: 30,
        cookingTime: 120,
        servings: 6,
        difficulty: 'moyen',
        createdAt: 1711234567890,
        createdBy: '1',
      },
      {
        id: '16',
        name: 'Rghaif',
        nameAr: 'الرغايف',
        regionId: '4', // Rabat-Salé-Kénitra
        description: 'Crêpes feuilletées marocaines qui peuvent être servies sucrées ou salées, au petit déjeuner ou comme en-cas.',
        ingredients: [
          '500g de farine',
          '1 cuillère à café de sel',
          '300ml d\'eau tiède',
          '200g de beurre fondu',
          'Pour la garniture sucrée:',
          'Miel',
          'Beurre',
          'Cannelle',
          'Pour la garniture salée:',
          'Fromage frais',
          'Huile d\'olive',
          'Thym',
        ],
        steps: [
          'Mélanger la farine et le sel dans un saladier.',
          'Ajouter progressivement l\'eau tiède tout en mélangeant jusqu\'à obtenir une pâte souple.',
          'Pétrir pendant 10 minutes puis diviser la pâte en boules de taille égale.',
          'Badigeonner chaque boule d\'huile et laisser reposer 30 minutes couvertes d\'un linge.',
          'Étaler chaque boule sur un plan de travail huilé jusqu\'à obtenir une feuille très fine et transparente.',
          'Badigeonner la surface de beurre fondu.',
          'Plier la feuille plusieurs fois pour former un rectangle ou un carré.',
          'Cuire à la poêle avec un peu d\'huile, 2-3 minutes de chaque côté jusqu\'à ce que ce soit doré et croustillant.',
          'Pour une version sucrée, servir avec du miel, du beurre et de la cannelle.',
          'Pour une version salée, garnir de fromage frais, d\'huile d\'olive et de thym.',
        ],
        imageUrl: '/placeholder-food.jpg',
        category: 'entrée',
        preparationTime: 45,
        cookingTime: 15,
        servings: 8,
        difficulty: 'moyen',
        createdAt: 1721234567890,
        createdBy: '1',
      },
      {
        id: '17',
        name: 'Sellou',
        nameAr: 'السلو',
        regionId: '3', // Fès-Meknès
        description: 'Confiserie traditionnelle marocaine à base de farine grillée, d\'amandes et de sésame, souvent préparée pour célébrer les naissances.',
        ingredients: [
          '500g de farine',
          '250g d\'amandes',
          '100g de graines de sésame',
          '250g de beurre fondu',
          '250g de miel',
          '100g de sucre glace',
          '2 cuillères à soupe de cannelle moulue',
          '1 cuillère à café d\'anis moulu',
          '1/2 cuillère à café de mastic (gomme arabique) moulu (facultatif)',
          '1 pincée de sel',
        ],
        steps: [
          'Torréfier la farine dans une poêle à feu moyen en remuant constamment, jusqu\'à ce qu\'elle soit dorée et dégage un parfum de noisette (environ 15-20 minutes).',
          'Laisser refroidir la farine torréfiée.',
          'Torréfier les amandes au four à 180°C pendant 10 minutes, puis les peler et les moudre grossièrement.',
          'Torréfier les graines de sésame dans une poêle sèche puis les moudre.',
          'Mélanger la farine torréfiée, les amandes et les graines de sésame moulues.',
          'Ajouter le sucre glace, la cannelle, l\'anis et le mastic.',
          'Incorporer le beurre fondu et le miel, mélanger jusqu\'à obtenir une pâte homogène.',
          'Façonner le sellou selon votre préférence (en boule ou en poudre).',
          'Conserver dans une boîte hermétique.',
        ],
        imageUrl: '/placeholder-food.jpg',
        category: 'dessert',
        preparationTime: 40,
        cookingTime: 30,
        servings: 20,
        difficulty: 'moyen',
        createdAt: 1731234567890,
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
