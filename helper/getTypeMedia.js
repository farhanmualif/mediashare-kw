export default function getTypeMedia(linkMedia) {
  console.log("link media", linkMedia);
  const linkSlplited = linkMedia.split("/");
  const typeMedia = linkSlplited[2].split(".")[1];
  return typeMedia;
}
