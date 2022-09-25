class PostTagsTable {
  constructor(client) {
    this.client = client;
  }

  createPostTag = async function (postId, tagId) {
    try {
      await this.client.query(
        `
            INSERT INTO post_tags("postId", "tagId")
            VALUES ($1, $2)
            ON CONFLICT ("postId", "tagId") DO NOTHING;
          `,
        [postId, tagId]
      );
    } catch (error) {
      throw error;
    }
  };

  deletePostTagsForPostNotMatchingIds = async function name(postId, tagIds) {
    try {
      const tagListIdString = tagIds.map((tag) => `${tag}`).join(", ");

      await this.client.query(
        `
      DELETE FROM post_tags
      WHERE "tagId"
      NOT IN (${tagListIdString})
      AND "postId"=$1;
    `,
        [postId]
      );
    } catch (error) {
      throw error;
    }
  };
}

module.exports = PostTagsTable;
