class TagsTable {
  constructor(client) {
    this.client = client;
  }

  createTags = async function (tagList) {
    if (tagList.length === 0) {
      return;
    }

    const insertValues = tagList
      .map((_, index) => `$${index + 1}`)
      .join("), (");

    const selectValues = tagList.map((_, index) => `$${index + 1}`).join(", ");

    try {
      await this.client.query(
        `
            INSERT INTO tags(name)
            VALUES(${insertValues})
            ON CONFLICT (name) DO NOTHING;
            `,
        tagList
      );

      const { rows } = await this.client.query(
        `
        SELECT * FROM tags
        WHERE name
        IN (${selectValues});
        `,
        tagList
      );

      return rows;
    } catch (error) {
      throw error;
    }
  };

  getTagsForPost = async function (postId) {
    try {
      const { rows: tags } = await this.client.query(
        `
            SELECT tags.*
            FROM tags
            JOIN post_tags ON tags.id=post_tags."tagId"
            WHERE post_tags."postId"=$1;
          `,
        [postId]
      );

      return tags;
    } catch (error) {
      throw error;
    }
  };
}

module.exports = TagsTable;
