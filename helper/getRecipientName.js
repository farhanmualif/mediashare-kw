export default function getRecipientName(params) {
  const splitLinkDonatur = params.split("/");
    const recipientsName = splitLinkDonatur[splitLinkDonatur.length - 1];
    return recipientsName
}