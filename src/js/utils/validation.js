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
  },
  modalPosterUrl(data) {
    data.map(item => {
      item.images = item.images.find(item => item.width === 1024 && item.height === 683);
    });
    return data;
  }
};
