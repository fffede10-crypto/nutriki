-- ============================================================
-- SEED: ENSALADAS GOURMET - Nutriki Platform
-- ============================================================

-- ============================================================
-- ADEREZOS (10)
-- ============================================================

INSERT INTO aderezos_ensaladas
  (id, nombre, descripcion, tiempo_preparacion, rinde, ingredientes, pasos, tip_chef, ensaladas_que_combina, imagen_url)
VALUES

(1, 'César sin huevo', 'Versión cremosa y clásica del aderezo César, sin huevo crudo', 5, '6 porciones',
  '[
    {"nombre":"mayonesa","cantidad":"3 cdas"},
    {"nombre":"filetes de anchoa","cantidad":"3 unidades"},
    {"nombre":"ajo","cantidad":"1 diente"},
    {"nombre":"jugo de limón","cantidad":"2 cdas"},
    {"nombre":"queso parmesano rallado","cantidad":"3 cdas"},
    {"nombre":"mostaza dijon","cantidad":"1 cdta"},
    {"nombre":"sal y pimienta","cantidad":"a gusto"}
  ]'::jsonb,
  '[
    "Pisar las anchoas con un tenedor hasta formar una pasta.",
    "Mezclar la mayonesa, el ajo rallado y la mostaza en un bol.",
    "Incorporar las anchoas, el jugo de limón y el parmesano.",
    "Condimentar con sal y pimienta. Refrigerar 10 minutos antes de usar."
  ]'::jsonb,
  'Rallar el ajo con microplane para que se integre sin grumos.',
  '[1, 2, 11]'::jsonb,
  'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg'),

(2, 'Tahini con limón', 'Aderezo de inspiración oriental, cremoso y con notas cítricas', 5, '6 porciones',
  '[
    {"nombre":"tahini","cantidad":"3 cdas"},
    {"nombre":"jugo de limón","cantidad":"3 cdas"},
    {"nombre":"ajo","cantidad":"1 diente"},
    {"nombre":"agua fría","cantidad":"3-4 cdas"},
    {"nombre":"comino molido","cantidad":"1/2 cdta"},
    {"nombre":"sal","cantidad":"a gusto"}
  ]'::jsonb,
  '[
    "Mezclar el tahini con el jugo de limón; la mezcla se va a espesar.",
    "Agregar el ajo rallado y el comino.",
    "Incorporar el agua de a poco hasta lograr consistencia de aderezo.",
    "Salar y ajustar acidez al gusto."
  ]'::jsonb,
  'Si el tahini es muy espeso, agregar agua tibia de a cucharada para que emulsione mejor.',
  '[3, 33, 42]'::jsonb,
  'https://images.pexels.com/photos/3735168/pexels-photo-3735168.jpeg'),

(3, 'Miel y mostaza', 'Aderezo dulce-ácido, ideal para ensaladas con pollo o frutas', 5, '8 porciones',
  '[
    {"nombre":"mostaza dijon","cantidad":"2 cdas"},
    {"nombre":"miel","cantidad":"2 cdas"},
    {"nombre":"vinagre de manzana","cantidad":"1 cda"},
    {"nombre":"aceite de oliva","cantidad":"3 cdas"},
    {"nombre":"sal","cantidad":"a gusto"}
  ]'::jsonb,
  '[
    "Mezclar la mostaza y la miel en un bol pequeño.",
    "Agregar el vinagre y batir bien.",
    "Incorporar el aceite en hilo mientras se bate para emulsionar.",
    "Salar a gusto y reservar."
  ]'::jsonb,
  'Usar miel de buena calidad; cambia completamente el sabor del aderezo.',
  '[14, 41, 43, 48]'::jsonb,
  'https://images.pexels.com/photos/406152/pexels-photo-406152.jpeg'),

(4, 'Yogur con eneldo', 'Aderezo fresco y liviano, perfecto para ensaladas de verano', 5, '6 porciones',
  '[
    {"nombre":"yogur natural sin azúcar","cantidad":"1/2 taza"},
    {"nombre":"eneldo fresco picado","cantidad":"2 cdas"},
    {"nombre":"ajo","cantidad":"1/2 diente"},
    {"nombre":"jugo de limón","cantidad":"1 cda"},
    {"nombre":"sal","cantidad":"a gusto"}
  ]'::jsonb,
  '[
    "Mezclar el yogur con el ajo rallado y el eneldo.",
    "Incorporar el jugo de limón.",
    "Condimentar con sal. Refrigerar al menos 15 minutos antes de servir."
  ]'::jsonb,
  'El eneldo seco funciona si no tenés fresco, pero usá la mitad de la cantidad.',
  '[4, 22, 31]'::jsonb,
  'https://images.pexels.com/photos/1640775/pexels-photo-1640775.jpeg'),

(5, 'Vinagreta balsámica', 'Clásico italiano, equilibrado entre ácido y dulce', 5, '8 porciones',
  '[
    {"nombre":"vinagre balsámico","cantidad":"2 cdas"},
    {"nombre":"aceite de oliva extra virgen","cantidad":"4 cdas"},
    {"nombre":"mostaza dijon","cantidad":"1 cdta"},
    {"nombre":"miel","cantidad":"1 cdta"},
    {"nombre":"sal y pimienta negra","cantidad":"a gusto"}
  ]'::jsonb,
  '[
    "Batir el vinagre balsámico con la mostaza y la miel.",
    "Agregar el aceite en hilo batiendo constantemente hasta emulsionar.",
    "Salpimentar a gusto.",
    "Guardar en frasco; agitar antes de usar."
  ]'::jsonb,
  'Un balsámico de calidad hace la diferencia; evitá los muy baratos que son solo vinagre coloreado.',
  '[5, 15, 21, 36]'::jsonb,
  'https://images.pexels.com/photos/1099680/pexels-photo-1099680.jpeg'),

(6, 'Ajonjolí y jengibre', 'Aderezo asiático con profundidad de sabor y notas aromáticas', 8, '6 porciones',
  '[
    {"nombre":"aceite de sésamo tostado","cantidad":"2 cdas"},
    {"nombre":"jengibre fresco rallado","cantidad":"1 cdta"},
    {"nombre":"salsa de soja baja en sodio","cantidad":"2 cdas"},
    {"nombre":"jugo de limón","cantidad":"1 cda"},
    {"nombre":"miel","cantidad":"1 cdta"},
    {"nombre":"ajo","cantidad":"1 diente"}
  ]'::jsonb,
  '[
    "Rallar el jengibre y el ajo.",
    "Mezclar todos los ingredientes en un bol pequeño.",
    "Batir bien hasta integrar. Dejar reposar 5 minutos para que se mezclen los sabores."
  ]'::jsonb,
  'Tostar semillas de sésamo y espolvorear sobre la ensalada para potenciar el aderezo.',
  '[6, 24, 34]'::jsonb,
  'https://images.pexels.com/photos/1640774/pexels-photo-1640774.jpeg'),

(7, 'Blue cheese criollo', 'Aderezo intenso con queso azul y nueces, estilo argentino', 8, '6 porciones',
  '[
    {"nombre":"queso azul","cantidad":"60 g"},
    {"nombre":"crema de leche","cantidad":"3 cdas"},
    {"nombre":"jugo de limón","cantidad":"1 cda"},
    {"nombre":"nueces molidas","cantidad":"2 cdas"},
    {"nombre":"sal y pimienta","cantidad":"a gusto"}
  ]'::jsonb,
  '[
    "Pisar el queso azul con un tenedor en un bol.",
    "Incorporar la crema y mezclar hasta lograr textura cremosa.",
    "Agregar el jugo de limón y las nueces molidas.",
    "Salpimentar con cuidado (el queso ya es salado)."
  ]'::jsonb,
  'Usar queso azul a temperatura ambiente facilita el pisado y logra mejor textura.',
  '[7, 25, 35]'::jsonb,
  'https://images.pexels.com/photos/3893583/pexels-photo-3893583.jpeg'),

(8, 'Hummus aderezo', 'Versión líquida del hummus para usar como aderezo sin lácteos', 5, '8 porciones',
  '[
    {"nombre":"hummus","cantidad":"3 cdas"},
    {"nombre":"jugo de limón","cantidad":"2 cdas"},
    {"nombre":"tahini","cantidad":"1 cda"},
    {"nombre":"agua fría","cantidad":"3-4 cdas"},
    {"nombre":"ajo","cantidad":"1/2 diente"},
    {"nombre":"paprika ahumada","cantidad":"1/4 cdta"}
  ]'::jsonb,
  '[
    "Mezclar el hummus con el tahini y el ajo rallado.",
    "Agregar el jugo de limón y la paprika.",
    "Incorporar el agua de a poco hasta lograr consistencia fluida.",
    "Ajustar sal y acidez. Servir a temperatura ambiente."
  ]'::jsonb,
  'Ideal para quien no tolera lácteos; aporta proteína vegetal al plato.',
  '[8, 32, 38]'::jsonb,
  'https://images.pexels.com/photos/1640776/pexels-photo-1640776.jpeg'),

(9, 'Vinagreta de frambuesa', 'Aderezo frutal y delicado, perfecto para ensaladas con frutos rojos', 5, '6 porciones',
  '[
    {"nombre":"mermelada de frambuesa sin azúcar","cantidad":"2 cdas"},
    {"nombre":"vinagre de vino blanco","cantidad":"2 cdas"},
    {"nombre":"aceite de oliva","cantidad":"4 cdas"},
    {"nombre":"mostaza dijon","cantidad":"1 cdta"},
    {"nombre":"sal","cantidad":"a gusto"}
  ]'::jsonb,
  '[
    "Mezclar la mermelada con el vinagre y la mostaza.",
    "Incorporar el aceite en hilo batiendo para emulsionar.",
    "Salar a gusto. Si queda muy dulce, agregar unas gotas más de vinagre."
  ]'::jsonb,
  'Funciona también con mermelada de frutilla o arándanos.',
  '[9, 41, 45, 50]'::jsonb,
  'https://images.pexels.com/photos/5419336/pexels-photo-5419336.jpeg'),

