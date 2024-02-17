export const thumbnails = import.meta.glob("/static/thumbnails/*.png", {
  query: {
    enhanced: true,
    w: "1280;640;400",
  },
});
