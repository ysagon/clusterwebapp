/**
 * Extracts the users that belongs to a given group (in grouper)
 *
 * @author ysagon@gmail.com (Yann Sagon)
 */

/**
 * @param {function} myCb a callback to be called with one paramter when done
 */
exports.execute = function(myCb) {
   var assert = require('assert');
   var ldap = require('ldapjs');
   var fs = require('fs');
   var yaml = require('yaml');
   var async = require('async');
   var config = require('config').LDAP;
   // the ldap client handler
   var client = ldap.createClient({
      url: config.url,
      maxConnections: 10,
      bindDN: config.bindDN,
      bindCredentials: config.bindCredentials,
      tlsOptions: {'ca': fs.readFileSync(config.rootCA)}
   });

  //person search base:
  var basePerson = 'ou=People,dc=unige,dc=ch';
  //group search base:
  var groupPerson = 'ou=baobab.unige.ch,' +
                    'ou=application,' +
                    'ou=Groups,' +
                    'dc=unige,dc=ch';
  //scope: one

  var adminGroupDN = 'cn=administrator,' + groupPerson;
  var userGoupDN = 'cn=user,' + groupPerson;
  var observerGroupDN = 'cn=observer,' + groupPerson;

  var optsGroup = {
    scope: 'sub',
    filter: '(objectclass=*)',
    attributes: 'uniqueMember'
  };

  var optsPeople = {
    scope: 'sub',
    filter: '(objectclass=*)',
    attributes: ['displayName', 'unigeChUniqueUid']
  };

  /*
   * do an ldap search
   * @param {string} dn the base dn to do the research
   * @param {object} opts options for the research (filter etc)
   * @param {function} cbEntry a callback which is called when the request
   * contains entries.
   */
  var search = function(dn, opts, cbEntry) {
    client.search(dn, opts, function(err, res) {
      assert.ifError(err);
      res.on('searchEntry', cbEntry);
      res.on('searchReference', function(referral) {
        console.log('referral: ' + referral.uris.join());
      });
      res.on('error', function(err) {
        console.error('error: ' + err.message);
      });
      res.on('end', function(result) {
        console.log('status: ' + result.status);
      });
    });
  };

  /**
   * A function to use as iterator by the async.concat
   * @param {string} item
   * @param {function} callback
   */
  var subSearch = function(item, callback) {
    search(item, optsPeople, function(entry) {
    // print every attributes
        var entryRes = new Object();
        for (var j = 0; j < optsPeople.attributes.length; j++) {
          var attr = optsPeople.attributes[j];
          entryRes[attr] = eval('entry.object.' + attr);
        }
      callback(null, [entryRes]);
    });
  };

  /*
   * callback to do a sub request to retrieve the infos of each group's member
   * @param {string} entry the result of a group research
   */
  var cb = function(entry) {
    var dn = entry.object.uniqueMember;
    async.concat(dn, subSearch, function(err, result) {
      myCb(result);
    });
  };

  search(adminGroupDN, optsGroup, cb);
};