(10, 'Romesco', 'Salsa española de pimientos asados y almendras, versátil y sabrosa', 15, '8 porciones',
  '[
    {"nombre":"pimientos rojos asados","cantidad":"2 unidades"},
    {"nombre":"almendras tostadas","cantidad":"1/4 taza"},
    {"nombre":"ajo","cantidad":"2 dientes"},
    {"nombre":"pan tostado","cantidad":"1 rebanada"},
    {"nombre":"vinagre de vino tinto","cantidad":"1 cda"},
    {"nombre":"aceite de oliva","cantidad":"3 cdas"},
    {"nombre":"pimentón ahumado","cantidad":"1 cdta"},
    {"nombre":"sal","cantidad":"a gusto"}
  ]'::jsonb,
  '[
    "Asar los pimientos directamente en el fuego o al horno hasta que la piel se queme.",
    "Pelar los pimientos y quitar las semillas.",
    "Procesar todos los ingredientes hasta lograr una salsa ligeramente gruesa.",
    "Ajustar sal y vinagre al gusto."
  ]'::jsonb,
  'No procesar demasiado; la textura levemente gruesa es parte del carácter del romesco.',
  '[10, 26, 37]'::jsonb,
  'https://images.pexels.com/photos/1435895/pexels-photo-1435895.jpeg')

ON CONFLICT (id) DO NOTHING;

-- ============================================================
-- RECETAS ENSALADAS (50)
-- ============================================================

INSERT INTO recetas_ensaladas
  (id, nombre, descripcion, categoria, ocasion, tiempo_preparacion, porciones, nivel_dificultad,
   apta_vianda, sin_gluten, sin_lacteos, vegetariana, vegana, ingrediente_principal,
   aderezo_recomendado_id, ingredientes, pasos, tip_chef, conservacion, imagen_url)
VALUES

-- ============================================================
-- EXPRESS (IDs 1-10) — tiempo 8-15 min
-- ============================================================

(1, 'Ensalada César rápida', 'Clásica ensalada César lista en minutos con aderezo sin huevo', 'express',
  '["almuerzo","cena"]'::jsonb, 10, 2, 'facil',
  FALSE, FALSE, FALSE, FALSE, FALSE, 'lechuga romana', 1,
  '[
    {"nombre":"lechuga romana","cantidad":"4 hojas grandes"},
    {"nombre":"crutones","cantidad":"1/2 taza"},
    {"nombre":"queso parmesano en láminas","cantidad":"3 cdas"},
    {"nombre":"aderezo César sin huevo","cantidad":"3 cdas"}
  ]'::jsonb,
  '[
    "Lavar y secar la lechuga romana. Cortar en trozos medianos.",
    "Colocar la lechuga en un bol amplio.",
    "Agregar los crutones y el parmesano.",
    "Rociar con el aderezo César y mezclar suavemente. Servir de inmediato."
  ]'::jsonb,
  'Para que los crutones no se ablanden, agregalos justo antes de servir.',
  'Consumir de inmediato; no apta para preparar con anticipación.',
  'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg'),

(2, 'Mix verde con tahini', 'Combinación fresca de verdes con aderezo oriental de tahini y limón', 'express',
  '["almuerzo","snack"]'::jsonb, 8, 2, 'facil',
  TRUE, TRUE, TRUE, TRUE, TRUE, 'espinaca baby', 2,
  '[
    {"nombre":"espinaca baby","cantidad":"2 tazas"},
    {"nombre":"rúcula","cantidad":"1 taza"},
    {"nombre":"pepino en rodajas","cantidad":"1/2 unidad"},
    {"nombre":"semillas de sésamo","cantidad":"1 cda"},
    {"nombre":"aderezo tahini con limón","cantidad":"3 cdas"}
  ]'::jsonb,
  '[
    "Lavar y secar las hojas verdes.",
    "Disponer la espinaca y la rúcula en un plato.",
    "Sumar el pepino y las semillas de sésamo.",
    "Rociar con el aderezo tahini y servir."
  ]'::jsonb,
  'Tostar las semillas de sésamo en seco para potenciar el sabor.',
  'Guardar sin aderezo en heladera hasta 1 día.',
  'https://images.pexels.com/photos/3735168/pexels-photo-3735168.jpeg'),

(3, 'Pollo y miel mostaza express', 'Pechuga de pollo en tiritas con aderezo dulce-ácido y vegetales crujientes', 'express',
  '["almuerzo","vianda"]'::jsonb, 12, 2, 'facil',
  TRUE, TRUE, TRUE, FALSE, FALSE, 'pollo', 3,
  '[
    {"nombre":"pechuga de pollo cocida","cantidad":"150 g"},
    {"nombre":"lechuga mantecosa","cantidad":"3 hojas"},
    {"nombre":"tomates cherry","cantidad":"8 unidades"},
    {"nombre":"zanahoria rallada","cantidad":"1/2 unidad"},
    {"nombre":"aderezo miel y mostaza","cantidad":"3 cdas"}
  ]'::jsonb,
  '[
    "Cortar la pechuga en tiritas.",
    "Disponer la lechuga en un plato.",
    "Sumar los tomates cherry cortados al medio, la zanahoria y el pollo.",
    "Rociar con el aderezo y servir."
  ]'::jsonb,
  'El pollo puede ser de cocción previa; ideal para aprovechar sobrantes.',
  'Sin aderezo, hasta 2 días en heladera en recipiente hermético.',
  'https://images.pexels.com/photos/406152/pexels-photo-406152.jpeg'),

(4, 'Pepino, yogur y eneldo', 'Ensalada refrescante de pepino con aderezo de yogur y eneldo fresco', 'express',
  '["almuerzo","cena","snack"]'::jsonb, 8, 2, 'facil',
  TRUE, TRUE, FALSE, TRUE, FALSE, 'pepino', 4,
  '[
    {"nombre":"pepino","cantidad":"1 unidad grande"},
    {"nombre":"cebolla morada","cantidad":"1/4 unidad"},
    {"nombre":"eneldo fresco","cantidad":"1 cda"},
    {"nombre":"aderezo yogur con eneldo","cantidad":"4 cdas"},
    {"nombre":"sal y pimienta","cantidad":"a gusto"}
  ]'::jsonb,
  '[
    "Pelar el pepino y cortar en rodajas finas.",
    "Cortar la cebolla morada en plumas muy finas.",
    "Mezclar pepino y cebolla en un bol.",
    "Sumar el aderezo, el eneldo y salpimentar. Servir frío."
  ]'::jsonb,
  'Salar el pepino 10 minutos antes y escurrir para que no suelte agua en el plato.',
  'Hasta 1 día en heladera; el pepino tiende a soltar líquido.',
  'https://images.pexels.com/photos/1640775/pexels-photo-1640775.jpeg'),

(5, 'Tomate y albahaca con balsámico', 'Tricolor clásico con tomates, mozzarella y albahaca fresca', 'express',
  '["almuerzo","cena","reunión"]'::jsonb, 10, 2, 'facil',
  FALSE, TRUE, FALSE, TRUE, FALSE, 'tomate', 5,
  '[
    {"nombre":"tomates maduros","cantidad":"3 unidades"},
    {"nombre":"mozzarella fresca","cantidad":"125 g"},
    {"nombre":"albahaca fresca","cantidad":"8 hojas"},
    {"nombre":"aderezo vinagreta balsámica","cantidad":"3 cdas"},
    {"nombre":"sal y pimienta","cantidad":"a gusto"}
  ]'::jsonb,
  '[
    "Cortar los tomates y la mozzarella en rodajas de igual grosor.",
    "Alternar en un plato: tomate, mozzarella, tomate.",
    "Decorar con hojas de albahaca.",
    "Rociar con la vinagreta balsámica y salpimentar."
  ]'::jsonb,
  'Usar tomates de estación a temperatura ambiente; nunca de heladera.',
  'Consumir de inmediato; la mozzarella no resiste bien el frío.',
  'https://images.pexels.com/photos/1099680/pexels-photo-1099680.jpeg'),

(6, 'Fideos soba y ajonjolí', 'Ensalada asiática fría de fideos soba con aderezo de sésamo y jengibre', 'express',
  '["almuerzo","vianda","reunión"]'::jsonb, 15, 2, 'facil',
  TRUE, FALSE, TRUE, TRUE, TRUE, 'fideos soba', 6,
  '[
    {"nombre":"fideos soba cocidos y fríos","cantidad":"150 g"},
    {"nombre":"edamame","cantidad":"1/2 taza"},
    {"nombre":"zanahoria en juliana","cantidad":"1/2 unidad"},
    {"nombre":"cebolla de verdeo","cantidad":"2 tallos"},
    {"nombre":"aderezo ajonjolí y jengibre","cantidad":"3 cdas"},
    {"nombre":"semillas de sésamo","cantidad":"1 cda"}
  ]'::jsonb,
  '[
    "Cocinar los fideos soba según el paquete; enjuagar con agua fría y escurrir.",
    "Mezclar los fideos con la zanahoria, el edamame y la cebolla de verdeo.",
    "Incorporar el aderezo y mezclar bien.",
    "Servir con semillas de sésamo por encima."
  ]'::jsonb,
  'Enjuagar bien los fideos con agua fría para cortar la cocción y evitar que se peguen.',
  'Hasta 2 días en heladera; sumar aderezo extra al servir.',
  'https://images.pexels.com/photos/1640774/pexels-photo-1640774.jpeg'),

