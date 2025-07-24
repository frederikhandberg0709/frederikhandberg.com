export const extractMediaUrls = (content: string) => {
  const imageRegex = /https:\/\/.*?\.(jpeg|jpg|png|webp)/gi;
  const videoRegex = /https:\/\/.*?\.(mp4|avi|mov)/gi;

  const imageMatches = content.match(imageRegex);
  const videoMatches = content.match(videoRegex);

  const images = imageMatches ? [...imageMatches] : [];
  const videos = videoMatches ? [...videoMatches] : [];

  return {
    images,
    videos,
  };
};
