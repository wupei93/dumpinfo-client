import { parse } from 'url';


function getIPs(req, res, u) {
  const { cluster = "PCP" } = req.query;
  let IPs = "";
  const params = parse(url, true).query;
  console.log(req.query);
  console.log(params);
  if (params.clusterName) {
    if(cluster == "PCP"){
      IPs = "10.243.20.15 10.243.20.55 10.243.20.95"
    } else{
      IPs = "10.243.81.81 10.243.81.101 10.243.81.121"
    }
  }


  const result = {
    IPs,
  };
  return res.json(result);
}


export default {
  'GET /api/cluster/getIPs': getIPs,
};
