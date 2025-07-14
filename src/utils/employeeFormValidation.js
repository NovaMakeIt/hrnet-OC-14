// Validation logic for CreateEmployee form

export function validateEmployeeForm(form) {
  const errors = {};
  // First Name & Last Name
  ["firstName", "lastName"].forEach(field => {
    const val = form[field];
    if (!val) {
      errors[field] = 'Ce champ est requis';
    } else if (/^\s|\s$/.test(val)) {
      errors[field] = "Pas d'espace au début ou à la fin";
    } else if (/ {2,}/.test(val)) {
      errors[field] = "Pas d'espaces multiples";
    } else if (!/^[A-Za-zÀ-ÖØ-öø-ÿ'’ -]+$/.test(val)) {
      errors[field] = "Lettres, espaces, tirets ou apostrophes uniquement";
    }
  });
  // City
  const cityVal = form.city;
  if (!cityVal) {
    errors.city = 'Ce champ est requis';
  } else if (/^\s|\s$/.test(cityVal)) {
    errors.city = "Pas d'espace au début ou à la fin";
  } else if (/ {2,}/.test(cityVal)) {
    errors.city = "Pas d'espaces multiples";
  } else if (!/^[A-Za-zÀ-ÖØ-öø-ÿ'’ -]+$/.test(cityVal)) {
    errors.city = "Lettres, espaces, tirets ou apostrophes uniquement";
  }
  // Street
  const streetVal = form.street;
  if (!streetVal) {
    errors.street = 'Ce champ est requis';
  } else if (/^\s|\s$/.test(streetVal)) {
    errors.street = "Pas d'espace au début ou à la fin";
  } else if (/ {2,}/.test(streetVal)) {
    errors.street = "Pas d'espaces multiples";
  } else if (!/^[A-Za-zÀ-ÖØ-öø-ÿ0-9'’ .,-]+$/.test(streetVal)) {
    errors.street = "Pas de caractères spéciaux";
  }
  // Zip Code
  const zipVal = form.zipCode;
  if (!zipVal) {
    errors.zipCode = 'Ce champ est requis';
  } else if (/^\s|\s$/.test(zipVal)) {
    errors.zipCode = "Pas d'espace au début ou à la fin";
  } else if (/ {2,}/.test(zipVal)) {
    errors.zipCode = "Pas d'espaces multiples";
  } else if (!/^[0-9 ]+$/.test(zipVal)) {
    errors.zipCode = "Chiffres uniquement";
  }
  // Champs obligatoires restants
  ["dateOfBirth", "startDate", "state", "department"].forEach(key => {
    if (!form[key]) {
      errors[key] = 'Ce champ est requis';
    }
  });
  return errors;
}
