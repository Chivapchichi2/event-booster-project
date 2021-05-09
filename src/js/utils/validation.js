export default {
  imageUrl(data) {
    data.map(item => {
      item.images = item.images.find(item => item.ratio === '4_3');
    });
    return data;
  },
  transformCountriesNameIntoCode(name, data) {
  if (data.name === name) {
    countryCode = data.code;
    return
  }
  }
};
