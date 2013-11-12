var out =  null;

exports.execute = function(execSync){
   var result = execSync.exec('squeue -t RUNNING --noheader --format=\"%i|%N\"');
   out = result.stdout.split('\n');
   return out;
}

function _splitHostNames(execSync, hosts){
   var result = execSync.exec('scontrol show hostnames ' + hosts);
   var temp = result.stdout.split('\n');
   temp.pop();
   return temp;
}

exports.parse = function(execSync){
   var res = new Array();
   for(var i = 0; i< out.length; i++){
      var temp = out[i].split("|");
      var hosts = _splitHostNames(execSync, temp[1]);
      var link = _createLink(_createRegex(hosts));
      res[i] = new Array(temp[0], link);
   }
   return res;
}

function _createRegex(hosts){
   return hosts.join('|');
}

function _createLink(hosts){
   var url1 = "https://baobab.unige.ch/ganglia2/?r=hour&cs=&ce=&m=load_one&s=by+name&c=DALCO+Cluster&h=&host_regex=";
   var url2 = "&max_graphs=0&tab=m&vn=&sh=1&z=small&hc=2";
   return url1 + hosts + url2;
}
 
