
function CategoryValidation(values) {
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

  if (values.catname != "" && values.catname.trim().length < 4) {
    errors.catname = "Minimum of 4 characters required";
  }

  if (values.catdesc != "" && values.catdesc.trim().length < 10) {
    errors.catdesc = "Minimum of 10 characters required";
  }
  if (values.catimg != "" && isInValidUrl(values.catimg)) {
    errors.catimg = "Enter correct Image url";
  }

  return errors;
}

export default CategoryValidation;
