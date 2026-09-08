export type Destination = {
  id: string;
  name: string;
  prefecture: string;
  description: string;
  metaTitle?: string;
  heroImage?: string;
};

export const destinations = [
  {
    id: "fukuoka",
    name: "Fukuoka",
    prefecture: "fukuoka",
    description:
      "Kyushu's largest city, known for food, nightlife, waterfront neighborhoods, and easy access to northern Kyushu.",
  },
  {
    id: "dazaifu",
    name: "Dazaifu",
    prefecture: "fukuoka",
    description:
      "A historic destination south of Fukuoka known for Dazaifu Tenmangu, temples, museums, and traditional streets.",
  },
  {
    id: "itoshima",
    name: "Itoshima",
    prefecture: "fukuoka",
    description:
      "A coastal area west of Fukuoka known for beaches, ocean views, cafes, hiking, and sunsets.",
  },
  {
    id: "kumamoto",
    name: "Kumamoto",
    prefecture: "kumamoto",
    description:
      "A historic Kyushu city centered around Kumamoto Castle, gardens, food, and access to central Kyushu.",
  },
  {
    id: "aso",
    name: "Aso",
    prefecture: "kumamoto",
    description:
      "A volcanic region centered on the Aso caldera, with mountains, grasslands, scenic drives, hiking, and dramatic viewpoints.",
  },
  {
    id: "beppu",
    name: "Beppu",
    prefecture: "oita",
    description:
      "One of Japan's best-known hot-spring cities, famous for onsen, steam-filled neighborhoods, and the Beppu Hells.",
  },
  {
    id: "yufuin",
    name: "Yufuin",
    prefecture: "oita",
    description:
      "A mountain onsen town known for Lake Kinrin, ryokan, cafes, galleries, and views of Mount Yufu.",
  },
  {
    id: "nagasaki",
    name: "Nagasaki",
    prefecture: "nagasaki",
    description:
      "A historic port city shaped by international trade, dramatic hills, distinctive food, and modern Japanese history.",
  },
  {
    id: "kurokawa-onsen",
    name: "Kurokawa Onsen",
    prefecture: "kumamoto",
    description:
      "A mountain hot-spring village known for traditional ryokan, outdoor baths, and a compact riverside setting.",
  },
  {
    id: "kikuchi",
    name: "Kikuchi",
    prefecture: "kumamoto",
    description:
      "A rural area north of Kumamoto known for Kikuchi Gorge, forests, waterfalls, hot springs, and mountain scenery.",
  },
] as const;

export type DestinationId = (typeof destinations)[number]["id"];

export const destinationIds = destinations.map(
  (destination) => destination.id,
) as [DestinationId, ...DestinationId[]];

export const getDestination = (id: DestinationId) =>
  destinations.find((destination) => destination.id === id);