export interface Image {
  src: string;
  alt: string;
}

export interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
  listingPrice?: number;
  stock: number;
  salesUnit: "group" | "unit" | "area";
  measurementUnit?: "m2" | "m" | "pallet" | "bolson";
  unitValue?: number;
  images?: Image[];
}

export interface Cart {
  id: string;
  items: {
    product: Product;
    quantity: number;
  }[];
  createdAt: Date;
}

export const fakeProducts: Product[] = [
  {
    id: "100012",
    title: "Ladrillo hueco 8cm x 18cm x 33cm (Pallet de 198u)",
    description: "Ladrillo hueco 8cm x 18cm x 33cm - Pallet: 198 unidades",
    price: 60588,
    listingPrice: 67320,
    stock: 5,
    salesUnit: "group",
    measurementUnit: "pallet",
    unitValue: 198,
    images: [
      {
        src: "/assets/products/brick.png",
        alt: "Hollow Brick",
      },
    ],
  },
  {
    id: "2060",
    title: "Ceramico Azabache 20Und 36X36 1ra 2,68 m2 por Caja",
    description:
      "Ceramica esmaltada 36x36, terminacion brillante, transito medio, liso, Colores disponibles: Negro",
    price: 13031,
    stock: 5,
    salesUnit: "area",
    measurementUnit: "m2",
    unitValue: 2.68,
  },
  {
    id: "10035",
    title: "Hierro 25 mm x 12 m Acindar",
    description: "HIERRO 25 MM X 12M",
    price: 76293,
    listingPrice: 89757,
    stock: 5,
    salesUnit: "unit",
  },
];

/* export const fakeProducts: Product[] = [
  {
    id: "100012",
    title: "Ladrillo hueco 8cm x 18cm x 33cm (Pallet de 198u)",
    description: "Ladrillo hueco 8cm x 18cm x 33cm - Pallet: 198 unidades",
    price: 60588,
    listingPrice: 67320,
    stock: 5,
    salesUnit: "group",
    measurementUnit: "pallet",
    unitValue: 198,
  },
  {
    id: "2060",
    title: "Ceramico Azabache 20Und 36X36 1ra 2,68 m2 por Caja",
    description:
      "Ceramica esmaltada 36x36, terminacion brillante, transito medio, liso, Colores disponibles: Negro",
    price: 13031,
    stock: 5,
    salesUnit: "area",
    measurementUnit: "m2",
    unitValue: 2.68,
  },
  {
    id: "10035",
    title: "Hierro 25 mm x 12 m Acindar",
    description: "HIERRO 25 MM X 12M",
    price: 76293,
    listingPrice: 89757,
    stock: 5,
    salesUnit: "unit",
  },
  {
    id: "20015",
    title: "Cemento Portland 50 kg",
    description: "Cemento de alta resistencia, bolsa de 50 kg",
    price: 2750,
    listingPrice: 3200,
    stock: 10,
    salesUnit: "unit",
  },
  {
    id: "30040",
    title: "Pintura Latex Interior Blanca 20L",
    description: "Pintura látex para interiores, color blanco, 20 litros",
    price: 15500,
    listingPrice: 17000,
    stock: 8,
    salesUnit: "unit",
  },
  {
    id: "40089",
    title: "Tablero MDF 18mm 1.83m x 2.44m",
    description: "Tablero MDF 18mm de espesor, ideal para muebles",
    price: 12345,
    stock: 12,
    salesUnit: "unit",
  },
  {
    id: "50012",
    title: "Teja Colonial Roja (Caja de 50 unidades)",
    description: "Tejas cerámicas coloniales, color rojo, caja con 50 unidades",
    price: 8900,
    listingPrice: 9500,
    stock: 15,
    salesUnit: "group",
    measurementUnit: "pallet",
    unitValue: 50,
  },
  {
    id: "60078",
    title: "Grifería Monocomando Cocina",
    description: "Grifería monocomando para cocina, acero inoxidable",
    price: 27999,
    listingPrice: 31000,
    stock: 6,
    salesUnit: "unit",
  },
  {
    id: "70045",
    title: "Piso Flotante Roble Oscuro 8mm (Caja 2.5 m2)",
    description: "Piso flotante de alta resistencia, color roble oscuro",
    price: 18750,
    stock: 10,
    salesUnit: "area",
    measurementUnit: "m2",
    unitValue: 2.5,
  },
  {
    id: "80031",
    title: "Tornillos autoperforantes 6mm (Bolsa 100u)",
    description:
      "Tornillos autoperforantes, 6mm de diámetro, bolsa de 100 unidades",
    price: 3200,
    stock: 20,
    salesUnit: "group",
    measurementUnit: "m2",
    unitValue: 100,
  },
  {
    id: "90050",
    title: "Puerta de Madera Maciza 80cm x 200cm",
    description: "Puerta de madera maciza con marco, 80cm x 200cm",
    price: 45000,
    listingPrice: 48000,
    stock: 4,
    salesUnit: "unit",
  },
  {
    id: "100067",
    title: "Viga IPN 120mm x 6m",
    description: "Viga IPN de acero, 120mm de altura, 6 metros de largo",
    price: 92345,
    listingPrice: 100000,
    stock: 5,
    salesUnit: "unit",
  },
]; */