(7, 'Rúcula, pera y blue cheese', 'Combinación gourmet de rúcula con pera y aderezo de queso azul', 'express',
  '["cena","reunión"]'::jsonb, 10, 2, 'facil',
  FALSE, TRUE, FALSE, TRUE, FALSE, 'rúcula', 7,
  '[
    {"nombre":"rúcula","cantidad":"2 tazas"},
    {"nombre":"pera madura","cantidad":"1 unidad"},
    {"nombre":"nueces","cantidad":"2 cdas"},
    {"nombre":"aderezo blue cheese criollo","cantidad":"3 cdas"}
  ]'::jsonb,
  '[
    "Lavar y secar la rúcula.",
    "Cortar la pera en gajos finos sin pelar.",
    "Disponer la rúcula en un plato, sumar la pera y las nueces.",
    "Rociar con el aderezo de blue cheese."
  ]'::jsonb,
  'Cortar la pera al momento de servir para que no se oxide.',
  'Consumir de inmediato.',
  'https://images.pexels.com/photos/3893583/pexels-photo-3893583.jpeg'),

(8, 'Garbanzos express con hummus', 'Ensalada de garbanzos con vegetales crudos y aderezo hummus', 'express',
  '["almuerzo","vianda"]'::jsonb, 10, 2, 'facil',
  TRUE, TRUE, TRUE, TRUE, TRUE, 'garbanzos', 8,
  '[
    {"nombre":"garbanzos cocidos","cantidad":"1 taza"},
    {"nombre":"tomates cherry","cantidad":"8 unidades"},
    {"nombre":"pepino","cantidad":"1/2 unidad"},
    {"nombre":"perejil fresco","cantidad":"2 cdas"},
    {"nombre":"aderezo hummus","cantidad":"4 cdas"}
  ]'::jsonb,
  '[
    "Escurrir y enjuagar los garbanzos.",
    "Cortar los tomates al medio y el pepino en cubos.",
    "Mezclar todo en un bol con el perejil picado.",
    "Agregar el aderezo hummus y mezclar. Servir a temperatura ambiente."
  ]'::jsonb,
  'Si usás garbanzos en lata, tostalos 5 minutos en sartén para darles más textura.',
  'Hasta 2 días en heladera sin aderezo.',
  'https://images.pexels.com/photos/1640776/pexels-photo-1640776.jpeg'),

(9, 'Frutilla y espinaca con frambuesa', 'Ensalada frutal de espinaca con frutillas y vinagreta de frambuesa', 'express',
  '["almuerzo","snack","reunión"]'::jsonb, 8, 2, 'facil',
  FALSE, TRUE, TRUE, TRUE, TRUE, 'frutillas', 9,
  '[
    {"nombre":"espinaca baby","cantidad":"2 tazas"},
    {"nombre":"frutillas","cantidad":"1 taza"},
    {"nombre":"almendras fileteadas","cantidad":"2 cdas"},
    {"nombre":"aderezo vinagreta de frambuesa","cantidad":"3 cdas"}
  ]'::jsonb,
  '[
    "Lavar la espinaca y las frutillas.",
    "Cortar las frutillas en cuartos.",
    "Disponer la espinaca en un plato, sumar las frutillas y las almendras.",
    "Rociar con la vinagreta de frambuesa."
  ]'::jsonb,
  'Tostar las almendras fileteadas en sartén seca para potenciar su sabor.',
  'Consumir de inmediato; las hojas se marchitan con el aderezo.',
  'https://images.pexels.com/photos/5419336/pexels-photo-5419336.jpeg'),

(10, 'Papas con romesco', 'Ensalada tibia de papas con salsa romesco española', 'express',
  '["almuerzo","reunión","juntada"]'::jsonb, 15, 2, 'facil',
  TRUE, TRUE, TRUE, TRUE, TRUE, 'papa', 10,
  '[
    {"nombre":"papas medianas cocidas","cantidad":"3 unidades"},
    {"nombre":"perejil fresco picado","cantidad":"2 cdas"},
    {"nombre":"cebolla de verdeo","cantidad":"2 tallos"},
    {"nombre":"aderezo romesco","cantidad":"4 cdas"},
    {"nombre":"sal y pimienta","cantidad":"a gusto"}
  ]'::jsonb,
  '[
    "Cocinar las papas con cáscara hasta que estén tiernas. Dejar entibiar.",
    "Cortar en cuartos o rodajas gruesas.",
    "Mezclar con la cebolla de verdeo y el perejil.",
    "Incorporar el romesco, salpimentar y servir tibia."
  ]'::jsonb,
  'Las papas deben estar tibias para absorber mejor el romesco.',
  'Hasta 2 días en heladera; calentar suavemente antes de servir.',
  'https://images.pexels.com/photos/1435895/pexels-photo-1435895.jpeg'),

-- ============================================================
-- PLATO COMPLETO (IDs 11-20) — tiempo 20-30 min
-- ============================================================

(11, 'Ensalada César con pollo grillado', 'César completa con pechuga grillada, aderezo sin huevo y crutones caseros', 'plato_completo',
  '["almuerzo","cena"]'::jsonb, 25, 2, 'medio',
  FALSE, FALSE, FALSE, FALSE, FALSE, 'pollo', 1,
  '[
    {"nombre":"pechuga de pollo","cantidad":"300 g"},
    {"nombre":"lechuga romana","cantidad":"1 planta"},
    {"nombre":"pan baguette","cantidad":"4 rodajas"},
    {"nombre":"queso parmesano en láminas","cantidad":"4 cdas"},
    {"nombre":"aderezo César sin huevo","cantidad":"5 cdas"},
    {"nombre":"aceite de oliva","cantidad":"1 cda"},
    {"nombre":"ajo en polvo","cantidad":"1/2 cdta"},
    {"nombre":"sal y pimienta","cantidad":"a gusto"}
  ]'::jsonb,
  '[
    "Condimentar el pollo con sal, pimienta y ajo en polvo.",
    "Grillar la pechuga 6-7 minutos por lado. Dejar descansar y cortar en diagonal.",
    "Cortar el pan en cubos y tostar en sartén con aceite de oliva hasta dorar.",
    "Lavar y trozar la lechuga romana.",
    "Mezclar la lechuga con el aderezo César.",
    "Sumar el pollo, los crutones caseros y el parmesano."
  ]'::jsonb,
  'Dejar descansar el pollo 5 minutos antes de cortar para que los jugos se redistribuyan.',
  'El pollo puede prepararse con anticipación; armar la ensalada al momento.',
  'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg'),

(12, 'Bowl de quinoa mediterráneo', 'Quinoa con vegetales mediterráneos, aceitunas y aderezo de tahini', 'plato_completo',
  '["almuerzo","vianda"]'::jsonb, 25, 2, 'facil',
  TRUE, TRUE, TRUE, TRUE, TRUE, 'quinoa', 2,
  '[
    {"nombre":"quinoa cocida","cantidad":"1 taza"},
    {"nombre":"tomates cherry","cantidad":"12 unidades"},
    {"nombre":"pepino","cantidad":"1/2 unidad"},
    {"nombre":"aceitunas negras","cantidad":"1/4 taza"},
    {"nombre":"cebolla morada","cantidad":"1/4 unidad"},
    {"nombre":"perejil fresco","cantidad":"3 cdas"},
    {"nombre":"aderezo tahini con limón","cantidad":"4 cdas"}
  ]'::jsonb,
  '[
    "Cocinar la quinoa según instrucciones. Dejar enfriar.",
    "Cortar los tomates, el pepino y la cebolla morada.",
    "Mezclar la quinoa con todos los vegetales y el perejil.",
    "Incorporar el aderezo tahini y mezclar bien."
  ]'::jsonb,
  'La quinoa absorbe mucho aderezo; preparar con más cantidad si se lleva de vianda.',
  'Hasta 3 días en heladera, ideal para preparar con anticipación.',
  'https://images.pexels.com/photos/3735168/pexels-photo-3735168.jpeg'),

(13, 'Salmon y verdes con balsámico', 'Filete de salmón sobre mix de hojas con vinagreta balsámica y tomates', 'plato_completo',
  '["almuerzo","cena"]'::jsonb, 25, 2, 'medio',
  FALSE, TRUE, TRUE, FALSE, FALSE, 'salmón', 5,
  '[
    {"nombre":"filete de salmón","cantidad":"300 g"},
    {"nombre":"mix de hojas verdes","cantidad":"3 tazas"},
    {"nombre":"tomates cherry","cantidad":"10 unidades"},
    {"nombre":"espárragos","cantidad":"6 unidades"},
    {"nombre":"aderezo vinagreta balsámica","cantidad":"4 cdas"},
    {"nombre":"aceite de oliva","cantidad":"1 cda"},
    {"nombre":"sal y pimienta","cantidad":"a gusto"}
  ]'::jsonb,
  '[
    "Condimentar el salmón con sal y pimienta.",
    "Cocinar el salmón en sartén con aceite de oliva 4 minutos por lado.",
    "Blanquear los espárragos 2 minutos en agua hirviendo con sal.",
    "Disponer las hojas verdes en un plato.",
    "Sumar los tomates, los espárragos y el salmón desmenuzado.",
    "Rociar con la vinagreta balsámica."
  ]'::jsonb,
  'No sobrecocinar el salmón; debe quedar ligeramente rosado en el centro.',
  'El salmón puede prepararse con anticipación y servirse frío sobre las hojas.',
  'https://images.pexels.com/photos/1099680/pexels-photo-1099680.jpeg'),

(14, 'Pechuga glaseada con miel mostaza', 'Pechuga de pollo glaseada sobre lechuga mantecosa con aderezo dulce', 'plato_completo',
  '["almuerzo","cena"]'::jsonb, 25, 2, 'medio',
  FALSE, TRUE, TRUE, FALSE, FALSE, 'pollo', 3,
  '[
    {"nombre":"pechuga de pollo","cantidad":"300 g"},
    {"nombre":"lechuga mantecosa","cantidad":"4 hojas grandes"},
    {"nombre":"manzana verde","cantidad":"1/2 unidad"},
    {"nombre":"nueces","cantidad":"2 cdas"},
    {"nombre":"aderezo miel y mostaza","cantidad":"5 cdas"},
    {"nombre":"aceite de oliva","cantidad":"1 cda"},
    {"nombre":"sal y pimienta","cantidad":"a gusto"}
  ]'::jsonb,
  '[
    "Condimentar el pollo con sal y pimienta.",
    "Sellar en sartén con aceite de oliva. Agregar 2 cdas de aderezo miel mostaza y glasear.",
    "Cocinar 6-7 minutos por lado. Dejar reposar y cortar.",
    "Cortar la manzana en gajos finos.",
    "Armar la ensalada con la lechuga, manzana, nueces y el pollo glaseado.",
    "Rociar con el aderezo restante."
  ]'::jsonb,
  'El glaseado se quema rápido; bajar el fuego al agregar el aderezo.',
  'El pollo glaseado dura 2 días en heladera; armar la ensalada al momento.',
  'https://images.pexels.com/photos/406152/pexels-photo-406152.jpeg'),

