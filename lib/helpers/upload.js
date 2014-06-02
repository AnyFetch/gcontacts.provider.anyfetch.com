'use strict';

var request = require('request');

/**
 * Upload `contact` (containing contact data) onto AnyFetch.
 *
 *
 * @param {Object} contact Contact to upload, plus anyfetchClient
 * @param {Object} anyfetchClient Client for upload
 * @param {Object} data Data about the current account
 * @param {Object} contact Contact to upload, plus anyfetchClient
 * @param {Function} cb Callback to call once contacts has been uploaded.
 */
module.exports = function(contact, anyfetchClient, data, cb) {
  console.log("Uploading ", contact.url);
  var identifier = contact.url;

  if(contact.deleted) {
    return anyfetchClient.deleteDocument(identifier, cb);
  }

  // Download image (if any)
  var numericId = contact.id.substr(contact.id.lastIndexOf('/') + 1);
  var params = {
    encoding: null,
    url: 'https://www.google.com/m8/feeds/photos/media/default/' + numericId,
    headers: {
      'Authorization': 'OAuth ' + contact.accessToken,
      'GData-Version': '3.0'
    },
  };

  request.get(params, function (err, resp, body) {
    if(err) {
      return cb(err);
    }

    var data = {};
    if(resp.statusCode === 200) {
      data.image = 'data:image/*;base64,' + body.toString('base64');
    }

    // Build contact "the right way"
    contact = {
      identifier: identifier,
      metadata: contact,
      data: data,
      document_type: 'contact',
      actions: {
        'show': contact.url
      },
      user_access: [anyfetchClient.accessToken]
    };

    delete contact.metadata.url;
    delete contact.metadata.id;
    delete contact.metadata.accessToken;

    anyfetchClient.sendDocument(contact, cb);
  });
};