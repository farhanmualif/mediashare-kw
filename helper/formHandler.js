export default function formHandler(request) {
  if (request.nominal === "") {
    request.nominal = 0;
  }

  if (request.paymentMethod === "Choose...") {
    request.paymentMethod = "";
  }

  if (request.startFrom === "") {
    request.startFrom = "0";
  }

  if (request.duration === "") {
    request.duration = "5";
  }
  return request;
}
