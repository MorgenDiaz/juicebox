class TagsDbModel {
  constructor(tagsTable) {
    this.tagsTable = tagsTable;
  }

  getAll = async function () {
    try {
      return await this.tagsTable.getAllTags();
    } catch (error) {
      throw error;
    }
  };
}

module.exports = TagsDbModel;
