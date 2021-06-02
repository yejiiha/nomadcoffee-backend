export const processCategories = (data: string) => {
  const categories = data.match(/[^,]+/g) || [];
  return categories.map((category) => {
    const slug = category.trim().replace(/\s+/g, "-").toLowerCase();
    return {
      where: { name: category },
      create: { name: category, slug },
    };
  });
};
