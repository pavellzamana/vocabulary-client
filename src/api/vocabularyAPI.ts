import {$host} from "@/api/index";
import {IMapItem} from "@/features/Map/mapSlice";

export const getWords = async (userId) => {
    const response = await $host.post('api/words/find', {userId});
    return  response.data;
}

export const setWordsToDB = async (userId: number, map: IMapItem[]) => {
    await Promise.all(map.map((item) =>
        $host.post('api/words/add', {word: item.word,
                                              transcription: item.transcription,
                                              translation: item.translation,
                                              id: item.id,
                                              userId})));
}

export const updateMap = async (userId: number, map: IMapItem) => {
    await $host.post('api/words/update', {word: map.word,
                                                   transcription: map.transcription,
                                                   translation: map.translation,
                                                   id: Number.parseInt(map.id),
                                                   userId});
}

export const deleteMap = async (id: string) => {
    await $host.post('api/words/delete', {id: Number.parseInt(id)});
}