(15, 'Lenteja tibia con vegetales asados', 'Bowl de lentejas con verduras asadas y vinagreta balsámica', 'plato_completo',
  '["almuerzo","vianda"]'::jsonb, 30, 2, 'facil',
  TRUE, TRUE, TRUE, TRUE, TRUE, 'lentejas', 5,
  '[
    {"nombre":"lentejas cocidas","cantidad":"1 taza"},
    {"nombre":"zucchini","cantidad":"1 unidad"},
    {"nombre":"berenjena","cantidad":"1/2 unidad"},
    {"nombre":"pimiento rojo","cantidad":"1/2 unidad"},
    {"nombre":"aderezo vinagreta balsámica","cantidad":"4 cdas"},
    {"nombre":"aceite de oliva","cantidad":"2 cdas"},
    {"nombre":"tomillo seco","cantidad":"1 cdta"},
    {"nombre":"sal y pimienta","cantidad":"a gusto"}
  ]'::jsonb,
  '[
    "Precalentar el horno a 200°C.",
    "Cortar los vegetales en cubos, condimentar con aceite, tomillo, sal y pimienta.",
    "Asar 20 minutos hasta que estén tiernos y levemente dorados.",
    "Mezclar las lentejas con los vegetales tibios.",
    "Incorporar la vinagreta balsámica y servir."
  ]'::jsonb,
  'Las lentejas se pueden cocinar en cantidad y conservar hasta 5 días en heladera.',
  'Hasta 3 días en heladera; sumar aderezo fresco al momento de servir.',
  'https://images.pexels.com/photos/1099680/pexels-photo-1099680.jpeg'),

(16, 'Atún, huevo y papa', 'Ensalada niçoise criolla con atún, huevo duro, papa y aceitunas', 'plato_completo',
  '["almuerzo","vianda"]'::jsonb, 25, 2, 'facil',
  TRUE, TRUE, TRUE, FALSE, FALSE, 'atún', 5,
  '[
    {"nombre":"atún en lata al natural","cantidad":"1 lata"},
    {"nombre":"huevos","cantidad":"2 unidades"},
    {"nombre":"papas medianas cocidas","cantidad":"2 unidades"},
    {"nombre":"chauchas cocidas","cantidad":"1 taza"},
    {"nombre":"aceitunas negras","cantidad":"1/4 taza"},
    {"nombre":"lechuga","cantidad":"2 hojas"},
    {"nombre":"aderezo vinagreta balsámica","cantidad":"4 cdas"}
  ]'::jsonb,
  '[
    "Cocinar los huevos 10 minutos para que queden duros. Pelar y cortar en cuartos.",
    "Cocinar las papas y las chauchas. Dejar enfriar.",
    "Armar la ensalada con la lechuga como base.",
    "Distribuir el atún, las papas, las chauchas, los huevos y las aceitunas.",
    "Rociar con la vinagreta balsámica."
  ]'::jsonb,
  'Escurrir bien el atún para que no aguachente el aderezo.',
  'Hasta 2 días en heladera sin aderezo.',
  'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg'),

(17, 'Pollo oriental con soba', 'Pollo salteado con fideos soba fríos y aderezo de ajonjolí y jengibre', 'plato_completo',
  '["almuerzo","cena"]'::jsonb, 25, 2, 'medio',
  TRUE, FALSE, TRUE, FALSE, FALSE, 'pollo', 6,
  '[
    {"nombre":"pechuga de pollo","cantidad":"250 g"},
    {"nombre":"fideos soba cocidos","cantidad":"150 g"},
    {"nombre":"pimiento rojo","cantidad":"1/2 unidad"},
    {"nombre":"zanahoria en juliana","cantidad":"1/2 unidad"},
    {"nombre":"cebolla de verdeo","cantidad":"3 tallos"},
    {"nombre":"aderezo ajonjolí y jengibre","cantidad":"5 cdas"},
    {"nombre":"aceite de sésamo","cantidad":"1 cdta"}
  ]'::jsonb,
  '[
    "Cocinar el pollo en sartén con aceite de sésamo; cortar en tiritas.",
    "Cocinar los fideos soba; enjuagar con agua fría y escurrir.",
    "Mezclar los fideos con la zanahoria, el pimiento y la cebolla de verdeo.",
    "Sumar el pollo y el aderezo. Mezclar bien y servir."
  ]'::jsonb,
  'Agregar chile fresco si querés un toque picante al aderezo.',
  'Hasta 2 días en heladera; los fideos pueden absorber el aderezo.',
  'https://images.pexels.com/photos/1640774/pexels-photo-1640774.jpeg'),

(18, 'Espinaca con huevo pochado y blue cheese', 'Hojas de espinaca con huevo pochado y aderezo de queso azul', 'plato_completo',
  '["almuerzo","cena"]'::jsonb, 20, 2, 'medio',
  FALSE, TRUE, FALSE, TRUE, FALSE, 'espinaca', 7,
  '[
    {"nombre":"espinaca baby","cantidad":"3 tazas"},
    {"nombre":"huevos","cantidad":"2 unidades"},
    {"nombre":"tomates cherry","cantidad":"8 unidades"},
    {"nombre":"nueces","cantidad":"2 cdas"},
    {"nombre":"aderezo blue cheese criollo","cantidad":"4 cdas"},
    {"nombre":"vinagre blanco","cantidad":"1 cda"}
  ]'::jsonb,
  '[
    "Hervir agua con el vinagre blanco para los huevos pochados.",
    "Pochar los huevos 3 minutos. Retirar con espumadera.",
    "Disponer la espinaca en platos. Sumar los tomates cherry y las nueces.",
    "Colocar el huevo pochado encima y rociar con el aderezo de blue cheese."
  ]'::jsonb,
  'El vinagre en el agua ayuda a que la clara del huevo pochado coagule más rápido.',
  'El huevo pochado debe hacerse al momento; la ensalada no es apta para guardar.',
  'https://images.pexels.com/photos/3893583/pexels-photo-3893583.jpeg'),

(19, 'Bowl de garbanzo y romesco', 'Bowl proteico de garbanzos con vegetales asados y salsa romesco', 'plato_completo',
  '["almuerzo","vianda"]'::jsonb, 30, 2, 'facil',
  TRUE, TRUE, TRUE, TRUE, TRUE, 'garbanzos', 10,
  '[
    {"nombre":"garbanzos cocidos","cantidad":"1.5 tazas"},
    {"nombre":"pimiento rojo","cantidad":"1 unidad"},
    {"nombre":"zucchini","cantidad":"1 unidad"},
    {"nombre":"cebolla morada","cantidad":"1/2 unidad"},
    {"nombre":"aderezo romesco","cantidad":"5 cdas"},
    {"nombre":"aceite de oliva","cantidad":"2 cdas"},
    {"nombre":"pimentón ahumado","cantidad":"1/2 cdta"},
    {"nombre":"sal y pimienta","cantidad":"a gusto"}
  ]'::jsonb,
  '[
    "Precalentar el horno a 200°C.",
    "Cortar los vegetales y asar con aceite, pimentón, sal y pimienta 20 minutos.",
    "Tostar los garbanzos en sartén seca hasta que estén crujientes.",
    "Mezclar todo en un bol.",
    "Incorporar el romesco y servir tibio."
  ]'::jsonb,
  'Los garbanzos tostados aportan textura; no saltear este paso.',
  'Hasta 3 días en heladera; el romesco no se separa.',
  'https://images.pexels.com/photos/1435895/pexels-photo-1435895.jpeg'),

(20, 'Ensalada de pollo con hummus', 'Pollo deshilachado sobre vegetales frescos con aderezo hummus', 'plato_completo',
  '["almuerzo","vianda","cena"]'::jsonb, 20, 2, 'facil',
  TRUE, TRUE, TRUE, FALSE, FALSE, 'pollo', 8,
  '[
    {"nombre":"pechuga de pollo deshilachada","cantidad":"250 g"},
    {"nombre":"pepino","cantidad":"1 unidad"},
    {"nombre":"tomates cherry","cantidad":"10 unidades"},
    {"nombre":"lechuga romana","cantidad":"3 hojas"},
    {"nombre":"perejil fresco","cantidad":"2 cdas"},
    {"nombre":"aderezo hummus","cantidad":"5 cdas"},
    {"nombre":"sal y pimienta","cantidad":"a gusto"}
  ]'::jsonb,
  '[
    "Cocinar el pollo en agua con sal. Desmenuzar cuando esté tibio.",
    "Cortar el pepino y los tomates cherry.",
    "Disponer la lechuga, el pepino y los tomates en un plato.",
    "Sumar el pollo deshilachado y el perejil.",
    "Rociar con el aderezo hummus."
  ]'::jsonb,
  'El pollo deshilachado absorbe bien el hummus; mezclarlo un rato antes de servir.',
  'Hasta 2 días en heladera sin aderezo.',
  'https://images.pexels.com/photos/1640776/pexels-photo-1640776.jpeg'),

-- ============================================================
-- JUNTADA (IDs 21-30) — tiempo 25-40 min
-- ============================================================

