/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const collection = new Collection({
    "id": "p6ssd7ndzqsay9g",
    "created": "2024-10-07 20:47:03.606Z",
    "updated": "2024-10-07 20:47:03.606Z",
    "name": "badges",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "hwkhqylt",
        "name": "name",
        "type": "text",
        "required": true,
        "presentable": false,
        "unique": true,
        "options": {
          "min": 3,
          "max": 128,
          "pattern": ""
        }
      },
      {
        "system": false,
        "id": "hg3ui9xq",
        "name": "description",
        "type": "text",
        "required": true,
        "presentable": false,
        "unique": true,
        "options": {
          "min": 8,
          "max": 128,
          "pattern": ""
        }
      },
      {
        "system": false,
        "id": "mabrrloh",
        "name": "thumbnail",
        "type": "file",
        "required": true,
        "presentable": false,
        "unique": false,
        "options": {
          "mimeTypes": [
            "image/jpg",
            "image/jpeg",
            "image/png",
            "image/svg+xml",
            "image/gif"
          ],
          "thumbs": [],
          "maxSelect": 1,
          "maxSize": 5242880,
          "protected": false
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
  const collection = dao.findCollectionByNameOrId("p6ssd7ndzqsay9g");

  return dao.deleteCollection(collection);
})
