/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("col_forums_12345")

  collection.createRule = "@request.auth.id != ''"
  collection.updateRule = "@request.auth.id = owner.id || @request.auth.role = 'admin'"
  collection.deleteRule = "@request.auth.id = owner.id || @request.auth.role = 'admin'"

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "rd0zx9tq",
    "name": "owner",
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
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("col_forums_12345")

  collection.createRule = "@request.auth.role = 'admin'"
  collection.updateRule = ""
  collection.deleteRule = "@request.auth.role = 'admin'"

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "rd0zx9tq",
    "name": "owner",
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
})