(21, 'Ensalada de pasta para grupo', 'Pasta fría con vegetales, aceitunas y vinagreta balsámica, ideal para compartir', 'juntada',
  '["reunión","cumpleaños","asado"]'::jsonb, 30, 6, 'facil',
  TRUE, FALSE, TRUE, TRUE, TRUE, 'pasta', 5,
  '[
    {"nombre":"pasta corta cocida","cantidad":"400 g"},
    {"nombre":"tomates cherry","cantidad":"20 unidades"},
    {"nombre":"aceitunas verdes y negras","cantidad":"1/2 taza"},
    {"nombre":"pimiento rojo","cantidad":"1 unidad"},
    {"nombre":"cebolla morada","cantidad":"1/2 unidad"},
    {"nombre":"albahaca fresca","cantidad":"1/4 taza"},
    {"nombre":"aderezo vinagreta balsámica","cantidad":"8 cdas"},
    {"nombre":"sal y pimienta","cantidad":"a gusto"}
  ]'::jsonb,
  '[
    "Cocinar la pasta al dente. Enfriar con agua fría y escurrir.",
    "Cortar todos los vegetales.",
    "Mezclar la pasta con los vegetales, las aceitunas y la albahaca.",
    "Incorporar el aderezo, salpimentar y refrigerar 30 minutos antes de servir."
  ]'::jsonb,
  'Preparar con 1 hora de anticipación para que los sabores se integren.',
  'Hasta 3 días en heladera; sumar aderezo fresco al servir.',
  'https://images.pexels.com/photos/1099680/pexels-photo-1099680.jpeg'),

(22, 'Ensalada de patata para asado', 'Ensalada de papas con pepino, cebolla y aderezo de yogur y eneldo', 'juntada',
  '["asado","reunión"]'::jsonb, 30, 6, 'facil',
  TRUE, TRUE, FALSE, TRUE, FALSE, 'papa', 4,
  '[
    {"nombre":"papas medianas","cantidad":"6 unidades"},
    {"nombre":"pepino","cantidad":"1 unidad"},
    {"nombre":"cebolla morada","cantidad":"1 unidad"},
    {"nombre":"ciboulette","cantidad":"3 cdas"},
    {"nombre":"aderezo yogur con eneldo","cantidad":"8 cdas"},
    {"nombre":"sal y pimienta","cantidad":"a gusto"}
  ]'::jsonb,
  '[
    "Cocinar las papas con cáscara hasta que estén tiernas. Enfriar.",
    "Pelar y cortar en cubos grandes.",
    "Cortar el pepino y la cebolla morada en cubos.",
    "Mezclar todo con el aderezo yogur y la ciboulette.",
    "Salpimentar y refrigerar 30 minutos."
  ]'::jsonb,
  'Para asados, duplicar la receta. La ensalada siempre se termina.',
  'Hasta 2 días en heladera.',
  'https://images.pexels.com/photos/1640775/pexels-photo-1640775.jpeg'),

(23, 'Tabule para compartir', 'Clásico tabule con trigo burgol, tomate, perejil y aderezo de limón', 'juntada',
  '["reunión","asado","cumpleaños"]'::jsonb, 35, 6, 'facil',
  TRUE, FALSE, TRUE, TRUE, TRUE, 'trigo burgol', 2,
  '[
    {"nombre":"trigo burgol fino","cantidad":"1 taza"},
    {"nombre":"agua hirviendo","cantidad":"1 taza"},
    {"nombre":"tomates maduros","cantidad":"3 unidades"},
    {"nombre":"pepino","cantidad":"1 unidad"},
    {"nombre":"perejil fresco","cantidad":"2 tazas"},
    {"nombre":"menta fresca","cantidad":"1/4 taza"},
    {"nombre":"cebolla de verdeo","cantidad":"4 tallos"},
    {"nombre":"jugo de limón","cantidad":"4 cdas"},
    {"nombre":"aceite de oliva","cantidad":"3 cdas"},
    {"nombre":"sal","cantidad":"a gusto"}
  ]'::jsonb,
  '[
    "Hidratar el burgol con el agua hirviendo 20 minutos. Escurrir bien.",
    "Picar finamente el perejil, la menta, el pepino y la cebolla de verdeo.",
    "Cortar los tomates en cubos pequeños.",
    "Mezclar el burgol con todos los ingredientes.",
    "Aderezar con limón, aceite y sal. Refrigerar 30 minutos."
  ]'::jsonb,
  'El secreto del tabule es abundante perejil: debe predominar sobre el burgol.',
  'Hasta 3 días en heladera; mejora con el tiempo.',
  'https://images.pexels.com/photos/3735168/pexels-photo-3735168.jpeg'),

(24, 'Ensalada oriental para grupo', 'Mix asiático de col, zanahoria y mango con aderezo de ajonjolí', 'juntada',
  '["reunión","cumpleaños"]'::jsonb, 25, 6, 'facil',
  TRUE, TRUE, TRUE, TRUE, TRUE, 'col', 6,
  '[
    {"nombre":"repollo blanco rallado","cantidad":"3 tazas"},
    {"nombre":"repollo morado rallado","cantidad":"2 tazas"},
    {"nombre":"zanahoria rallada","cantidad":"2 unidades"},
    {"nombre":"mango en cubos","cantidad":"1 unidad"},
    {"nombre":"maní tostado picado","cantidad":"1/3 taza"},
    {"nombre":"cilantro fresco","cantidad":"1/4 taza"},
    {"nombre":"aderezo ajonjolí y jengibre","cantidad":"8 cdas"}
  ]'::jsonb,
  '[
    "Rallar el repollo y la zanahoria bien finos.",
    "Cortar el mango en cubos pequeños.",
    "Mezclar todo en una fuente grande.",
    "Incorporar el cilantro y el maní.",
    "Agregar el aderezo y mezclar bien. Refrigerar 20 minutos."
  ]'::jsonb,
  'El repollo rallado fino se marida bien con el aderezo; no cortar grueso.',
  'Hasta 2 días en heladera; el repollo se mantiene crocante.',
  'https://images.pexels.com/photos/1640774/pexels-photo-1640774.jpeg'),

(25, 'Ensalada de peras y queso azul para reunión', 'Peras, nueces y queso azul sobre hojas verdes con aderezo blue cheese', 'juntada',
  '["reunión","cena_especial"]'::jsonb, 20, 6, 'facil',
  FALSE, TRUE, FALSE, TRUE, FALSE, 'pera', 7,
  '[
    {"nombre":"peras maduras","cantidad":"4 unidades"},
    {"nombre":"rúcula","cantidad":"4 tazas"},
    {"nombre":"nueces","cantidad":"1/2 taza"},
    {"nombre":"queso azul","cantidad":"80 g"},
    {"nombre":"aderezo blue cheese criollo","cantidad":"6 cdas"}
  ]'::jsonb,
  '[
    "Lavar la rúcula y secar bien.",
    "Cortar las peras en gajos y el queso en trozos.",
    "Disponer la rúcula en una fuente grande.",
    "Distribuir las peras, las nueces y el queso.",
    "Rociar con el aderezo de blue cheese al momento de servir."
  ]'::jsonb,
  'Presentar el aderezo aparte para que cada comensal se sirva a gusto.',
  'Preparar los componentes por separado hasta 1 día antes.',
  'https://images.pexels.com/photos/3893583/pexels-photo-3893583.jpeg'),

(26, 'Coliflor asada con romesco', 'Ramilletes de coliflor asados sobre colchón de hojas con romesco', 'juntada',
  '["reunión","asado","vegetariano"]'::jsonb, 40, 4, 'facil',
  FALSE, TRUE, TRUE, TRUE, TRUE, 'coliflor', 10,
  '[
    {"nombre":"coliflor","cantidad":"1 unidad"},
    {"nombre":"mix de hojas verdes","cantidad":"4 tazas"},
    {"nombre":"pimientos asados","cantidad":"2 unidades"},
    {"nombre":"aderezo romesco","cantidad":"6 cdas"},
    {"nombre":"aceite de oliva","cantidad":"3 cdas"},
    {"nombre":"comino y pimentón","cantidad":"1 cdta c/u"},
    {"nombre":"sal","cantidad":"a gusto"}
  ]'::jsonb,
  '[
    "Precalentar el horno a 210°C.",
    "Separar la coliflor en ramilletes. Condimentar con aceite, comino, pimentón y sal.",
    "Asar 25-30 minutos hasta que estén dorados.",
    "Disponer las hojas en una fuente.",
    "Colocar la coliflor asada y los pimientos encima.",
    "Rociar con el romesco y servir tibio."
  ]'::jsonb,
  'El asado de la coliflor es clave; no bajar la temperatura ni el tiempo.',
  'La coliflor asada dura 3 días; armar la ensalada al momento.',
  'https://images.pexels.com/photos/1435895/pexels-photo-1435895.jpeg'),

(27, 'Bowl de arroz integral para grupo', 'Arroz integral con vegetales salteados, edamame y vinagreta de soja', 'juntada',
  '["reunión","vianda"]'::jsonb, 35, 6, 'facil',
  TRUE, TRUE, TRUE, TRUE, TRUE, 'arroz integral', 6,
  '[
    {"nombre":"arroz integral cocido","cantidad":"3 tazas"},
    {"nombre":"edamame","cantidad":"1 taza"},
    {"nombre":"zanahoria en juliana","cantidad":"2 unidades"},
    {"nombre":"pimiento rojo","cantidad":"1 unidad"},
    {"nombre":"cebolla de verdeo","cantidad":"4 tallos"},
    {"nombre":"aderezo ajonjolí y jengibre","cantidad":"8 cdas"},
    {"nombre":"semillas de sésamo","cantidad":"2 cdas"}
  ]'::jsonb,
  '[
    "Cocinar el arroz integral según instrucciones. Enfriar.",
    "Blanquear el edamame 3 minutos. Escurrir.",
    "Cortar los vegetales en juliana.",
    "Mezclar el arroz con los vegetales y el edamame.",
    "Incorporar el aderezo y las semillas de sésamo."
  ]'::jsonb,
  'El arroz integral frío tiene más almidón resistente, bueno para la digestión.',
  'Hasta 4 días en heladera; ideal para preparar con anticipación.',
  'https://images.pexels.com/photos/1640774/pexels-photo-1640774.jpeg'),

