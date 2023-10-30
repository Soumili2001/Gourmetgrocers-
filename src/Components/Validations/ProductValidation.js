

function ProductValidation(values) {
  const errors = {};
  const isInValidUrl = (urlString) => {
    var inputElement = document.createElement("input");
    inputElement.type = "url";
    inputElement.value = urlString;

    if (!inputElement.checkValidity()) {
      return true;
    } else {
      return false;
    }
  };

  if (values.prodname != "" && values.prodname.trim().length < 4) {
    errors.prodname = "Minimum of 4 characters required";
  }

  if (values.prodprice != "" && values.prodprice <= 0) {
    errors.prodprice = "Please enter a number greater than 0";
  }

  if (values.stockcount != "" && values.stockcount <= 0) {
    errors.stockcount = "Please enter a number greater than 0";
  }
  if (values.proddesc != "" && values.proddesc.trim().length < 10) {
    errors.proddesc = "Minimum of 10 characters required";
  }
  if (values.catname != "" && values.catname.trim().length < 3) {
    errors.catname = "Minimum of 3 characters required";
  }
  if (values.prodimg != "" && isInValidUrl(values.prodimg)) {
    errors.prodimg = "Enter correct Image url";
  }
  return errors;
}

export default ProductValidation;
