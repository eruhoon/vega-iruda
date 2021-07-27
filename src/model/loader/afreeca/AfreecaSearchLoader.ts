import axios from 'axios';
import qs from 'qs';

export class AfreecaSearchLoader {
  async getResults(keyword: string): Promise<AfreecaSearchLoaderResult[]> {
    try {
      const query = qs.stringify({
        m: 'liveSearch',
        v: '1.0',
        szOrder: '',
        c: 'EUC-KR',
        szKeyword: keyword,
      });
      const url = `http://sch.afreeca.com/api.php?${query}`;
      const { data: json } = await axios.get<RawResult>(url);
      const realBroad = json.REAL_BROAD || [];
      const results: AfreecaSearchLoaderResult[] = realBroad.map((broad) => {
        return {
          id: broad.user_id,
          nickname: broad.user_nick,
          stationName: broad.station_name,
          broadTitle: broad.broad_title,
          broadDescription: broad.b_broad_title,
          broadIcon: broad.broad_img,
        };
      });
      return results;
    } catch (e) {
      return [];
    }
  }
}

type AfreecaSearchLoaderResult = {
  id: string;
  nickname: string;
  stationName: string;
  broadTitle: string;
  broadIcon: string;
  broadDescription: string;
};

type RawResult = {
  REAL_BROAD: {
    user_id: string;
    broad_title: string;
    broad_img: string;
    b_broad_title: string;
    station_name: string;
    user_nick: string;
  }[];
};
