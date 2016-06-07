/**
 * Extracts the jobs history of a given user
 *
 * @author ysagon@gmail.com (Yann Sagon)
 */


/**
 * Use sacct to extract informations about the terminated jobs of a user
 * @param {string} value time in slurm format (JJ-HH:MM:SS)
 * @return {mixed} nb of sec or false
 */
exports.convertSlurmDateToSec = function(value) {
  // pattern to match a slurm date: JJ-HH:MM:SS
  var pattern = /^(?:([0-9]{1,2})-)?(?:(\d\d):)?(?:(\d\d):)?(\d\d)/;
  // 1 day = 24 * 60 * 60
  // 1 hour = 60 * 60
  // 1 min = 60

  var nbSec = 0;

  var res = pattern.exec(value);

  if (res) {
    switch (res.length) {
      case 4:
      case 5: {
        if (parseInt(res[1])) {
          nbSec += parseInt(res[1]) * 24 * 60 * 60;
        }
        if (parseInt(res[2])) {
          nbSec += parseInt(res[2]) * 60 * 60;
        }
        if (parseInt(res[3])) {
          nbSec += parseInt(res[3]) * 60;
        }
        if (parseInt(res[4])) {
          nbSec += parseInt(res[4]);
        }
        break;
      }
      default:
        {
          console.log('stange format: ' + res[0]);
          return false;
        }
    }
    return nbSec;
  } else {
    return false;
  }
};
