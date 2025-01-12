import type Benefit from "./benefit";

export default interface Service {
  key: string;
  image: string;
  link?: string;
  benefits: Benefit[];
}