(28, 'Ensalada caprese gigante', 'Versión XL de la caprese con tomates perita, mozzarella y albahaca', 'juntada',
  '["reunión","asado","cumpleaños"]'::jsonb, 15, 6, 'facil',
  FALSE, TRUE, FALSE, TRUE, FALSE, 'tomate', 5,
  '[
    {"nombre":"tomates perita","cantidad":"8 unidades"},
    {"nombre":"mozzarella fresca","cantidad":"400 g"},
    {"nombre":"albahaca fresca","cantidad":"20 hojas"},
    {"nombre":"aderezo vinagreta balsámica","cantidad":"6 cdas"},
    {"nombre":"sal en escamas","cantidad":"a gusto"},
    {"nombre":"aceite de oliva extra virgen","cantidad":"2 cdas"}
  ]'::jsonb,
  '[
    "Cortar los tomates y la mozzarella en rodajas de 1 cm.",
    "Alternar en una fuente: tomate, mozzarella, tomate.",
    "Decorar con hojas de albahaca por encima.",
    "Rociar con la vinagreta balsámica y el aceite de oliva.",
    "Terminar con sal en escamas."
  ]'::jsonb,
  'Para una presentación elegante, usar tomates y mozzarella del mismo diámetro.',
  'Armar al momento; la mozzarella no resiste la heladera.',
  'https://images.pexels.com/photos/1099680/pexels-photo-1099680.jpeg'),

(29, 'Ensalada griega para asado', 'Clásica ensalada griega con pepino, tomate, feta y aceitunas', 'juntada',
  '["asado","reunión"]'::jsonb, 15, 6, 'facil',
  TRUE, TRUE, FALSE, TRUE, FALSE, 'pepino', 5,
  '[
    {"nombre":"pepinos","cantidad":"2 unidades"},
    {"nombre":"tomates maduros","cantidad":"4 unidades"},
    {"nombre":"pimiento verde","cantidad":"1 unidad"},
    {"nombre":"cebolla morada","cantidad":"1 unidad"},
    {"nombre":"aceitunas kalamata","cantidad":"1/2 taza"},
    {"nombre":"queso feta","cantidad":"200 g"},
    {"nombre":"aderezo vinagreta balsámica","cantidad":"6 cdas"},
    {"nombre":"orégano seco","cantidad":"1 cdta"}
  ]'::jsonb,
  '[
    "Cortar los pepinos, tomates, pimiento y cebolla en trozos medianos.",
    "Mezclar en una fuente amplia.",
    "Sumar las aceitunas y el feta en trozos grandes.",
    "Rociar con la vinagreta y espolvorear el orégano."
  ]'::jsonb,
  'No mezclar demasiado para que el feta no se deshaga.',
  'Hasta 2 días en heladera sin aderezo.',
  'https://images.pexels.com/photos/1099680/pexels-photo-1099680.jpeg'),

(30, 'Ensalada de lentejas para grupo', 'Lentejas con vegetales crudos y aderezo hummus para compartir', 'juntada',
  '["reunión","vianda"]'::jsonb, 30, 6, 'facil',
  TRUE, TRUE, TRUE, TRUE, TRUE, 'lentejas', 8,
  '[
    {"nombre":"lentejas cocidas","cantidad":"3 tazas"},
    {"nombre":"tomates cherry","cantidad":"20 unidades"},
    {"nombre":"pepino","cantidad":"2 unidades"},
    {"nombre":"perejil fresco","cantidad":"1/2 taza"},
    {"nombre":"cebolla morada","cantidad":"1 unidad"},
    {"nombre":"aderezo hummus","cantidad":"8 cdas"},
    {"nombre":"sal y pimienta","cantidad":"a gusto"}
  ]'::jsonb,
  '[
    "Cocinar las lentejas al dente. Enfriar.",
    "Cortar los vegetales.",
    "Mezclar las lentejas con los vegetales y el perejil.",
    "Incorporar el aderezo hummus y salpimentar.",
    "Refrigerar 30 minutos antes de servir."
  ]'::jsonb,
  'Las lentejas Puy o beluga no se deshacen y quedan perfectas para ensalada.',
  'Hasta 4 días en heladera; mejorar con más aderezo al servir.',
  'https://images.pexels.com/photos/1640776/pexels-photo-1640776.jpeg'),

-- ============================================================
-- SIN LECHUGA (IDs 31-40) — tiempo 10-25 min
-- ============================================================

(31, 'Pepino y zanahoria con yogur', 'Ensalada crocante de pepino y zanahoria rallada con aderezo de yogur', 'sin_lechuga',
  '["almuerzo","vianda","snack"]'::jsonb, 10, 2, 'facil',
  TRUE, TRUE, FALSE, TRUE, FALSE, 'pepino', 4,
  '[
    {"nombre":"pepino","cantidad":"2 unidades"},
    {"nombre":"zanahoria","cantidad":"2 unidades"},
    {"nombre":"ciboulette","cantidad":"2 cdas"},
    {"nombre":"aderezo yogur con eneldo","cantidad":"4 cdas"},
    {"nombre":"sal y pimienta","cantidad":"a gusto"}
  ]'::jsonb,
  '[
    "Pelar el pepino y cortar en rodajas.",
    "Rallar la zanahoria.",
    "Mezclar en un bol con la ciboulette picada.",
    "Sumar el aderezo, salpimentar y refrigerar."
  ]'::jsonb,
  'Escurrir bien las verduras antes de sumar el aderezo para que no quede aguada.',
  'Hasta 2 días en heladera sin aderezo.',
  'https://images.pexels.com/photos/1640775/pexels-photo-1640775.jpeg'),

(32, 'Tomate y garbanzo con hummus', 'Ensalada mediterránea sin hojas de tomate y garbanzo con aderezo hummus', 'sin_lechuga',
  '["almuerzo","vianda"]'::jsonb, 10, 2, 'facil',
  TRUE, TRUE, TRUE, TRUE, TRUE, 'garbanzos', 8,
  '[
    {"nombre":"garbanzos cocidos","cantidad":"1 taza"},
    {"nombre":"tomates maduros","cantidad":"2 unidades"},
    {"nombre":"pepino","cantidad":"1/2 unidad"},
    {"nombre":"perejil fresco","cantidad":"2 cdas"},
    {"nombre":"aderezo hummus","cantidad":"4 cdas"},
    {"nombre":"sal y pimienta","cantidad":"a gusto"}
  ]'::jsonb,
  '[
    "Escurrir los garbanzos.",
    "Cortar los tomates y el pepino en cubos.",
    "Mezclar todo con el perejil picado.",
    "Sumar el aderezo hummus y salpimentar."
  ]'::jsonb,
  'Sumar un chorrito de aceite de oliva extra al final para redondear el sabor.',
  'Hasta 3 días en heladera.',
  'https://images.pexels.com/photos/1640776/pexels-photo-1640776.jpeg'),

(33, 'Berenjenas asadas con tahini', 'Berenjenas asadas sobre colchón de tahini con limón y perejil', 'sin_lechuga',
  '["almuerzo","cena","reunión"]'::jsonb, 25, 2, 'facil',
  FALSE, TRUE, TRUE, TRUE, TRUE, 'berenjena', 2,
  '[
    {"nombre":"berenjenas","cantidad":"2 unidades"},
    {"nombre":"aderezo tahini con limón","cantidad":"5 cdas"},
    {"nombre":"perejil fresco","cantidad":"3 cdas"},
    {"nombre":"aceite de oliva","cantidad":"2 cdas"},
    {"nombre":"pimentón ahumado","cantidad":"1/2 cdta"},
    {"nombre":"sal","cantidad":"a gusto"}
  ]'::jsonb,
  '[
    "Cortar las berenjenas en mitades y marcar con un cuchillo en diagonal.",
    "Pintar con aceite y sal. Asar al horno 200°C por 20-25 minutos.",
    "Extender el aderezo tahini en un plato.",
    "Colocar las berenjenas asadas encima.",
    "Espolvorear perejil y pimentón ahumado."
  ]'::jsonb,
  'Asar hasta que la carne de la berenjena quede completamente blanda.',
  'Las berenjenas asadas duran 3 días; montar el plato al momento.',
  'https://images.pexels.com/photos/3735168/pexels-photo-3735168.jpeg'),

(34, 'Zanahoria con ajonjolí', 'Zanahorias a la plancha con aderezo asiático de ajonjolí y jengibre', 'sin_lechuga',
  '["almuerzo","vianda","reunión"]'::jsonb, 15, 2, 'facil',
  TRUE, TRUE, TRUE, TRUE, TRUE, 'zanahoria', 6,
  '[
    {"nombre":"zanahorias medianas","cantidad":"4 unidades"},
    {"nombre":"aderezo ajonjolí y jengibre","cantidad":"4 cdas"},
    {"nombre":"semillas de sésamo","cantidad":"1 cda"},
    {"nombre":"cebolla de verdeo","cantidad":"2 tallos"},
    {"nombre":"aceite de sésamo","cantidad":"1 cdta"}
  ]'::jsonb,
  '[
    "Pelar las zanahorias y cortar en bastones.",
    "Cocinar a la plancha o sartén con aceite de sésamo hasta que estén tiernas pero firmes.",
    "Dejar enfriar levemente.",
    "Mezclar con el aderezo, las semillas de sésamo y la cebolla de verdeo."
  ]'::jsonb,
  'Cocinar la zanahoria al dente; muy blanda pierde el carácter de la ensalada.',
  'Hasta 3 días en heladera; servir a temperatura ambiente.',
  'https://images.pexels.com/photos/1640774/pexels-photo-1640774.jpeg'),

