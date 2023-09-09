import { MemoryRespPros, Entry } from "../../interfaces/memory.resp.interfaces";

interface ReadJobMappingDto {
  cardsData: {
    url: string;
    uuid: string;
  }[];
}

export class ReadJobMapping {
  constructor(private readonly payload: MemoryRespPros[]) {}

  execute(): Required<ReadJobMappingDto[]> {
    const memory = Array.isArray(this.payload) ? this.payload : [this.payload];

    const response = memory.map((memo) => ({
      cardsData: this.getDataUrlsAndUuids(memo.entries),
    }));

    return response;
  }

  private getDataUrlsAndUuids(data: Entry[]): { url: string; uuid: string }[] {
    return data.map((entry) => ({
      url: entry.fields.image.url,
      uuid: entry.fields.image.uuid,
    }));
  }
}
