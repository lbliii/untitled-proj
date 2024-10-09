/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("xdpgh3fikj0tetr")

  collection.createRule = "@request.auth.id != ''"
  collection.updateRule = "@request.auth.id = owner.id || @request.auth.role = 'admin' || @request.auth.role = 'moderator'"
  collection.deleteRule = "@request.auth.id = owner.id || @request.auth.role = 'admin' || @request.auth.role = 'moderator'"

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "fld_posts_owner",
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
  const collection = dao.findCollectionByNameOrId("xdpgh3fikj0tetr")

  collection.createRule = ""
  collection.updateRule = ""
  collection.deleteRule = null

  // remove
  collection.schema.removeField("fld_posts_owner")

  return dao.saveCollection(collection)
})