(35, 'Remolacha con queso azul y nueces', 'Remolacha asada con aderezo blue cheese y nueces caramelizadas', 'sin_lechuga',
  '["almuerzo","cena","reunión"]'::jsonb, 20, 2, 'facil',
  FALSE, TRUE, FALSE, TRUE, FALSE, 'remolacha', 7,
  '[
    {"nombre":"remolachas cocidas","cantidad":"3 unidades"},
    {"nombre":"nueces","cantidad":"3 cdas"},
    {"nombre":"aderezo blue cheese criollo","cantidad":"4 cdas"},
    {"nombre":"miel","cantidad":"1 cdta"},
    {"nombre":"sal y pimienta","cantidad":"a gusto"}
  ]'::jsonb,
  '[
    "Cortar la remolacha en gajos o rodajas.",
    "Tostar las nueces en sartén seca con miel un minuto.",
    "Disponer la remolacha en un plato.",
    "Distribuir las nueces caramelizadas.",
    "Rociar con el aderezo de blue cheese."
  ]'::jsonb,
  'Usar guantes para manipular la remolacha y evitar mancharse las manos.',
  'La remolacha cocida dura 5 días en heladera; armar el plato al momento.',
  'https://images.pexels.com/photos/3893583/pexels-photo-3893583.jpeg'),

(36, 'Espárragos con balsámico', 'Espárragos grillados con vinagreta balsámica y parmesano', 'sin_lechuga',
  '["almuerzo","cena","reunión"]'::jsonb, 15, 2, 'facil',
  FALSE, TRUE, FALSE, TRUE, FALSE, 'espárragos', 5,
  '[
    {"nombre":"espárragos verdes","cantidad":"16 unidades"},
    {"nombre":"queso parmesano en láminas","cantidad":"3 cdas"},
    {"nombre":"aderezo vinagreta balsámica","cantidad":"3 cdas"},
    {"nombre":"aceite de oliva","cantidad":"1 cda"},
    {"nombre":"sal y pimienta","cantidad":"a gusto"}
  ]'::jsonb,
  '[
    "Romper la base leñosa de los espárragos.",
    "Grillar con aceite de oliva, sal y pimienta 5-7 minutos.",
    "Disponer en un plato.",
    "Rociar con la vinagreta balsámica y decorar con el parmesano en láminas."
  ]'::jsonb,
  'Los espárragos deben quedar al dente, no blandos.',
  'Consumir de inmediato; los espárragos grillados no se guardan bien.',
  'https://images.pexels.com/photos/1099680/pexels-photo-1099680.jpeg'),

(37, 'Pimientos asados con romesco', 'Pimientos de colores asados con salsa romesco y almendras', 'sin_lechuga',
  '["almuerzo","reunión","asado"]'::jsonb, 25, 2, 'facil',
  FALSE, TRUE, TRUE, TRUE, TRUE, 'pimientos', 10,
  '[
    {"nombre":"pimientos rojos y amarillos","cantidad":"3 unidades"},
    {"nombre":"almendras laminadas tostadas","cantidad":"3 cdas"},
    {"nombre":"aderezo romesco","cantidad":"5 cdas"},
    {"nombre":"aceite de oliva","cantidad":"1 cda"},
    {"nombre":"sal","cantidad":"a gusto"}
  ]'::jsonb,
  '[
    "Asar los pimientos directo sobre la hornalla o en horno a 220°C.",
    "Cuando la piel esté negra, colocar en bolsa por 10 minutos.",
    "Pelar, quitar semillas y cortar en tiras.",
    "Disponer en un plato.",
    "Rociar con el romesco y distribuir las almendras."
  ]'::jsonb,
  'Guardar el jugo que sueltan los pimientos para agregarlo al plato.',
  'Los pimientos asados duran 5 días en heladera.',
  'https://images.pexels.com/photos/1435895/pexels-photo-1435895.jpeg'),

(38, 'Brócoli crocante con hummus', 'Brócoli blanqueado con aderezo hummus y semillas de girasol', 'sin_lechuga',
  '["almuerzo","vianda","snack"]'::jsonb, 15, 2, 'facil',
  TRUE, TRUE, TRUE, TRUE, TRUE, 'brócoli', 8,
  '[
    {"nombre":"brócoli","cantidad":"1 planta grande"},
    {"nombre":"semillas de girasol","cantidad":"2 cdas"},
    {"nombre":"limón","cantidad":"1/2 unidad"},
    {"nombre":"aderezo hummus","cantidad":"4 cdas"},
    {"nombre":"sal y pimienta","cantidad":"a gusto"}
  ]'::jsonb,
  '[
    "Separar el brócoli en ramilletes.",
    "Blanquear 3 minutos en agua hirviendo con sal. Pasar a agua con hielo.",
    "Tostar las semillas de girasol en sartén seca.",
    "Mezclar el brócoli con el aderezo hummus.",
    "Sumar las semillas y un chorrito de limón."
  ]'::jsonb,
  'El baño de agua helada fija el color verde brillante del brócoli.',
  'Hasta 3 días en heladera sin aderezo.',
  'https://images.pexels.com/photos/1640776/pexels-photo-1640776.jpeg'),

(39, 'Tomate, pepino y cebolla clásica', 'Ensalada tradicional de tomate, pepino y cebolla con vinagreta', 'sin_lechuga',
  '["almuerzo","cena","asado"]'::jsonb, 10, 4, 'facil',
  TRUE, TRUE, TRUE, TRUE, TRUE, 'tomate', 5,
  '[
    {"nombre":"tomates maduros","cantidad":"4 unidades"},
    {"nombre":"pepino","cantidad":"1 unidad"},
    {"nombre":"cebolla blanca","cantidad":"1 unidad"},
    {"nombre":"sal gruesa","cantidad":"a gusto"},
    {"nombre":"aderezo vinagreta balsámica","cantidad":"4 cdas"},
    {"nombre":"orégano seco","cantidad":"1 cdta"}
  ]'::jsonb,
  '[
    "Cortar los tomates y el pepino en cubos medianos.",
    "Cortar la cebolla en plumas.",
    "Mezclar en un bol con sal gruesa. Dejar reposar 10 minutos.",
    "Escurrir el líquido.",
    "Sumar el aderezo y el orégano. Servir."
  ]'::jsonb,
  'La sal gruesa ayuda a los vegetales a soltar líquido, concentrando el sabor.',
  'Consumir en el día; no guarda bien una vez condimentada.',
  'https://images.pexels.com/photos/1099680/pexels-photo-1099680.jpeg'),

(40, 'Habas y menta con tahini', 'Habas frescas con menta y aderezo de tahini con limón', 'sin_lechuga',
  '["almuerzo","vianda"]'::jsonb, 20, 2, 'medio',
  TRUE, TRUE, TRUE, TRUE, TRUE, 'habas', 2,
  '[
    {"nombre":"habas frescas o congeladas","cantidad":"2 tazas"},
    {"nombre":"menta fresca","cantidad":"1/4 taza"},
    {"nombre":"cebolla de verdeo","cantidad":"3 tallos"},
    {"nombre":"aderezo tahini con limón","cantidad":"4 cdas"},
    {"nombre":"sal y pimienta","cantidad":"a gusto"}
  ]'::jsonb,
  '[
    "Cocinar las habas 3-4 minutos en agua con sal. Escurrir.",
    "Si son frescas, pelar la película exterior de cada haba.",
    "Mezclar con la menta picada y la cebolla de verdeo.",
    "Sumar el aderezo tahini y salpimentar."
  ]'::jsonb,
  'Pelar la película exterior de las habas puede llevar tiempo pero vale la pena por la textura.',
  'Hasta 2 días en heladera sin aderezo.',
  'https://images.pexels.com/photos/3735168/pexels-photo-3735168.jpeg'),

-- ============================================================
-- FRUTAL (IDs 41-50) — tiempo 10-20 min
-- ============================================================

(41, 'Sandía y menta con vinagreta frambuesa', 'Ensalada frutal de sandía con hojas y vinagreta de frambuesa', 'frutal',
  '["almuerzo","snack","reunión"]'::jsonb, 10, 2, 'facil',
  FALSE, TRUE, TRUE, TRUE, TRUE, 'sandía', 9,
  '[
    {"nombre":"sandía","cantidad":"3 tazas en cubos"},
    {"nombre":"rúcula","cantidad":"1 taza"},
    {"nombre":"menta fresca","cantidad":"8 hojas"},
    {"nombre":"pepino","cantidad":"1/2 unidad"},
    {"nombre":"aderezo vinagreta de frambuesa","cantidad":"3 cdas"}
  ]'::jsonb,
  '[
    "Cortar la sandía en cubos retirando las semillas.",
    "Cortar el pepino en rodajas finas.",
    "Disponer la rúcula en un plato.",
    "Sumar la sandía, el pepino y la menta.",
    "Rociar con la vinagreta de frambuesa."
  ]'::jsonb,
  'Agregar queso feta desmenuzado para un contraste salado increíble.',
  'Consumir de inmediato; la sandía libera mucho líquido.',
  'https://images.pexels.com/photos/5419336/pexels-photo-5419336.jpeg'),

(42, 'Mango y quinoa con tahini', 'Bowl de quinoa con mango, pepino y aderezo de tahini y limón', 'frutal',
  '["almuerzo","vianda"]'::jsonb, 15, 2, 'facil',
  TRUE, TRUE, TRUE, TRUE, TRUE, 'mango', 2,
  '[
    {"nombre":"quinoa cocida","cantidad":"1 taza"},
    {"nombre":"mango maduro","cantidad":"1 unidad"},
    {"nombre":"pepino","cantidad":"1/2 unidad"},
    {"nombre":"cilantro fresco","cantidad":"2 cdas"},
    {"nombre":"aderezo tahini con limón","cantidad":"4 cdas"}
  ]'::jsonb,
  '[
    "Cocinar y enfriar la quinoa.",
    "Cortar el mango y el pepino en cubos.",
    "Mezclar la quinoa con el mango y el pepino.",
    "Sumar el cilantro y el aderezo tahini."
  ]'::jsonb,
  'El mango debe estar maduro pero firme para que no se deshaga.',
  'Hasta 2 días en heladera sin aderezo.',
  'https://images.pexels.com/photos/3735168/pexels-photo-3735168.jpeg'),

