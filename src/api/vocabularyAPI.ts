import {$host} from "@/api/index";
import {IMapItem} from "@/features/Map/mapSlice";

export const getWords = async (user_id) => {
    const response = await $host.post('api/words/find', {user_id});
    console.log(response.data);
    return  response.data;
}

export const setWordsToDB = async (user_id: number, map: IMapItem[]) => {
    await Promise.all(map.map((item) =>
        $host.post('api/words/add', {word: item.word,
                                              transcription: item.transcription,
                                              translation: item.translation,
                                              id: item.id,
                                              user_id })));
}

export const updateMap = async (user_id: number, map: IMapItem) => {
    await $host.post('api/words/update', {word: map.word,
                                                   transcription: map.transcription,
                                                   translation: map.translation,
                                                   id: Number.parseInt(map.id),
                                                   user_id });
}

export const deleteMap = async (id: string) => {
    await $host.post('api/words/delete', {id: Number.parseInt(id)});
}
