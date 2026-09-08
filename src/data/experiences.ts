export type Experience = {
  id: string;
  name: string;
  description: string;
};

export const experiences = [
  {
    id: "scenic-views",
    name: "Scenic Views",
    description:
      "Viewpoints, panoramas, overlooks, and other places with exceptional scenery across Kyushu.",
  },
  {
    id: "sunrise",
    name: "Sunrise",
    description:
      "Places in Kyushu that are especially rewarding around sunrise.",
  },
  {
    id: "sunset",
    name: "Sunset",
    description:
      "Places in Kyushu that are especially rewarding around sunset.",
  },
  {
    id: "scenic-drives",
    name: "Scenic Drives",
    description:
      "Roads and driving routes where the journey and surrounding scenery are part of the experience.",
  },
  {
    id: "forest-walks",
    name: "Forest Walks",
    description:
      "Walks through forests, wooded landscapes, and other natural environments.",
  },
  {
    id: "swimming",
    name: "Swimming",
    description:
      "Beaches, rivers, and other places suitable for swimming.",
  },
  {
    id: "volcanoes",
    name: "Volcanoes",
    description:
      "Volcanic landscapes, craters, mountains, and geothermal areas across Kyushu.",
  },
  {
    id: "mountains",
    name: "Mountains",
    description:
      "Mountain landscapes, viewpoints, walks, and destinations across Kyushu.",
  },
  {
    id: "walking",
    name: "Walking",
    description:
      "Places best explored on foot, from city neighborhoods to countryside routes.",
  },
  {
    id: "castles",
    name: "Castles",
    description:
      "Castles, castle ruins, and related historic sites across Kyushu.",
  },
  {
    id: "gardens",
    name: "Gardens",
    description:
      "Japanese gardens, landscaped grounds, and other notable gardens across Kyushu.",
  },
  {
    id: "food-markets",
    name: "Food Markets",
    description:
      "Markets and market districts where food is a major part of the experience.",
  },
  {
    id: "street-food",
    name: "Street Food",
    description:
      "Street food, yatai, stalls, and casual local food experiences.",
  },
  {
    id: "waterfalls",
    name: "Waterfalls",
    description:
      "Waterfalls and waterfall landscapes across Kyushu.",
  },
  {
    id: "wildlife",
    name: "Wildlife",
    description:
      "Places and activities offering opportunities to encounter wildlife.",
  },
  {
    id: "islands",
    name: "Islands",
    description:
      "Island destinations and island experiences around Kyushu.",
  },
  {
    id: "coastlines",
    name: "Coastlines",
    description:
      "Coastal scenery, seaside routes, cliffs, beaches, and waterfront landscapes.",
  },
  {
    id: "festivals",
    name: "Festivals",
    description:
      "Traditional festivals, seasonal celebrations, and local events across Kyushu.",
  },
  {
    id: "pottery",
    name: "Pottery",
    description:
      "Pottery towns, kilns, workshops, shops, and ceramic traditions across Kyushu.",
  },
  {
    id: "cycling",
    name: "Cycling",
    description:
      "Cycling routes and destinations that are especially rewarding by bicycle.",
  },
  {
    id: "boat-rides",
    name: "Boat Rides",
    description:
      "Sightseeing boats and other recreational boat trips around Kyushu.",
  },
  {
    id: "snorkeling",
    name: "Snorkeling",
    description:
      "Coastal and island locations offering snorkeling opportunities.",
  },
  {
    id: "ryokan",
    name: "Ryokan",
    description:
      "Traditional Japanese inns and destinations where a ryokan stay is part of the experience.",
  },
  {
    id: "ferry",
    name: "Ferry",
    description:
      "Ferry routes and journeys that are useful or enjoyable parts of traveling around Kyushu.",
  },
] as const satisfies readonly Experience[];

export type ExperienceId =
  (typeof experiences)[number]["id"];

export const experienceIds = experiences.map(
  (experience) => experience.id,
) as [ExperienceId, ...ExperienceId[]];

export const getExperience = (id: ExperienceId) =>
  experiences.find(
    (experience) => experience.id === id,
  );