(43, 'Pollo con durazno y miel mostaza', 'Ensalada de verano con pollo, durazno y aderezo dulce de miel mostaza', 'frutal',
  '["almuerzo","cena"]'::jsonb, 20, 2, 'facil',
  FALSE, TRUE, TRUE, FALSE, FALSE, 'durazno', 3,
  '[
    {"nombre":"pechuga de pollo cocida","cantidad":"200 g"},
    {"nombre":"duraznos maduros","cantidad":"2 unidades"},
    {"nombre":"hojas verdes variadas","cantidad":"2 tazas"},
    {"nombre":"almendras tostadas","cantidad":"2 cdas"},
    {"nombre":"aderezo miel y mostaza","cantidad":"4 cdas"}
  ]'::jsonb,
  '[
    "Cortar el pollo en tiras.",
    "Cortar los duraznos en gajos finos.",
    "Disponer las hojas en un plato.",
    "Sumar el pollo, los duraznos y las almendras.",
    "Rociar con el aderezo miel mostaza."
  ]'::jsonb,
  'Los duraznos a la plancha 2 minutos por lado quedan espectaculares.',
  'Consumir en el día; los duraznos se oxidan.',
  'https://images.pexels.com/photos/406152/pexels-photo-406152.jpeg'),

(44, 'Naranja y zanahoria con jengibre', 'Ensalada cítrica de naranja y zanahoria rallada con aderezo asiático', 'frutal',
  '["almuerzo","snack"]'::jsonb, 12, 2, 'facil',
  TRUE, TRUE, TRUE, TRUE, TRUE, 'naranja', 6,
  '[
    {"nombre":"naranjas","cantidad":"2 unidades"},
    {"nombre":"zanahoria","cantidad":"2 unidades"},
    {"nombre":"jengibre fresco rallado","cantidad":"1/2 cdta"},
    {"nombre":"aderezo ajonjolí y jengibre","cantidad":"3 cdas"},
    {"nombre":"semillas de sésamo","cantidad":"1 cda"}
  ]'::jsonb,
  '[
    "Pelar las naranjas y cortar en rodajas o gajos.",
    "Rallar las zanahorias.",
    "Mezclar en un bol con el jengibre fresco.",
    "Sumar el aderezo y las semillas de sésamo."
  ]'::jsonb,
  'Usar naranjas de jugo y zanahorias recién ralladas para máximo sabor.',
  'Consumir en el día; las naranjas sueltan jugo con el tiempo.',
  'https://images.pexels.com/photos/1640774/pexels-photo-1640774.jpeg'),

(45, 'Frutillas con balsámico y pimienta', 'Frutillas marinadas con vinagreta balsámica y pimienta negra', 'frutal',
  '["snack","postre","reunión"]'::jsonb, 10, 2, 'facil',
  FALSE, TRUE, TRUE, TRUE, TRUE, 'frutillas', 9,
  '[
    {"nombre":"frutillas","cantidad":"2 tazas"},
    {"nombre":"aderezo vinagreta de frambuesa","cantidad":"2 cdas"},
    {"nombre":"pimienta negra molida","cantidad":"1/4 cdta"},
    {"nombre":"albahaca fresca","cantidad":"4 hojas"}
  ]'::jsonb,
  '[
    "Lavar y cortar las frutillas en cuartos.",
    "Mezclar con la vinagreta y la pimienta.",
    "Dejar marinar 10 minutos.",
    "Decorar con hojas de albahaca al servir."
  ]'::jsonb,
  'La pimienta negra con frutillas es una combinación clásica francesa; no saltear este paso.',
  'Consumir en el día; las frutillas se ablandan.',
  'https://images.pexels.com/photos/5419336/pexels-photo-5419336.jpeg'),

(46, 'Melón, jamón y rúcula', 'Clásico italiano de melón con jamón crudo sobre rúcula', 'frutal',
  '["almuerzo","cena","reunión"]'::jsonb, 10, 2, 'facil',
  FALSE, TRUE, TRUE, FALSE, FALSE, 'melón', 5,
  '[
    {"nombre":"melón maduro","cantidad":"1/2 unidad"},
    {"nombre":"jamón crudo","cantidad":"80 g"},
    {"nombre":"rúcula","cantidad":"2 tazas"},
    {"nombre":"aderezo vinagreta balsámica","cantidad":"3 cdas"},
    {"nombre":"pimienta negra","cantidad":"a gusto"}
  ]'::jsonb,
  '[
    "Cortar el melón en gajos retirando la cáscara.",
    "Disponer la rúcula en un plato.",
    "Colocar los gajos de melón y las láminas de jamón crudo.",
    "Rociar con la vinagreta balsámica y moler pimienta negra por encima."
  ]'::jsonb,
  'El melón debe estar perfectamente maduro; este plato depende de la fruta.',
  'Armar al momento; el jamón y el melón no se guardan bien juntos.',
  'https://images.pexels.com/photos/1099680/pexels-photo-1099680.jpeg'),

(47, 'Kiwi y espinaca con frambuesa', 'Ensalada de espinaca con kiwi, frambuesas y aderezo de frambuesa', 'frutal',
  '["almuerzo","snack"]'::jsonb, 10, 2, 'facil',
  FALSE, TRUE, TRUE, TRUE, TRUE, 'kiwi', 9,
  '[
    {"nombre":"espinaca baby","cantidad":"2 tazas"},
    {"nombre":"kiwi","cantidad":"2 unidades"},
    {"nombre":"frambuesas frescas o congeladas","cantidad":"1/2 taza"},
    {"nombre":"semillas de chía","cantidad":"1 cdta"},
    {"nombre":"aderezo vinagreta de frambuesa","cantidad":"3 cdas"}
  ]'::jsonb,
  '[
    "Lavar la espinaca.",
    "Pelar y cortar el kiwi en rodajas.",
    "Disponer la espinaca en un plato.",
    "Sumar el kiwi y las frambuesas.",
    "Rociar con la vinagreta y terminar con semillas de chía."
  ]'::jsonb,
  'El contraste ácido del kiwi con el aderezo frutal es muy refrescante.',
  'Consumir de inmediato.',
  'https://images.pexels.com/photos/5419336/pexels-photo-5419336.jpeg'),

(48, 'Ananá, pollo y miel mostaza', 'Ensalada tropical con ananá, pollo a la plancha y aderezo dulce', 'frutal',
  '["almuerzo","cena"]'::jsonb, 20, 2, 'facil',
  FALSE, TRUE, TRUE, FALSE, FALSE, 'ananá', 3,
  '[
    {"nombre":"ananá fresco","cantidad":"1/2 unidad"},
    {"nombre":"pechuga de pollo cocida","cantidad":"200 g"},
    {"nombre":"rúcula","cantidad":"2 tazas"},
    {"nombre":"cebolla morada","cantidad":"1/4 unidad"},
    {"nombre":"aderezo miel y mostaza","cantidad":"4 cdas"}
  ]'::jsonb,
  '[
    "Cortar el ananá en cubos o rodajas.",
    "Grillar el ananá en plancha caliente 2 minutos por lado para caramelizar.",
    "Cortar el pollo cocido en tiras.",
    "Disponer la rúcula, sumar el ananá grillado, el pollo y la cebolla morada.",
    "Rociar con el aderezo miel mostaza."
  ]'::jsonb,
  'El ananá grillado cambia completamente el perfil de sabor; no omitir este paso.',
  'El ananá grillado dura 2 días; armar la ensalada al momento.',
  'https://images.pexels.com/photos/406152/pexels-photo-406152.jpeg'),

(49, 'Granada y rúcula con balsámico', 'Ensalada elegante de rúcula con granada y vinagreta balsámica', 'frutal',
  '["cena","reunión","cena_especial"]'::jsonb, 12, 2, 'facil',
  FALSE, TRUE, TRUE, TRUE, TRUE, 'granada', 5,
  '[
    {"nombre":"rúcula","cantidad":"2 tazas"},
    {"nombre":"granada","cantidad":"1 unidad"},
    {"nombre":"nueces","cantidad":"2 cdas"},
    {"nombre":"queso parmesano en láminas","cantidad":"2 cdas"},
    {"nombre":"aderezo vinagreta balsámica","cantidad":"3 cdas"}
  ]'::jsonb,
  '[
    "Desgranar la granada.",
    "Disponer la rúcula en un plato.",
    "Sumar los granos de granada, las nueces y el parmesano.",
    "Rociar con la vinagreta balsámica al momento de servir."
  ]'::jsonb,
  'Para desgranar la granada fácil: cortar al medio y golpear con cuchara sobre un bol.',
  'Armar al momento; los granos de granada sueltan color.',
  'https://images.pexels.com/photos/1099680/pexels-photo-1099680.jpeg'),

(50, 'Mix de frutas y hojas con frambuesa', 'Ensalada completa de frutas de estación con hojas y vinagreta de frambuesa', 'frutal',
  '["almuerzo","snack","reunión","cumpleaños"]'::jsonb, 15, 4, 'facil',
  FALSE, TRUE, TRUE, TRUE, TRUE, 'mix de frutas', 9,
  '[
    {"nombre":"mix de hojas verdes","cantidad":"4 tazas"},
    {"nombre":"frutillas","cantidad":"1 taza"},
    {"nombre":"arándanos","cantidad":"1/2 taza"},
    {"nombre":"durazno o mango","cantidad":"1 unidad"},
    {"nombre":"almendras laminadas tostadas","cantidad":"3 cdas"},
    {"nombre":"aderezo vinagreta de frambuesa","cantidad":"5 cdas"}
  ]'::jsonb,
  '[
    "Lavar todas las frutas y hojas.",
    "Cortar el durazno o mango en gajos.",
    "Disponer las hojas en una fuente.",
    "Distribuir las frutas y las almendras.",
    "Rociar con la vinagreta de frambuesa al momento de servir."
  ]'::jsonb,
  'Usar frutas de estación; la ensalada frutal depende de la calidad de la fruta.',
  'Armar al momento; las hojas se marchitan con el aderezo.',
  'https://images.pexels.com/photos/5419336/pexels-photo-5419336.jpeg')

ON CONFLICT (id) DO NOTHING;
