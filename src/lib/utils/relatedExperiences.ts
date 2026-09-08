import {
  getExperience,
  type ExperienceId,
} from "@/data/experiences";

const relatedExperiences = (
  currentItem: any,
  allItems: any[],
  postsPerExperience = 3,
  maxExperienceGroups = 3,
) => {
  const currentExperiences: ExperienceId[] =
    currentItem.data.experiences ?? [];

  const usedPostIds = new Set<string>();
  const groups: any[] = [];

  for (const experienceId of currentExperiences) {
    if (groups.length >= maxExperienceGroups) {
      break;
    }

    const experience = getExperience(experienceId);

    if (!experience) {
      continue;
    }

    const posts = allItems
      .filter((item: any) => {
        if (item.id === currentItem.id) {
          return false;
        }

        if (item.data.draft) {
          return false;
        }

        if (usedPostIds.has(item.id)) {
          return false;
        }

        return (
          item.data.experiences?.includes(experienceId) ??
          false
        );
      })

      .map((item: any) => {
        let score = 0;

        if (
          currentItem.data.area &&
          item.data.area === currentItem.data.area
        ) {
          score += 10;
        }

        if (
          currentItem.data.destination &&
          item.data.destination ===
            currentItem.data.destination
        ) {
          score += 8;
        }

        if (
          currentItem.data.prefecture &&
          item.data.prefecture ===
            currentItem.data.prefecture
        ) {
          score += 5;
        }

        if (item.data.type === "featured") {
          score += 2;
        }

        return {
          item,
          score,
        };
      })

      .sort((a: any, b: any) => {
        if (b.score !== a.score) {
          return b.score - a.score;
        }

        const aDate = a.item.data.date
          ? new Date(a.item.data.date).getTime()
          : 0;

        const bDate = b.item.data.date
          ? new Date(b.item.data.date).getTime()
          : 0;

        return bDate - aDate;
      })

      .slice(0, postsPerExperience)

      .map(({ item }: any) => item);

    if (posts.length === 0) {
      continue;
    }

    posts.forEach((post: any) => {
      usedPostIds.add(post.id);
    });

    groups.push({
      experience,
      posts,
    });
  }

  return groups;
};

export default relatedExperiences;