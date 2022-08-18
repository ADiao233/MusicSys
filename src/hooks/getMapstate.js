import { mapState } from "vuex";
import { getMapper } from "./getMapper";

export function getMapstate(mapper) {
  let mapperFn = mapState;
  return getMapper(mapper, mapperFn);
}
