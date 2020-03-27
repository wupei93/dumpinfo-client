import request from '@/utils/request';

export async function queryClusterList() {
  return request(`/api/cluster/getClusterList`);
}

export async function saveCluster(params) {
  return request('/api/cluster/saveCluster', {
    method: 'POST',
    data: { ...params},
  });
}

export async function queryVDCs(ips) {
  if(!ips){
    return;
  }
  return request(`/api/cluster/queryVDCs?ips=${ips}`, {
    method: 'GET',
  });
}