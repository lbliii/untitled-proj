/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const collection = new Collection({
    "id": "col_character_relationships_12345",
    "created": "2024-10-07 21:44:34.341Z",
    "updated": "2024-10-07 21:44:34.341Z",
    "name": "character_relationships",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "fld_cr_character_1",
        "name": "character_1",
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
        "id": "fld_cr_character_2",
        "name": "character_2",
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
        "id": "fld_cr_relationship_type",
        "name": "relationship_type",
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
        "id": "fld_cr_description",
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
      }
    ],
    "indexes": [],
    "listRule": "",
    "viewRule": "",
    "createRule": "@request.auth.id != ''",
    "updateRule": "@request.auth.id = character_1.user.id || @request.auth.id = character_2.user.id || @request.auth.role = 'admin'",
    "deleteRule": "@request.auth.id = character_1.user.id || @request.auth.id = character_2.user.id || @request.auth.role = 'admin'",
    "options": {}
  });

  return Dao(db).saveCollection(collection);
}, (db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("col_character_relationships_12345");

  return dao.deleteCollection(collection);
})
