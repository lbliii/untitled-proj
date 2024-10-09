/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const collection = new Collection({
    "id": "col_notifications_12345",
    "created": "2024-10-07 21:44:34.342Z",
    "updated": "2024-10-07 21:44:34.342Z",
    "name": "notifications",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "fld_notifications_user",
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
        "id": "fld_notifications_message",
        "name": "message",
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
        "id": "fld_notifications_is_read",
        "name": "is_read",
        "type": "bool",
        "required": false,
        "presentable": false,
        "unique": false,
        "options": {}
      }
    ],
    "indexes": [],
    "listRule": "@request.auth.id = user.id",
    "viewRule": "@request.auth.id = user.id",
    "createRule": "@request.auth.id != ''",
    "updateRule": "@request.auth.id = user.id",
    "deleteRule": "@request.auth.id = user.id",
    "options": {}
  });

  return Dao(db).saveCollection(collection);
}, (db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("col_notifications_12345");

  return dao.deleteCollection(collection);
})
