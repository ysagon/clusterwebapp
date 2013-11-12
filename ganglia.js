exports.ganglia = function(){
  var out =  null;
  function execute(execSync){
      var result = execSync.exec('squeue -t RUNNING --noheader --format=\"%i|%N\"');
      out = result.split('\n');
      return vars.out;
   }
 
   function _splitHostNames(execSync, hosts){
      result = execSync.exec('scontrol show hostnames ' + hosts);
      return result;
   }
   function parse(){
      res = new Array();
      for(var i = 0; i< this.vars.out.length; i++){
         var temp = explode("|", this.vars.out[i]);
         var hosts = this._splitHostNames(execSync, temp[1]);
         var link = this._createLink(this._createRegex(hosts));
         res[i] = new Array(temp[0], link);
      }
      //foreach($this->out as $line){
      //   $temp = explode("|",$line);
      //   $hosts = $this->splitHostNames($temp[1]);
      //   $link = $this->createLink($this->createRegex($hosts));
      //   $res[] = array($temp[0], $link);
      //}
      //$this->res = $res;
      return res;
   }

   function _createRegex(hosts){
      return implode('|', $hosts);
   }
   function _createLink(hosts){
      url1 = "https://baobab.unige.ch/ganglia2/?r=hour&cs=&ce=&m=load_one&s=by+name&c=DALCO+Cluster&h=&host_regex=";
      url2 = "&max_graphs=0&tab=m&vn=&sh=1&z=small&hc=2";
      return url1 + hosts + url2;
   }
 
   return {
      execute: execute,
      parse: parse
   };

};



//foreach($res as $job){
//   print("<a href=\"".$job[1]."\">".$job[0]."</a>\n");
//   print("</br>\n");
//}

