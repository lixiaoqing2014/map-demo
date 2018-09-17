const sentimentApi = {

  tsResult: "/enp/poa/letters/getLettersTSResult",
  sourceStatistics: "/enp/poa/letters/source-Statistics",
  company: "/enp/poa/letters/stat30DaysCompany",
  handling: "/enp/poa/letters/stat30DaysHandlingStatistics",
  pollutionCategory: "/enp/poa/letters/stat30DaysPollutionCategory",
  county: "/enp/poa/letters/stat30Dayscounty",
  overview: "/enp/poa/common/overview",
  hotspot: "/enp/poa/common/today_lv_hotspot",
  hotTopic: "/enp/poa/news/30today_hot_topic",
  classifyBillboard: "/enp/poa/news/stat30DaysClassifyBillboard",
  countyBillboard: "/enp/poa/news/stat30DaysCountyBillboard",
  popWord: "/enp/poa/news/stat30DaysPopWord",
  trendBillboard: "/enp/poa/news/stat30DaysTrendBillboard",
  ssResult: "/enp/poa/letters/getLettersSSResult",
};

const recordApi = {
  pollutionData: "/enp/ea/index/sewage-ent-statistics",
  pollutionIndustry: "/enp/ea/index/sewage-industry-statistics",
  pollutionList: "/enp/ea/pollut/srclist",
  baseInfo: "/enp/ea/baseinfo/entbasedetail",
  pollutionLicence: "/enp/ea/sewage/view",
  drainOutlet: "/enp/ea/sewage/query",
  approvalRecord: "/enp/ea/eiaapproval/query",
  collectRecord: "/enp/ea/sewagecharge/query",
  productInfo: "/enp/ea/productinfo/baseinfo",
  stopRecord: "/enp/ea/productinfo/prodstopinfo",
  creditScore: "/enp/ea/creditscore/query",
  penaltyRecord: "/enp/ea/penalize/list",
  petitionInfo: "/enp/ea/getcompany-ptt-info",
  updatePollutionCompany: "/enp/ea/baseinfo/commit-detail",
  cnameFuzzy: "/enp/ea/baseinfo/cname-fuzzy",
  entdel: "/enp/ea/baseinfo/entdel",
  srcListParam: "/enp/ea/baseinfo/srclist-param",
  srcList: "/enp/ea/baseinfo/srclist",
  dubious: "/enp/ea/monitor/dubious",
  rtinfos: "/enp/ea/monitor/rtinfos",
  editInitApi: "/enp/ea/baseinfo/detail/",//编辑/新增页面初始化数据接口
  editWritApi: "/enp/ea/baseinfo/commit-detail",//编辑/新增页面写入数据接口
  outletsListApi: "/enp/ea/monitor/outlets"//获取排污口列表
};

const polluteApi = {
  dataShow: "/enp/psm/monitor/nomalRate",
  wastewater: "/enp/psm/stat/wastewater",
  exhaustgas: "/enp/psm/stat/exhaustgas",
  rateinfos: "/enp/psm/stat/rateinfos",
  thresholdsave: "/enp/psm/threshold/save",
  thresholdview:"/enp/psm/threshold/view",
  exceptiondata:"/enp/psm/monitor/exceptiondata",
  excelInitApi: "/enp/psm/report/metadata/",//污染源监控，一键报表功能初始化接口
  mapData: "/enp/psm/monitor/gis/map/data",
  verifyDataApi:"/enp/ea/doubt/doubt-check-popup/",//可疑数据弹窗获取排污口初始化信息
  verifyChangeStatusApi:"/enp/ea/doubt/doubt-check",//可疑数据弹窗获修改数据审核状态
};

const envApi ={
  todayAirQualiy: "/enp/eg/monitor/air_quality_state",
  twodayKnow: "/enp/eg/monitor/weatherForecast/real",
  anhuiRank: "/enp/eg/monitor/city/ranking",
  cityRank: "/enp/eg/monitor/county/ranking",
  healthEvaluate: "/enp/eg/analysis/healthassess",
  siteAirQualityCompare: "/enp/eg/statistics/siteAirQualityCompare",
  airHistoryTrend: "/enp/eg/statistics/airHistoryTrend",
  mapData: "/enp/eg/monitor/gis/data",
  rateIndex: "/enp/eg/monitor/gis/ruleData",
  mapDetailData: "/enp/eg/monitor/gis/detail",
  weeksAirApi :"/enp/eg/analysis/prediction/air7d",
  predictionCurveApi: "/enp/eg/analysis/compare/on72h",
  airHistoryRanking: "/enp/eg/statistics/airHistoryRanking",
  proportionAddContribution: "/enp/eg/statistics/proportionAddContribution"
};

const realTimeUrl = "openIE:http://14.116.179.241:3000/video/videoshow.html"

export {
  sentimentApi,
  recordApi,
  polluteApi,
  realTimeUrl,
  envApi
};
