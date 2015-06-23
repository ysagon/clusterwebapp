/**
 * Extracts the nodes allocated to each job.
 * Once the data are extracted, it create a link with a regexp
 * to ganglia2. The idea is that we want to see the nodes associated with
 * each job separately.
 *
 * @author ysagon@gmail.com (Yann Sagon)
 */


/** array out to store the results */
var out = null;


/**
 * Run squeue to extract the job id and node list of
 * all running jobs
 * @param {object} execSync an object that allows to exec.
 * @return {array} Array of string, one element per job.
 */
exports.execute = function(execSync) {
  var result = execSync.exec(
      'squeue -a -t RUNNING --noheader --format=\"%i|%N\"');
  out = result.stdout.split('\n');
  out.pop();
  return out;
};


/**
 * Associate a ganglia link for each job
 * @param {object} execSync an object that allow to exec.
 * @return {array} Array of two elements: id and link
 */
exports.parse = function(execSync) {
  var res = new Array();
  for (var i = 0; i < out.length; i++) {
    var temp = out[i].split('|');
    var hosts = _splitHostNames(execSync, temp[1]);
    var link = _createLink(_createRegex(hosts));
    res[i] = new Array(temp[0], link);
  }
  return res;
};

function _splitHostNames(execSync, hosts) {
  var result = execSync.exec('scontrol show hostnames ' + hosts);
  var temp = result.stdout.split('\n');
  temp.pop();
  return temp;
}

function _createRegex(hosts) {
  return hosts.join('|');
}

function _createLink(hosts) {
  var url1 = 'https://baobab.unige.ch/ganglia2/?r=hour&cs=&ce=&m=load_one' +
      '&s=by+name&c=Baobab&h=&host_regex=';
  var url2 = '&max_graphs=0&tab=m&vn=&sh=2&z=small&hc=0';
  return url1 + hosts + url2;
}

