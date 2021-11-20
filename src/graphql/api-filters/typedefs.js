import { gql } from "apollo-server-core";

export const ApiFiltersInput = gql`
    input ApiFiltersInput {
    _sort: String
    _order: String
    _start: Int
    _limit: Int
  }
`;