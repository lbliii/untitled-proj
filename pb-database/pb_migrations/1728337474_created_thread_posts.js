/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const collection = new Collection({
    "id": "col_thread_posts_12345",
    "created": "2024-10-07 21:44:34.341Z",
    "updated": "2024-10-07 21:44:34.341Z",
    "name": "thread_posts",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "fld_tp_thread",
        "name": "thread",
        "type": "relation",
        "required": true,
        "presentable": false,
        "unique": false,
        "options": {
          "collectionId": "col_threads_12345",
          "cascadeDelete": false,
          "minSelect": null,
          "maxSelect": 1,
          "displayFields": null
        }
      },
      {
        "system": false,
        "id": "fld_tp_user",
        "name": "user",
        "type": "relation",
        "required": true,
        "presentable": false,
        "unique": false,
        "options": {
          "collectionId": "_pb_users_auth_",
          "cascadeDelete": false,
          "minSelect": null,
          "maxSelect": 1,
          "displayFields": null
        }
      },
      {
        "system": false,
        "id": "fld_tp_character",
        "name": "character",
        "type": "relation",
        "required": false,
        "presentable": false,
        "unique": false,
        "options": {
          "collectionId": "col_characters_12345",
          "cascadeDelete": false,
          "minSelect": null,
          "maxSelect": 1,
          "displayFields": null
        }
      },
      {
        "system": false,
        "id": "fld_tp_content",
        "name": "content",
        "type": "text",
        "required": true,
        "presentable": false,
        "unique": false,
        "options": {
          "min": null,
          "max": null,
          "pattern": ""
        }
      },
      {
        "system": false,
        "id": "fld_tp_word_count",
        "name": "word_count",
        "type": "number",
        "required": false,
        "presentable": false,
        "unique": false,
        "options": {
          "min": 0,
          "max": null,
          "noDecimal": false
        }
      }
    ],
    "indexes": [],
    "listRule": "",
    "viewRule": "",
    "createRule": "@request.auth.id != ''",
    "updateRule": "@request.auth.id = user.id || @request.auth.role = 'admin' || @request.auth.role = 'moderator'",
    "deleteRule": "@request.auth.id = user.id || @request.auth.role = 'admin' || @request.auth.role = 'moderator'",
    "options": {}
  });

  return Dao(db).saveCollection(collection);
}, (db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("col_thread_posts_12345");

  return dao.deleteCollection(collection);
})
