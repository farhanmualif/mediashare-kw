const tiktokEmbed = document.getElementById("tiktok");

function test() {
  console.log("hello world");
}

function playTikTokVideo(tiktokData) {
  const html = tiktokData.tiktokEmbed.html;
  tiktokEmbed.innerHTML = html;
}

function playNextVideo() {
  if (videoQueue.length === 0) {
    return;
  }

  const dataMedia = videoQueue.shift();
  if (dataMedia.typeMedia == "youtube") {
    playYoutubeVideo(
      dataMedia.id,
      getIDfromURLYoutube(dataMedia.linkMedia),
      dataMedia.startAtSecond,
      dataMedia.duration
    );
  } else if (dataMedia.typeMedia == "tiktok") {
    playTikTokVideo(dataMedia);
  }
  return dataMedia;
}

function getIDfromURLYoutube(url) {
  const regExp =
    /^.*(youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
  const match = url.match(regExp);
  if (match && match[2].length === 11) {
    return match[2];
  }
  console.log("The supplied URL is not a valid youtube URL");
  return "";
}

function sendTriggerStatusVideo(status, id) {
  socket.emit("the video has played", {
    status: status,
    id: id,
  });
}
