export const languages = [
  { name: "English", code: "en" },
  { name: "Telugu", code: "te" },
  { name: "Hindi", code: "hi" },
  { name: "Tamil", code: "ta" },
  { name: "Kannada", code: "kn" },
];

export const additionalLanguages = [{ name: "Marathi", code: "mr" }];

export const getLanguages = (includeAdditional) => {
  let customLang = [];
  customLang = languages.map((lang) => {
    return {
      label: lang.name,
      value: lang.code,
    };
  });
  if (includeAdditional) {
    customLang = customLang.concat(
      additionalLanguages.map((lang) => {
        return {
          label: lang.name,
          value: lang.code,
        };
      })
    );
  }
  return customLang;
};
