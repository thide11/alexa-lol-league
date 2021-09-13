module.exports = function() {
  let data = {}

  async function getUserDataByAmazonId(id) {
    return data[id]
  }

  async function saveUserDataByAmazonId(id, newData) {
    console.log(newData);
    data[id] = newData;
  }

  return {
    getUserDataByAmazonId,
    saveUserDataByAmazonId,
  }
}()