import request from '@/utils/request';

export async function queryClusterList() {
  return request(`/api/cluster/getClusterList`);
}
