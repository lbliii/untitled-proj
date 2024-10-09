/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("_pb_users_auth_")

  collection.listRule = ""
  collection.viewRule = ""
  collection.options = {
    "allowEmailAuth": true,
    "allowOAuth2Auth": true,
    "allowUsernameAuth": true,
    "exceptEmailDomains": null,
    "manageRule": "id = @request.auth.id",
    "minPasswordLength": 8,
    "onlyEmailDomains": null,
    "onlyVerified": false,
    "requireEmail": false
  }

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "dftobzh0",
    "name": "division",
    "type": "select",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "maxSelect": 1,
      "values": [
        "bts",
        "corp",
        "direct",
        "ncs"
      ]
    }
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "emg0g56f",
    "name": "job_title",
    "type": "text",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "min": 2,
      "max": 64,
      "pattern": ""
    }
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "njlltxnx",
    "name": "favorites",
    "type": "relation",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "collectionId": "9ktkng9a95n6199",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": null,
      "displayFields": null
    }
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "vpllyqqq",
    "name": "likes",
    "type": "relation",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "collectionId": "9ktkng9a95n6199",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": null,
      "displayFields": null
    }
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "oksevk8o",
    "name": "following",
    "type": "relation",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "collectionId": "_pb_users_auth_",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": null,
      "displayFields": null
    }
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "93v92dwp",
    "name": "badges",
    "type": "relation",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "collectionId": "p6ssd7ndzqsay9g",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": null,
      "displayFields": null
    }
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "koc3idjp",
    "name": "post",
    "type": "relation",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "collectionId": "xdpgh3fikj0tetr",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": 1,
      "displayFields": null
    }
  }))

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "users_avatar",
    "name": "avatar",
    "type": "file",
    "required": false,
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
      "thumbs": null,
      "maxSelect": 1,
      "maxSize": 5242880,
      "protected": false
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("_pb_users_auth_")

  collection.listRule = "id = @request.auth.id"
  collection.viewRule = "id = @request.auth.id"
  collection.options = {
    "allowEmailAuth": true,
    "allowOAuth2Auth": true,
    "allowUsernameAuth": true,
    "exceptEmailDomains": null,
    "manageRule": null,
    "minPasswordLength": 8,
    "onlyEmailDomains": null,
    "onlyVerified": false,
    "requireEmail": false
  }

  // remove
  collection.schema.removeField("dftobzh0")

  // remove
  collection.schema.removeField("emg0g56f")

  // remove
  collection.schema.removeField("njlltxnx")

  // remove
  collection.schema.removeField("vpllyqqq")

  // remove
  collection.schema.removeField("oksevk8o")

  // remove
  collection.schema.removeField("93v92dwp")

  // remove
  collection.schema.removeField("koc3idjp")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "users_avatar",
    "name": "avatar",
    "type": "file",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "mimeTypes": [
        "image/jpeg",
        "image/png",
        "image/svg+xml",
        "image/gif",
        "image/webp"
      ],
      "thumbs": null,
      "maxSelect": 1,
      "maxSize": 5242880,
      "protected": false
    }
  }))

  return dao.saveCollection(collection)
})
