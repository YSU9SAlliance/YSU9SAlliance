interface LCTData {
  title: string
  description: string
  necessaryConditions: {
    title: string
    description: string
  }[]
  operationalPractices: {
    title: string
    description: string
  }[]
  typicalFeatures: {
    title: string
    description: string
  }[]
}

interface LCTData {
  title: string;
  description: string;
  necessaryConditions: {
    title: string;
    description: string;
  }[];
  operationalPractices: {
    title: string;
    description: string;
  }[];
  typicalFeatures: {
    title: string;
    description: string;
  }[];
}

export const disneylandLCTData: LCTData = {
  title: "迪士尼乐园",
  description: "一个世界闻名的主题公园，提供各种基于迪士尼电影和角色的娱乐设施、角色扮演和沉浸式体验。",
  necessaryConditions: [
    {
      title: "主题娱乐设施",
      description: "各种以迪士尼电影为主题的娱乐设施和游乐项目。"
    },
    {
      title: "全家游玩设计",
      description: "设计适合所有年龄段的游客，包括儿童、青少年和成年人。"
    },
    {
      title: "品牌体验",
      description: "迪士尼品牌在园区的各个方面都有体现，包括商品、餐饮和装饰。"
    },
    {
      title: "沉浸式体验",
      description: "利用先进的技术和设计手段，提供高度沉浸的体验环境。"
    }
  ],
  operationalPractices: [
    {
      title: "角色扮演",
      description: "园区内有大量迪士尼角色扮演者，与游客互动。"
    },
    {
      title: "每日游行和表演",
      description: "每日有定时的大型游行和现场表演。"
    },
    {
      title: "全天开放",
      description: "通常从早到晚都开放，提供各种娱乐和餐饮服务。"
    }
  ],
  typicalFeatures: [
    {
      title: "高票价",
      description: "门票价格较高，吸引特定消费能力的游客。"
    },
    {
      title: "主题酒店",
      description: "提供配套的主题酒店和度假村，方便游客入住。"
    }
  ]
};
