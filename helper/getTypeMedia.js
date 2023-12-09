export default function getTypeMedia(mediaLink) {
  const splited = mediaLink.split("/");
  const getLink = splited[2];
  const linkSplited = getLink.split(".");
  return linkSplited[1];
}
