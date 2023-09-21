import { ObjectType, ModelType } from 'dynamoose/dist/General';
import { ScanResponse } from 'dynamoose/dist/DocumentRetriever';
import { Document } from 'dynamoose/dist/Document';

export const getAllEntries = async <T extends Document>(
  model: ModelType<T>,
  lastKey: ObjectType = undefined
): Promise<T[]> => {
  let data: ScanResponse<T>;

  if (lastKey) {
    data = await model.scan().startAt(lastKey).exec();
  }
  data = await model.scan().exec();

  if (data.lastKey) {
    const moreData = await getAllEntries(model, data.lastKey);
    return [...data, ...moreData];
  } else {
    return data;
  }
};
