// Find and rank posts from the same destination.

const sharedCount = (
  first: readonly string[] | undefined,
  second: readonly string[] | undefined,
): number => {
  if (!first || !second) return 0;

  return first.filter((value) => second.includes(value)).length;
};

const similarItems = (
  currentItem: any,
  allItems: any[],
  limit = 3,
) => {
  const current = currentItem.data;

  // If the current article has no destination,
  // there is no destination-based related section.
  if (!current.destination) {
    return [];
  }

  const scoredItems = allItems
    .filter((item: any) => {
      // Never include the current article
      if (item.id === currentItem.id) {
        return false;
      }

      // Never include drafts
      if (item.data.draft) {
        return false;
      }

      // Critical rule:
      // "More from Aso" means ONLY Aso content.
      if (item.data.destination !== current.destination) {
        return false;
      }

      return true;
    })

    .map((item: any) => {
      const candidate = item.data;

      let score = 0;

      // Same area gets strongest boost
      if (
        current.area &&
        candidate.area &&
        current.area === candidate.area
      ) {
        score += 10;
      }

      // Shared experiences
      score +=
        sharedCount(
          current.experiences,
          candidate.experiences,
        ) * 3;

      // Shared categories
      score +=
        sharedCount(
          current.categories,
          candidate.categories,
        ) * 2;

      // Shared recommended months
      score +=
        sharedCount(
          current.bestMonths,
          candidate.bestMonths,
        );

      // Slight preference for featured content
      if (candidate.type === "featured") {
        score += 2;
      }

      return {
        item,
        score,
      };
    })

    .sort((a, b) => {
      if (b.score !== a.score) {
        return b.score - a.score;
      }

      // Newer article wins ties
      const aDate = a.item.data.date
        ? new Date(a.item.data.date).getTime()
        : 0;

      const bDate = b.item.data.date
        ? new Date(b.item.data.date).getTime()
        : 0;

      return bDate - aDate;
    })

    .slice(0, limit)

    .map(({ item }) => item);

  return scoredItems;
};

export default similarItems;