export type Pool = {
  type: string;
  pool_type: string;
  component: string;
  tvl: number;
  bonus_24h: number;
  bonus_7d: number;
  base: string;
  quote: string;
  volume_7d: number;
  volume_24h: number;
  bonus_name: string;
  left_alt: string;
  right_alt: string;
  left_icon: string;
  right_icon: string;
  name: string;
  left_name: string;
  right_name: string;
  deposit_link: string;
  boosted: boolean;
};

export const fetchPools = async (): Promise<Pool[]> => {
  const response = await fetch("https://earn-api.attos.world/pools", {
    headers: {
      accept: "application/json",
    },
  });

  return response.json();
};
