/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const collection = new Collection({
    "id": "sixj0chjjarvo7a",
    "created": "2024-10-07 20:47:03.606Z",
    "updated": "2024-10-07 20:47:03.606Z",
    "name": "tags",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "gxg2n7js",
        "name": "name",
        "type": "text",
        "required": false,
        "presentable": false,
        "unique": true,
        "options": {
          "min": 2,
          "max": 64,
          "pattern": ""
        }
      }
    ],
    "indexes": [],
    "listRule": "",
    "viewRule": "",
    "createRule": null,
    "updateRule": null,
    "deleteRule": null,
    "options": {}
  });

  return Dao(db).saveCollection(collection);
}, (db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("sixj0chjjarvo7a");

  return dao.deleteCollection(collection);
})
