/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("col_forums_12345")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "rd0zx9tq",
    "name": "field",
    "type": "relation",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "collectionId": "_pb_users_auth_",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": 1,
      "displayFields": null
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("col_forums_12345")

  // remove
  collection.schema.removeField("rd0zx9tq")

  return dao.saveCollection(collection)
})
