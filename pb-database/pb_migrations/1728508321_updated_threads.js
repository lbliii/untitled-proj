/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("col_threads_12345")

  collection.updateRule = "@request.auth.id = owner.id || @request.auth.role = 'admin' || @request.auth.role = 'moderator'"
  collection.deleteRule = "@request.auth.id = owner.id || @request.auth.role = 'admin' || @request.auth.role = 'moderator'"

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "fld_threads_owner",
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
  const collection = dao.findCollectionByNameOrId("col_threads_12345")

  collection.updateRule = "@request.auth.id = user.id || @request.auth.role = 'admin' || @request.auth.role = 'moderator'"
  collection.deleteRule = "@request.auth.id = user.id || @request.auth.role = 'admin' || @request.auth.role = 'moderator'"

  // remove
  collection.schema.removeField("fld_threads_owner")

  return dao.saveCollection(collection)
})
