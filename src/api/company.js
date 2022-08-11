import request from "@/utils/request";

/**
 * 获取公司信息
 * **/
export const getCompanyInfoApi = (companyId) => {
  return request({
    url: `/company/${companyId}`,
  });
};
