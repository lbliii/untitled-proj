/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const collection = new Collection({
    "id": "col_plots_12345",
    "created": "2024-10-07 21:44:34.341Z",
    "updated": "2024-10-07 21:44:34.341Z",
    "name": "plots",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "fld_plots_character",
        "name": "character",
        "type": "relation",
        "required": true,
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
        "id": "fld_plots_title",
        "name": "title",
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
        "id": "fld_plots_description",
        "name": "description",
        "type": "text",
        "required": false,
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
        "id": "fld_plots_status",
        "name": "status",
        "type": "select",
        "required": false,
        "presentable": false,
        "unique": false,
        "options": {
          "maxSelect": 1,
          "values": [
            "planned",
            "in_progress",
            "completed",
            "abandoned"
          ]
        }
      }
    ],
    "indexes": [],
    "listRule": "",
    "viewRule": "",
    "createRule": "@request.auth.id != ''",
    "updateRule": "@request.auth.id = character.user.id || @request.auth.role = 'admin'",
    "deleteRule": "@request.auth.id = character.user.id || @request.auth.role = 'admin'",
    "options": {}
  });

  return Dao(db).saveCollection(collection);
}, (db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("col_plots_12345");

  return dao.deleteCollection(collection);
})
