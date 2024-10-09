/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("col_forums_12345")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "kjx6snyu",
    "name": "slug",
    "type": "text",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null,
      "pattern": ""
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("col_forums_12345")

  // remove
  collection.schema.removeField("kjx6snyu")

  return dao.saveCollection(collection)
})
